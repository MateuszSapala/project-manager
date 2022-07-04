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

import java.util.List;
import java.util.Optional;

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
        Sprint sprint = taskDto.getSprintId() != null && taskDto.getEditedFields().contains("sprintId") ? sprintService.getSprintById(taskDto.getSprintId()) : null;
        User assingedTo = taskDto.getAssignedToId() != null && taskDto.getEditedFields().contains("assignedToId")
                ? userService.getUserById(taskDto.getAssignedToId())
                : null;
        //Edit data
        if (taskDto.getEditedFields().contains("name")) task.setName(taskDto.getName());
        if (taskDto.getEditedFields().contains("description")) task.setDescription(taskDto.getDescription());
        if (taskDto.getEditedFields().contains("taskState")) task.setTaskState(taskDto.getTaskState());
        if (taskDto.getEditedFields().contains("end")) task.setEnd(taskDto.getEnd());
        if (taskDto.getEditedFields().contains("assignedToId")) task.setAssignedTo(assingedTo);
        if (taskDto.getEditedFields().contains("sprintId")) task.setSprint(sprint);
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
            log.info("User {\"id\":" + user.getId() + "} doesn't have sufficient access to " + option.name().toLowerCase() + " access in project {\"id\":" + projectId + "}");
            throw new AuthorizationServiceException("Insufficient access to " + option.name().toLowerCase() + " task");
        }
    }

    public List<Task> getTaskByProjectName(String projectName) {
        Optional<Project> project = projectService.getProjectByName(projectName);
        if (project.isEmpty()) {
            log.info("Project " + projectName + " not found");
            throw new NotFoundException("Project " + projectName + " not found");
        }
        validateTaskAccess(project.get().getId(), RoleConfig.Option.VIEW);
        return taskRepository.findByProjectName(projectName);
    }
}
