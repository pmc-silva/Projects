import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { NovelCovid } from 'novelcovid';
import CountryChart from './Charts/countryChart';
import './countryData.css';

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
		const tempHistoricalArray = historyArray.timeline;

		const dates = Object.keys(tempHistoricalArray.cases);

		return dates.map((item) => ({
			date: new Date(item).toLocaleDateString('en-En', {
				day: 'numeric',
				month: 'short',
			}),
			cases: tempHistoricalArray.cases[item],
			deaths: tempHistoricalArray.deaths[item],
			recovered: tempHistoricalArray.recovered[item],
		}));
	};

	render() {
		const { historicalData } = this.state;
		return (
			<Container
				className={
					this.props.location.dayLight ? 'bg-dark' : 'bg-white'
				}
				fluid
			>
				{Object.keys(this.state.countriesData).length > 0 ? (
					<div id="countryDataContainer">
						<Row>
							<Col xs={{ span: 6, offset: 2 }}>
								<Row>
									<h1
										className={
											this.props.location.dayLight
												? 'text-white'
												: 'text.dark'
										}
									>
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
										id="countryFlagData"
									></img>
								</Row>
							</Col>
							<Col xs={{ span: 3, offset: 2 }}>
								<Row
									className={
										this.props.location.dayLight
											? 'text-white'
											: 'text.dark'
									}
								>
									<h6>
										LIVE{'  '}
										<i
											className="fa fa-circle text-danger"
											aria-hidden="true"
										></i>
										{'  '}
										{new Date(
											this.state.countriesData.updated
										).toLocaleDateString()}
									</h6>
								</Row>
								<Row>
									<p className="text-info">
										Cases:{'  '}
										{new Intl.NumberFormat('ru-RU', {
											style: 'decimal',
										}).format(
											`${this.state.countriesData.todayCases}`
										)}
									</p>
								</Row>
								<Row>
									<p className="text-danger">
										Deaths:{'  '}
										{new Intl.NumberFormat('ru-RU', {
											style: 'decimal',
										}).format(
											`${this.state.countriesData.todayDeaths}`
										)}
									</p>
								</Row>
								<Row>
									<p className="text-warning">
										Tests:{'  '}
										{new Intl.NumberFormat('ru-RU', {
											style: 'decimal',
										}).format(
											`${this.state.countriesData.tests}`
										)}
									</p>
								</Row>
							</Col>
							<Col xs={{ span: 3, offset: 2 }}>
								<Row>
									<h6
										className={
											this.props.location.dayLight
												? 'text-white'
												: 'text.dark'
										}
									>
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
								dayLight={this.props.location.dayLight}
							></CountryChart>
						</Row>
						<Row>
							<Link to={`/`}>
								<Button id="homeButton">Home</Button>
							</Link>
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
