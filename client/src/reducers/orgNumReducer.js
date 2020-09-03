import produce from 'immer';
import { GET_ORG_INFO } from '../actions/orgNumActions';

const initialState = {
	orgInfo: []
}

const orgNumReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_ORG_INFO: {
			return produce(state, draft => {
				draft.orgInfo = action.payload;
			})
		}
		default: {
			return state;
		}
	}
}


export default orgNumReducer;