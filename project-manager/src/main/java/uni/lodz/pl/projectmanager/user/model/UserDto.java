package uni.lodz.pl.projectmanager.user.model;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;

@Getter
@Schema(name = "User")
public class UserDto {
    private final Long id;
    private final String username;
    private final String email;
    private final String name;
    private final String surname;

    public UserDto(User user) {
        id = user.getId();
        username = user.getUsername();
        email = user.getEmail();
        name = user.getName();
        surname = user.getSurname();
    }
}