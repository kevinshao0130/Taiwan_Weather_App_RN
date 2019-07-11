import { ActionTypes } from '../constants/Actions';
const initialState = {
  isLoading: false,
  thirtySixData: '',
  threeHourData: ''
}

export default function Reducer(state = initialState, action) {
  switch(action.type) {

      case ActionTypes.GET_THIRTY_SIX_DATA_ACTION_SUCCESS:
        return {
          state: ActionTypes.GET_THIRTY_SIX_DATA_ACTION_SUCCESS,
          isLoading: false,
          thirtySixData: action.data
        }

      case ActionTypes.GET_THIRTY_SIX_DATA_ACTION_REQUEST:
        return {
          state: ActionTypes.GET_THIRTY_SIX_DATA_ACTION_REQUEST,
          isLoading: true
        }

      case ActionTypes.GET_THIRTY_SIX_DATA_ACTION_FAILURE:
        return {
          state: ActionTypes.GET_THIRTY_SIX_DATA_ACTION_FAILURE,
          isLoading: false
        }

      case ActionTypes.GET_EVERY_THREE_HOUR_DATA_ACTION_SUCCESS:
        return {
          state: ActionTypes.GET_EVERY_THREE_HOUR_DATA_ACTION_SUCCESS,
          isLoading: false,
          threeHourData: action.data
        }

      case ActionTypes.GET_EVERY_THREE_HOUR_DATA_ACTION_REQUEST:
        return {
          state: ActionTypes.GET_EVERY_THREE_HOUR_DATA_ACTION_REQUEST,
          isLoading: true,
        }

      case ActionTypes.GET_EVERY_THREE_HOUR_DATA_ACTION_FAILURE:
        return {
          state: ActionTypes.GET_EVERY_THREE_HOUR_DATA_ACTION_FAILURE,
          isLoading: false
        }
  
      default:
          return state
  }
}