package uni.lodz.pl.projectmanager.sprint;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uni.lodz.pl.projectmanager.sprint.model.AddSprintDto;
import uni.lodz.pl.projectmanager.sprint.model.Sprint;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/v1/sprints")
@RequiredArgsConstructor
@SecurityRequirement(name = "Authorization")
@Tag(name = "Sprint")
public class SprintController {
    private final SprintService sprintService;

    @PostMapping
    @Operation(summary = "Add sprint")
    public ResponseEntity<Sprint> createSprint(@RequestBody AddSprintDto sprintDto) {
        log.info("Create sprint");
        Sprint sprint = sprintService.createNewSprint(sprintDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(sprint);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete sprint")
    public ResponseEntity<Void> deleteSprint(@PathVariable("id") Long id) {
        sprintService.deleteSprint(id);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get sprint by id")
    public ResponseEntity<Sprint> getSprintById(@PathVariable("id") Long id) {
        Sprint sprint = sprintService.getSprintById(id);
        return ResponseEntity.status(HttpStatus.OK).body(sprint);
    }

    @GetMapping("/project/{projectId}")
    @Operation(summary = "Get sprint by project id")
    public ResponseEntity<List<Sprint>> getSprintsByProjectId(@PathVariable("projectId") Long projectId) {
        List<Sprint> sprints = sprintService.getSprintByProjectId(projectId);
        return ResponseEntity.status(HttpStatus.OK).body(sprints);
    }
}
