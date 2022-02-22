package uni.lodz.pl.projectmanager.security;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import uni.lodz.pl.projectmanager.user.UserDto;

@Slf4j
@RestController
@RequestMapping("/api/v1/")
@RequiredArgsConstructor
@Tag(name = "Login")
public class AuthenticationController {
    private final AuthenticationManager authenticationManager;
    private final UserDetailsServiceImpl userDetailsService;
    private final JwtUtil jwtTokenUtil;

    @PostMapping("login")
    public ResponseEntity<Void> login(@RequestBody LoginDetails loginDetails) {
        log.info("Login user: " + loginDetails.getUsername());
        Credentials credentials = new Credentials(loginDetails.getUsername(), loginDetails.getPassword());
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(credentials.getUsername(), credentials.getPassword())
        );
        UserDetails userDetails = userDetailsService.loadUserByUsername(credentials.getUsername());
        String jwt = jwtTokenUtil.generateToken(userDetails);
        return ResponseEntity.ok().header(HttpHeaders.AUTHORIZATION, jwt).build();
    }

    @SecurityRequirement(name = "Authorization")
    @GetMapping("verify")
    public ResponseEntity<UserDto> verify() {
        log.info("Verify token");
        return ResponseEntity.ok().body((UserDto) SecurityContextHolder.getContext().getAuthentication().getCredentials());
    }
}
