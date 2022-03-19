package uni.lodz.pl.projectmanager.access;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import uni.lodz.pl.projectmanager.access.model.Access;

import java.util.List;

public interface AccessRepository extends JpaRepository<Access, Long> {
    @Query("SELECT a FROM Access a WHERE (:userId IS NULL OR user_id=:userId) AND (:projectId IS NULL OR project_id=:projectId)")
    List<Access> findByUserIdAndProjectId(@Param("userId") Long userId, @Param("projectId") Long projectId);

    @Transactional
    @Modifying
    @Query("DELETE FROM Access a WHERE user_id=:userId AND project_id=:projectId")
    void deleteByUserIdAndProjectId(Long userId, Long projectId);
}
