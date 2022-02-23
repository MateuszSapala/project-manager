package uni.lodz.pl.projectmanager.task;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.webjars.NotFoundException;
import uni.lodz.pl.projectmanager.project.Project;
import uni.lodz.pl.projectmanager.project.ProjectService;
import uni.lodz.pl.projectmanager.task.model.AddTaskDto;
import uni.lodz.pl.projectmanager.task.model.Task;
import uni.lodz.pl.projectmanager.user.UserRepository;
import uni.lodz.pl.projectmanager.user.model.User;
import uni.lodz.pl.projectmanager.user.model.UserDto;

import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class TaskService {
    private final TaskRepository taskRepository;
    private final UserRepository userRepository;
    private final ProjectService projectService;

    public Task createTask(AddTaskDto taskDto) {
        Project project = projectService.getProjectByName(taskDto.getProjectName())
                .orElseThrow(() -> new NotFoundException("Project {\"name\":\"" + taskDto.getProjectName() + "\"} not found"));
        Long authorId = ((UserDto) SecurityContextHolder.getContext().getAuthentication().getCredentials()).getId();
        User author = userRepository.findById(authorId).orElseThrow(() -> new NotFoundException("Task author not found"));
        User assingedTo = StringUtils.isNotBlank(taskDto.getAssignedToUsername()) ?
                userRepository.findByUsername(taskDto.getAssignedToUsername())
                        .orElseThrow(() -> new NotFoundException("User {\"username\":\"" + taskDto.getAssignedToUsername() + "\"}"))
                : null;
        Task task = taskRepository.save(new Task(taskDto, author, assingedTo));
        projectService.addTaskToProject(project, task);
        return task;
    }

    public void deleteSprint(Long id) {
        taskRepository.deleteById(id);
    }

    public Optional<Task> getTaskById(Long id) {
        return taskRepository.findById(id);
    }
}
