package uni.lodz.pl.projectmanager.retro;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.AuthorizationServiceException;
import org.springframework.stereotype.Service;
import org.webjars.NotFoundException;
import uni.lodz.pl.projectmanager.access.AccessService;
import uni.lodz.pl.projectmanager.access.model.Access;
import uni.lodz.pl.projectmanager.config.RoleConfig;
import uni.lodz.pl.projectmanager.retro.model.AddRetroNoteDto;
import uni.lodz.pl.projectmanager.retro.model.RetroNote;
import uni.lodz.pl.projectmanager.sprint.SprintRepository;
import uni.lodz.pl.projectmanager.sprint.model.Sprint;
import uni.lodz.pl.projectmanager.user.model.User;
import uni.lodz.pl.projectmanager.util.AuthorizationUtil;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class RetroNoteService {
    private final RetroNoteRepository retroNoteRepository;
    private final SprintRepository sprintRepository;
    private final AccessService accessService;
    private final RoleConfig roleConfig;

    public RetroNote createRetroNote(AddRetroNoteDto retroNoteDto) {
        Sprint sprint = sprintRepository.findById(retroNoteDto.sprintId())
                .orElseThrow(() -> new NotFoundException("Sprint {\"id\":\"" + retroNoteDto.sprintId() + "\"} not found"));
        validateRetroNoteAccess(sprint.getProject().getId(), RoleConfig.Option.EDIT);
        return retroNoteRepository.save(new RetroNote(retroNoteDto, sprint));
    }

    public List<RetroNote> getRetroNotesBySprint(Long sprintId) {
        Optional<Sprint> sprint = sprintRepository.findById(sprintId);
        if (sprint.isEmpty()) {
            log.info("Sprint {\"id\":\"" + sprintId + "\"} not found");
            throw new NotFoundException("Sprint {\"id\":\"" + sprintId + "\"} not found");
        }
        validateRetroNoteAccess(sprint.get().getProject().getId(), RoleConfig.Option.VIEW);
        return retroNoteRepository.findBySprintId(sprintId);
    }

    private void validateRetroNoteAccess(Long projectId, RoleConfig.Option option) {
        User user = AuthorizationUtil.getLoggedUser();
        if (user.isAdmin()) return;
        Access access = accessService.getAccess(user.getId(), projectId);
        if (access == null) {
            log.info("User {\"id\":" + user.getId() + "} cannot access the project {\"id\":" + projectId + "}");
            throw new AuthorizationServiceException("No access to this project");
        }
        if (!roleConfig.canRetroNote(access.getProjectRole(), option)) {
            log.info("User {\"id\":" + user.getId() + "} doesn't have sufficient access to " + option.name().toLowerCase() + " retro note in project {\"id\":" + projectId + "}");
            throw new AuthorizationServiceException("Insufficient access to " + option.name().toLowerCase() + " retro note");
        }
    }
}
