import React, { Component } from 'react';
import { Table } from 'reactstrap';
import './countries.css';

class Countries extends Component {
	render() {
		return (
			<div id="countriesList">
				<Table hover striped size="sm">
					<tbody>
						{this.props.countriesDataArray.map((item) => (
							<tr>
								<td align="left">
									{new Intl.NumberFormat('ru-RU', {
										style: 'decimal',
									}).format(
										`${item[this.props.dataToShow]}`
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
						))}
					</tbody>
				</Table>
			</div>
		);
	}
}

export default Countries;
