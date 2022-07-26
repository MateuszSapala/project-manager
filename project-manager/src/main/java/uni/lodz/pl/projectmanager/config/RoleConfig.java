package uni.lodz.pl.projectmanager.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import uni.lodz.pl.projectmanager.access.model.ProjectRole;

import java.util.List;

@Configuration
@PropertySource("classpath:role.properties")
public class RoleConfig {
    public enum Option {VIEW, EDIT}

    @Value("${sprint.viewing}")
    private List<String> sprintViewing;

    @Value("${sprint.editing}")
    private List<String> sprintEditing;

    public boolean canSprint(ProjectRole role, Option option) {
        return switch (option) {
            case VIEW -> sprintViewing.contains(role.string());
            case EDIT -> sprintEditing.contains(role.string());
        };
    }

    @Value("${task.viewing}")
    private List<String> taskViewing;

    @Value("${task.editing}")
    private List<String> taskEditing;

    public boolean canTask(ProjectRole role, Option option) {
        return switch (option) {
            case VIEW -> taskViewing.contains(role.string());
            case EDIT -> taskEditing.contains(role.string());
        };
    }

    @Value("${access.viewing}")
    private List<String> accessViewing;

    @Value("${access.editing-developer-or-viewer}")
    private List<String> accessEditingDeveloperOrViewer;

    public boolean canAccess(ProjectRole role, Option option) {
        return switch (option) {
            case VIEW -> accessViewing.contains(role.string());
            case EDIT -> accessEditingDeveloperOrViewer.contains(role.string());
        };
    }

    @Value("${project.viewing}")
    private List<String> projectViewing;

    public boolean canViewProject(ProjectRole role) {
        return projectViewing.contains(role.string());
    }

    @Value("${retro-note.viewing}")
    private List<String> retroNoteViewing;

    @Value("${retro-note.editing}")
    private List<String> retroNoteEditing;

    public boolean canRetroNote(ProjectRole role, Option option) {
        return switch (option) {
            case VIEW -> retroNoteViewing.contains(role.string());
            case EDIT -> retroNoteEditing.contains(role.string());
        };
    }
}
