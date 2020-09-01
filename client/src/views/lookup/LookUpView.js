import React from 'react'
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

export const LookUpView = () => {
	const { user } = useAuth0();
	return (
		<div>
			This is the lookup
		</div>
	)
}

export default withAuthenticationRequired(LookUpView, {
	onRedirecting: () => <h3>Loading</h3>
})