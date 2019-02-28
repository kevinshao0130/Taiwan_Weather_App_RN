import { ActionTypes } from '../constants/Actions';
const initialState = {
  isLoading: false,
  data: false
}

export default function TestReducer(state = initialState, action) {
  switch(action.type) {

      case ActionTypes.TEST_ACTION_SUCCESS:
        return {
          state: ActionTypes.TEST_ACTION_SUCCESS,
          isLoading: false,
          data: action.data
        }


      case ActionTypes.TEST_ACTION_REQUEST:
        return {
          state: ActionTypes.TEST_ACTION_REQUEST,
          isLoading: true
        }
      
      default:
          return state
  }
}