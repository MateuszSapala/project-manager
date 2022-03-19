package uni.lodz.pl.projectmanager.task;

import org.springframework.data.jpa.repository.JpaRepository;
import uni.lodz.pl.projectmanager.task.model.Task;

public interface TaskRepository extends JpaRepository<Task, Long> {
}
