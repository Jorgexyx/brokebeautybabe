const puppeteer = require('puppeteer');
function print(string) {
	console.log('\n--------------------------------------');
	console.log(string);
	console.log('--------------------------------------');
}

let ultaScrapper = async() => {
	const browser = await puppeteer.launch({
		headless: true,
	});
	const webPage = await browser.newPage();
	let pageUrl = "https://www.ulta.com/promotion/sale";
	await webPage.goto(pageUrl, {timeout: 0});
	let items = [];
	
	items = await webPage.evaluate( () => {
		let allProducts = [];
		let collectionName = "";
		let productName = "";
		let imageSrc = "";
		let oldPrice = "";
		let newPrice = "";
		let _pageType = "misc";

		//get products from foo16
		let products = (document.getElementById('foo16')).getElementsByTagName('li');

		//save values from products
		for ( product of products ) {

			collectionName = product.getElementsByClassName('prod-title');
			productName    = product.getElementsByClassName('prod-desc');
			try {
				productName.replace("/","-");
			}
			catch(err) {
				console.log("no /");
			}
			image          = product.getElementsByClassName('quick-view-prod')[0];
			oldPrice = product.getElementsByClassName('pro-old-price')[0];
			newPrice = product.getElementsByClassName('pro-new-price')[0];

			try {
				collectionName = collectionName[0].innerText;
				productName = productName[0].innerText;

				imageSrc = image.querySelector("img").getAttribute("src");

				oldPrice = oldPrice.innerText;
				newPrice = newPrice.innerText;

				allProducts.push({collectionName, productName, imageSrc, oldPrice, newPrice, _pageType});
			}
			catch(err) {
				console.log("there was an error lmao");
			}

		}
		return allProducts;
		
	
		
	}).catch(err => {
		console.log("There was an error in evaluating the webpage!:", err)
	});

	browser.close();
	return items;
}
/*
print('Running ulta Scrapper');
ultaScrapper().then( (items) => {
	console.log(items);
	console.log("Num Items: ", items.length);
}).catch(err => {
	console.log("There was an error rerieving the data", err);
});*/

module.exports = { ultaScrapper };

