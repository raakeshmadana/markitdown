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
    })
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
    })
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
  return fetch('http://localhost:3000/logout')
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
