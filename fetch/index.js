import { combineReducers } from 'redux';
import Reducer from './Reducer';

const rootReducer = combineReducers({
    Reducer: Reducer,
})

export default rootReducer