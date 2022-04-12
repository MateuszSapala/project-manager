package uni.lodz.pl.projectmanager.access.model;

import lombok.Getter;

@Getter
public class UpdateAccessDto {
    Long userId;
    Long projectId;
    ProjectRole projectRole;
}
