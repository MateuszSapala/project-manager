package uni.lodz.pl.projectmanager.sprint;

import org.springframework.data.jpa.repository.JpaRepository;
import uni.lodz.pl.projectmanager.sprint.model.Sprint;

public interface SprintRepository extends JpaRepository<Sprint, Long> {

}
