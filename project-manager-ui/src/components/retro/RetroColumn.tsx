import "../../App.css";
import React from "react";
import {RetroNote} from "../../model/retro/RetroNote";
import {capitalizedNoteType, RetroNoteType, retroNoteTypeColor} from "../../model/retro/RetroNoteType";

interface Props {
  retroNotes: RetroNote[],
  noteType: RetroNoteType
}

function Retro({retroNotes, noteType}: Props) {
  const displayNote = (note: RetroNote) => {
    return (
      <div className={`card card-sprint bg-${retroNoteTypeColor(noteType)}`} key={note.id}>
        <div className="card-body">
          <h5 className="card-title">{note.note}</h5>
        </div>
      </div>
    )
  }

  return (
    <div className="m-2">
      <p className="h4 text-center">{capitalizedNoteType(noteType)}</p>
      {retroNotes.map(note => displayNote(note))}
    </div>
  );
}

export default Retro;
