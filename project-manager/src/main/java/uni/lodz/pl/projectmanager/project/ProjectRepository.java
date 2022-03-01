package uni.lodz.pl.projectmanager.project;


import org.springframework.data.jpa.repository.JpaRepository;
import uni.lodz.pl.projectmanager.project.model.Project;

import java.util.Optional;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    Optional<Project> findByName(String name);
}
