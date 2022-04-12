package uni.lodz.pl.projectmanager.user;

import com.fasterxml.jackson.core.JsonProcessingException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uni.lodz.pl.projectmanager.user.model.AddUserDto;
import uni.lodz.pl.projectmanager.user.model.User;
import uni.lodz.pl.projectmanager.util.JsonUtil;

import javax.websocket.server.PathParam;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
@SecurityRequirement(name = "Authorization")
@Tag(name = "User")
public class UserController {
    private final UserService userService;

    @GetMapping
    @Operation(summary = "Get users")
    public ResponseEntity<List<User>> getUsers() {
        log.info("Get users");
        return ResponseEntity.status(HttpStatus.OK).body(userService.getUsers());
    }

    @PostMapping
    @Operation(summary = "Add new users")
    public ResponseEntity<User> addUser(@RequestBody AddUserDto user) throws JsonProcessingException {
        log.info("Add user :" + JsonUtil.writeValueAsString(user));
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.addUser(user));
    }

    @PatchMapping("/{id}")
    @Operation(summary = "Edit user")
    public ResponseEntity<User> editUser(@RequestBody AddUserDto user, @PathParam("id") Long id) throws JsonProcessingException {
        log.info("Edit user " + id + " :" + JsonUtil.writeValueAsString(user));
        return ResponseEntity.status(HttpStatus.OK).body(userService.editUser(user, id));
    }

}
