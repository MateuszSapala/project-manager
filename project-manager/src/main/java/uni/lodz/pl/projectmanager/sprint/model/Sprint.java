package uni.lodz.pl.projectmanager.sprint.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import uni.lodz.pl.projectmanager.project.model.Project;

import javax.persistence.*;
import java.time.LocalDate;

@Getter
@Setter
@Entity
@NoArgsConstructor
public class Sprint {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long id;
    private String name;
    private LocalDate start;
    private LocalDate end;
    @ManyToOne
    private Project project;
    private boolean closed;

    public Sprint(String name, LocalDate start, LocalDate end, Project project) {
        this.name = name;
        this.start = start;
        this.end = end;
        this.project = project;
        this.closed = false;
    }
}