const routes = require('express').Router();
const axios = require('axios');
const readXlsxFile = require('read-excel-file/node');
const multer = require('multer');
const fs = require('fs')
const Excel = require('exceljs');
const xl = require('excel4node');
const path = require('path');


// Set file storage location.
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './files/upload/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
const upload = multer({storage: storage})


// Get file fom client
routes.post('/api/file', upload.single('file'), (req, res) => {
	console.log('File name', req.file)
	// Read file.
	readXlsxFile(req.file.path).then((rows) => {
		const orgNumberArr = rows;
		return orgNumberArr;
		// Then call brrg api with reg numbers. 
	}).then(orgNumberArr => {
		console.log(orgNumberArr)

		// TODO: remove arrays in arrays, change to one array
		// Chain axios calls.
		// If time: Error check on org numbers.


		// Enough for today. figure out how to loop overr... 

		axios.all(
			axios.get(`https://data.brreg.no/enhetsregisteret/api/enheter/${orgNumberArr[0][0]}`),
			axios.get(`https://data.brreg.no/enhetsregisteret/api/enheter/${orgNumberArr[1][0]}`),
			axios.get(`https://data.brreg.no/enhetsregisteret/api/enheter/${orgNumberArr[2][0]}`),
		)

		axios.get(`https://data.brreg.no/enhetsregisteret/api/enheter/${orgNumberArr[2][0]}`)
		.then(responce => {
			console.log(responce.data)
			const info = responce.data;
			res.send(info)
		})
	})
})



module.exports = routes;