import {useParams} from "react-router-dom";
import "../../App.css";
import {Project} from "../../model/project/Project";
import {User} from "../../model/user/User";
import Sidebar from "../Sidebar";
import React, {useEffect, useState} from "react";
import {
  stateGetActiveSprintByProject,
  stateGetEntitlements,
  stateGetProject,
  stateGetRetroNotesBySprintId,
  stateGetSprintsByProject
} from "../../service/UseStateService";
import {displayMessages, loader} from "../Util";
import {Sprint} from "../../model/sprint/Sprint";
import {Entitlements} from "../../model/access/Entitlements";
import {
  capitalizedNoteType,
  RetroNoteType,
  retroNoteTypeColor,
  RetroNoteTypeTable
} from "../../model/retro/RetroNoteType";
import RetroColumn from "./RetroColumn";
import {RetroNote} from "../../model/retro/RetroNote";
import {AxiosResponse} from "axios";
import {addRetroNote} from "../../service/RetroService";
import {AddRetroNote} from "../../model/retro/AddRetroNote";
import {
  translateEnterRetroNote,
  translateNoSprintAvailable,
  translateNoteCantBeEmpty,
  translateRetro,
  translateSprint,
  translateUnableToAddNote
} from "../../service/LanguageService";

interface Props {
  loggedUser: User | null;
  projects: Array<Project> | null;
}

function Retro({loggedUser, projects}: Props) {
  let {projectName} = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [sprints, setSprints] = useState<Array<Sprint> | null>(null);
  const [activeSprint, setActiveSprint] = useState<Sprint | null>(null);
  const [entitlements, setEntitlements] = useState<Entitlements | undefined>(undefined);
  const [retroNotes, setRetroNotes] = useState<RetroNote[] | null>(null);

  const [selectedSprintId, setSelectedSprintId] = useState<number | null>(null);
  const [previousSelectedSprintId, setPreviousSelectedSprintId] = useState<number | null>(null);
  const [note, setNote] = useState<string>("");

  useEffect(() => {
    stateGetProject(projectName, project, setProject);
  }, [projectName, project]);
  useEffect(() => {
    stateGetActiveSprintByProject(project?.id, activeSprint, setActiveSprint);
  }, [project?.id, activeSprint]);
  useEffect(() => {
    stateGetSprintsByProject(project?.id, sprints, setSprints);
  }, [project?.id, sprints]);
  useEffect(() => {
    if (entitlements !== undefined && !entitlements.taskViewing) {
      window.location.replace(window.location.origin + "/projects/" + projectName);
    }
    stateGetEntitlements(project?.id, entitlements, setEntitlements);
  }, [project?.id, entitlements, projectName]);
  useEffect(() => {
    if (!activeSprint) return;
    if (!activeSprint.id && sprints && sprints.length > 0) {
      setSelectedSprintId(sprints[sprints.length - 1].id);
      return;
    }
    setSelectedSprintId(activeSprint.id);
  }, [activeSprint, sprints]);
  useEffect(() => {
    if (selectedSprintId !== null && selectedSprintId !== undefined && previousSelectedSprintId !== selectedSprintId) {
      setPreviousSelectedSprintId(selectedSprintId);
      stateGetRetroNotesBySprintId(selectedSprintId, setRetroNotes);
    }
  }, [previousSelectedSprintId, retroNotes, selectedSprintId]);

  const isLoading = () => entitlements === undefined || project === null || projectName === null || sprints === null || activeSprint === null || selectedSprintId === null;

  const displaySprintSelect = () => {
    const value = selectedSprintId ? selectedSprintId : "";
    return (
      <label htmlFor="taskUser">
        {translateSprint()}:
        <select
          className="form-control text-primary"
          id="taskUser" value={value}
          onChange={event => sprints ? setSelectedSprintId(Number(event.target.value)) : {}}>
          {((sprints && sprints.length === 0) || value === "") &&
              <option value="">{translateNoSprintAvailable()}</option>}
          {sprints ? sprints.map(s => {
            return (<option className="text-primary" value={s.id} key={s.id}>{s.name}</option>)
          }) : ""}
        </select>
      </label>
    )
  }

  const displayAddRetroNote = () => {
    return (
      <div className="input-group mb-3">
        <input type="text" className="form-control text-primary mt-1" placeholder={translateEnterRetroNote()}
               id="retroNote"
               value={note} onChange={(event => setNote(event.target.value))}/>
        <div className="input-group-prepend">
          {RetroNoteTypeTable.map(type =>
            <button onClick={() => addNote(type)} key={type}
                    className={`btn btn-${retroNoteTypeColor(type)} btn-block btn-retro d-inline m-1`}>
              {capitalizedNoteType(type)}
            </button>)}
        </div>
      </div>
    )
  }

  const addNote = (type: RetroNoteType) => {
    if (!selectedSprintId) return;
    if (!note) {
      alert(translateNoteCantBeEmpty());
      return;
    }
    addRetroNote(new AddRetroNote(note, type, selectedSprintId)).then(response => {
      if ((response as AxiosResponse).status !== 201) {
        alert(translateUnableToAddNote());
        return;
      }
      setNote("")
      if (!retroNotes) return;
      setRetroNotes([...retroNotes, response.data]);
      return;
    });
  }

  return (
    <div id="page-top">
      <div id="wrapper">
        <Sidebar projects={projects} selectedProject={projectName} loggedUser={loggedUser}
                 entitlements={entitlements}/>
        <div className="main-content">
          <div className="m-2">
            <h1>{translateRetro()} {projectName}</h1>
            {isLoading() && !retroNotes && loader()}
            {!isLoading() && !retroNotes && sprints && sprints?.length === 0 && displayMessages("No sprint available")}
            {!isLoading() && retroNotes &&
                <>
                  {displaySprintSelect()}
                  {selectedSprintId === activeSprint?.id && entitlements?.retroNoteEditing && displayAddRetroNote()}
                    <div className="container-fluid">
                        <div className="row">
                          {RetroNoteTypeTable.map(type => {
                            return <div className="col-3 col-retro" key={type}>
                              <div className="m-1 bg-gradient-light h-100">
                                <RetroColumn retroNotes={retroNotes ? retroNotes.filter(n => n.noteType === type) : []}
                                             noteType={type}/>
                              </div>
                            </div>
                          })}
                        </div>
                    </div>
                </>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Retro;
