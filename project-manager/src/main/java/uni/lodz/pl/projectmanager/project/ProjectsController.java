package uni.lodz.pl.projectmanager.project;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.webjars.NotFoundException;

import java.util.List;

@RestController
@RequestMapping("/api/v1/projects")
@RequiredArgsConstructor
@SecurityRequirement(name = "Authorization")
@Tag(name = "Project")
public class ProjectsController {
    private final ProjectService projectService;

    @GetMapping
    public ResponseEntity<List<Project>> getProjects() {
        List<Project> projects = projectService.getAllProjects();
        return ResponseEntity.status(HttpStatus.OK).body(projects);
    }

    @PostMapping
    public ResponseEntity<Project> createNewProject(String name) {
        Project project = projectService.createNewProject(name);
        return ResponseEntity.status(HttpStatus.CREATED).body(project);
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteProjectByName(String name) {
        projectService.deleteProjectByName(name);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/{name}")
    public ResponseEntity<Project> getProjectByName(@PathVariable("name") String name) {
        Project project = projectService.getProjectByName(name)
                .orElseThrow(() -> new NotFoundException("Project {\"name\":\"" + name + "\"} not found"));
        return ResponseEntity.status(HttpStatus.OK).body(project);
    }
}
