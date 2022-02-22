package uni.lodz.pl.projectmanager.project;

import lombok.Getter;
import lombok.NoArgsConstructor;
import uni.lodz.pl.projectmanager.sprint.Sprint;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Entity
@NoArgsConstructor
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long id;
    @Column(unique = true)
    private String name;
    @OneToMany
    List<Sprint> sprintList;

    public Project(String name) {
        this.name = name;
        this.sprintList = new ArrayList<>();
    }

    public Project(String name, List<Sprint> sprintList) {
        this.name = name;
        this.sprintList = sprintList;
    }
}
