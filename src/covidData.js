import React, { Component } from 'react';
import { NovelCovid } from 'novelcovid';

class CovidData extends Component {
	constructor(props) {
		super(props);
		this.state = null;
		this.api = new NovelCovid();
	}

	async componentDidMount() {
		const data = await this.api.all();
		this.setState({ data });
	}

	render() {
		return (
			<div align="center">
				<h2>
					<p className={'text-' + `${this.props.colorState}`}>
						{this.state
							? new Intl.NumberFormat('ru-RU', {
									style: 'decimal',
							  }).format(
									`${this.state.data[this.props.dataToShow]}`
							  )
							: 'Loading'}
					</p>
				</h2>
			</div>
		);
	}
}

export default CovidData;
