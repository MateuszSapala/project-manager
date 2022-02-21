package uni.lodz.pl.projectmanager.security.model;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class LoginData {
    private final String username;
    private final String password;
}
