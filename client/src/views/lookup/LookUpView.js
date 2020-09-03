import React from 'react'
import { useAuth0} from "@auth0/auth0-react";
import * as Sentry from "@sentry/react";
import FileDrop from '../../components/FileDrop'
import TableRender from '../../components/TableRender';
// Redux
import { useSelector } from 'react-redux';


export const LookUpView = () => {
	const { user } = useAuth0();
	// console.log(user)
	const orgInfo = useSelector(state => state.apiData.orgInfo.orgInfo)


	const testSentry = () => {
		Sentry.captureMessage("Is this right?");
		console.log('ran')
	}

	return (
		<div>
			<FileDrop />
			{orgInfo ? <TableRender apiData = {orgInfo} /> : 'No file loaded' }
		</div>
	)
}

export default LookUpView;