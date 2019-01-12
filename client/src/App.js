import React,{ Component} from 'react';
import './App.css'; 
import modelImage from './images/model.png';
import loadingImage from './images/loading.gif';
import { MdPerson, MdMenu} from "react-icons/md";
import { FaShoppingBag } from "react-icons/fa";
import { IoIosHeart } from "react-icons/io";
function generateItemBoxNoPrice(props) {
	var collectionName = props['collectionName'];
	var productName = props['productName'];
	var imgSrc = props['imageSrc'];
	var oldPrice = props['oldPrice'];
	return (
		<div className="product-box">
					<div className="product-box-image">
							<img src={imgSrc} alt={productName} width="100" height="100"/> 
					</div>

					<div className="product-info">
						<br/>		
								<b>{collectionName}</b> 
						<br/>
								{productName}
						<br/>

						<div className="prices-div">
								{oldPrice} 
						</div>

					</div>
			</div>
	);
}

function generateItemBox(props) {
	var collectionName = props['collectionName'];
	var productName = props['productName'];
	var imgSrc = props['imageSrc'];
	var oldPrice = props['oldPrice'];
	var newPrice = props['newPrice'];
	return (
			<div className="product-box">

					<div className="product-box-image">
							<img src={imgSrc} alt={productName} width="100" height="100"/> 
					</div>
	
					<div className="product-info">
						<br/>		
								<b>{collectionName} </b>
						<br/>
								{productName}
						<br/>

						<div className="prices-div">
								<strike>{oldPrice}</strike> {" "}<b style={{color:"#DC143C"}}>{newPrice}</b>
						</div>

					</div>

			</div>
	);
}

class App extends Component {
	state = {
		data: null,
		products: null,
		brands: null,
		allProducts: null,
		numProducts: null,
		numOfAllProducts: null,
		currentPage: "ALL PRODUCTS",
		makeup: null,
		skinCare: null,
		fragrence: null,
		hair: null,
		bathAndBody: null,
		toolsAndBrushes: null,
		men: null,
		minisize: null,
		isLoading: true
	};
	
	componentDidMount() {
		//call fetch once component mounts
		this.callBackendAPI()
		.then( res => this.setState({
			//collectionName: res.express[0]['collectionName'],
			//productName: res.express[0]['productName']
			data: res[0],
			products: res[1],
			brands: res[2],
			allProducts: res[1],
			numProducts: res[3],
			numOfAllProducts: res[3],
			isLoading: false
		}))
		.catch(err => console.log(err));
	}

	onClick(brand) {
		let val = [];
		if(brand!=="all") {
			val = this.generateBrandPage(brand);
			this.setState({
				products: val,
				currentPage: brand
			});
		}

		else {
			 val = this.state['allProducts'];
				this.setState({
					numProducts: this.state['numOfAllProducts'],
					products: val,
					currentPage: "ALL PRODUCTS"
				});
		}
	}

	generateBrandPage(product) {
		let table = []
		let data = this.state['data']
		let len = 0;
		let size = 0;
		try {
			len = data.length;
		}
		catch(err){
			console.log("no tu");
		}
		for(let i = 0; i < len; i++) {
			if (data[i]['collectionName'] === product) {
				size = size + 1;
				var collectionName = data[i]['collectionName'];
				var productName = data[i]['productName'];
				var imgSrc = data[i]['imageSrc'];
				var oldPrice = data[i]['oldPrice'];
				var newPrice = data[i]['newPrice'];

				if(newPrice !== "") {
					table.push(generateItemBox(data[i]));
				}
				else {
					table.push(generateItemBoxNoPrice(data[i]));
				}

			}
		}
		this.setState({
			numProducts: size
		});
		return table;
	}

	callBackendAPI = async() => {
		const response = await fetch('/express_backend');
		const body = await response.json();
		
		if(response.status !== 200) {
			throw Error(body.message);
		}

		let table = [];
		let exist = {};
		let productBrands = [];
		
		for(let  i = 0; i < body.express.length; i++) {
			var collectionName = body.express[i]['collectionName'];
			var productName = body.express[i]['productName'];
			var imgSrc = body.express[i]['imageSrc'];
			var oldPrice = body.express[i]['oldPrice'];
			var newPrice = body.express[i]['newPrice'];
			var props = body.express[i]; 
			//append product name if it doesnt exist in the dict
			if(!exist[collectionName]) {
				exist[collectionName] = true;
				productBrands.push(
						<button className="button-style" onClick={() => this.onClick(body.express[i]['collectionName'])}  href={collectionName}>
						{collectionName}
						</button>
				);
			}
			if(newPrice !== "") {
				table.push(generateItemBox(props));
			}

			else {
			table.push(generateItemBoxNoPrice(props));
			}
		}
	
		//append all parts
		var all = []
		all.push(body.express);
		all.push(table);
		all.push(productBrands);
		all.push(body.express.length);
		return all;
	};

  render() {
		if (this.state.isLoading) {
			return(
      <div className="App">
        <header className="App-header">
				<div>
          <div style={{"display":"flex", "justifyContent":"space-between", "paddingLeft":"1em", "paddingRight":"1em", "paddingTop":".7em"}}>
						<MdMenu width=".7em" height=".7em"/>
 						<b>BEAUTY BABES</b>						

						<div style={{"display":"flex","justifyContent":"space-between","width":"6%"}}>
							<FaShoppingBag size=".7em"/>
							<br/> 
							<MdPerson size=".7em"/>
							<br/> 
						</div>

          </div>
					<font size="1" color="#202020">Makeup Lovers on a Budget</font>
				</div>

				<div style={{"display":"flex","flexDirection":"row"}}>

					<div className="Header-text" >

					<font size="2" color="#A0A0A0">Home / </font><font size="2" color="#585858">{this.state.currentPage.toLowerCase()}</font>
					<br/>
					<b><font size="6">{this.state.currentPage}</font></b>

					</div>

					<div>
						<img src={modelImage} alt="banner One" className="banner"/> 
					</div>

				</div>

				</header>
			
				{/* navbar */}
				<div className="nav-bar nav-links">
					<a href="#All Products" className="nav-links" onClick={() =>this.onClick('all')}>
						All Products	
					</a>
						
					<a href="localhost:3000/#Makeup" className="nav-links">
						Makeup 
					</a>
 
					<a href="localhost:3000/" className="nav-links">
						SkinCare
					</a>
						
					<a href="localhost:3000/" className="nav-links">
						Fragrence
					</a>
						
					<a href="localhost:3000/" className="nav-links">
						Hair 
					</a>

					<a href="localhost:3000/" className="nav-links">
						Brushes & Tools 
					</a>

					<a href="localhost:3000/" className="nav-links">
						Beauty Tools 
					</a>
					<a href="localhost:3000/" className="nav-links">
						Men 
					</a>
					<a href="localhost:3000/" className="nav-links">
						Mini Size 
					</a>
						
				</div>
					<div style={{"display":"flex","flexDirection":"column", "alignItems":"center"}}>
						<img style={{"height":"5em","width":"5em","paddingBottom":"1em"}} src={loadingImage}/>
						<font size="2"> loading content please wait...</font>
					</div>
			</div>
			);


		}

    return (
      <div className="App">
        <header className="App-header">
				<div>
          <div style={{"display":"flex", "justifyContent":"space-between", "paddingLeft":"1em", "paddingRight":"1em", "paddingTop":".7em"}}>
						<MdMenu width=".7em" height=".7em"/>
 						<b>BEAUTY BABES</b>						

						<div style={{"display":"flex","justifyContent":"space-between","width":"6%"}}>
							<FaShoppingBag size=".7em"/>
							<br/> 
							<MdPerson size=".7em"/>
							<br/> 
						</div>

          </div>
					<font size="1" color="#202020">Makeup Lovers on a Budget</font>
				</div>

				<div style={{"display":"flex","flexDirection":"row"}}>

					<div className="Header-text" >

					<font size="2" color="#A0A0A0">Home / </font><font size="2" color="#585858">{this.state.currentPage.toLowerCase()}</font>
					<br/>
					<b><font size="6">{this.state.currentPage}</font></b>

					</div>

					<div>
						<img src={modelImage} alt="banner One" className="banner"/> 
					</div>

				</div>

				</header>
			
				{/* navbar */}
				<div className="nav-bar nav-links">
					<a href="#All Products" className="nav-links" onClick={() =>this.onClick('all')}>
						All Products	
					</a>
						
					<a href="localhost:3000/#Makeup" className="nav-links">
						Makeup 
					</a>
 
					<a href="localhost:3000/" className="nav-links">
						SkinCare
					</a>
						
					<a href="localhost:3000/" className="nav-links">
						Fragrence
					</a>
						
					<a href="localhost:3000/" className="nav-links">
						Hair 
					</a>

					<a href="localhost:3000/" className="nav-links">
						Brushes & Tools 
					</a>

					<a href="localhost:3000/" className="nav-links">
						Beauty Tools 
					</a>
					<a href="localhost:3000/" className="nav-links">
						Men 
					</a>
					<a href="localhost:3000/" className="nav-links">
						Mini Size 
					</a>
						
				</div>

				{/*<img src={image} alt="banner One" className="banner"/> */}

				{/* PRODUCT DIVS */}
				<div className="items-div">

					{/* filters */}
					<div className="filters-div">
						<b style={{'fontSize':'13px'}}>Filter By</b>
						<br/>
						<br/>
						<br/>
						<b style={{'fontSize':'12px'}}> Brands</b>
						<br/>
						{this.state.brands}
					</div>

					<div>
						<div className="product-header">
							<b style={{'fontSize':'9px'}}> <font color="#880000">{this.state.numProducts}</font> PRODUCTS FOUND </b>
							
						</div>

						<div style={{'display': 'flex ','flexDirection':'row', 'flexWrap': 'wrap' , 'fontSize': '9px', 'jusfiyContent':'center'}}>
							{this.state.products}
						</div>
					</div>

				</div>

     </div>
    );
  }
}

export default App;
