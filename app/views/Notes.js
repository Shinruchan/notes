import React, { useEffect } from 'react';
import { useSelector, useAction } from 'redux-zero/react';
import { Settings } from 'react-feather';
import { Link } from 'react-router-dom';

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
  const removeNote = useAction(Actions.removeNote);

  useEffect(() => {
    const handlePresses = ({ ctrlKey, keyCode }) => {
      if (ctrlKey && [78, 84].includes(keyCode)) newNote();
    };

    window.addEventListener('keydown', handlePresses);

    return () => window.removeEventListener('keydown', handlePresses);
  }, []);

  return (
    <div className={styles.notes}>
      <div className={styles.sidebar}>
        <div className={styles.titles}>
          {notes.map((note, i) => (
            <div
              key={i}
              className={note.selected ? styles.selected : undefined}
              onClick={() => selectNote(note.id)}
            >
              {note.title}

              <span onClick={() => removeNote(note.id)}>✖</span>
            </div>
          ))}
        </div>
        <div className={styles.settings}>
          <Link to="settings">
            <Settings />
          </Link>
        </div>
      </div>
      {(selectedNote && (
        <Editor
          id={selectedNote.id}
          content={selectedNote.body}
          saveContent={data => saveNote(selectedNote.id, data)}
        />
      )) || (
        <p className={styles.empty}>
          To create note press Ctrl + N or Ctrl + T
        </p>
      )}
    </div>
  );
};
