package uni.lodz.pl.projectmanager.access;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uni.lodz.pl.projectmanager.access.model.Access;
import uni.lodz.pl.projectmanager.access.model.Entitlements;
import uni.lodz.pl.projectmanager.access.model.UpdateAccessDto;
import uni.lodz.pl.projectmanager.util.AuthorizationUtil;
import uni.lodz.pl.projectmanager.util.JsonUtil;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/v1/access")
@RequiredArgsConstructor
@SecurityRequirement(name = "Authorization")
@Tag(name = "Access")
public class AccessController {
    private final AccessService accessService;

    @GetMapping
    @Operation(summary = "Get users accesses")
    public ResponseEntity<List<Access>> getUsersAccesses(
            @RequestParam(required = false, name = "userId") Long userId,
            @RequestParam(required = false, name = "projectId") Long projectId) {
        log.info("Get users access for userId=" + userId + ", projectId=" + projectId);
        return ResponseEntity.status(HttpStatus.OK).body(accessService.getAccesses(userId, projectId));
    }

    @PatchMapping
    @Operation(summary = "Update or add access")
    public ResponseEntity<Access> updateOrAddAccess(@RequestBody UpdateAccessDto access) {
        log.info("Update or add access:" + JsonUtil.writeValueAsString(access));
        return ResponseEntity.status(HttpStatus.CREATED).body(accessService.updateOrAddAccess(access));
    }

    @DeleteMapping({"/{userId}/{projectId}"})
    @Operation(summary = "Delete access")
    public ResponseEntity<Void> deleteAccess(@PathVariable("userId") Long userId, @PathVariable("projectId") Long projectId) {
        log.info("Delete access by: userId=" + userId + ", projectId=" + projectId);
        accessService.deleteAccess(userId, projectId);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @DeleteMapping({"/{accessId}"})
    @Operation(summary = "Delete access")
    public ResponseEntity<Void> deleteAccess(@PathVariable("accessId") Long accessId) {
        log.info("Delete access " + accessId);
        accessService.deleteAccess(accessId);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @SecurityRequirement(name = "Authorization")
    @GetMapping("entitlements/{projectId}")
    @Operation(summary = "Get user entitlements")
    public ResponseEntity<Entitlements> getUserEntitlements(@PathVariable("projectId") Long projectId) {
        log.info("Get users entitlements for userId=" + AuthorizationUtil.getLoggedUser().getId() + ", projectId=" + projectId);
        return ResponseEntity.status(HttpStatus.OK).body(accessService.getEntitlements(projectId));
    }
}
