package uni.lodz.pl.projectmanager.security;

import io.swagger.v3.oas.annotations.Operation;
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
import uni.lodz.pl.projectmanager.security.model.Credentials;
import uni.lodz.pl.projectmanager.security.model.LoginDetails;
import uni.lodz.pl.projectmanager.user.model.User;

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
    @Operation(summary = "Login", description = "Upon successful login, the API returns a JSON Web Token in the authorization header. Add this header to be able to send successful requests to authorized endpoints. In the Swagger UI, you paste the JSON Web Token without the initial word \"Bearer\", because the swagger adds it itself.")
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
    @Operation(summary = "Verify user", description = "Return user details based od Authorization header")
    public ResponseEntity<User> verify() {
        log.info("Verify token");
        return ResponseEntity.ok().body((User) SecurityContextHolder.getContext().getAuthentication().getCredentials());
    }
}
