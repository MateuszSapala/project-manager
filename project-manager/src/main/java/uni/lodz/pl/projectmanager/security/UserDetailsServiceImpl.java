package uni.lodz.pl.projectmanager.security;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import uni.lodz.pl.projectmanager.user.UserService;
import uni.lodz.pl.projectmanager.user.model.User;
import uni.lodz.pl.projectmanager.user.model.UserDto;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {
    private final BCryptPasswordEncoder bCrypt;
    private final UserService userService;

    @Override
    public UserDetails loadUserByUsername(String username) {
        User user = userService.getUserByUsername(username).orElseThrow(() -> new UsernameNotFoundException("Username not found"));
        return new org.springframework.security.core.userdetails.User(user.getUsername(), bCrypt.encode(user.getPassword()), List.of((GrantedAuthority) () -> "ADMIN"));
    }

    public UserDto getCredentials(String username) {
        return new UserDto(userService.getUserByUsername(username).orElseThrow(() -> new UsernameNotFoundException("Username not found")));
    }
}
