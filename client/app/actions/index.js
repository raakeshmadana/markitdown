import * as types from '../constants/actionTypes'

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

export const authSuccess = (uname) => ({
  type: types.AUTH_SUCCESS,
  uname
})

export const authFailure = () => ({
  type: types.AUTH_FAILURE
})
