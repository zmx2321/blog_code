import React from 'react'
import ReactDOM from 'react-dom'

class Title extends React.Component {
	render(){
		return (<div>
				<span>{this.props.setMsg}</span>
			</div>)
	}
}

export default Title;