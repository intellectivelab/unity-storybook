const express = require('express');

const bodyParser = require('body-parser');

const app = express();

const rest = require('./rest');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

rest(app);

// Serve the files on port 4000.
app.listen(4000, function () {
	console.log('listening on port 4000!\n');
});