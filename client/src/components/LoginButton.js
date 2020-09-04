import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import {
	Button,
	Typography
} from '@material-ui/core';

export default function LoginButton() {
	const { loginWithRedirect } = useAuth0();

		return (
				<>
					<Button
						onClick={() => loginWithRedirect()
					}
					style= {{background: '#fcba03', padding: '10px 50px', color: '#111'}}
					>
						<Typography variant='h5'>
							Log In
						</Typography>
					</Button>
				</>
		)
}
