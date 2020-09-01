import React, {useEffect} from 'react'
import NProgress from 'nprogress';
import {
  Box,
  CircularProgress,
  makeStyles
} from '@material-ui/core';
import logoP from '../assets/logo.png'

const useStyles = makeStyles((theme) => ({
  root: {
    alignItems: 'center',
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
    left: 0,
    padding: theme.spacing(3),
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: 2000
  },
  logo: {
    width: 200,
    maxWidth: '100%'
  }
}));

export default function LoadingScreen() {
  const classes = useStyles();
	useEffect(() => {
    NProgress.start();

    return () => {
      NProgress.done();
    };
  }, []);

	return (
		<div className={classes.root}>
      <Box
        display="flex"
        justifyContent="center"
        mb={6}
      >
        <img
					alt='Logo'
					src={logoP}
				/>
      </Box>
      <CircularProgress />
    </div>
	)
}
