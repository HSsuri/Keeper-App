import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function getDataFromLS(){
  const lsData= localStorage.getItem('Keeper');
  if(lsData) return JSON.parse(lsData);
  else return [];
}

function App() {
  const [notes, setNotes] = useState(getDataFromLS());

  function addNote(newNote) {
    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    });
  }

  function deleteNote(id) {
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  useEffect(()=>{
    localStorage.setItem('Keeper',JSON.stringify(notes));
    console.log(JSON.parse(localStorage.getItem('Keeper')));
  },[notes]);

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
