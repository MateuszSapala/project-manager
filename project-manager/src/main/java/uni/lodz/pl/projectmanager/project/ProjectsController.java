package uni.lodz.pl.projectmanager.project;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.webjars.NotFoundException;
import uni.lodz.pl.projectmanager.project.model.AddProjectDto;
import uni.lodz.pl.projectmanager.project.model.Project;

import java.util.List;

@RestController
@RequestMapping("/api/v1/projects")
@RequiredArgsConstructor
@SecurityRequirement(name = "Authorization")
@Tag(name = "Project")
public class ProjectsController {
    private final ProjectService projectService;

    @GetMapping
    @Operation(summary = "Get projects")
    public ResponseEntity<List<Project>> getProjects() {
        List<Project> projects = projectService.getAllProjects();
        return ResponseEntity.status(HttpStatus.OK).body(projects);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get project by id")
    public ResponseEntity<Project> getProjectById(@PathVariable("id") Long id) {
        Project project = projectService.getProjectById(id)
                .orElseThrow(() -> new NotFoundException("Project {\"id\":\"" + id + "\"} not found"));
        return ResponseEntity.status(HttpStatus.OK).body(project);
    }

    @GetMapping("/name/{name}")
    @Operation(summary = "Get project by name")
    public ResponseEntity<Project> getProjectByName(@PathVariable("name") String name) {
        Project project = projectService.getProjectById(name)
                .orElseThrow(() -> new NotFoundException("Project {\"name\":\"" + name + "\"} not found"));
        return ResponseEntity.status(HttpStatus.OK).body(project);
    }

    @PostMapping
    @Operation(summary = "Add new project")
    public ResponseEntity<Project> createNewProject(@RequestBody AddProjectDto projectDto) {
        Project project = projectService.createNewProject(projectDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(project);
    }

    @DeleteMapping
    @Operation(summary = "Delete project by id")
    public ResponseEntity<Void> deleteProjectById(Long id) {
        projectService.deleteProjectById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
