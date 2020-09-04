import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import {
	Button
} from '@material-ui/core';

export default function LogOut() {
	const { user } = useAuth0();
	const { logout } = useAuth0();
    return (
        <>
				{user ? (
					<Button
					 onClick={() => logout({ returnTo: window.location.origin })}
					 style={{backgroundColor: '#111'}}
					 >
            Log Out
          </Button>
				): ('')
				}
        </>
    )
}
