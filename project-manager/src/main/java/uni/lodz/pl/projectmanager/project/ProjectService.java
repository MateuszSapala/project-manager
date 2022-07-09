package uni.lodz.pl.projectmanager.project;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.AuthorizationServiceException;
import org.springframework.stereotype.Service;
import uni.lodz.pl.projectmanager.access.AccessService;
import uni.lodz.pl.projectmanager.access.model.Access;
import uni.lodz.pl.projectmanager.config.RoleConfig;
import uni.lodz.pl.projectmanager.project.model.AddProjectDto;
import uni.lodz.pl.projectmanager.project.model.Project;
import uni.lodz.pl.projectmanager.user.model.User;
import uni.lodz.pl.projectmanager.util.AuthorizationUtil;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProjectService {
    private final ProjectRepository projectRepository;
    private final AccessService accessService;
    private final RoleConfig roleConfig;

    public List<Project> getAllProjects() {
        List<Project> list = projectRepository.findAll();
        User user = AuthorizationUtil.getLoggedUser();
        if (user.isAdmin()) return list;
        return list.stream()
                .filter(item -> {
                    Access access = accessService.getAccess(user.getId(), item.getId());
                    return access != null && roleConfig.canViewProject(access.getProjectRole());
                })
                .collect(Collectors.toList());
    }

    public Optional<Project> getProjectByName(final String name) {
        Optional<Project> project = projectRepository.findByName(name);
        project.ifPresent(value -> validateProjectAccessView(value.getId()));
        return project;
    }

    public Optional<Project> getProjectById(final Long id) {
        Optional<Project> project = projectRepository.findById(id);
        project.ifPresent(value -> validateProjectAccessView(value.getId()));
        return project;
    }

    public Project createNewProject(final AddProjectDto projectDto) {
        User user = AuthorizationUtil.getLoggedUser();
        if (!user.isAdmin()) {
            log.info("User {\"id\":" + user.getId() + "} cannot add project");
            throw new AuthorizationServiceException("No access to adding project");
        }
        Project project = new Project(projectDto);
        return projectRepository.save(project);
    }

    public void deleteProjectById(Long id) {
        User user = AuthorizationUtil.getLoggedUser();
        if (!user.isAdmin()) {
            log.info("User {\"id\":" + user.getId() + "} cannot delete project");
            throw new AuthorizationServiceException("No access to delete project");
        }
        projectRepository.deleteById(id);
    }

    public void validateProjectAccessView(Long projectId) {
        User user = AuthorizationUtil.getLoggedUser();
        if (user.isAdmin()) return;
        Access access = accessService.getAccess(user.getId(), projectId);
        if (access == null) {
            log.info("User {\"id\":" + user.getId() + "} cannot access the project {\"id\":" + projectId + "}");
            throw new AuthorizationServiceException("No access to this project");
        }
        if (!roleConfig.canViewProject(access.getProjectRole())) {
            log.info("User {\"id\":" + user.getId() + "} doesn't have sufficient access to view project {\"id\":" + projectId + "}");
            throw new AuthorizationServiceException("Insufficient access to view project");
        }
    }
}
