import React, { Component } from 'react';
import { Container, Row, Col, Spinner, Input } from 'reactstrap';
import Map from './Map/map';
import Chart from './Charts/chart';
import Tabs from './tabs';
import { NovelCovid } from 'novelcovid';
import './mainArea.css';
import InputBar from './inputBar';

class MainArea extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tab: '1',
			color: 'blue',
			dataToShow: 'cases',
			searchText: null,
			sortOrder: 1,
			allData: {},
			countriesData: {},
			historicalData: {},
			filteredCountries: {},
		};
		this.api = new NovelCovid();
	}

	async componentDidMount() {
		const allData = await this.api.all();
		const countriesData = await this.api.countries(null, {
			sort: `${this.state.dataToShow}`,
		});
		const historicalData = await this.api.historical(true);
		this.setState({
			filteredCountries: countriesData,
			countriesData,
			allData,
			historicalData,
		});
	}

	changeData = (tabNumber, countriesData) => {
		if (tabNumber !== this.state.tab) {
			let orderedCountries = {};
			switch (tabNumber) {
				case '2':
					orderedCountries = countriesData.sort(
						this.dynamicSort('deaths', false)
					);
					this.setState({
						color: 'red',
						dataToShow: 'deaths',
					});
					break;
				case '3':
					orderedCountries = countriesData.sort(
						this.dynamicSort('recovered', false)
					);
					this.setState({
						color: 'green',
						dataToShow: 'recovered',
					});
					break;
				default:
					orderedCountries = countriesData.sort(
						this.dynamicSort('cases', false)
					);
					this.setState({
						color: 'blue',
						dataToShow: 'cases',
					});
					break;
			}
			this.setState({
				tab: tabNumber,
				sortOrder: 1,
				countriesData: orderedCountries,
			});
		}
	};

	dynamicSort = (property, dynamic) => {
		let newSortOrder = 1;
		if (dynamic) {
			newSortOrder = this.state.sortOrder * -1;
			this.setState({ sortOrder: newSortOrder });
		}

		return function (a, b) {
			var result =
				a[property] < b[property]
					? 1
					: a[property] > b[property]
					? -1
					: 0;
			return result * newSortOrder;
		};
	};

	handleSortClick = (array, dynamic) => {
		const newCountriesData = array.sort(
			this.dynamicSort(this.state.dataToShow, dynamic)
		);
		this.setState({ countriesData: newCountriesData });
	};

	changeCountriesData = () => {
		return this.state.filteredCountries.map((c) => ({
			lat: c.countryInfo.lat,
			long: c.countryInfo.long,
			number: c[this.state.dataToShow],
		}));
	};

	sendHistoricalData = (historyArray) => {
		let result = [];
		const tempHistoricalArray = Object.values(historyArray)[
			this.state.tab - 1
		];

		for (const [date, value] of Object.entries(tempHistoricalArray)) {
			result.push({
				date: `${date}`,
				value: `${value}`,
			});
		}

		return result;
	};

	filterCountriesData = (newFilter, array) => {
		const filteredArray = array.filter((item) =>
			item.country.toUpperCase().includes(newFilter.toUpperCase())
		);
		this.setState({ filteredCountries: filteredArray });
	};

	setColorType = (color) => {
		switch (color) {
			case 'red':
				return 'danger';
			case 'green':
				return 'success';
			default:
				return 'primary';
		}
	};

	render() {
		const {
			allData,
			countriesData,
			dataToShow,
			color,
			tab,
			sortOrder,
			historicalData,
			filteredCountries,
		} = this.state;
		return (
			<Container className="bg-dark" fluid>
				<Row>
					<InputBar
						onSortClick={() =>
							this.handleSortClick(filteredCountries, true)
						}
						order={sortOrder}
						filterCountries={(text) =>
							this.filterCountriesData(text, countriesData)
						}
						colorType={this.setColorType(color)}
					></InputBar>
				</Row>
				<Row>
					<Col md="4" className="bg-white" id="covidList">
						{Object.keys(allData).length > 0 &&
						Object.keys(countriesData).length > 0 ? (
							<Tabs
								onTabChange={(tab) => {
									this.changeData(tab, countriesData);
								}}
								order={sortOrder}
								colorState={color}
								colorType={this.setColorType(color)}
								whatToShow={dataToShow}
								tab={tab}
								allData={allData[dataToShow]}
								countriesData={filteredCountries}
							></Tabs>
						) : (
							<Spinner color="dark" />
						)}
					</Col>
					<Col>
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
							{Object.keys(historicalData).length > 0 ? (
								<Chart
									color={color}
									dataToShow={dataToShow}
									historyArray={() =>
										this.sendHistoricalData(historicalData)
									}
								/>
							) : (
								<Spinner color="dark" />
							)}
						</Row>
					</Col>
				</Row>
			</Container>
		);
	}
}

export default MainArea;
