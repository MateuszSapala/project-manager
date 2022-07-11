package uni.lodz.pl.projectmanager.access;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.AuthorizationServiceException;
import org.springframework.stereotype.Service;
import org.webjars.NotFoundException;
import uni.lodz.pl.projectmanager.access.model.Access;
import uni.lodz.pl.projectmanager.access.model.Entitlements;
import uni.lodz.pl.projectmanager.access.model.ProjectRole;
import uni.lodz.pl.projectmanager.access.model.UpdateAccessDto;
import uni.lodz.pl.projectmanager.config.RoleConfig;
import uni.lodz.pl.projectmanager.project.ProjectRepository;
import uni.lodz.pl.projectmanager.project.model.Project;
import uni.lodz.pl.projectmanager.user.UserRepository;
import uni.lodz.pl.projectmanager.user.model.User;
import uni.lodz.pl.projectmanager.util.AuthorizationUtil;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class AccessService {
    private final AccessRepository accessRepository;
    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;
    private final RoleConfig roleConfig;

    public List<Access> getAccesses(Long userId, Long projectId) {
        List<Access> list = accessRepository.findByUserIdAndProjectId(userId, projectId);
        User user = AuthorizationUtil.getLoggedUser();
        if (user.isAdmin()) return list;
        return list.stream()
                .filter(item -> {
                    if (Objects.equals(item.getUser().getId(), user.getId())) return true;
                    Access access = getAccess(user.getId(), item.getProject().getId());
                    return access != null && roleConfig.canAccess(access.getProjectRole(), RoleConfig.Option.VIEW);
                })
                .collect(Collectors.toList());
    }

    public Access getAccess(@NonNull Long userId, @NonNull Long projectId) {
        List<Access> list = accessRepository.findByUserIdAndProjectId(userId, projectId);
        if (list.isEmpty()) {
            return null;
        }
        return list.get(0);
    }

    public Access updateOrAddAccess(UpdateAccessDto update) {
        validateEditAccess(update.getProjectId(), update.getProjectRole());

        User user = userRepository.findById(update.getUserId())
                .orElseThrow(() -> new NotFoundException("User {\"id\":\"" + update.getUserId() + "\"} not found"));
        Project project = projectRepository.findById(update.getProjectId())
                .orElseThrow(() -> new NotFoundException("Project {\"id\":\"" + update.getProjectId() + "\"} not found"));
        List<Access> list = getAccesses(update.getUserId(), update.getProjectId());

        User loggedUser = AuthorizationUtil.getLoggedUser();
        if (!list.isEmpty() && !loggedUser.isAdmin()) {
            Access userAccess = getAccess(update.getUserId(), update.getProjectId());
            if (userAccess.getProjectRole() != ProjectRole.VIEWER && userAccess.getProjectRole() != ProjectRole.DEVELOPER) {
                log.info("User {\"id\":" + user.getId() + "} can edit only viewer and developer and selected user have other role already");
                throw new AuthorizationServiceException("Insufficient access to edit access");
            }
        }

        Access access = list.isEmpty() ? new Access(user, project, update.getProjectRole()) : editAccess(list.get(0), update);
        return accessRepository.save(access);
    }

    public void deleteAccess(Long accessId) {
        Access access = accessRepository.getById(accessId);
        validateDeleteAccess(access.getProject().getId());
        User user = AuthorizationUtil.getLoggedUser();
        if (!user.isAdmin() && access.getProjectRole() != ProjectRole.VIEWER && access.getProjectRole() != ProjectRole.DEVELOPER) {
            log.info("User {\"id\":" + user.getId() + "} can edit only viewer and developer and selected user have other role already");
            throw new AuthorizationServiceException("Insufficient access to edit access");
        }
        accessRepository.deleteById(accessId);
    }

    public void deleteAccess(Long userId, Long projectId) {
        Access access = accessRepository.findByUserIdAndProjectId(userId, projectId).get(0);
        validateDeleteAccess(access.getProject().getId());
        User user = AuthorizationUtil.getLoggedUser();
        if (!user.isAdmin() && access.getProjectRole() != ProjectRole.VIEWER && access.getProjectRole() != ProjectRole.DEVELOPER) {
            log.info("User {\"id\":" + user.getId() + "} can edit only viewer and developer and selected user have other role already");
            throw new AuthorizationServiceException("Insufficient access to edit access");
        }
        accessRepository.deleteByUserIdAndProjectId(userId, projectId);
    }

    public void validateEditAccess(Long projectId, ProjectRole role) {
        User user = AuthorizationUtil.getLoggedUser();
        if (user.isAdmin()) return;

        Access access = getAccess(user.getId(), projectId);
        if (access == null) {
            log.info("User {\"id\":" + user.getId() + "} cannot access the project {\"id\":" + projectId + "}");
            throw new AuthorizationServiceException("No access to this project");
        }
        if (!roleConfig.canAccess(access.getProjectRole(), RoleConfig.Option.EDIT)) {
            log.info("User {\"id\":" + user.getId() + "} doesn't have sufficient access to edit access in project {\"id\":" + projectId + "}");
            throw new AuthorizationServiceException("Insufficient access to edit access");
        }
        if (role != ProjectRole.VIEWER && role != ProjectRole.DEVELOPER) {
            log.info("User {\"id\":" + user.getId() + "} can edit only viewer and developer");
            throw new AuthorizationServiceException("Insufficient access to edit access");
        }
    }

    public void validateDeleteAccess(Long projectId) {
        User user = AuthorizationUtil.getLoggedUser();
        if (user.isAdmin()) return;

        Access access = getAccess(user.getId(), projectId);
        if (access == null) {
            log.info("User {\"id\":" + user.getId() + "} cannot access the project {\"id\":" + projectId + "}");
            throw new AuthorizationServiceException("No access to this project");
        }
        if (!roleConfig.canAccess(access.getProjectRole(), RoleConfig.Option.EDIT)) {
            log.info("User {\"id\":" + user.getId() + "} doesn't have sufficient access to edit access in project {\"id\":" + projectId + "}");
            throw new AuthorizationServiceException("Insufficient access to edit task");
        }
    }

    private Access editAccess(Access access, UpdateAccessDto update) {
        access.setProjectRole(update.getProjectRole());
        return access;
    }

    public Entitlements getEntitlements(Long projectId) {
        User user = AuthorizationUtil.getLoggedUser();
        if (user.isAdmin()) return new Entitlements(true);
        ProjectRole role = getAccess(user.getId(), projectId).getProjectRole();
        return new Entitlements(role, roleConfig);
    }
}
