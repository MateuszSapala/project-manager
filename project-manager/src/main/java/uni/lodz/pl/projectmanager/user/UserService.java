package uni.lodz.pl.projectmanager.user;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import uni.lodz.pl.projectmanager.user.model.User;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public User addUser(User user) {
        return userRepository.save(user);
    }

    public List<User> getUsers() {
        return userRepository.findAll();
    }

    public User editUser(User user) {
        return userRepository.save(user);
    }

    public Optional<User> getUserByUsername(String username) {
        return userRepository.getByUsername(username);
    }
}
