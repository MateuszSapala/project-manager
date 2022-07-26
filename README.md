# Project manager

## About

Project manager is an application designed to manage work in the software development process in the agile methodology
of Scrum. The software allows you to create projects that allow you to create and edit tasks, the progress of which can
be tracked on the scram board. For each project, it is also possible to create and manage user accesses and sprints, the
summary of which is facilitated by the retro tab, which allows you to gather support about the sprint that will help in
conducting a retrospective.

## Content

- ### Projects
  A drop-down tab with a list of projects available to the user and, in the case of an administrator, with a tab for
  creating a new project
- ### Users
  User management tab
- ### Dashboard
  The tab is available after selecting a project from the project list. It contains all the necessary information and
  operations for the selected project
    1. Backlog - list of tasks with the possibility of creating and modifying them
    2. Board - a board presenting the state of work in the current sprint
    3. Sprints - list of sprints with the eligibility of their modification
    4. Accesses - a list of users with access to the selected project, which can be changed
    5. Retro - notes, comments, questions about the sprint, which can be added by project members, which are to later
       facilitate the retrospective

## Technologies used

The application was created as a web application consisting of a backend service written in Java using the Spring
framework that communicates with the MySQL database. The frontend service written in TypeScript with the use of the
React library is responsible for the user interface. Nginx acts as a reverse-proxy that serves static frontend content
and forwards queries to the backend. The application has been dockerized, making its further development and
implementation easier and faster.

## Run

Run project-manager/run.sh file to run database, backend and nginex with built-in frontend. And
open [localhost:443](http://localhost:443) (login: admin, password: pass).

Prerequisites:

- Installed: Java, Maven, Docker, Npm
- Configured environment variables: JAVA_HOME and MAVEN_HOME

## Run development

- database: run project-manager/run-db.sh file ([phpMyAdmin](http://localhost:8000), username: root, password: password)
  or run MySQL locally and execute sql commands from files in project-manager/sql directory
- backend: start project-manager application by running
  ProjectManagerApplication.java. [Swagger UI](http://localhost:8080/swagger-ui/index.html?configUrl=/v3/api-docs)
- frontend: start project-manager-ui application by running project-manager-ui/run-ui.sh
  file. [UI](http://localhost:3000)