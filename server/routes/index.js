const routes = require('express').Router();
const axios = require('axios');
const readXlsxFile = require('read-excel-file/node');
const multer = require('multer');
const fs = require('fs')
const Excel = require('exceljs');
const xl = require('excel4node');
const path = require('path');
const { arrayIntersectSafe } = require('excel4node/distribution/lib/utils');


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
	// Read file.
	readXlsxFile(req.file.path).then((rows) => {
		const orgNumberArr = rows;
		return orgNumberArr;
		// Then call brrg api with reg numbers. 
	}).then(orgNumberArr => {
		// flatten array.
		const orgNumberFlatArr = [].concat.apply([], orgNumberArr);
		console.log(orgNumberFlatArr)
		// Chain Axios call based on number of elemets in array.
		let orgInfo = [];
		let promises = [];
		let errors = [];
		for(i = 0; i < orgNumberFlatArr.length; i++) {
			promises.push(
				axios.get(`https://data.brreg.no/enhetsregisteret/api/enheter/${orgNumberFlatArr[i]}`)
				.then(res => {
					orgInfo.push(res.data)
				})
				.catch(error => {
					errors.push(error);
					console.log(error)
					// res.send(error)
					// console.log(error)
				})
			)
		}
		
		// Resolve all axios promises.
		Promise.all(promises)
			.then(() => {
				// Send info to client side.
				console.log(orgInfo)
				res.status(200).json({orgInfo})
			})
			.catch(error => {
				console.log(error)
			})
	})
});


module.exports = routes;