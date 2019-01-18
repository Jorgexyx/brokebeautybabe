/* Init parameters */
const connectToDb = require('./connectToDb.js');
//const sephoraScrapper = require('./sephoraScrapper.js');
const ultaScrapper = require('./ultaScrapper.js');
const firestore = connectToDb.firestore;


/* get all values in sephora scrapper */
console.log('-------------------------------------');
console.log('Scrapping ULTA Items');
console.log('-------------------------------------');

ultaScrapper.ultaScrapper().then( items  => {
	console.log('-------------------------------------');
	console.log('Adding to DB ULTA items');
	console.log('-------------------------------------');
	console.log(items);
	for ( item of items) {
		var collectionName = item['_pageType'];
		var docName = item['productName'];
		docName = docName.replace(/\//g,'-');
		
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
