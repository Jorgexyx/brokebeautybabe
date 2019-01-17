const connectToDb = require('./connectToDb.js');
const firestore = connectToDb.firestore;

let getItemsFromDb = async() => {
	var collections = ['Makeup', 'Skincare', 'bathAndBody', 'fragrence', 'hair', 'men', 'miniSize', 'toolsAndBrushes'];
	var items = [];
	for (collectionName of collections) {
		var collection = firestore.collection(collectionName);
		var query = await collection.get().then( snapShot => {
			snapShot.forEach( doc => {
				items.push(doc.data());
				//console.log(doc.id, '=>', doc.data());
			});
		}).catch(err => {
			console.log("There was an error:", err);
		});
	}
	return items;
}


/*
getItemsFromDb().then( (items) => {
	console.log('done');
	console.log(items);
});
*/

module.exports = { getItemsFromDb };
