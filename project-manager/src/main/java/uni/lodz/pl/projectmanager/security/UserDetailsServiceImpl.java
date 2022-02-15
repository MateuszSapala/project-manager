package uni.lodz.pl.projectmanager.security;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {
    private final BCryptPasswordEncoder bCrypt;

    @Override
    public UserDetails loadUserByUsername(String login) {
        if (!login.equals("username")) {
            throw new UsernameNotFoundException("Username not found");
        }
        return new User(login, bCrypt.encode("password"), List.of(new GrantedAuthority() {
            @Override
            public String getAuthority() {
                return "USER";
            }
        }));
    }

    public Long loadIdByUsername(String username) {
        return 1L;
    }
}
