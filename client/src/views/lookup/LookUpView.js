import React from 'react'
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import * as Sentry from "@sentry/react";

export const LookUpView = () => {
	const { user } = useAuth0();

	const testSentry = () => {
		Sentry.captureMessage("Is this right?");
		console.log('ran')
	}

	return (
		<div>
			This is the lookup
			Sentry 

			<button onClick={testSentry}>Break the world</button>
		</div>
	)
}

export default LookUpView;