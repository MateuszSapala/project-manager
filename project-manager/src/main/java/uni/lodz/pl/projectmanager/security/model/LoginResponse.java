package uni.lodz.pl.projectmanager.security.model;

import lombok.Getter;
import uni.lodz.pl.projectmanager.users.User;

@Getter
public class LoginResponse {
    private final String email;
    private final String name;
    private final String surname;

    public LoginResponse(User user) {
        email = user.getEmail();
        name = user.getName();
        surname = user.getSurname();
    }
}
