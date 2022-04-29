import React from 'react';
import NoteContext from './noteContext';

const NoteState = (props) => {
  const [notes, setNotes] = React.useState([]);
  const host = 'http://localhost:5000/api/';
  // Get Notes From API 
  const getNotes = async () => {
    const response = await fetch(`${host}notes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIwZmE3ODBjNTNhZDA0YTBlMWNlNWZiIn0sImlhdCI6MTY0NTI3NDAyNX0.1dqe7jZkD0_C9Y_JP-qxgYS4XgSy7C8iXBS_HAThP94'
      }
    });
    const note_new = await response.json();
    console.log(note_new);
    // set the notes state 
    setNotes(note_new);
  }
  // POST Note From API 
  const addNote = async (new_note) => {
    const response = await fetch(`${host}addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIwZmE3ODBjNTNhZDA0YTBlMWNlNWZiIn0sImlhdCI6MTY0NTI3NDAyNX0.1dqe7jZkD0_C9Y_JP-qxgYS4XgSy7C8iXBS_HAThP94'
      },
      body: JSON.stringify(new_note)
    });
    response.json();
    getNotes();
  }
  // Delete Note From API 
  const deleteNote = async (id) => {
    const response = await fetch(`${host}deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIwZmE3ODBjNTNhZDA0YTBlMWNlNWZiIn0sImlhdCI6MTY0NTI3NDAyNX0.1dqe7jZkD0_C9Y_JP-qxgYS4XgSy7C8iXBS_HAThP94'
      }
    });
    const note_delete = await response.json();
    console.log(note_delete);
    // set the notes state 
    // setNotes(note_delete);
    getNotes();
  }
  // update Note From API 
  const updateNote = async (id,update_note) => {
    const response = await fetch(`${host}updatenote/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIwZmE3ODBjNTNhZDA0YTBlMWNlNWZiIn0sImlhdCI6MTY0NTI3NDAyNX0.1dqe7jZkD0_C9Y_JP-qxgYS4XgSy7C8iXBS_HAThP94'
      },
      body: JSON.stringify(update_note)
    });
     response.json();
    // console.log(note_delete);
    // set the notes state 
    // setNotes(note_delete);
    getNotes();
  }
  

  return (
    <NoteContext.Provider value={{ notes, getNotes, addNote,deleteNote,updateNote,setNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}
export default NoteState;