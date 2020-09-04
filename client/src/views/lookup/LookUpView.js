import React from 'react'
import { useAuth0} from "@auth0/auth0-react";
import FileDrop from '../../components/FileDrop'
import TableRender from '../../components/TableRender';
import { Container } from '@material-ui/core';
import {
  Typography
} from '@material-ui/core';
// Redux
import { useSelector } from 'react-redux';


export const LookUpView = () => {
	const { user } = useAuth0();
	console.log(user)
	const orgInfo = useSelector(state => state.apiData.orgInfo.orgInfo)


	return (
		<Container maxWidth={false}>
			<FileDrop />
			<Typography color='textPrimary' variant='h5' style={{paddingTop: '20px'}}>
			{orgInfo ? <TableRender apiData = {orgInfo} /> : 'No file submited' }
			</Typography>
		</Container>
	)
}

export default LookUpView;