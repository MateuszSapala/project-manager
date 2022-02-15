package uni.lodz.pl.projectmanager.security;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/v1/")
@RequiredArgsConstructor
public class AuthenticationApi {
    private final AuthenticationManager authenticationManager;
    private final UserDetailsServiceImpl userDetailsService;
    private final JwtUtil jwtTokenUtil;

    @PostMapping("login")
    public ResponseEntity login(@RequestBody LoginData loginData, @RequestHeader("origin") String origin) {
        log.info("Try login user");
        Credentials credentials = new Credentials(loginData.getUsername(), loginData.getPassword());
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(credentials.getUsername(), credentials.getPassword())
        );
        UserDetails userDetails = userDetailsService.loadUserByUsername(credentials.getUsername());
        String jwt = jwtTokenUtil.generateToken(userDetails);
        return ResponseEntity.ok().header(HttpHeaders.AUTHORIZATION, jwtTokenUtil.generateToken(credentials)).build();
    }

    @GetMapping("verify")
    public ResponseEntity verify() {
        return ResponseEntity.ok().build();
    }
}
