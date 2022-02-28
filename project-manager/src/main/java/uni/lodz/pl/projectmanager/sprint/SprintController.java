package uni.lodz.pl.projectmanager.sprint;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.webjars.NotFoundException;
import uni.lodz.pl.projectmanager.project.ProjectService;
import uni.lodz.pl.projectmanager.sprint.model.AddSprintDto;
import uni.lodz.pl.projectmanager.sprint.model.Sprint;

@RestController
@RequestMapping("/api/v1/sprints")
@RequiredArgsConstructor
@SecurityRequirement(name = "Authorization")
@Tag(name = "Sprint")
public class SprintController {
    private final SprintService sprintService;
    private final ProjectService projectService;

    @PostMapping
    public ResponseEntity<Sprint> createSprint(@RequestBody AddSprintDto sprintDto) {
        Sprint sprint = sprintService.createNewSprint(sprintDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(sprint);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSprint(@PathVariable("id") Long id) {
        sprintService.deleteSprint(id);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Sprint> getSprintById(@PathVariable("id") Long id) {
        Sprint sprint = sprintService.getSprintById(id)
                .orElseThrow(() -> new NotFoundException("Sprint {\"id\":\"" + id + "\"} not found"));
        return ResponseEntity.status(HttpStatus.OK).body(sprint);
    }
}
