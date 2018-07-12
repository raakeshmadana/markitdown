import * as types from '../constants/actionTypes'

const initialState = {
  loggedIn: false,
  notes: []
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
    case types.CURRENT_NOTE:
      return {
        ...state,
        currentNote: action.id
      }
    case types.RENDER_NOTES:
      return {
        ...state,
        notes: action.notes
      }
    case types.ADD_NOTE:
      return {
        ...state,
        notes: [
          ...state.notes,
          {
            _id: action.id,
            timestamp: action.timestamp,
            note: ''
          }
        ]
      }
    case types.UPDATE_NOTE:
      let obj = { ...state };
      for(let i = 0; i < obj.notes.length; i++) {
        if(obj.notes[i]._id == action.noteId) {
          obj.notes[i].note = action.update;
        }
      }
      return obj;
    case types.RESET_STATE:
      return initialState
    default:
      return state
  }
}

export default reducer;
