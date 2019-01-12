const express = require('express')
const app = express()
const port = process.env.PORT || 5000;
const path = require('path');
//const sephora = require('../sephoraAPI/index.js');
const sephora = require('./sephoraScrapper.js');

//create a get route
app.use(express.static(path.join(__dirname, 'client/build')));
app.get('/express_backend', (req,res) => {
		sephora.scrapSephoraItems().then(items => {
			res.send({express: items});
		}).catch(err => {
			console.log("there was an error: ", err);
		});
});

const server = app.listen(port, () => {
	console.log(`Express running on PORT ${server.address().port}`);
});


