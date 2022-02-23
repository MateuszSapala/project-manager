package uni.lodz.pl.projectmanager.task.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.SneakyThrows;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.bind.MissingRequestValueException;
import uni.lodz.pl.projectmanager.user.model.User;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Entity
@NoArgsConstructor
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long id;
    private String name;
    private String description;
    private LocalDateTime created;
    @ManyToOne
    private User createdBy;
    private LocalDate end;
    @ManyToOne
    private User assignedTo;
    private TaskState taskState;

    @SneakyThrows
    public Task(AddTaskDto taskDto, User author, User assingedTo) {
        if (StringUtils.isBlank(taskDto.getName())) throw new MissingRequestValueException("Name missing");
        if (StringUtils.isBlank(taskDto.getDescription()))
            throw new MissingRequestValueException("Description missing");
        LocalDate end = taskDto.getEnd() != null ? taskDto.getEnd() : null;
        this.name = taskDto.getName();
        this.description = taskDto.getDescription();
        this.created = LocalDateTime.now();
        this.createdBy = author;
        this.end = end;
        this.assignedTo = assingedTo;
        this.taskState = TaskState.TODO;
    }
}
