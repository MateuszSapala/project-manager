import {RetroNoteType} from "./RetroNoteType";

export class AddRetroNote {
  note: string;
  noteType: RetroNoteType;
  sprintId: number;

  constructor(note: string, noteType: RetroNoteType, sprintId: number) {
    this.note = note;
    this.noteType = noteType;
    this.sprintId = sprintId;
    return;
  }
}