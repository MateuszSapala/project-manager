package uni.lodz.pl.projectmanager.security;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import uni.lodz.pl.projectmanager.security.model.Credentials;
import uni.lodz.pl.projectmanager.security.model.LoginResponse;

@Slf4j
@RestController
@RequestMapping("/api/v1/")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationManager authenticationManager;
    private final UserDetailsServiceImpl userDetailsService;
    private final JwtUtil jwtTokenUtil;

    @PostMapping("login")
    public ResponseEntity<Void> login(@RequestBody Credentials Credentials) {
        log.info("Try login user");
        Credentials credentials = new Credentials(Credentials.getUsername(), Credentials.getPassword());
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(credentials.getUsername(), credentials.getPassword())
        );
        UserDetails userDetails = userDetailsService.loadUserByUsername(credentials.getUsername());
        String jwt = jwtTokenUtil.generateToken(userDetails);
        return ResponseEntity.ok().header(HttpHeaders.AUTHORIZATION, jwt).build();
    }

    @GetMapping("verify")
    public ResponseEntity<LoginResponse> verify() {
        return ResponseEntity.ok().body((LoginResponse) SecurityContextHolder.getContext().getAuthentication().getCredentials());
    }
}
