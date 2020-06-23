import React, { Component } from 'react';
import { Container, Row, Col, Spinner } from 'reactstrap';
import Map from './Map/map';
import Chart from './Chart/chart';
import Tabs from './tabs';
import { NovelCovid } from 'novelcovid';

class MainArea extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tab: '1',
			color: 'blue',
			dataToShow: 'cases',
			sortOrder: 1,
			allData: {},
			countriesData: {},
		};
		this.api = new NovelCovid();
	}

	async componentDidMount() {
		const allData = await this.api.all();
		const countriesData = await this.api.countries();
		countriesData.sort(this.dynamicSort(false));
		this.setState({ countriesData, allData });
	}

	changeData = (tabNumber) => {
		switch (tabNumber) {
			case '2':
				this.setState({
					tab: tabNumber,
					color: 'red',
					dataToShow: 'deaths',
					sortOrder: 1,
				});
				break;
			case '3':
				this.setState({
					tab: tabNumber,
					color: 'green',
					dataToShow: 'recovered',
					sortOrder: 1,
				});
				break;
			default:
				this.setState({
					tab: tabNumber,
					color: 'blue',
					dataToShow: 'cases',
					sortOrder: 1,
				});
				break;
		}
		this.handleSortClick(this.state.countriesData, false);
	};

	dynamicSort = (dynamic) => {
		let newSortOrder = 1;
		const property = this.state.dataToShow;
		if (dynamic) {
			newSortOrder = this.state.sortOrder * -1;
			this.setState({ sortOrder: newSortOrder });
		}

		return function (a, b) {
			var result =
				a[property] < b[property]
					? -1
					: a[property] > b[property]
					? 1
					: 0;
			return result * newSortOrder;
		};
	};

	handleSortClick = (array, dynamic) => {
		const newCountriesData = array.sort(this.dynamicSort(dynamic));
		this.setState(
			(previousState) => (previousState.countriesData = newCountriesData)
		);
	};

	changeCountriesData = () => {
		return this.state.countriesData.map((c) => ({
			lat: c.countryInfo.lat,
			long: c.countryInfo.long,
			number: c[this.state.dataToShow],
		}));
	};

	render() {
		const { allData, countriesData, dataToShow, color, tab } = this.state;
		return (
			<Container fluid>
				<Row>
					<Col sm="4">
						{Object.keys(allData).length > 0 &&
						Object.keys(countriesData).length > 0 ? (
							<Tabs
								onTabChange={(tab) => this.changeData(tab)}
								onSortClick={() =>
									this.handleSortClick(countriesData, true)
								}
								colorState={color}
								whatToShow={dataToShow}
								tab={tab}
								allData={allData[dataToShow]}
								countriesData={countriesData}
							></Tabs>
						) : (
							<Spinner color="dark" />
						)}
					</Col>
					<Col sm="8">
						<Row>
							{Object.keys(countriesData).length > 0 ? (
								<Map
									color={color}
									whatToShow={dataToShow}
									valuesArray={this.changeCountriesData()}
								/>
							) : (
								<Spinner color="dark" />
							)}
						</Row>

						<Row>
							<Chart />
						</Row>
					</Col>
				</Row>
			</Container>
		);
	}
}

export default MainArea;
