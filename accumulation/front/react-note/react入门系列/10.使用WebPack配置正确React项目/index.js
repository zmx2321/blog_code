import React from 'react'
import ReactDOM from 'react-dom'
import Title from './Title.js'

//import React from 'react'

//let a =<div></div>;

class Leo extends React.Component{
	constructor(){
		super();
		this.state ={
			msg:'hello react!'
		}
	}
	show(){
		console.log(1)
	}
	render(){
		return (<div>
				<Title setMsg={this.state.msg}/>
				<input type='button' onClick={this.show.bind(this)}/>
			</div>)
	}
}


ReactDOM.render(<Leo/>,document.getElementById('app'))

//let a = 10;
//alert(1);
/*
var a = 10,b = 'react!!~~~~';
document.write(a + b);
*/ 
/*
require('./index.css');
*/
/*
import json,{
	a,b,c
} from './a'

console.log(json.a)//'hello'
console.log(json.b)//'webpack'

console.log(a)//5
console.log(b)//10
console.log(c)//15
*/