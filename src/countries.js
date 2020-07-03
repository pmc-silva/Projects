import React, { Component } from 'react';
import { Table, Row, Col } from 'reactstrap';
import './countries.css';
import { Link } from 'react-router-dom';

class Countries extends Component {
	render() {
		return (
			<div id="countriesList">
				<Table
					hover
					striped
					className={this.props.dayLight ? 'bg-white' : 'bg-dark'}
				>
					<tbody>
						{this.props.countriesDataArray.map((item) => (
							<Link
								to={{
									pathname: `/countryData/${item.country}`,
									dayLight: this.props.dayLight,
								}}
							>
								<Row>
									<Col>
										<tr>
											<td align="left">
												{new Intl.NumberFormat(
													'ru-RU',
													{
														style: 'decimal',
													}
												).format(
													`${
														item[
															this.props
																.dataToShow
														]
													}`
												) +
													' in ' +
													item.country}
											</td>
											<td align="rigth">
												<img
													alt="Country flag"
													src={item.countryInfo.flag}
													id="countryFlag"
													width="40px"
													height="20px"
												></img>
											</td>
										</tr>
									</Col>
								</Row>
							</Link>
						))}
					</tbody>
				</Table>
			</div>
		);
	}
}

export default Countries;
