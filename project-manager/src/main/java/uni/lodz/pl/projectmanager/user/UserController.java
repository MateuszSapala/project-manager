package uni.lodz.pl.projectmanager.user;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uni.lodz.pl.projectmanager.user.model.AddUserDto;
import uni.lodz.pl.projectmanager.user.model.EditUserDto;
import uni.lodz.pl.projectmanager.user.model.User;
import uni.lodz.pl.projectmanager.util.JsonUtil;

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

    @GetMapping("/{id}")
    @Operation(summary = "Get user by id")
    public ResponseEntity<User> getUser(@PathVariable("id") Long id) {
        log.info("Get user: id={}", id);
        return ResponseEntity.status(HttpStatus.OK).body(userService.getUserById(id));
    }

    @PostMapping
    @Operation(summary = "Add new users")
    public ResponseEntity<User> addUser(@RequestBody AddUserDto user) {
        log.info("Add user :" + JsonUtil.writeValueAsString(user));
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.addUser(user));
    }

    @PatchMapping("/{id}")
    @Operation(summary = "Edit user")
    public ResponseEntity<User> editUser(@RequestBody EditUserDto user, @PathVariable("id") Long id) {
        log.info("Edit user " + id + " :" + JsonUtil.writeValueAsString(user));
        return ResponseEntity.status(HttpStatus.OK).body(userService.editUser(user, id));
    }

}
