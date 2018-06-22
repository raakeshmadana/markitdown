import * as types from '../constants/actionTypes'

/*export const signUp = (uname, pwd) => ({
  type: types.SIGN_UP,
  uname,
  pwd
})*/

/* Use the fetch api to post the data to the server 
 * Return a function instead of state and use redux-thunk middleware to
 * execute that function
 * Dispatch either AUTH_SUCCESS/AUTH_FAILURE and redirect
 * Redirect using conditional rendering
 */

export const signUp = (uname, pwd) => dispatch => {
  return fetch('localhost:3000/register' , {
    method: 'POST',
    body: JSON.stringify({ uname, pwd }),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  })
  .then(
    response => {
      if(response.ok) {
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
