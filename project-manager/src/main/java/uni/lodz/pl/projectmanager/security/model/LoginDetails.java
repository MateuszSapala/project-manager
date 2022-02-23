package uni.lodz.pl.projectmanager.security.model;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Schema(name = "Login")
public class LoginDetails {
    private String username;
    private String password;
}
