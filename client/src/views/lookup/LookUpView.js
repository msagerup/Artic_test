import React from 'react'
import { useAuth0} from "@auth0/auth0-react";
import * as Sentry from "@sentry/react";
import FileDrop from '../../components/FileDrop'

export const LookUpView = () => {
	const { user } = useAuth0();
	// console.log(user)
	const testSentry = () => {
		Sentry.captureMessage("Is this right?");
		console.log('ran')
	}

	return (
		<div>
			This is the lookup
			Sentry 

			<button onClick={testSentry}>Break the world</button>
			<FileDrop />
		</div>
	)
}

export default LookUpView;