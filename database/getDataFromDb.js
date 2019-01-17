const connectToDb = require('./connectToDb.js');
const firestore = connectToDb.firestore;

var collections = ['Makeup', 'Skincare', 'bathAndBody', 'fragrence', 'hair', 'men', 'miniSize', 'toolsAndBrushes'];
for (collectionName of collections) {
	var collection = firestore.collection(collectionName);
	var query = collection.get().then( snapShot => {
			snapShot.forEach( doc => {
				console.log(doc.id, '=>', doc.data());
			});
	}).catch(err => {
		console.log("There was an error:", err);
	});
}
