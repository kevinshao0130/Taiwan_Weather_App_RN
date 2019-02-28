import { ActionTypes } from '../constants/Actions';
import axios from 'axios';

export function TestActions() {
    return (dispatch) => {
        dispatch(getToDos())
        axios.get('https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-007?Authorization=CWB-D8B8B83D-A283-465C-97CD-AB69E9FE7A90&locationName=桃園區&elementName=MinCI,MaxAT,MaxCI,MinT,UVI,MinAT,MaxT,Wind,Td,PoP,T,RH,Wx,WeatherDescription&sort=time&timeFrom=2019-03-01T012:01:00&timeTo=2019-03-01T15:05:00')
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