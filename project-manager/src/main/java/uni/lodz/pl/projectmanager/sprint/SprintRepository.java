package uni.lodz.pl.projectmanager.sprint;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import uni.lodz.pl.projectmanager.sprint.model.Sprint;

import java.util.List;

public interface SprintRepository extends JpaRepository<Sprint, Long> {
    @Query("SELECT s FROM Sprint s WHERE project_id=:projectId")
    List<Sprint> findByProjectId(@Param("projectId") Long projectId);
}
