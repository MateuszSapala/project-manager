package uni.lodz.pl.projectmanager.task;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.webjars.NotFoundException;
import uni.lodz.pl.projectmanager.task.model.AddTaskDto;
import uni.lodz.pl.projectmanager.task.model.EditTaskDto;
import uni.lodz.pl.projectmanager.task.model.Task;

@RestController
@RequestMapping("/api/v1/task")
@RequiredArgsConstructor
@SecurityRequirement(name = "Authorization")
@Tag(name = "Task")
public class TaskController {
    private final TaskService taskService;

    @PostMapping
    @Operation(summary = "Add task")
    public ResponseEntity<Task> createTask(@RequestBody AddTaskDto task) {
        Task createdTask = taskService.createTask(task);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdTask);
    }

    @PatchMapping("/{id}")
    @Operation(summary = "Edit task")
    public ResponseEntity<Task> editTask(@PathVariable("id") Long id, @RequestBody EditTaskDto task) {
        Task createdTask = taskService.editTask(task, id);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdTask);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete task by id")
    public ResponseEntity<Void> deleteTask(@PathVariable("id") Long id) {
        taskService.deleteSprint(id);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Det task by id")
    public ResponseEntity<Task> getTaskById(@PathVariable("id") Long id) {
        Task task = taskService.getTaskById(id)
                .orElseThrow(() -> new NotFoundException("Task {\"id\":\"" + id + "\"} not found"));
        return ResponseEntity.status(HttpStatus.OK).body(task);
    }
}
