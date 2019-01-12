import React, { Component } from 'react';
import './App.css';
import image from './images/bannerOne.jpg';
class App extends Component {
	state = {
		data: null,
		products: null,
		brands: null
	};
	
	componentDidMount() {
		//call fetch once component mounts
		this.callBackendAPI()
		.then( res => this.setState({
			//collectionName: res.express[0]['collectionName'],
			//productName: res.express[0]['productName']
			data: res[0],
			products: res[1],
			brands: res[2]
		}))
		.catch(err => console.log(err));
	}

	onClick(a){
		console.log(a);
		let val = this.fd(a);
		this.setState({
			products: val
		})
	}

	fd(product) {
		let table = []
		let data = this.state['data']
		console.log(product);
		let len = 0;
		try {
			len = data.length;
		}
		catch(err){
			console.log("no tu");
		}
		for(let i = 0; i < len; i++) {
			if (data[i]['collectionName'] === product)
				table.push(data[i]['collectionName']) ;
		}
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
			//append product name if it doesnt exist in the dict
			if(!exist[collectionName]) {
				exist[collectionName] = true;
				productBrands.push(
					<p>	
						<a onClick={() => this.onClick(body.express[i]['collectionName'])}>
						{collectionName}
						</a>
					</p>
					
				);
			}
			if(newPrice !== "") {
			table.push(
			<div style={{"width": "25%", "border":".2px solid grey"}}>
					<div>
							<img src={imgSrc} alt={productName} width="100" height="100"/> 
						<br/>		
								<b>{collectionName} </b>
						<br/>
								{productName}
						<br/>
								<strike>{oldPrice}</strike> <b style={{color:"#DC143C"}}>{newPrice}</b>
					</div>
			</div>
			);
			}
			else {
			table.push(
			<div style={{"width": "24%", "border":"1px solid black"}}>
					<div>
							<img src={imgSrc} alt={productName} width="100" height="100"/> 
						<br/>		
								{collectionName} 
						<br/>
								{productName}
						<br/>
								{oldPrice} 
					</div>
			</div>
			);
		}
			//children.push(<td>{`Column ${j + 1}`}</td>)
		}
		//return body;
		console.log(table);
		console.log(productBrands);
		var all = []
		all.push(body.express);
		all.push(table);
		all.push(productBrands);
		return all;
	};

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
 						<b>BEAUTY BABES</b>						
						<br/>
						<font size="2">Makeup Lovers on a Budget</font>
          </p>
			
					{/* navbar */}
					<div style={{'display':'flex', 'justifyContent':'center', 'fontSize':'11px', 'paddingBottom':'13px'}}>
						<a href="localhost:3000/" style={{'textDecoration':'none', 'color':'#202020', 'paddingRight':'13px'}}>
							 All Products
						</a>
						
						<a href="localhost:3000/" style={{'textDecoration':'none', 'color':'#202020', 'paddingRight':'13px'}}>
							{" "}Eyes 
						</a>

						<a href="localhost:3000/" style={{'textDecoration':'none', 'color':'#202020', 'paddingRight':'13px'}}>
						 Lips
						</a>
						
						<a href="localhost:3000/" style={{'textDecoration':'none', 'color':'#202020', 'paddingRight':'13px'}}>
							Face
						</a>
						
						<a href="localhost:3000/" style={{'textDecoration':'none', 'color':'#202020', 'paddingRight':'13px'}}>
							SkinCare 
						</a>
						<a href="localhost:3000/" style={{'textDecoration':'none', 'color':'#202020', 'paddingRight':'13px'}}>
						 Beauty Tools 
						</a>
						<a href="localhost:3000/" style={{'textDecoration':'none', 'color':'#202020', 'paddingRight':'13px'}}>
						Nails
						</a>
						<a href="localhost:3000/" style={{'textDecoration':'none', 'color':'#202020', 'paddingRight':'13px'}}>
						Palette & Sets 
						</a>
						
					</div>
						<img src={image} alt="banner One" width="900" height="300"/> 
				<div style={{'display':'flex','paddingLeft': '25px', 'paddingRight':'25px'}}>
					{/* filters */}
					<div style={{'paddingRight':'130px'}}>
						<b style={{'fontSize':'13px'}}>Filter By</b>
						<br/>
						<font size="3">Brand</font>
						{this.state.brands}
					</div>

					<div style={{'display': 'flex ','flexDirection':'row', 'flexWrap': 'wrap', 'alignContent': 'space-between', 'justifyContent': 'space-between', 'fontSize': '9px'}}>
					{this.state.products}
					</div>

				</div>
        </header>
			{/*render new data*/}
			{/* <p> {this.state.collectionName} </p> */}
			{/*<p> {this.state.productName} </p> */}
     </div>
    );
  }
}

export default App;
