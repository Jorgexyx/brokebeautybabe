/* Define firestore from lib module */
const Firestore = require('@google-cloud/firestore')

/* Declare database parameres. 
	 Can be found at the firebase console by clicking on </>
*/

//const _projectId = //your prj id
//const keyFile = "location of file"

const keyFile = "brokebeautybabes-2947f-firebase-adminsdk-qar58-88e98af1f8.json" ;
const _projectId = "brokebeautybabes-2947f";


/* create a new instace of your db */
const firestore = new Firestore({
	projectId: _projectId,
	keyFilename: keyFile,
	timestampsInSnapshots: true,
});
console.log('-------------------------------------');
console.log('Connection To firestore was made');
console.log('-------------------------------------');
exports.firestore = firestore;
