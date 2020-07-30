import React, { Component } from 'react';
import { Container } from 'reactstrap';
import './countryData.css';

class NoMatch extends Component {
	render() {
		return (
			<Container
				className={
					this.props.location.dayLight ? 'bg-dark' : 'bg-white'
				}
				fluid
			>
				<div id="countryDataContainer">
					<h1>No data found</h1>
				</div>
			</Container>
		);
	}
}

export default NoMatch;
