import { ActionTypes } from '../constants/Actions';
import axios from 'axios';

export function TestActions(url) {
    return (dispatch) => {
        dispatch(getToDos())
        axios.get(url)
            .then(function (response) {
                return(dispatch(getToDosSuccess(response.data)))
            })
            .catch(err => dispatch(getToDosFailure(err)))
    }
}

function getToDos() {
  return {
      type: ActionTypes.TEST_ACTION_REQUEST
  }
}

function getToDosSuccess(data) {
  console.log(ActionTypes.TEST_ACTION_SUCCESS);
  return {
      type: ActionTypes.TEST_ACTION_SUCCESS,
      data
  }
}

function getToDosFailure(err) {
  console.log(ActionTypes.TEST_ACTION_FAILURE);
  return {
      type: ActionTypes.TEST_ACTION_FAILURE
  }
}