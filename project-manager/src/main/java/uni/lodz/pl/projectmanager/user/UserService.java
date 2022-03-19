package uni.lodz.pl.projectmanager.user;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import uni.lodz.pl.projectmanager.user.model.AddUserDto;
import uni.lodz.pl.projectmanager.user.model.User;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public User addUser(AddUserDto user) {
        return userRepository.save(new User(user));
    }

    public List<User> getUsers() {
        return userRepository.findAll();
    }

    public User editUser(User user) {
        return userRepository.save(user);
    }

    public Optional<User> getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public User getUserById(Long id) {
        return userRepository.getById(id);
    }

    public User editUser(AddUserDto user, Long id) {
        return userRepository.save(new User(user, id));
    }
}
