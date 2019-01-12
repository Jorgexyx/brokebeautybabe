const express = require('express')
const app = express()
const port = process.env.PORT || 5000;
const sephora = require('../sephoraAPI/index.js');

//create a get route
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


