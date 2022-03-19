package uni.lodz.pl.projectmanager.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import uni.lodz.pl.projectmanager.authorization.model.ProjectRole;

@Configuration
@PropertySource("classpath:role.properties")
public class RoleConfig {

    @Value("${sprint.viewing.product-owner}")
    boolean sprintViewing_ProductOwner;
    @Value("${sprint.viewing.scrum-master}")
    boolean sprintViewing_ScrumMaster;
    @Value("${sprint.viewing.developer}")
    boolean sprintViewing_Developer;
    @Value("${sprint.viewing.viewer}")
    boolean sprintViewing_Viewer;

    public boolean canViewSprint(ProjectRole role) {
        return switch (role) {
            case PRODUCT_OWNER -> sprintViewing_ProductOwner;
            case SCRUM_MASTER -> sprintViewing_ScrumMaster;
            case DEVELOPER -> sprintViewing_Developer;
            case VIEWER -> sprintViewing_Viewer;
        };
    }

    @Value("${sprint.creating.product-owner}")
    boolean sprintCreating_ProductOwner;
    @Value("${sprint.creating.scrum-master}")
    boolean sprintCreating_ScrumMaster;
    @Value("${sprint.creating.developer}")
    boolean sprintCreating_Developer;
    @Value("${sprint.creating.viewer}")
    boolean sprintCreating_Viewer;

    public boolean canCreateSprint(ProjectRole role) {
        return switch (role) {
            case PRODUCT_OWNER -> sprintCreating_ProductOwner;
            case SCRUM_MASTER -> sprintCreating_ScrumMaster;
            case DEVELOPER -> sprintCreating_Developer;
            case VIEWER -> sprintCreating_Viewer;
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

    public boolean canEditSprint(ProjectRole role) {
        return switch (role) {
            case PRODUCT_OWNER -> sprintEditing_ProductOwner;
            case SCRUM_MASTER -> sprintCreating_ScrumMaster;
            case DEVELOPER -> sprintEditing_Developer;
            case VIEWER -> sprintEditing_Viewer;
        };
    }

    @Value("${task.viewing.product-owner}")
    boolean taskViewing_ProductOwner;
    @Value("${task.viewing.scrum-master}")
    boolean taskViewing_ScrumMaster;
    @Value("${task.viewing.developer}")
    boolean taskViewing_Developer;
    @Value("${task.viewing.viewer}")
    boolean taskViewing_Viewer;

    public boolean canViewTask(ProjectRole role) {
        return switch (role) {
            case PRODUCT_OWNER -> taskViewing_ProductOwner;
            case SCRUM_MASTER -> taskViewing_ScrumMaster;
            case DEVELOPER -> taskViewing_Developer;
            case VIEWER -> taskViewing_Viewer;
        };
    }

    @Value("${task.creating.product-owner}")
    boolean taskCreating_ProductOwner;
    @Value("${task.creating.scrum-master}")
    boolean taskCreating_ScrumMaster;
    @Value("${task.creating.developer}")
    boolean taskCreating_Developer;
    @Value("${task.creating.viewer}")
    boolean taskCreating_Viewer;

    public boolean canCreateTask(ProjectRole role) {
        return switch (role) {
            case PRODUCT_OWNER -> taskCreating_ProductOwner;
            case SCRUM_MASTER -> taskCreating_ScrumMaster;
            case DEVELOPER -> taskCreating_Developer;
            case VIEWER -> taskCreating_Viewer;
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

    public boolean canEditTask(ProjectRole role) {
        return switch (role) {
            case PRODUCT_OWNER -> taskEditing_ProductOwner;
            case SCRUM_MASTER -> taskEditing_ScrumMaster;
            case DEVELOPER -> taskEditing_Developer;
            case VIEWER -> taskEditing_Viewer;
        };
    }

    @Value("${editing-developer-or-viewer.product-owner}")
    boolean editingDeveloperOrViewer_ProductOwner;
    @Value("${editing-developer-or-viewer.scrum-master}")
    boolean editingDeveloperOrViewer_ScrumMaster;
    @Value("${editing-developer-or-viewer.developer}")
    boolean editingDeveloperOrViewer_Developer;
    @Value("${editing-developer-or-viewer.viewer}")
    boolean editingDeveloperOrViewer_Viewer;

    public boolean canEditAuthorization(ProjectRole role) {
        return switch (role) {
            case PRODUCT_OWNER -> editingDeveloperOrViewer_ProductOwner;
            case SCRUM_MASTER -> editingDeveloperOrViewer_ScrumMaster;
            case DEVELOPER -> editingDeveloperOrViewer_Developer;
            case VIEWER -> editingDeveloperOrViewer_Viewer;
        };
    }

    @Value("${creating-developer-or-viewer.product-owner}")
    boolean creatingDeveloperOrViewer_ProductOwner;
    @Value("${creating-developer-or-viewer.scrum-master}")
    boolean creatingDeveloperOrViewer_ScrumMaster;
    @Value("${creating-developer-or-viewer.developer}")
    boolean creatingDeveloperOrViewer_Developer;
    @Value("${creating-developer-or-viewer.viewer}")
    boolean creatingDeveloperOrViewer_Viewer;

    public boolean canCreateAuthorization(ProjectRole role) {
        return switch (role) {
            case PRODUCT_OWNER -> creatingDeveloperOrViewer_ProductOwner;
            case SCRUM_MASTER -> creatingDeveloperOrViewer_ScrumMaster;
            case DEVELOPER -> creatingDeveloperOrViewer_Developer;
            case VIEWER -> creatingDeveloperOrViewer_Viewer;
        };
    }
}
