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
  return state.slice(0, 1) + state.toLowerCase().replaceAll("_", " ").slice(1)
}