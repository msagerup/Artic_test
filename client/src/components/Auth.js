import React from 'react'
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

export const Auth = ({children}) => {
	return (
		<>
			{children}
		</>
	)
}

export default withAuthenticationRequired(Auth, {
	onRedirecting: () => <h3>Loading.............................</h3>
})