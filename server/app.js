const express = require('express');
const app = express()
const bodyParser = require('body-parser');
const routes = require('./routes');
const cors = require('cors')



app.use(cors())
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

// Use routes
app.use('/', routes)


const port = 5000;
app.listen(port, () => {
	console.log(`Server listening on port: ${port}`);
});

