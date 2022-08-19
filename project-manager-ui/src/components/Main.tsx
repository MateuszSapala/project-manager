import "../App.css";
import {User} from "../model/user/User";
import {Project} from "../model/project/Project";
import Sidebar from "./Sidebar";
import AppConfig from "../config/AppConfig";

interface Props {
  loggedUser: User | null;
  projects: Array<Project> | null;
}

function Main({loggedUser, projects}: Props) {
  const pl = () => {
    return (
      <>
        <h3>O projekcie</h3>
        <p>Project manager to aplikacja przeznaczona do zarządzania pracą w procesie tworzenia oprogramowania w zwinnej
          metodologii Scrum. Oprogramowanie umożliwia tworzenie projektów, które umożliwiają tworzenie i edycję zadań,
          których postęp można śledzić na tablicy scrum. Dla każdego projektu możliwe jest również tworzenie i zarządzać
          dostępami użytkowników i sprintami, których podsumowanie ułatwia zakładka retrospektywa, która pozwala zebrać
          wsparcie dotyczące sprintu, które pomoże w przeprowadzeniu retrospektywy.</p>
        <h3>Zawartość</h3>
        <ul>
          <li>
            <h4>Projekty</h4>
            <p>Rozwijana zakładka z listą projektów dostępnych dla użytkownika oraz, w przypadku administratora, z
              zakładką do tworzenia nowego projektu</p>
          </li>
          <li>
            <h4>Użytkownicy</h4>
            <p>Zakładka do zarządzania użytkownikami</p>
          </li>
          <li>
            <h4>Główny panel</h4>
            <p>Zakładka dostępna po wybraniu projektu z listy projektów. Zawiera wszystkie niezbędneinformacje i
              operacje dla wybranego projektu</p>
            <ol>
              <li>Lista zadań - lista zadań z możliwością ich tworzenia i modyfikacji</li>
              <li>Tablica – tablica prezentująca stan prac w bieżącym sprincie</li>
              <li>Sprinty – lista sprintów wraz z możliwością ich modyfikacji</li>
              <li>Dostępy - lista użytkowników z dostępem do wybranego projektu, którą można zmienić</li>
              <li>Retrospektywy - notatki, komentarze, pytania dotyczące sprintu, które mogą dodawać członkowie
                projektu, które mają później ułatwić retrospektywę
              </li>
            </ol>
          </li>
        </ul>
      </>
    )
  }

  const eng = () => {
    return (
      <>
        <h3>About</h3>
        <p>Project manager is an application designed to manage work in the software development process in the agile
          methodology of Scrum. The software allows you to create projects that allow you to create and edit tasks,
          the progress of which can be tracked on the scram board. For each project, it is also possible to create and
          manage user accesses and sprints, the summary of which is facilitated by the retro tab, which allows you to
          gather support about the sprint that will help in conducting a retrospective.</p>
        <h3>Content</h3>
        <ul>
          <li>
            <h4>Projects</h4>
            <p>A drop-down tab with a list of projects available to the user and, in the case of an administrator,
              with a tab for creating a new project</p>
          </li>
          <li>
            <h4>Users</h4>
            <p>User management tab</p>
          </li>
          <li>
            <h4>Dashboard</h4>
            <p>The tab is available after selecting a project from the project list. It contains all the necessary
              information and operations for the selected project</p>
            <ol>
              <li>Backlog - list of tasks with the possibility of creating and modifying them</li>
              <li>Board - a board presenting the state of work in the current sprint</li>
              <li>Sprints - list of sprints with the eligibility of their modification</li>
              <li>Accesses - a list of users with access to the selected project, which can be changed</li>
              <li>Retro - notes, comments, questions about the sprint, which can be added by project members, which
                are to later facilitate the retrospective
              </li>
            </ol>
          </li>
        </ul>
      </>
    )
  }


  return (
    <div id="page-top">
      <div id="wrapper">
        <Sidebar projects={projects} loggedUser={loggedUser}/>
        <div className="d-flex flex-column main-content">
          <h1>Project manager</h1>
          {AppConfig.LANGUAGE === "PL" ? pl() : eng()}
        </div>
      </div>
    </div>
  );
}

export default Main;
