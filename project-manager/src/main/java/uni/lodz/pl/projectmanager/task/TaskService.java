package uni.lodz.pl.projectmanager.task;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.AuthorizationServiceException;
import org.springframework.stereotype.Service;
import org.webjars.NotFoundException;
import uni.lodz.pl.projectmanager.access.AccessService;
import uni.lodz.pl.projectmanager.access.model.Access;
import uni.lodz.pl.projectmanager.config.RoleConfig;
import uni.lodz.pl.projectmanager.project.ProjectService;
import uni.lodz.pl.projectmanager.project.model.Project;
import uni.lodz.pl.projectmanager.sprint.SprintService;
import uni.lodz.pl.projectmanager.sprint.model.Sprint;
import uni.lodz.pl.projectmanager.task.model.AddTaskDto;
import uni.lodz.pl.projectmanager.task.model.EditTaskDto;
import uni.lodz.pl.projectmanager.task.model.Task;
import uni.lodz.pl.projectmanager.user.UserService;
import uni.lodz.pl.projectmanager.user.model.User;
import uni.lodz.pl.projectmanager.util.AuthorizationUtil;

@Slf4j
@Service
@RequiredArgsConstructor
public class TaskService {
    private final TaskRepository taskRepository;
    private final UserService userService;
    private final ProjectService projectService;
    private final SprintService sprintService;
    private final AccessService accessService;
    private final RoleConfig roleConfig;

    public Task createTask(AddTaskDto taskDto) {
        Project project = projectService.getProjectById(taskDto.getProjectId())
                .orElseThrow(() -> new NotFoundException("Project {\"id\":\"" + taskDto.getProjectId() + "\"} not found"));
        validateTaskAccess(project.getId(), RoleConfig.Option.EDIT);
        Sprint sprint = taskDto.getSprintId() != null ? sprintService.getSprintById(taskDto.getSprintId()) : null;
        User author = AuthorizationUtil.getLoggedUser();
        User assingedTo = taskDto.getAssignedToId() != null
                ? userService.getUserById(taskDto.getAssignedToId())
                : null;
        return taskRepository.save(new Task(taskDto, author, assingedTo, project, sprint));
    }

    public Task editTask(EditTaskDto taskDto, Long id) {
        //Get data
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Task {\"id\":\"" + id + "\"} not found"));
        validateTaskAccess(task.getProject().getId(), RoleConfig.Option.EDIT);
        Sprint sprint = taskDto.getSprintId() != null ? sprintService.getSprintById(taskDto.getSprintId()) : null;
        User assingedTo = taskDto.getAssignedToId() != null
                ? userService.getUserById(taskDto.getAssignedToId())
                : null;
        //Edit data
        if (taskDto.getName() != null) task.setName(taskDto.getName());
        if (taskDto.getDescription() != null) task.setDescription(taskDto.getDescription());
        if (task.getEnd() != null) task.setEnd(taskDto.getEnd());
        if (assingedTo != null) task.setAssignedTo(assingedTo);
        if (sprint != null) task.setSprint(sprint);
        return taskRepository.save(task);
    }

    public void deleteTask(final Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Task {\"id\":\"" + id + "\"} not found"));
        validateTaskAccess(task.getProject().getId(), RoleConfig.Option.EDIT);
        taskRepository.deleteById(id);
    }

    public Task getTaskById(Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Task {\"id\":\"" + id + "\"} not found"));
        validateTaskAccess(task.getProject().getId(), RoleConfig.Option.VIEW);
        return task;
    }

    public void validateTaskAccess(Long projectId, RoleConfig.Option option) {
        User user = AuthorizationUtil.getLoggedUser();
        if (user.isAdmin()) return;
        Access access = accessService.getAccess(user.getId(), projectId);
        if (access == null) {
            log.info("User {\"id\":" + user.getId() + "} cannot access the project {\"id\":" + projectId + "}");
            throw new AuthorizationServiceException("No access to this project");
        }
        if (!roleConfig.canTask(access.getProjectRole(), option)) {
            log.info("User {\"id\":" + user.getId() + "} doesn't have sufficient access to " + option.name().toLowerCase() + " task in project {\"id\":" + projectId + "}");
            throw new AuthorizationServiceException("Insufficient access to view task");
        }
    }
}
