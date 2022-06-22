package uni.lodz.pl.projectmanager.task;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uni.lodz.pl.projectmanager.task.model.AddTaskDto;
import uni.lodz.pl.projectmanager.task.model.EditTaskDto;
import uni.lodz.pl.projectmanager.task.model.Task;

import java.util.List;

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

    @PatchMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Edit task")
    public ResponseEntity<Task> editTask(@PathVariable("id") Long id, @RequestBody EditTaskDto task) {
        Task createdTask = taskService.editTask(task, id);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdTask);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete task by id")
    public ResponseEntity<Void> deleteTask(@PathVariable("id") Long id) {
        taskService.deleteTask(id);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get task by id")
    public ResponseEntity<Task> getTaskById(@PathVariable("id") Long id) {
        Task task = taskService.getTaskById(id);
        return ResponseEntity.status(HttpStatus.OK).body(task);
    }

    @GetMapping(value = "/project/{projectName}", produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Get task by project name")
    public ResponseEntity<List<Task>> getTaskByProjectId(@PathVariable("projectName") String projectName) {
        List<Task> task = taskService.getTaskByProjectName(projectName);
        return ResponseEntity.status(HttpStatus.OK).body(task);
    }
}
