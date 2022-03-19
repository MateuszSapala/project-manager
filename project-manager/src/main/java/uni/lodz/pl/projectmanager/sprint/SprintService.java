package uni.lodz.pl.projectmanager.sprint;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.webjars.NotFoundException;
import uni.lodz.pl.projectmanager.project.model.Project;
import uni.lodz.pl.projectmanager.project.ProjectService;
import uni.lodz.pl.projectmanager.sprint.model.AddSprintDto;
import uni.lodz.pl.projectmanager.sprint.model.Sprint;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class SprintService {
    private final SprintRepository sprintRepository;
    private final ProjectService projectService;

    public Sprint createNewSprint(final AddSprintDto addSprintDto) {
        Project project = projectService.getProjectById(addSprintDto.getProjectId())
                .orElseThrow(() -> new NotFoundException("Project {\"name\":\"" + addSprintDto.getProjectId() + "\"} not found"));
        Sprint sprint = new Sprint(addSprintDto.getName(), addSprintDto.getStart(), addSprintDto.getEnd(), project);
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
