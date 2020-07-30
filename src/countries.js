import React, { Component } from 'react';
import { Table } from 'reactstrap';
import './countries.css';
import { Link } from 'react-router-dom';

class Countries extends Component {
	render() {
		return (
			<div id="countriesList">
				<Table
					responsive
					hover
					striped
					className={this.props.dayLight ? 'bg-white' : 'bg-dark'}
				>
					<tbody>
						{this.props.countriesDataArray.map((item) => (
							<tr>
								<td align="left" key={item.country}>
									<Link
										to={{
											pathname: `/countryData/${item.country}`,
											dayLight: this.props.dayLight,
										}}
										className={
											this.props.dayLight
												? 'text-muted clearfix '
												: 'text-white clearfix'
										}
									>
										{new Intl.NumberFormat('ru-RU', {
											style: 'decimal',
										}).format(
											`${item[this.props.dataToShow]}`
										) +
											' in ' +
											item.country}
									</Link>
								</td>
								<td align="right">
									<Link
										to={{
											pathname: `/countryData/${item.country}`,
											dayLight: this.props.dayLight,
										}}
										className={
											this.props.dayLight
												? 'text-muted clearfix '
												: 'text-white clearfix'
										}
									>
										<img
											alt="Country flag"
											src={item.countryInfo.flag}
											id="countryFlag"
											width="40px"
											height="20px"
										></img>
									</Link>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			</div>
		);
	}
}

export default Countries;
