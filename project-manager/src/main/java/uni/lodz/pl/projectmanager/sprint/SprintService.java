package uni.lodz.pl.projectmanager.sprint;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class SprintService {
    private final SprintRepository sprintRepository;

    public Sprint createNewSprint(final String name) {
        Sprint sprint = new Sprint(name);
        return sprintRepository.save(sprint);
    }

    public List<Sprint> getAllSprints() {
        return sprintRepository.findAll();
    }

    public Optional<Sprint> getSprintById(final Long id) {
        return sprintRepository.findById(id);
    }

    public void deleteSprint(final Long id) {
        sprintRepository.deleteById(id);
    }
}
