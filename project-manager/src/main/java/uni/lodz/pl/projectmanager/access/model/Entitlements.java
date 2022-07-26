package uni.lodz.pl.projectmanager.access.model;

import uni.lodz.pl.projectmanager.config.RoleConfig;

public record Entitlements(boolean admin, boolean sprintViewing, boolean sprintEditing, boolean taskViewing,
                           boolean taskEditing, boolean accessViewing, boolean accessEditingDeveloperOrViewer,
                           boolean projectViewing, boolean retroNoteViewing,
                           boolean retroNoteEditing) {
    public Entitlements(boolean all) {
        this(all, all, all, all, all, all, all, all, all, all);
    }

    public Entitlements(ProjectRole role, RoleConfig config) {
        this(false,
                config.canSprint(role, RoleConfig.Option.VIEW), config.canSprint(role, RoleConfig.Option.EDIT),
                config.canTask(role, RoleConfig.Option.VIEW), config.canTask(role, RoleConfig.Option.EDIT),
                config.canAccess(role, RoleConfig.Option.VIEW), config.canAccess(role, RoleConfig.Option.EDIT),
                config.canViewProject(role), config.canRetroNote(role, RoleConfig.Option.VIEW), config.canRetroNote(role, RoleConfig.Option.EDIT));
    }
}
