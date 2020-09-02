import React, { useState, useCallback} from 'react';
import { useDropzone } from 'react-dropzone';
import clsx from 'clsx';
import axios, { post } from 'axios';
import * as Sentry from "@sentry/react";
// import PerfectScrollbar from 'perfect-scrollbar';

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

  const handleDrop = useCallback(acceptedFiles => {
    setFiles(acceptedFiles);
	}, []);
	
	// Send file to node server.
	const sendFileToServer = () => {
		// Load file.
		console.log(files[0])



		let formData = new FormData();
		formData.append('file', files[0])

		axios({
			method: 'post',
			headers: {
				'Content-Type': 'multipart/form-data'
			},
			data: formData,
			url: 'http://localhost:5000/api/file'
		})
		.then(res => {
			console.log(res)
		})
		.catch(error => {
			console.log(error)
		})

		// // console.log(formData)
		// fetch('http://localhost:5000/api/file', {
		// method: 'POST',
		// body: formData
		// })
		// .then(response => console.log(response.json()))
		// .then(data => console.log(data));


		// post(url, file )
		// .then(res => {
		// 	console.log(res)
		// })

	// 	let reader = new FileReader()
	// 	reader.readAsDataURL(files[0])
	// 	reader.onload = e => {
	// 	console.warn('loaded', e.target.result)
	// 	// Send with axios.
	// 	const url = 'http://localhost:5000/api/file'
	// 	const formData = {file: e.target.result}
	// 	// Axios post.
	// 	return post(url, formData)
	// 	.then(res => {
	// 		console.log(res)
	// 	})
	// 	.catch((error => {
	// 		console.log(error)
	// 		Sentry.captureMessage(error);
	// 	}))
	// }


	}

	const handleRemoveAll = () => {
    setFiles([]);
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
          <img
            alt="Select file"
            className={classes.image}
            src="/static/images/undraw_add_file2_gvbb.svg"
          />
        </div>
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
            <Button onClick={handleRemoveAll} size="small">
              Remove File
            </Button>
            <Button
              color="secondary"
              size="small"
              variant="contained"
              onClick={sendFileToServer}
              // disabled={imageUrl ? true : false}
            >
              {/* {imageUrl ? 'Filed uploaded' : 'Upload file'} */}
							Upload
            </Button>
          </div>
        </>
      )}
    </div>
  );
}


export default FileDrop;