package uni.lodz.pl.projectmanager.access.model;

public enum ProjectRole {
    PRODUCT_OWNER, SCRUM_MASTER, DEVELOPER, VIEWER;

    public String string() {
        return switch (this) {
            case PRODUCT_OWNER -> "PRODUCT_OWNER";
            case SCRUM_MASTER -> "SCRUM_MASTER";
            case DEVELOPER -> "DEVELOPER";
            case VIEWER -> "VIEWER";
        };
    }
}
