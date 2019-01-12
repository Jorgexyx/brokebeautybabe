/* Libraries Required */
const puppeteer = require('puppeteer');

let scrapSephoraItems = async() => { //Load sephora sales page
	const browser = await puppeteer.launch({
		headless: true
	});
	const Salespage = await browser.newPage();
	await Salespage.goto('http://www.sephora.com/sale?sortBy=PRICE_LOW_TO_HIGH');

	//scrap item divs: item containt the class css-12egk0t
	const items = await Salespage.evaluate( () => {
		let itemArr = [];
		const itemsOnPage = document.getElementsByClassName('css-12egk0t');

		for (var item of itemsOnPage) {
			
			//get collection and product name
			var divVals = item.getElementsByClassName('css-79elbk');
			//this for loop might be unnneded. look into later
			for(var val of divVals) {
				//get values from span
				var productAttributes = val.getElementsByTagName("span");
				var collectionName = productAttributes[0].innerText;
				var productName    = productAttributes[1].innerText;
				var imageAttr = val.querySelector("img").getAttribute('src');
				var imageSrc = "https://sephora.com/" + imageAttr;
				//grab image source
				itemArr.push({collectionName, productName, imageSrc});
			
			}

		}

		return itemArr;
	});

	browser.close()
	return items;
}

const itemLen = 0;
scrapSephoraItems().then ((items) => {
	console.log(items);
	const itemLen = items.length;
	console.log(items.length);
});

module.exports = { scrapSephoraItems };





/* Set up server
const app = express();
app.get('/', (req,res) => {
		res.sendStatus(itemLen);

});

const server = app.listen(3000, () => {
  console.log(`Express running on PORT ${server.address().port}`);
});

*/
