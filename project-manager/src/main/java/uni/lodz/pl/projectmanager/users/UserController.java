package uni.lodz.pl.projectmanager.users;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping(value = "users")
    public ResponseEntity<List<User>> users() {
        return ResponseEntity.status(HttpStatus.OK).body(userService.getUsers());
    }

}
