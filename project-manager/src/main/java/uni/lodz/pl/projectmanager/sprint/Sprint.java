package uni.lodz.pl.projectmanager.sprint;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Getter
@Entity
@NoArgsConstructor
public class Sprint {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long id;
    private String name;
    private LocalDate start;
    private LocalDate end;

    public Sprint(String name, LocalDate start, LocalDate end) {
        this.name = name;
        this.start = start;
        this.end = end;
    }
}