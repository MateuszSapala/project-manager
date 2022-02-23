package uni.lodz.pl.projectmanager.task;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.webjars.NotFoundException;
import uni.lodz.pl.projectmanager.task.model.AddTaskDto;
import uni.lodz.pl.projectmanager.task.model.Task;

@RestController
@RequestMapping("/api/v1/task")
@RequiredArgsConstructor
@SecurityRequirement(name = "Authorization")
@Tag(name = "Task")
public class TaskController {
    private final TaskService taskService;

    @PostMapping
    public ResponseEntity<Task> createTask(AddTaskDto task) {
        Task createdTask = taskService.createTask(task);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdTask);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable("id") Long id) {
        taskService.deleteSprint(id);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable("id") Long id) {
        Task task = taskService.getTaskById(id)
                .orElseThrow(() -> new NotFoundException("Task {\"id\":\"" + id + "\"} not found"));
        return ResponseEntity.status(HttpStatus.OK).body(task);
    }
}
