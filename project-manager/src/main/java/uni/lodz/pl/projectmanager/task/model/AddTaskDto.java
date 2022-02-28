package uni.lodz.pl.projectmanager.task.model;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class AddTaskDto {
    private String name;
    private String description;
    private LocalDate end;
    private Long assignedToId;
    private Long projectId;
    private Long sprintId;
}
