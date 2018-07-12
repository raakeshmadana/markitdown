import * as types from '../constants/actionTypes'
import { push } from 'connected-react-router'

export const signUp = (uname, pwd) => dispatch => {
  return fetch('http://localhost:3000/register' , {
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
        dispatch(push('/home'));
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
  return fetch('http://localhost:3000/login', {
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
        dispatch(push('/home'));
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
  return fetch('http://localhost:3000/logout', {
    method: 'GET',
    credentials: 'same-origin'
  })
  .then(
    response => {
      if(response.ok) {
        console.log("log out success");
        dispatch(resetState());
        dispatch(push('/'));
      }
    },
    error => {
      console.log("An error occured", error);
    }
  )
}

export const addNote = () => dispatch => {
  return fetch('http://localhost:3000/addNote', {
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
        dispatch(push('/note/' + doc._id));
      }
    },
    error => {
      console.log("Error parsing json", error);
    }
  )
}

export const saveNote = (noteId, update) => dispatch => {
  return fetch('http://localhost:3000/saveNote', {
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

export const getNotes = () => dispatch => {
  return fetch('http://localhost:3000/getnotes', {
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

export const updateNote = (noteId, update) => ({
  type: types.UPDATE_NOTE,
  noteId,
  update
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
  type: types.AUTH_FAILURE
})
