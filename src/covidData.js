import React, { Component } from 'react';

class CovidData extends Component {
	setParagraphColor = (color) => {
		const txt = 'text-';
		switch (color) {
			case 'red':
				return txt.concat('danger');
			case 'green':
				return txt.concat('success');
			default:
				return txt.concat('primary');
		}
	};

	render() {
		return (
			<div align="center">
				<h2>
					<p
						className={this.setParagraphColor(
							this.props.colorState
						)}
					>
						{new Intl.NumberFormat('ru-RU', {
							style: 'decimal',
						}).format(this.props.allDataArray)}
					</p>
				</h2>
			</div>
		);
	}
}

export default CovidData;
