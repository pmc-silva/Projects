import React, { Component } from 'react';
import './chart.css';
import {
	ResponsiveContainer,
	LineChart,
	XAxis,
	YAxis,
	CartesianGrid,
	Line,
} from 'recharts';

class CountryChart extends Component {
	render() {
		return (
			console.log(this.props.historyArray()),
			(
				<div id="countryChart">
					<ResponsiveContainer maxHeight="50vh">
						<LineChart data={this.props.historyArray()}>
							<XAxis
								dataKey="date"
								tickFormatter={(tick) =>
									new Date(tick).toLocaleDateString('en-En', {
										day: 'numeric',
										month: 'short',
									})
								}
							/>
							<YAxis
								tickFormatter={(tick) =>
									new Intl.NumberFormat('ru-RU', {
										style: 'decimal',
									}).format(tick / 1000) + ' k'
								}
							/>
							<CartesianGrid
								stroke="#eee"
								strokeDasharray="5 5"
							/>
							<Line
								type="monotone"
								dataKey="value"
								stroke="blue"
							/>
						</LineChart>
					</ResponsiveContainer>
				</div>
			)
		);
	}
}

export default CountryChart;
