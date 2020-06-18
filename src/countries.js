import React, { Component } from 'react';
import {
	Table,
	Spinner,
	InputGroup,
	Input,
	InputGroupAddon,
	Button,
} from 'reactstrap';
import { NovelCovid } from 'novelcovid';
import './countries.css';

class Countries extends Component {
	constructor(props) {
		super(props);
		this.state = null;
		this.api = new NovelCovid();
		this.countryToSearch = null;
		this.sortOrder = 1;
	}

	async componentDidMount() {
		const data = await this.api.countries();
		this.setState({ data });
		this.sortArray(this.props.dataToShow);
	}

	sortArray = (properties) => {
		this.setState(this.state.data.sort(this.dynamicSort(properties)));
		return 0;
	};

	dynamicSort = (property) => {
		this.sortOrder *= -1;
		let newSortOrder = this.sortOrder;
		if (property[0] === '-') {
			newSortOrder = -1;
			property = property.substr(1);
		}
		return function (a, b) {
			/* next line works with strings and numbers,
			 * and you may want to customize it to your needs
			 */
			var result =
				a[property] < b[property]
					? -1
					: a[property] > b[property]
					? 1
					: 0;
			return result * newSortOrder;
		};
	};

	render() {
		return (
			<div>
				<div>
					<InputGroup>
						<InputGroupAddon addonType="prepend">
							<Button
								onClick={() =>
									this.sortArray(this.props.dataToShow)
								}
							>
								î
							</Button>
						</InputGroupAddon>
						<Input
							placeholder="search..."
							onChange={(inputTask) =>
								this.setState(inputTask.target.countryToSearch)
							}
						/>
					</InputGroup>
				</div>
				<div id="countriesList">
					<Table hover striped size="sm">
						<tbody>
							{this.state ? (
								this.state.data.map((item) => (
									<tr color={`${this.props.colorState}`}>
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
												alt="flag"
												src={item.countryInfo.flag}
												id="countryFlag"
												width="40px"
												height="20px"
											></img>
										</td>
									</tr>
								))
							) : (
								<Spinner color="dark" />
							)}
						</tbody>
					</Table>
				</div>
			</div>
		);
	}
}

export default Countries;
