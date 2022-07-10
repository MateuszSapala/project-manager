package uni.lodz.pl.projectmanager.user;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.AuthorizationServiceException;
import org.springframework.stereotype.Service;
import org.webjars.NotFoundException;
import uni.lodz.pl.projectmanager.user.model.AddUserDto;
import uni.lodz.pl.projectmanager.user.model.EditUserDto;
import uni.lodz.pl.projectmanager.user.model.User;
import uni.lodz.pl.projectmanager.util.AuthorizationUtil;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public User addUser(AddUserDto user) {
        if (!AuthorizationUtil.getLoggedUser().isAdmin()) {
            log.info("Only admin can add new users");
            throw new AuthorizationServiceException("Only admin can add new users");
        }
        return userRepository.save(new User(user));
    }

    public List<User> getUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public User getUserById(Long id) {
        Optional<User> user = userRepository.findById(id);
        return user.orElseThrow(() -> new NotFoundException("User with id=" + id + " not found"));
    }

    public User editUser(EditUserDto update, Long id) {
        validateEditUserAuthorization(id, update.editedFields().contains("admin"));
        User user = userRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("User {\"id\":\"" + id + "\"} not found"));
        if (update.editedFields().contains("username")) user.setUsername(update.username());
        if (update.editedFields().contains("password")) user.setPassword(update.password());
        if (update.editedFields().contains("admin") && update.admin() != null) user.setAdmin(update.admin());
        if (update.editedFields().contains("email")) user.setEmail(update.email());
        if (update.editedFields().contains("name")) user.setName(update.name());
        if (update.editedFields().contains("surname")) user.setSurname(update.surname());
        return userRepository.save(user);
    }

    private void validateEditUserAuthorization(Long editedUserId, boolean editedUserFieldAdminSet) {
        User credentials = AuthorizationUtil.getLoggedUser();
        if (credentials.isAdmin()) {
            return;
        }
        if (!Objects.equals(credentials.getId(), editedUserId)) {
            log.info("User can edit only his details");
            throw new AuthorizationServiceException("User can edit only his details");
        }
        if (editedUserFieldAdminSet) {
            log.info("User can't edit admin privileges");
            throw new AuthorizationServiceException("User can't edit admin privileges");
        }
    }
}
