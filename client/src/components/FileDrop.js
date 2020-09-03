import React, { useState, useCallback, useEffect} from 'react';
import { useDropzone } from 'react-dropzone';
import clsx from 'clsx';
import axios, { post } from 'axios';
import * as Sentry from "@sentry/react";
// Redux
import { useDispatch } from 'react-redux';
import { orgInfoFromServer } from '../actions/orgNumActions';
 
import {
  Box,
  Button,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
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

	console.log('999',fileType)
	

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
    <div >
      { files.length > 0 ? (
        ''
      ) :
      (
      <div
        className={clsx({
          [classes.dropZone]: true,
          [classes.dragActive]: isDragActive
        })}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <div>
          <Typography gutterBottom variant="h3">
            Select file
          </Typography>
          <Box mt={2}>
            <Typography color="textPrimary" variant="body1">
              Drop file a here or click <Link underline="always">browse</Link>{' '}
              thorough your machine
            </Typography>
          </Box>
        </div>
      </div>
      )
    }
      {files.length > 0 && (
        <>
          <div>
            <List className={classes.list}>
              {files.map((file, i) => (
                <div key={i}>
                  <ListItem divider={i < files.length - 1}>
                    <ListItemIcon>
                      {/* <FileCopyIcon /> */}
                    </ListItemIcon>
                    <ListItemText
                      primary={file.name}
                      primaryTypographyProps={{ variant: 'h5' }}
                      // secondary={bytesToSize(file.size)}
                    />
                  </ListItem>
                </div>
              ))}
            </List>
          </div>
          <div className={classes.actions}>
						<Button
						  onClick={handleRemoveAll}
						  size="small"
							>
              {/* {fileType === 'xlsx' || fileType === 'csv' ? `File type of ${fileType} is not supported ` : 'Remove file'} */}
							Remove File
            </Button>
						{ fileType !== 'xlsx' && fileType !== 'csv' ? (
							`Filetype : ${fileType} is not supported`
						) : (
            <Button
              color="secondary"
              size="small"
              variant="contained"
              onClick={sendFileToServer}
              // disabled={fileType !== 'xlsx' && fileType !== 'csv' ? true : false}
            >
							{`Upload ${fileType} And Search`}
            </Button>
						)}
						<Typography
							className={classes.title}
							variant="h5"
							color="secondary"
       	 		>
								{fileType === 'csv' ? 'csv files not fully supported, this might not work, but give it a try :)': ''}
						</Typography>
          </div>
        </>
      )}
    </div>
  );
}


export default FileDrop;