import React, { Component } from 'react';
import MainArea from './mainArea';
import CountryData from './countryData';
import NoMatch from './nomatch';
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
						<Route component={NoMatch} />
					</Switch>
				</div>
			</Router>
		);
	}
}

export default App;
