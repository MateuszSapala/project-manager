package uni.lodz.pl.projectmanager.retro.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import uni.lodz.pl.projectmanager.sprint.model.Sprint;

import javax.persistence.*;

@Getter
@Entity
@NoArgsConstructor
public class RetroNote {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long id;
    @Column(nullable = false)
    private String note;
    @Column(nullable = false)
    private RetroNoteType noteType;
    @ManyToOne(optional = false)
    private Sprint sprint;

    public RetroNote(AddRetroNoteDto retroNote, Sprint sprint) {
        this.note = retroNote.note();
        this.noteType = retroNote.noteType();
        this.sprint = sprint;
    }
}
