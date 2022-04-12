package uni.lodz.pl.projectmanager.util;

import org.springframework.security.core.context.SecurityContextHolder;
import uni.lodz.pl.projectmanager.user.model.User;

public class AuthorizationUtil {
    public static User getLoggedUser() {
        return (User) SecurityContextHolder.getContext().getAuthentication().getCredentials();
    }
}
