import AppConfig from "../config/AppConfig";

const language = AppConfig.LANGUAGE;

const translate = (eng: string, pl: string) => {
  switch (language) {
    case "ENG":
      return eng;
    case "PL":
      return pl;
  }
}
export const translateEmail = () => translate("Email", "Email")
export const translateRole = () => translate("Role", "Rola")
export const translateProductOwner = () => translate("Product owner", "Właściciel produktu")
export const translateScrumMaster = () => translate("Scrum master", "Scrum master")
export const translateDeveloper = () => translate("Developer", "Deweloper")
export const translateViewer = () => translate("Viewer", "Przeglądający")
export const translateRevokeAccess = (name: string, surname: string) => translate(`Are you sure you want to revoke ${name} ${surname}'s access?`, `Czy na pewno chcesz odebrać dostęp użytkownikowi ${name} ${surname}?`)
export const translateUserHasAlreadyRole = (name: string, surname: string) => translate(`User ${name} ${surname} has already selected role`, `Użytkownik ${name} ${surname} ma już wybraną role`)
export const translateRoleNotSelected = () => translate("Role not selected", "Rola nie została wybrana")
export const translateUnableToEditUserAccess = () => translate("Unable to edit user access", "Nie udało się edytować dostępu użytkownika")
export const translateUserNotSelected = () => translate("User not selected", "Użytkownik nie został wybrany")
export const translateUnableToAddUserAccess = () => translate("Unable to add user access", "Nie udało się dodać dostępu użytkownika")
export const translateSelectUser = () => translate("Select user", "Wybierz użytkownika")
export const translateAccessesProjectName = (projectName: string) => translate(`Accesses ${projectName}`, `Dostępy ${projectName}`)
export const translateDelete = () => translate('Delete', 'Usuń')
export const translateEdit = () => translate('Edit', 'Edytuj')
export const translateSave = () => translate('Save', 'Zapisz')
export const translateCancel = () => translate('Cancel', 'Anuluj')
export const translateAdd = () => translate('Add', 'Dodaj')
export const translateUser = () => translate('User', 'Użytkownik')
export const translateName = () => translate('Name', 'Nazwa')
export const translateDescription = () => translate('Description', 'Opis')
export const translateTheFollowingDataIsMissing = (data: String[]) => translate(`The following data is missing: ${data}`, `Brakuje następujących danych: ${data}`)
export const translateUnableToAddProject = () => translate(`Unable to add project`, `Nie udało się dodać projektu`)
export const translateEnterName = () => translate(`Enter name`, `Wprowadź nazwę`)
export const translateEnterDescription = () => translate(`Enter description`, `Wprowadź opis`)
export const translateNewProject = () => translate(`New project`, `Nowy projekt`)
export const translateTodo = () => translate(`Todo`, `Do zrobienia`)
export const translateDoing = () => translate(`Doing`, `W trakcie`)
export const translateDone = () => translate(`Done`, `Zrobione`)
export const translateReviewed = () => translate(`Reviewed`, `Zweryfikowane`)
export const translatePrevious = () => translate(`Previous`, `Poprzedni`)
export const translateCurrent = () => translate(`Current`, `Obecny`)
export const translateFuture = () => translate(`Future`, `Przyszły`)
export const translateNotAssigned = () => translate(`Not assigned`, `Nieprzydzielony`)
export const translateUnassigned = () => translate(`Unassigned`, `Nieprzydzielone`)
export const translateEndDate = () => translate(`End date`, `Data zakończenia`)
export const translateEnterEndDate = () => translate(`Enter end date`, `Wprowadź datę zakończenia`)
export const translateUnableToAddTask = () => translate(`Unable to add task`, `Nie udało się dodać zadania`)
export const translateUnableToEditTask = () => translate(`Unable to edit task`, `Nie udało się edytować zadania`)
export const translateSuccessfullyAddedTask = () => translate(`Successfully added task`, `Pomyślnie dodano zadanie`)
export const translateAssignedUser = () => translate(`Assigned user`, `Przydzielony użytkownik`)
export const translateSprint = () => translate(`Sprint`, `Sprint`)
export const translateBacklog = (projectName:string) => translate(`Backlog ${projectName}`, `Lista zadań ${projectName}`)
export const translateState = () => translate(`State`, `Status`)
export const translateEnterAssignedUser = () => translate(`Enter assigned user`, `Wprowadż przydzielonego użytkownika`)
export const translateEnterSprint = () => translate(`Enter sprint`, `Wprowadż sprint`)
