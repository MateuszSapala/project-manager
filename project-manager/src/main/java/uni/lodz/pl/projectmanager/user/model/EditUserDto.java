package uni.lodz.pl.projectmanager.user.model;

import java.util.List;

public record EditUserDto(String username, String password, String email, String name, String surname, Boolean admin,
                          List<String> editedFields) {
}
