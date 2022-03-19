package uni.lodz.pl.projectmanager.access;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.webjars.NotFoundException;
import uni.lodz.pl.projectmanager.access.model.Access;
import uni.lodz.pl.projectmanager.access.model.UpdateAccessDto;
import uni.lodz.pl.projectmanager.project.ProjectRepository;
import uni.lodz.pl.projectmanager.project.model.Project;
import uni.lodz.pl.projectmanager.user.UserRepository;
import uni.lodz.pl.projectmanager.user.model.User;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AccessService {
    private final AccessRepository accessRepository;
    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;

    public List<Access> getAccesses(Long userId, Long projectId) {
        return accessRepository.findByUserIdAndProjectId(userId, projectId);
    }

    public Access updateOrAddAccess(UpdateAccessDto update) {
        User user = userRepository.findById(update.getUserId())
                .orElseThrow(() -> new NotFoundException("User {\"id\":\"" + update.getUserId() + "\"} not found"));
        Project project = projectRepository.findById(update.getProjectId())
                .orElseThrow(() -> new NotFoundException("User {\"id\":\"" + update.getProjectId() + "\"} not found"));

        List<Access> list = getAccesses(update.getUserId(), update.getProjectId());
        Access access = list.isEmpty() ? new Access(user, project, update.getProjectRole()) : list.get(0);
        return accessRepository.save(access);
    }

    public void deleteAccess(Long accessId) {
        accessRepository.deleteById(accessId);
    }

    public void deleteAccess(Long userId, Long projectId) {
        accessRepository.deleteByUserIdAndProjectId(userId, projectId);
    }
}
