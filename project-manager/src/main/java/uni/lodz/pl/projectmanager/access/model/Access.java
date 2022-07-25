package uni.lodz.pl.projectmanager.access.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import uni.lodz.pl.projectmanager.project.model.Project;
import uni.lodz.pl.projectmanager.user.model.User;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(uniqueConstraints = {@UniqueConstraint(columnNames = {"project_id", "user_id"})})
public class Access {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long id;
    @ManyToOne(optional = false)
    User user;
    @ManyToOne(optional = false)
    Project project;
    @Column(nullable = false)
    ProjectRole projectRole;

    public Access(User user, Project project, ProjectRole projectRole) {
        this.user = user;
        this.project = project;
        this.projectRole = projectRole;
    }
}
