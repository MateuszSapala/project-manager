package uni.lodz.pl.projectmanager.project;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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

    public Optional<Project> getProjectById(final Long id) {
        return projectRepository.findById(id);
    }

    public Project createNewProject(final String name) {
        Project project = new Project(name);
        return projectRepository.save(project);
    }

    public void deleteProjectById(Long id) {
        projectRepository.deleteById(id);
    }
}
