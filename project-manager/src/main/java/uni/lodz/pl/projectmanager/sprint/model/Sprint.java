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
    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private LocalDate start;
    @Column(nullable = false)
    private LocalDate end;
    @ManyToOne(optional = false)
    private Project project;
    @Column(nullable = false)
    private boolean closed;

    public Sprint(String name, LocalDate start, LocalDate end, Project project) {
        this.name = name;
        this.start = start;
        this.end = end;
        this.project = project;
        this.closed = false;
    }
}