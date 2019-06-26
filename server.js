const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// const autoImport = require('./utils/autoImport');
const getData = require('./utils/getData');
const exchange = require('./routes/api/exchange');

const app = express();

// autoImport(app);

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.unsubscribe(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/exchange', { useNewUrlParser: true, useFindAndModify: false })
	.then(() => console.log('MongoDB connected'))
	.catch(error => console.log('Can not connect to MongoDB, ' + error.message));

app.use('/api/exchange', exchange);

const port = process.env.PORT || 5000;

app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}/`);
});