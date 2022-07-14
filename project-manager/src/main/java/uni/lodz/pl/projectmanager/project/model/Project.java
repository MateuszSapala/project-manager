package uni.lodz.pl.projectmanager.project.model;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@Entity
@NoArgsConstructor
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long id;
    @Column(nullable = false, unique = true, length = 30)
    private String name;
    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    public Project(AddProjectDto projectDto) {
        this.name = projectDto.getName();
        this.description = projectDto.getDescription();
    }
}
