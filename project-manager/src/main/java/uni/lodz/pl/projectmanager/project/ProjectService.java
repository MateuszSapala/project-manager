package uni.lodz.pl.projectmanager.project;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import uni.lodz.pl.projectmanager.project.model.AddProjectDto;
import uni.lodz.pl.projectmanager.project.model.Project;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProjectService {
    private final ProjectRepository projectRepository;

    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    public Optional<Project> getProjectById(final String name) {
        return projectRepository.findByName(name);
    }

    public Optional<Project> getProjectById(final Long id) {
        return projectRepository.findById(id);
    }

    public Project createNewProject(final AddProjectDto projectDto) {
        Project project = new Project(projectDto.getName());
        return projectRepository.save(project);
    }

    public void deleteProjectById(Long id) {
        projectRepository.deleteById(id);
    }
}
