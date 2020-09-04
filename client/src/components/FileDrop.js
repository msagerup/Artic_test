import React, { useState, useCallback} from 'react';
import { useDropzone } from 'react-dropzone';
import clsx from 'clsx';
import axios from 'axios';
import * as Sentry from "@sentry/react";
// Redux
import { useDispatch } from 'react-redux';
import { orgInfoFromServer } from '../actions/orgNumActions';
 
import {
  Box,
  Button,
	Link,
	Grid,
  Typography,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {},
  dropZone: {
		
    border: `1px dashed ${theme.palette.divider}`,
    padding: theme.spacing(6),
    outline: 'none',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    alignItems: 'center',
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
      opacity: 0.5,
      cursor: 'pointer'
    }
  },
  dragActive: {
    backgroundColor: theme.palette.action.active,
    opacity: 0.5
  },
  image: {
    width: 130
  },
  info: {
    marginTop: theme.spacing(1)
  },
  list: {
    maxHeight: 320
  },
  actions: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'flex-end',
    '& > * + *': {
      marginLeft: theme.spacing(2)
    }
  }
}));

function FileDrop({className, ...rest}) {
	const classes = useStyles();
	const [files, setFiles] = useState([]);
	const [fileType, SetFileType] = useState('')
	const dispatch = useDispatch();

  const handleDrop = useCallback(acceptedFiles => {
		// Check file type
		const fileCheck = acceptedFiles[0].name.split('.')[1]; 
		SetFileType(fileCheck)
		setFiles(acceptedFiles);
	}, []);
	
	// Send file to node server.
	const sendFileToServer = () => {
		// Load file.
		let formData = new FormData();
		formData.append('file', files[0])
		// Send file to Node server.
		axios({
			method: 'post',
			headers: {
				'Content-Type': 'multipart/form-data'
			},
			data: formData,
			url: 'http://localhost:5000/api/file'
		})
		.then(res => {
			// Send res to Redux.
			console.log(res)
			dispatch(orgInfoFromServer(res.data));
		})
		.catch(error => {
			console.log(error)
			Sentry.captureMessage(error);
		})
	}

	const handleRemoveAll = () => {
		setFiles([]);
		dispatch(orgInfoFromServer([]));
		
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop
  });

  return (
		<Grid
		 	container
			direction="column"
			justify="space-evenly"
		  >
      <Grid item
        className={clsx({
          [classes.dropZone]: true,
          [classes.dragActive]: isDragActive
        })}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <div>
          <Typography gutterBottom variant="h3" style={{color: '#ffffff'}}>
            Select file
          </Typography>
          <Box mt={2}>
            <Typography color="textPrimary" variant="body1">
              Drop file a here or click <Link underline="always">browse</Link>{' '}
              thorough your machine
            </Typography>
          </Box>
        </div>
      </Grid>
      
      {files.length > 0 && (
        <div>
          <>
            <Grid item>
              {files.map((file, i) => (
                <div key={i}>
									<Typography variant='h5' color='textPrimary' style={{paddingTop: '20px'}}>
										File to upload: {file.name}
									</Typography>
                </div>
              ))}
            </Grid>
          </>
					<Grid item>
						<Typography
							className={classes.title}
							variant="h5"
							color="secondary"
						>
							{fileType === 'csv' ? 'csv files not fully supported, this might not work, but give it a try :)': ''}
						</Typography>
					</Grid>
          <Grid item className={classes.actions}>
					
						<Button
						  onClick={handleRemoveAll}
						  size="small"
							>
							Remove File
            </Button>
						{ fileType !== 'xlsx' && fileType !== 'csv' ? (
							<Typography variant='h5' color="error" style={{paddingTop: '3.5px'}}>
							Filetype: <span style={{fontWeight: 'bold'}}>{fileType}</span> is not supported
							</Typography>
						) : (
            <Button
              color="secondary"
              size="small"
              variant="contained"
              onClick={sendFileToServer}
            >
							{`Upload ${fileType} And Search`}
            </Button>
						)}
						
          </Grid>
					
        </div>
      )}
    </Grid>
  );
}


export default FileDrop;