export enum RetroNoteType {
  GOOD = "GOOD",
  IMPROVE = "IMPROVE",
  IDEAS = "IDEAS",
  QUESTIONS = "QUESTIONS"
}

export const RetroNoteTypeTable = [
  RetroNoteType.GOOD,
  RetroNoteType.IMPROVE,
  RetroNoteType.IDEAS,
  RetroNoteType.QUESTIONS
];

export const retroNoteTypeColor = (type: RetroNoteType) => {
  switch (type) {
    case RetroNoteType.GOOD:
      return "success";
    case RetroNoteType.IMPROVE:
      return "danger";
    case RetroNoteType.IDEAS:
      return "secondary";
    case RetroNoteType.QUESTIONS:
      return "warning";
  }
}

export const capitalizedNoteType = (note: RetroNoteType) => {
  return note.slice(0, 1) + note.toLowerCase().slice(1)
}