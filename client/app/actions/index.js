import * as types from '../constants/actionTypes'

export const signUp = (uname, pwd) => dispatch => {
  return fetch('http://localhost:3000/register' , {
    method: 'POST',
    body: JSON.stringify({ uname, pwd }),
    headers: new Headers({
      'Content-Type': 'application/json'
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
