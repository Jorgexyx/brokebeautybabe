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
			var name = item.getElementsByClassName('css-1gughuu');
			for(var val of name) {
				
				itemArr.push(val.innerText);
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
