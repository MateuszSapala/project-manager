package uni.lodz.pl.projectmanager.user;

import org.springframework.data.jpa.repository.JpaRepository;
import uni.lodz.pl.projectmanager.user.model.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> getByUsername(String username);

    Optional<User> findByUsername(String assignedToUsername);
}
