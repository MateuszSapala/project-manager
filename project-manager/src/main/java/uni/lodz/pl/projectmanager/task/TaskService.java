package uni.lodz.pl.projectmanager.task;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.webjars.NotFoundException;
import uni.lodz.pl.projectmanager.project.model.Project;
import uni.lodz.pl.projectmanager.project.ProjectService;
import uni.lodz.pl.projectmanager.sprint.SprintService;
import uni.lodz.pl.projectmanager.sprint.model.Sprint;
import uni.lodz.pl.projectmanager.task.model.AddTaskDto;
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
        Sprint sprint = sprintService.getSprintById(taskDto.getSprintId())
                .orElseThrow(() -> new NotFoundException("Sprint {\"id\":\"" + taskDto.getSprintId() + "\"} not found"));
        User author = (User) SecurityContextHolder.getContext().getAuthentication().getCredentials();
        User assingedTo = taskDto.getAssignedToId() != null
                ? userService.getUserById(taskDto.getAssignedToId())
                : null;
        return taskRepository.save(new Task(taskDto, author, assingedTo, project, sprint));
    }

    public void deleteSprint(Long id) {
        taskRepository.deleteById(id);
    }

    public Optional<Task> getTaskById(Long id) {
        return taskRepository.findById(id);
    }
}
