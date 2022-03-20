package uni.lodz.pl.projectmanager.sprint;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.AuthorizationServiceException;
import org.springframework.stereotype.Service;
import org.webjars.NotFoundException;
import uni.lodz.pl.projectmanager.access.AccessService;
import uni.lodz.pl.projectmanager.access.model.Access;
import uni.lodz.pl.projectmanager.config.RoleConfig;
import uni.lodz.pl.projectmanager.project.ProjectService;
import uni.lodz.pl.projectmanager.project.model.Project;
import uni.lodz.pl.projectmanager.sprint.model.AddSprintDto;
import uni.lodz.pl.projectmanager.sprint.model.Sprint;
import uni.lodz.pl.projectmanager.user.model.User;
import uni.lodz.pl.projectmanager.util.AuthorizationUtil;

@Slf4j
@Service
@RequiredArgsConstructor
public class SprintService {
    private final SprintRepository sprintRepository;
    private final ProjectService projectService;
    private final AccessService accessService;
    private final RoleConfig roleConfig;

    public Sprint createNewSprint(final AddSprintDto addSprintDto) {
        Project project = projectService.getProjectById(addSprintDto.getProjectId())
                .orElseThrow(() -> new NotFoundException("Project {\"name\":\"" + addSprintDto.getProjectId() + "\"} not found"));
        validateSprintAccess(project.getId(), RoleConfig.Option.EDIT);
        Sprint sprint = new Sprint(addSprintDto.getName(), addSprintDto.getStart(), addSprintDto.getEnd(), project);
        return sprintRepository.save(sprint);
    }

    public Sprint getSprintById(final Long id) {
        Sprint sprint = sprintRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Sprint {\"id\":\"" + id + "\"} not found"));
        validateSprintAccess(sprint.getProject().getId(), RoleConfig.Option.VIEW);
        return sprint;
    }

    public void deleteSprint(final Long id) {
        Sprint sprint = sprintRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Sprint {\"id\":\"" + id + "\"} not found"));
        validateSprintAccess(sprint.getProject().getId(), RoleConfig.Option.EDIT);
        sprintRepository.deleteById(id);
    }

    public void validateSprintAccess(Long projectId, RoleConfig.Option option) {
        User user = AuthorizationUtil.getLoggedUser();
        if (user.isAdmin()) return;
        Access access = accessService.getAccess(user.getId(), projectId);
        if (access == null) {
            log.info("User {\"id\":" + user.getId() + "} cannot access the project {\"id\":" + projectId + "}");
            throw new AuthorizationServiceException("No access to this project");
        }
        if (!roleConfig.canSprint(access.getProjectRole(), option)) {
            log.info("User {\"id\":" + user.getId() + "} doesn't have sufficient access to " + option.name().toLowerCase() + " sprints in project {\"id\":" + projectId + "}");
            throw new AuthorizationServiceException("Insufficient access to view sprints");
        }
    }
}
