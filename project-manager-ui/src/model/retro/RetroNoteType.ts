import {
  translateDone,
  translateGood,
  translateIdeas,
  translateImprove,
  translateQuestions
} from "../../service/LanguageService";

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
  switch (note) {
    case RetroNoteType.GOOD:
      return translateGood();
    case RetroNoteType.IMPROVE:
      return translateImprove();
    case RetroNoteType.IDEAS:
      return translateIdeas();
    case RetroNoteType.QUESTIONS:
      return translateQuestions();
  }
}