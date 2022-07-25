package uni.lodz.pl.projectmanager.retro;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import uni.lodz.pl.projectmanager.retro.model.RetroNote;

import java.util.List;

public interface RetroNoteRepository extends JpaRepository<RetroNote, Long> {
    @Query("SELECT rn FROM RetroNote rn WHERE sprint_id = :sprintId")
    List<RetroNote> findBySprintId(@Param("sprintId") Long userId);
}
