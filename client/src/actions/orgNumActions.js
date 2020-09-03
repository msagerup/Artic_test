export const GET_ORG_INFO = '@api/get-org-info';


export function orgInfoFromServer (arr) {
	console.log('runnign???')
	// api call
	return (dispatch) => {
		dispatch({
			type: GET_ORG_INFO,
			payload: arr
		})
	}
};