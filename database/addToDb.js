/* Init parameters */
const connectToDb = require('./connectToDb.js');
const sephoraScrapper = require('./sephoraScrapper.js');
const firestore = connectToDb.firestore;


/* get all values in sephora scrapper */
console.log('-------------------------------------');
console.log('Scrapping sephora Items');
console.log('-------------------------------------');

sephoraScrapper.scrapSephoraItems().then( items  => {
	console.log('-------------------------------------');
	console.log('Adding to DB sephora items');
	console.log('-------------------------------------');
	for ( item of items) {
		var collectionName = item['_pageType'];
		var docName = item['productName'];
		var path = collectionName + '/' + docName;
		var document = firestore.doc(path);
		document.set({
			collectionName:item['collectionName'],
			productName: docName,
			imageSrc: item['imageSrc'],
			oldPrice: item['oldPrice'],
			newPrice: item['newPrice'],
			_pageType: collectionName,
		}).then( () => {
				console.log('Added to ', collectionName);
		});
	}
}).catch(err => {
	console.log("There was an error:", err);
});




