const routes = require('express').Router();
const axios = require('axios');
const readXlsxFile = require('read-excel-file/node');
const multer = require('multer');
const fs = require('fs')
const Excel = require('exceljs');
const xl = require('excel4node');
const path = require('path');

// var upload = multer({ dest: './files/upload' })

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './files/upload/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
const upload = multer({storage: storage})

readXlsxFile('./files/upload/test.xlsx').then((rows) => {
	// `rows` is an array of rows
	console.log(rows)
  // each row being an array of cells.
})

// Get file fom client

routes.post('/api/file', upload.single('file'), (req, res) => {
	console.log(req.file)
	res.status(200).json({message: 'pols'})
})


routes.get('/test', (req, res) => {
	axios.get('https://data.brreg.no/enhetsregisteret/api/enheter/919828366')
	.then(responce => {
		console.log(responce.data)
		const info = responce.data;
		res.send(info)
	})
})





routes.get('/3', (req, res) => {
	
	// var workbook = new Excel.Workbook(); 
	// workbook.xlsx.readFile('./files/upload/book.xlsx')
	// 		.then(function() {
	// 				var worksheet = workbook.getWorksheet('sheet');
	// 				worksheet.eachRow({ includeEmpty: true }, function(row, rowNumber) {
	// 					console.log("Row " + rowNumber + " = " + JSON.stringify(row.values));
	// 				});
	// });
	// let workbook = new Excel.Workbook();
	// workbook.xlsx.readFile('./files/upload/book.xlsx')
	// .then(() => {
	// 	let workSheet = workbook.getWorkSheet();
	// 	workSheet.eachRow({includeEmpty: true}, function(row, rowNumber) {
	// 		console.log(`Row ${rowNumber} = ${JSON.stringify(row.values)}`)
	// 	})
	// })
	// readXlsxFile('./files/upload/book.xlsx').then((rows) => {
	// 	console.log(rows)
	// })
	// res.send('Hello again 34')
})

module.exports = routes;