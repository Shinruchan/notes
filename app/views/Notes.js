import React, { useEffect } from 'react';
import { useSelector, useAction } from 'redux-zero/react';

import { Editor } from '../components';

import styles from './Notes.css';
import { Actions } from '../store';

export const Notes = () => {
  const notes = useSelector(state => state.notes);
  const selectedNote = useSelector(state =>
    state.notes.find(note => note.selected)
  );
  const selectNote = useAction(Actions.selectNote);
  const saveNote = useAction(Actions.saveNote);
  const newNote = useAction(Actions.newNote);

  useEffect(() => {
    window.addEventListener('keydown', ({ ctrlKey, keyCode }) => {
      if (ctrlKey && [78, 84].includes(keyCode)) newNote();
    });
  }, []);

  return (
    <div className={styles.notes}>
      <div className={styles.titles}>
        {notes.map((note, i) => (
          <div
            key={i}
            className={note.selected ? styles.selected : undefined}
            onClick={() => selectNote(note.id)}
          >
            {note.title}
          </div>
        ))}
      </div>
      {(selectedNote && (
        <Editor
          id={selectedNote.id}
          content={selectedNote.body}
          saveContent={data => saveNote(selectedNote.id, data)}
        />
      )) || <p>To create note press Control + N</p>}
    </div>
  );
};
