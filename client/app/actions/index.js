import * as types from '../constants/actionTypes'
import { push } from 'connected-react-router'
import { persistor } from '../index.js'

export const signUp = (uname, pwd) => dispatch => {
  return fetch('https://markitdown.now.sh/register' , {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: uname,
      password: pwd
    }),
    credentials: 'same-origin'
  })
  .then(
    response => {
      if(response.ok) {
        console.log("sign up success");
        dispatch(authSuccess(uname));
        dispatch(push('/notes'));
      } else {
        dispatch(authFailure());
      }
    },
    error => {
      console.log("An error occured", error)
      dispatch(authFailure())
    }
  )
}

export const logIn = (uname, pwd) => dispatch => {
  return fetch('https://markitdown.now.sh/login', {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: uname,
      password: pwd
    }),
    credentials: 'same-origin'
  })
  .then(
    response => {
      if(response.ok) {
        console.log("log in success");
        dispatch(authSuccess(uname));
        dispatch(push('/notes'));
      } else {
        dispatch(authFailure());
      }
    },
    error => {
      console.log("An error occured", error);
      dispatch(authFailure())
    }
  )
}

export const logOut = () => dispatch => {
  return fetch('https://markitdown.now.sh/logout', {
    method: 'GET',
    credentials: 'same-origin'
  })
  .then(
    response => {
      if(response.ok) {
        console.log("log out success");
        persistor.purge();
        dispatch(resetState());
        dispatch(push('/'));
      }
    },
    error => {
      console.log("An error occured", error);
    }
  )
}

export const newNote = () => dispatch => {
  return fetch('https://markitdown.now.sh/addNote', {
    method: 'GET',
    credentials: 'same-origin'
  })
  .then(
    response => response.ok ? response.json(): null,
    error => {
      console.log("Error adding new note", error);
    }
  )
  .then(
    doc => {
      if (doc != null) {
        console.log(doc);
        dispatch(currentNote(doc._id));
        dispatch(addNote(doc._id, doc.timestamp));
        dispatch(push('/note/' + doc._id + '/edit'));
      }
    },
    error => {
      console.log("Error parsing json", error);
    }
  )
}

export const saveNote = (noteId, update) => dispatch => {
  return fetch('https://markitdown.now.sh/saveNote', {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: noteId,
      note: update
    }),
    credentials: 'same-origin'
  })
  .then(
    response => {
      if (response.ok) {
        console.log("Note updated");
      }
    },
    error => {
      console.log("Error updating note");
    }
  )
}

export const getPreview = (noteId, update) => dispatch => {
  return fetch('https://markitdown.now.sh/previewNote', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      note: update
    }),
    credentials: 'same-origin'
  })
  .then(
    response => response.ok ? response.json() : null,
    error => {
      console.log("Error getting preview");
    }
  )
  .then(
    json => {
      dispatch(updateNote(noteId, update, json.html));
    },
    error => {
      console.log("Error parsing json");
    }
  )
}

export const previewNote = (noteId, update) => dispatch => {
  dispatch(saveNote(noteId, update));
  return fetch('https://markitdown.now.sh/previewNote', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      note: update
    }),
    credentials: 'same-origin'
  })
  .then(
    response => response.ok ? response.json() : null,
    error => {
      console.log("Error getting preview");
    }
  )
  .then(
    json => {
      dispatch(updateNote(noteId, update, json.html));
      dispatch(push('/note/' + noteId + '/view'));
    },
    error => {
      console.log("Error parsing json");
    }
  )
}

export const getNotes = (timestamp) => dispatch => {
  return fetch('https://markitdown.now.sh/getnotes/' + timestamp, {
    method: 'GET',
    credentials: 'same-origin'
  })
  .then(
    response => response.ok ? response.json() : null,
    error => {
      console.log("Error getting notes");
    }
  )
  .then(
    notes => {
      dispatch(renderNotes(notes));
    },
    error => {
      console.log("Error parsing notes json");
    }
  )
}

export const deleteNoteFromServer = (noteId) => dispatch => {
  return fetch('https://markitdown.now.sh/deletenote/' + noteId, {
    method: 'GET',
    credentials: 'same-origin'
  })
  .then(
    response => {
      if(response.ok) {
        dispatch(deleteNoteFromStore(noteId));
        dispatch(push('/notes'));
      } else {
        console.log("Error deleting note");
      }
    },
    error => {
      console.log("Error updating note");
    }
  )
}

export const deleteNoteFromStore = (noteId) => ({
  type: types.DELETE_NOTE,
  noteId
})

export const updateNote = (noteId, update, preview) => ({
  type: types.UPDATE_NOTE,
  noteId,
  update,
  preview
})

export const addNote = (id, timestamp) => ({
  type: types.ADD_NOTE,
  id,
  timestamp
})

export const renderNotes = (notes) => ({
  type: types.RENDER_NOTES,
  notes
})

export const currentNote = (id) => ({
  type: types.CURRENT_NOTE,
  id
})

export const resetState = () => ({
  type: types.RESET_STATE
}) 

export const authSuccess = (uname) => ({
  type: types.AUTH_SUCCESS,
  uname
})

export const authFailure = () => ({
  type: types.AUTH_FAILURE,
  logInError: true
})

export const clearError = () => ({
  type: types.CLEAR_ERROR
})
