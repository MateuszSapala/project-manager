package uni.lodz.pl.projectmanager.project;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.webjars.NotFoundException;
import uni.lodz.pl.projectmanager.sprint.Sprint;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProjectService {
    private final ProjectRepository projectRepository;

    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    public Optional<Project> getProjectByName(final String name) {
        return projectRepository.findByName(name);
    }

    public Project createNewProject(final String name) {
        Project project = new Project(name);
        return projectRepository.save(project);
    }

    public void deleteProjectByName(final String name) {
        projectRepository.deleteByName(name);
    }

    public void addSprintToProject(Sprint sprint, String projectName) {
        Project project = projectRepository.findByName(projectName).orElseThrow(() -> new NotFoundException("Project {\"name\":\"" + projectName + "\"} not found"));
        project.getSprintList().add(sprint);
        projectRepository.save(project);
    }
}
