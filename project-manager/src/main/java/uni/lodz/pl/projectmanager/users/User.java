package uni.lodz.pl.projectmanager.users;

import lombok.*;
//import org.hibernate.Hibernate;
//
//import javax.persistence.Column;
//import javax.persistence.Entity;
//import javax.persistence.Id;
//import java.util.Objects;

//@Entity
@Getter
@Setter
@RequiredArgsConstructor
public class User {
//    @Id
//    @Column(name = "id", nullable = false)
    private Long id;
    private String firstname;
    private String secondname;
}
