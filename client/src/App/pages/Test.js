import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Test extends Component {
	render() {
		return (
			<div className="App">
				<h1>test DB</h1>
				{/* test DB */}
				
				<label>Name</label><input type='text'/><br/>
				<label>PassWord</label><input type='text' type="password"/><br/>
				
				<Link to={'./testdb'}>
					<button variant="raised">DBTest</button>
				</Link>
			</div>
		);
	}
}
export default Test;