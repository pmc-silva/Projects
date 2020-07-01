import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { NovelCovid } from 'novelcovid';
import CountryChart from './Charts/countryChart';

class CountryData extends Component {
	constructor(props) {
		super(props);
		this.state = {
			countriesData: {},
			historicalData: {},
		};
		this.api = new NovelCovid();
	}

	async componentDidMount() {
		const countriesData = await this.api.countries(
			this.props.match.params.country
		);
		const historicalData = await this.api.historical(
			null,
			this.props.match.params.country
		);

		this.setState({
			countriesData,
			historicalData,
		});
	}

	sendHistoricalData = (historyArray) => {
		let result = [];
		const tempHistoricalArray = historyArray.timeline;

		//console.log(Object.keys(tempHistoricalArray));

		for (const [type] of Object.entries(tempHistoricalArray)) {
			for (const [date, value] of Object.entries(
				tempHistoricalArray[type]
			)) {
				result.push({
					date: `${date}`,
					[type]: `${value}`,
				});
			}
		}
		return result;
	};
	render() {
		const { historicalData } = this.state;
		return (
			<Container className="bg-dark" fluid={true}>
				{Object.keys(this.state.countriesData).length > 0 ? (
					<div id="countryDataContainer">
						<Row>
							<Col xs="6">
								<Row>
									<h1 className="text-white">
										{this.state.countriesData.country}
									</h1>
								</Row>
								<Row>
									<img
										alt="Country flag"
										src={
											this.state.countriesData.countryInfo
												.flag
										}
										id="countryFlag"
									></img>
								</Row>
							</Col>
							<Col xs="3">
								<Row className="text-white">
									<h6>
										LIVE{' '}
										<i
											className="fa fa-circle text-danger"
											aria-hidden="true"
										></i>{' '}
										{new Date(
											this.state.countriesData.updated
										).toLocaleDateString()}
									</h6>
								</Row>
								<Row>
									<p className="text-info">
										Cases:{' '}
										{new Intl.NumberFormat('ru-RU', {
											style: 'decimal',
										}).format(
											`${this.state.countriesData.todayCases}`
										)}
									</p>
								</Row>
								<Row>
									<p className="text-danger">
										Deaths:{' '}
										{new Intl.NumberFormat('ru-RU', {
											style: 'decimal',
										}).format(
											`${this.state.countriesData.todayDeaths}`
										)}
									</p>
								</Row>
								<Row>
									<p className="text-warning">
										Tests:{' '}
										{new Intl.NumberFormat('ru-RU', {
											style: 'decimal',
										}).format(
											`${this.state.countriesData.tests}`
										)}
									</p>
								</Row>
							</Col>
							<Col xs="3">
								<Row>
									<h6 className="text-white">
										Per 1 Million
									</h6>
								</Row>
								<Row>
									<p className="text-info">
										Cases:{' '}
										{new Intl.NumberFormat('ru-RU', {
											style: 'decimal',
										}).format(
											`${this.state.countriesData.casesPerOneMillion}`
										)}
									</p>
								</Row>
								<Row>
									<p className="text-danger">
										Deaths:{' '}
										{new Intl.NumberFormat('ru-RU', {
											style: 'decimal',
										}).format(
											`${this.state.countriesData.deathsPerOneMillion}`
										)}
									</p>
								</Row>
								<Row>
									<p className="text-warning">
										Tests:{' '}
										{new Intl.NumberFormat('ru-RU', {
											style: 'decimal',
										}).format(
											`${this.state.countriesData.testsPerOneMillion}`
										)}
									</p>
								</Row>
							</Col>
						</Row>
						<Row>
							<CountryChart
								historyArray={() =>
									this.sendHistoricalData(historicalData)
								}
							></CountryChart>
						</Row>
					</div>
				) : (
					'Loading'
				)}
			</Container>
		);
	}
}

export default CountryData;
