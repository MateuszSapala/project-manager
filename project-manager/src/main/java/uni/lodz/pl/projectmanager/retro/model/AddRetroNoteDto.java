package uni.lodz.pl.projectmanager.retro.model;

public record AddRetroNoteDto(String note, RetroNoteType noteType, Long sprintId) {
}
