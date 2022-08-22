import {
  translateCurrent,
  translateFuture,
  translateNotAssigned,
  translatePrevious
} from "../../service/LanguageService";

export enum SprintCheckboxOption {
  PREVIOUS = "PREVIOUS",
  CURRENT = "CURRENT",
  FUTURE = "FUTURE",
  NOT_ASSIGNED = "NOT_ASSIGNED"
}

export const SprintCheckboxOptionTable = [
  SprintCheckboxOption.PREVIOUS,
  SprintCheckboxOption.CURRENT,
  SprintCheckboxOption.FUTURE,
  SprintCheckboxOption.NOT_ASSIGNED
];

export const capitalizedOption = (state: SprintCheckboxOption) => {
  switch (state) {
    case SprintCheckboxOption.PREVIOUS:
      return translatePrevious()
    case SprintCheckboxOption.CURRENT:
      return translateCurrent()
    case SprintCheckboxOption.FUTURE:
      return translateFuture()
    case SprintCheckboxOption.NOT_ASSIGNED:
      return translateNotAssigned()
  }
}