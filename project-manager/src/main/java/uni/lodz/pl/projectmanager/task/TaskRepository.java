package uni.lodz.pl.projectmanager.task;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import uni.lodz.pl.projectmanager.access.model.Access;
import uni.lodz.pl.projectmanager.task.model.Task;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByProjectName(String projectName);
    List<Task> findBySprintId(Long sprintId);
}
