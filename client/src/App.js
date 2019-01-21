import React,{ Component} from 'react';
import './App.css'; 
import modelImage from './images/model.png';
import loadingImage from './images/loading.gif';
import { MdPerson, MdMenu} from "react-icons/md";
import { FaShoppingBag } from "react-icons/fa";
import Select from "react-select";
//import { IoIosHeart } from "react-icons/io";
import { BrowserView, MobileView,isMobile } from "react-device-detect";


const customStyles = {
		control: () => ({ 
			display: 'flex',
			width: 150,
		})
}

function generatePrices(oldPrice,newPrice) {
	if(newPrice !== "") {
		return (
			<div className="prices-div">
				<strike>{oldPrice}</strike> {" "} <b className="prices-text">{newPrice}</b>
			</div>
		);
	}

	return (
		<div className="prices-div">
			<b className="prices-text">{oldPrice} </b>
		</div>
	);
}


function generateItemBox(props) {
	var collectionName = props['collectionName'];
	var productName = props['productName'];
	var imgSrc = props['imageSrc'];
	var oldPrice = props['oldPrice'];
	var newPrice = props['newPrice'];
	var pricesText = generatePrices(oldPrice, newPrice);
	if (isMobile) {
		return (
			<div className="product-box-mobile">
				<div className="product-box-image">
					<img src={imgSrc} alt={productName} width="100" height="100"/> 
				</div>
	
				<div className="product-info-mobile">
					<br/>		
					<b>{collectionName} </b>
					<br/>
					{productName}
					<br/>
					{pricesText}
				</div>
			</div>

		);
	}
	
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
				{pricesText}
			</div>
		</div>
	
	);
}

class App extends Component {
	sortOptions = [
		{label:"Price: Low To High" , value:"LowToHigh"},
		{label:"Price: High To Low" , value:"HighToLow"},
		{label:"Alphabetical: A-Z" , value:"A-Z"},
		{label:"Alphabetical: Z-A" , value:"Z-A"},
	];

	state = {
		data: null,
		products: null,
		brands: null,
		brandsForSelect: [],
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

	test = {
		currentPage: null,
	}

	
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
			brandsForSelect: res[4],
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

	onSelectClick = (currentPage) => {
		this.onClick(currentPage['value']);
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
				/*
				var collectionName = data[i]['collectionName'];
				var productName = data[i]['productName'];
				var imgSrc = data[i]['imageSrc'];
				var oldPrice = data[i]['oldPrice'];
				var newPrice = data[i]['newPrice'];
				*/
				table.push(generateItemBox(data[i]));

			}
		}
		this.setState({
			numProducts: size
		});
		return table;
	}

	openNav() {
		try {
				document.getElementById("side-nav").style.width = "65%";
		}
		catch(err) {
			console.log("no");
		}
	}

	closeNav() {
		try {
				document.getElementById("side-nav").style.width = "0%";
		}
		catch(err) {
			console.log("no");
		}
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
		let brandsForSelect = [];	

		for(let  i = 0; i < body.express.length; i++) {
			var collectionName = body.express[i]['collectionName'];
			/*
			var productName = body.express[i]['productName'];
			var imgSrc = body.express[i]['imageSrc'];
			var oldPrice = body.express[i]['oldPrice'];
			var newPrice = body.express[i]['newPrice'];
			*/
			var props = body.express[i]; 

			//append product name if it doesnt exist in the dict
			if(!exist[collectionName]) {

				exist[collectionName] = true;

				productBrands.push(
						<button className="button-style" onClick={() => this.onClick(body.express[i]['collectionName'])}  href={collectionName}>
						{collectionName}
						</button>
				);
				brandsForSelect.push({value: collectionName, label: collectionName});
			}
			table.push(generateItemBox(props));
		}
	
		//append all parts
		var all = []
		all.push(body.express);
		all.push(table);
		all.push(productBrands);
		all.push(body.express.length);
		all.push(brandsForSelect);
		console.log(brandsForSelect);
		return all;
	};

	renderHeader() {
		if (isMobile) {
			return (
				<header className="App-mobile-header">


          <div style={{"display":"flex", "justifyContent":"space-between", "paddingLeft":"1em", "paddingRight":"1em", "paddingTop":".7em"}}>
	
						<div>
							<div style={{"display":"flex", "flexDirection":"column", "alignItems":"center"}}>
								<MdMenu size="1.7em" onClick={this.openNav}/>
							</div>
						</div>

						<div className="Header-brand-text">
 							<b style={{"fontSize":"1.5em"}}>BEAUTY BABES</b>						
							<font size="1" color="#202020">Makeup Lovers on a Budget</font>
						</div>

						<div style={{"display":"flex","justifyContent":"space-between","width":"12%"}}>
							<FaShoppingBag size="1.7em"/>
							<br/> 
						</div>

					</div>
				</header>
 			);
		}
	
		return (
        <header className="App-header">
				<div>
          <div style={{"display":"flex", "justifyContent":"space-between", "paddingLeft":"1em", "paddingRight":"1em", "paddingTop":".7em"}}>
						<MdMenu width=".7em" height=".7em"/>

						<div className="Header-brand-text">
 							<b>BEAUTY BABES</b>						
							<font size="1" color="#202020">Makeup Lovers on a Budget</font>
						</div>

						<div style={{"display":"flex","justifyContent":"space-between","width":"6%"}}>
							<FaShoppingBag size=".7em"/>
							<br/> 
							<MdPerson size=".7em"/>
							<br/> 
						</div>

          </div>
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
		)
	}

	/* navbar */
	renderNavBar() {
		if ( !isMobile) {
		return (
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
		)
	}

	}

  render() {
		const { currentPage } = this.test;
		if (this.state.isLoading) {
			return(
      <div className="App">
        {this.renderHeader()}
				{this.renderNavBar()}
			
					<div style={{"display":"flex","flexDirection":"column", "alignItems":"center"}}>
						<img style={{"height":"5em","width":"5em","paddingBottom":"1em"}} src={loadingImage} alt="loading webpage"/>
						<font size="2"> loading content please wait...</font>
					</div>
			</div>
			);
		}

    return (
      <div className="App">
				<div id="side-nav" className="side-nav">
						<div style={{"paddingBottom":"1em","whiteSpace":"nowrap"}}>BEAUTY BABES</div>
					<div className="side-nav-contents">

						<div className="side-nav-content">
							HOME
						</div>
						<div className="side-nav-content">
							MAKEUP
						</div>
						<div className="side-nav-content">
							SKIN CARE
						</div>
						<div className="side-nav-content">
							MEN
						</div>
						<div className="side-nav-content">
							TOOLS
						</div>
					</div>
				</div>
				{this.renderHeader()}
				<div onClick={this.closeNav}>
				{this.renderNavBar()}
				<BrowserView>
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
				</BrowserView>

				<MobileView>
					<div>

						<div className="filters-mobile-div">

							<div style={{"position":"relative", "top":".5em"}}>
								Brand 
							</div>
							<Select
								value = {currentPage}
								options={this.state.brandsForSelect}
								onChange={this.onSelectClick}
								styles={customStyles}
								isSearchable = {false}
							/>

							<div style={{"position":"relative", "top":".5em"}}>
								Sort 
							</div>
							<Select 
								options= {this.sortOptions} 
								styles={customStyles}
								isSearchable = {false}
							/>

						</div>

						<div className="product-header">
							<b style={{'fontSize':'.7em'}}> <font color="#880000">{this.state.numProducts}</font> PRODUCTS FOUND </b>
						</div>
				
						<div className="items-mobile">
							{this.state.products}
						</div>

					</div>
				</MobileView>
			</div>
     </div>
    );
  }
}

export default App;
