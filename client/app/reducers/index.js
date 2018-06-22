import * as types from '../constants/actionTypes'

const initialState = {
  loggedIn: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.AUTH_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        uname: action.uname
      }
    case types.AUTH_FAILURE:
      return {
        ...state,
        loggedIn: false
      }
    default:
      return state
  }
}

export default reducer;
