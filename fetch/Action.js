import { ActionTypes } from '../constants/Actions'
import axios from 'axios'

export function getThirtySixDataActions (url) {
  return (dispatch) => {
    dispatch(getThirtySixData())
    axios.get(url)
      .then(function (response) {
        return (dispatch(getThirtySixDataSuccess(response.data)))
      })
      .catch(error => dispatch(getThirtySixDataFailure(error)))
  }
}

function getThirtySixData () {
  console.log(ActionTypes.GET_THIRTY_SIX_DATA_ACTION_REQUEST)
  return {
    type: ActionTypes.GET_THIRTY_SIX_DATA_ACTION_REQUEST
  }
}

function getThirtySixDataSuccess (data) {
  console.log(ActionTypes.GET_THIRTY_SIX_DATA_ACTION_SUCCESS)
  return {
    type: ActionTypes.GET_THIRTY_SIX_DATA_ACTION_SUCCESS,
    data
  }
}

function getThirtySixDataFailure () {
  console.log(ActionTypes.GET_THIRTY_SIX_DATA_ACTION_FAILURE)
  return {
    type: ActionTypes.GET_THIRTY_SIX_DATA_ACTION_FAILURE
  }
}

export function getEveryThreeHourDataActions (url) {
  return (dispatch) => {
    dispatch(getEveryThreeHourData())
    axios.get(url)
      .then(function (response) {
        return (dispatch(getEveryThreeHourDataSuccess(response.data)))
      })
      .catch(error => dispatch(getEveryThreeHourDataFailure(error)))
  }
}

function getEveryThreeHourData () {
  console.log(ActionTypes.GET_EVERY_THREE_HOUR_DATA_ACTION_REQUEST)
  return {
    type: ActionTypes.GET_EVERY_THREE_HOUR_DATA_ACTION_REQUEST
  }
}

function getEveryThreeHourDataSuccess (data) {
  console.log(ActionTypes.GET_EVERY_THREE_HOUR_DATA_ACTION_SUCCESS)
  return {
    type: ActionTypes.GET_EVERY_THREE_HOUR_DATA_ACTION_SUCCESS,
    data
  }
}

function getEveryThreeHourDataFailure () {
  console.log(ActionTypes.GET_EVERY_THREE_HOUR_DATA_ACTION_FAILURE)
  return {
    type: ActionTypes.GET_EVERY_THREE_HOUR_DATA_ACTION_FAILURE
  }
}

export function getOneWeekDataActions (url) {
  return (dispatch) => {
    dispatch(getOneWeekData())
    axios.get(url)
      .then(function (response) {
        return (dispatch(getOneWeekDataSuccess(response.data)))
      })
      .catch(error => dispatch(getOneWeekDataFailure(error)))
  }
}

function getOneWeekData () {
  console.log(ActionTypes.GET_ONE_WEEK_DATA_ACTION_REQUEST)
  return {
    type: ActionTypes.GET_ONE_WEEK_DATA_ACTION_REQUEST
  }
}

function getOneWeekDataSuccess (data) {
  console.log(ActionTypes.GET_ONE_WEEK_DATA_ACTION_SUCCESS)
  return {
    type: ActionTypes.GET_ONE_WEEK_DATA_ACTION_SUCCESS,
    data
  }
}

function getOneWeekDataFailure () {
  console.log(ActionTypes.GET_ONE_WEEK_DATA_ACTION_FAILURE)
  return {
    type: ActionTypes.GET_ONE_WEEK_DATA_ACTION_FAILURE
  }
}
