import React, { Component } from 'react';
import MainArea from './mainArea';
import CountryData from './countryData';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

class App extends Component {
	render() {
		return (
			<Router>
				<div className="App">
					<Switch>
						<Route exact path="/" component={MainArea} />
						<Route
							path="/countryData/:country"
							component={CountryData}
						/>
					</Switch>
				</div>
			</Router>
		);
	}
}

export default App;
