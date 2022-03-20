package uni.lodz.pl.projectmanager.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import uni.lodz.pl.projectmanager.access.model.ProjectRole;

@Configuration
@PropertySource("classpath:role.properties")
public class RoleConfig {
    public enum Option {VIEW, EDIT}

    public boolean canSprint(ProjectRole role, Option option) {
        return switch (option) {
            case VIEW -> canViewSprint(role);
            case EDIT -> canEditSprint(role);
        };
    }

    public boolean canTask(ProjectRole role, Option option) {
        return switch (option) {
            case VIEW -> canViewTask(role);
            case EDIT -> canEditTask(role);
        };
    }

    public boolean canAccess(ProjectRole role, Option option) {
        return switch (option) {
            case VIEW -> canViewAccess(role);
            case EDIT -> canEditAccess(role);
        };
    }

    //<editor-fold desc="Sprint">
    @Value("${sprint.viewing.product-owner}")
    boolean sprintViewing_ProductOwner;
    @Value("${sprint.viewing.scrum-master}")
    boolean sprintViewing_ScrumMaster;
    @Value("${sprint.viewing.developer}")
    boolean sprintViewing_Developer;
    @Value("${sprint.viewing.viewer}")
    boolean sprintViewing_Viewer;

    private boolean canViewSprint(ProjectRole role) {
        return switch (role) {
            case PRODUCT_OWNER -> sprintViewing_ProductOwner;
            case SCRUM_MASTER -> sprintViewing_ScrumMaster;
            case DEVELOPER -> sprintViewing_Developer;
            case VIEWER -> sprintViewing_Viewer;
        };
    }

    @Value("${sprint.editing.product-owner}")
    boolean sprintEditing_ProductOwner;
    @Value("${sprint.editing.scrum-master}")
    boolean sprintEditing_ScrumMaster;
    @Value("${sprint.editing.developer}")
    boolean sprintEditing_Developer;
    @Value("${sprint.editing.viewer}")
    boolean sprintEditing_Viewer;

    private boolean canEditSprint(ProjectRole role) {
        return switch (role) {
            case PRODUCT_OWNER -> sprintEditing_ProductOwner;
            case SCRUM_MASTER -> sprintEditing_ScrumMaster;
            case DEVELOPER -> sprintEditing_Developer;
            case VIEWER -> sprintEditing_Viewer;
        };
    }
    //</editor-fold>

    //<editor-fold desc="Task">
    @Value("${task.viewing.product-owner}")
    boolean taskViewing_ProductOwner;
    @Value("${task.viewing.scrum-master}")
    boolean taskViewing_ScrumMaster;
    @Value("${task.viewing.developer}")
    boolean taskViewing_Developer;
    @Value("${task.viewing.viewer}")
    boolean taskViewing_Viewer;

    private boolean canViewTask(ProjectRole role) {
        return switch (role) {
            case PRODUCT_OWNER -> taskViewing_ProductOwner;
            case SCRUM_MASTER -> taskViewing_ScrumMaster;
            case DEVELOPER -> taskViewing_Developer;
            case VIEWER -> taskViewing_Viewer;
        };
    }

    @Value("${task.editing.product-owner}")
    boolean taskEditing_ProductOwner;
    @Value("${task.editing.scrum-master}")
    boolean taskEditing_ScrumMaster;
    @Value("${task.editing.developer}")
    boolean taskEditing_Developer;
    @Value("${task.editing.viewer}")
    boolean taskEditing_Viewer;

    private boolean canEditTask(ProjectRole role) {
        return switch (role) {
            case PRODUCT_OWNER -> taskEditing_ProductOwner;
            case SCRUM_MASTER -> taskEditing_ScrumMaster;
            case DEVELOPER -> taskEditing_Developer;
            case VIEWER -> taskEditing_Viewer;
        };
    }
    //</editor-fold>

    //<editor-fold desc="Access">
    @Value("${access.viewing.product-owner}")
    boolean accessViewing_ProductOwner;
    @Value("${access.viewing.scrum-master}")
    boolean accessViewing_ScrumMaster;
    @Value("${access.viewing.developer}")
    boolean accessViewing_Developer;
    @Value("${access.viewing.viewer}")
    boolean accessViewing_Viewer;

    private boolean canViewAccess(ProjectRole role) {
        return switch (role) {
            case PRODUCT_OWNER -> accessViewing_ProductOwner;
            case SCRUM_MASTER -> accessViewing_ScrumMaster;
            case DEVELOPER -> accessViewing_Developer;
            case VIEWER -> accessViewing_Viewer;
        };
    }

    @Value("${access.editing-developer-or-viewer.product-owner}")
    boolean accessEditingDeveloperOrViewer_ProductOwner;
    @Value("${access.editing-developer-or-viewer.scrum-master}")
    boolean accessEditingDeveloperOrViewer_ScrumMaster;
    @Value("${access.editing-developer-or-viewer.developer}")
    boolean accessEditingDeveloperOrViewer_Developer;
    @Value("${access.editing-developer-or-viewer.viewer}")
    boolean accessEditingDeveloperOrViewer_Viewer;

    private boolean canEditAccess(ProjectRole role) {
        return switch (role) {
            case PRODUCT_OWNER -> accessEditingDeveloperOrViewer_ProductOwner;
            case SCRUM_MASTER -> accessEditingDeveloperOrViewer_ScrumMaster;
            case DEVELOPER -> accessEditingDeveloperOrViewer_Developer;
            case VIEWER -> accessEditingDeveloperOrViewer_Viewer;
        };
    }
    //</editor-fold>
}
