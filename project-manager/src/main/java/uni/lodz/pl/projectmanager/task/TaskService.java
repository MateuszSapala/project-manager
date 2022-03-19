package uni.lodz.pl.projectmanager.task;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.webjars.NotFoundException;
import uni.lodz.pl.projectmanager.project.ProjectService;
import uni.lodz.pl.projectmanager.project.model.Project;
import uni.lodz.pl.projectmanager.sprint.SprintService;
import uni.lodz.pl.projectmanager.sprint.model.Sprint;
import uni.lodz.pl.projectmanager.task.model.AddTaskDto;
import uni.lodz.pl.projectmanager.task.model.EditTaskDto;
import uni.lodz.pl.projectmanager.task.model.Task;
import uni.lodz.pl.projectmanager.user.UserService;
import uni.lodz.pl.projectmanager.user.model.User;

import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class TaskService {
    private final TaskRepository taskRepository;
    private final UserService userService;
    private final ProjectService projectService;
    private final SprintService sprintService;

    public Task createTask(AddTaskDto taskDto) {
        Project project = projectService.getProjectById(taskDto.getProjectId())
                .orElseThrow(() -> new NotFoundException("Project {\"id\":\"" + taskDto.getProjectId() + "\"} not found"));
        Sprint sprint = taskDto.getSprintId() != null ? sprintService.getSprintById(taskDto.getSprintId())
                .orElseThrow(() -> new NotFoundException("Sprint {\"id\":\"" + taskDto.getSprintId() + "\"} not found"))
                : null;
        User author = (User) SecurityContextHolder.getContext().getAuthentication().getCredentials();
        User assingedTo = taskDto.getAssignedToId() != null
                ? userService.getUserById(taskDto.getAssignedToId())
                : null;
        return taskRepository.save(new Task(taskDto, author, assingedTo, project, sprint));
    }

    public Task editTask(EditTaskDto taskDto, Long id) {
        //Get data
        Task task = taskRepository.getById(taskDto.getSprintId());
        Sprint sprint = taskDto.getSprintId() != null ? sprintService.getSprintById(taskDto.getSprintId())
                .orElseThrow(() -> new NotFoundException("Sprint {\"id\":\"" + taskDto.getSprintId() + "\"} not found"))
                : null;
        User assingedTo = taskDto.getAssignedToId() != null
                ? userService.getUserById(taskDto.getAssignedToId())
                : null;
        //Edit data
        task.setName(taskDto.getName());
        task.setDescription(taskDto.getDescription());
        task.setEnd(taskDto.getEnd());
        if (assingedTo != null) task.setAssignedTo(assingedTo);
        if (sprint != null) task.setSprint(sprint);
        return taskRepository.save(task);
    }

    public void deleteSprint(Long id) {
        taskRepository.deleteById(id);
    }

    public Optional<Task> getTaskById(Long id) {
        return taskRepository.findById(id);
    }
}
