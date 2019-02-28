import { combineReducers } from 'redux';
import TestReducer from './TestReducer';

const rootReducer = combineReducers({
    TestReducer: TestReducer,
})

export default rootReducer