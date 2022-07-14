package uni.lodz.pl.projectmanager.user.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long id;
    @Column(nullable = false, unique = true, length = 30)
    private String username;
    @Column(nullable = false)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;
    @Column(nullable = false, length = 30)
    private String email;
    @Column(nullable = false, length = 30)
    private String name;
    @Column(nullable = false, length = 30)
    private String surname;
    @Column(nullable = false)
    private boolean admin;

    public User(String username, String password, String email, String name, String surname, Boolean admin) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.name = name;
        this.surname = surname;
        if (admin != null) this.admin = admin;
    }

    public User(AddUserDto user) {
        this(user.getUsername(), user.getPassword(), user.getEmail(), user.getName(), user.getSurname(), user.getAdmin());
    }

    public User(AddUserDto user, Long id) {
        this(user);
        this.id = id;
    }
}

