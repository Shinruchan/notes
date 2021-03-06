import uuid from 'uuid/v4';

export const selectNote = (state, noteId) => ({
  notes: state.notes.map(note => ({ ...note, selected: note.id === noteId }))
});

export const saveNote = (state, noteId, body) => {
  let title = body
    .substring(0, body.indexOf('\n'))
    .replace(/<\/?[^>]+(>|$)/g, '')
    .replace(/&nbsp;/g, '');

  if (!title) title = '...';

  return {
    notes: state.notes.map(note =>
      note.id === noteId ? { ...note, title, body } : note
    )
  };
};

export const newNote = state => ({
  notes: [
    ...state.notes.map(note => ({ ...note, selected: false })),
    { id: uuid(), title: '...', body: '', selected: true }
  ]
});

export const removeNote = (state, noteId) => ({
  notes: state.notes.filter(note => note.id !== noteId)
});

export const changeTheme = (state, theme) => {
  document.documentElement.setAttribute('theme', theme);

  return { theme };
};

export const Actions = {
  selectNote,
  saveNote,
  newNote,
  removeNote,
  changeTheme
};
