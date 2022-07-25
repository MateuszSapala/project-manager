package uni.lodz.pl.projectmanager.retro;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uni.lodz.pl.projectmanager.retro.model.AddRetroNoteDto;
import uni.lodz.pl.projectmanager.retro.model.RetroNote;

import java.util.List;

@RestController
@RequestMapping("/api/v1/retro-note")
@RequiredArgsConstructor
@SecurityRequirement(name = "Authorization")
@Tag(name = "Retro note")
public class RetroNoteController {
    private final RetroNoteService retroNoteService;

    @PostMapping
    @Operation(summary = "Add retro note")
    public ResponseEntity<RetroNote> createRetroNote(@RequestBody AddRetroNoteDto addRetroNoteDto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(retroNoteService.createRetroNote(addRetroNoteDto));
    }

    @GetMapping("/sprint/{sprintId}")
    @Operation(summary = "Get retro notes by sprint id")
    public ResponseEntity<List<RetroNote>> getTaskById(@PathVariable("sprintId") Long sprintId) {
        return ResponseEntity.status(HttpStatus.OK).body(retroNoteService.getRetroNotesBySprint(sprintId));
    }
}
