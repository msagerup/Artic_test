import { combineReducers } from 'redux';
import orgNumberReducer from './orgNumReducer';

const rootReducer = combineReducers({
	apiData: orgNumberReducer
});

export default rootReducer;