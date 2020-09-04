import React from 'react'
import LoginButton from '../../../components/LoginButton';
import { Container, Grid, Typography } from '@material-ui/core';


export default function index() {
    return (
        <Container maxWidth={false}>
					<Grid
					  container
						direction="column"
						justify="center"
						alignItems="center"
					>
						<Grid item>
							<Typography variant='h1' style={{fontSize:'120px', color: 'white', textAlign:'center', fontWeight:'300', marginTop: '300px'}}>
								business lookup.
							</Typography>
							<Typography variant='h2' style={{fontSize:'20px', color: 'white', textAlign:'center', fontWeight:'100', letterSpacing: 20, marginBottom:'100px'}}>
								Check out them companies
							</Typography>
						</Grid>
						<Grid item>
							<LoginButton />
						</Grid>
					</Grid>
        </Container>
    )
}
