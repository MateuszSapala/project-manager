package uni.lodz.pl.projectmanager.project;

import lombok.Getter;
import lombok.NoArgsConstructor;
import uni.lodz.pl.projectmanager.sprint.Sprint;
import uni.lodz.pl.projectmanager.task.model.Task;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Entity
@NoArgsConstructor
public class Project {
    @OneToMany
    List<Sprint> sprintList;
    @OneToMany
    List<Task> taskList;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long id;
    @Column(unique = true)
    private String name;

    public Project(String name) {
        this.name = name;
        this.sprintList = new ArrayList<>();
        this.taskList = new ArrayList<>();
    }
}
