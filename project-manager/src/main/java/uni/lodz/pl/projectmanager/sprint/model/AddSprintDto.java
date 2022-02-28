package uni.lodz.pl.projectmanager.sprint.model;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Tag(name = "Add Sprint DTO")
public class AddSprintDto {
    private String name;
    private LocalDate start;
    private LocalDate end;
    private Long projectId;
}
