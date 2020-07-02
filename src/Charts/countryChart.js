import React, { Component } from 'react';
import './chart.css';
import {
	ResponsiveContainer,
	LineChart,
	XAxis,
	YAxis,
	CartesianGrid,
	Line,
	Tooltip,
	Legend,
} from 'recharts';

class CountryChart extends Component {
	render() {
		return (
			<div id="countryChart">
				<ResponsiveContainer maxHeight="50vh">
					<LineChart data={this.props.historyArray()}>
						<XAxis dataKey="date" />
						<YAxis
							tickFormatter={(tick) =>
								new Intl.NumberFormat('ru-RU', {
									style: 'decimal',
								}).format(tick / 1000) + ' k'
							}
						/>
						<CartesianGrid
							strokeDasharray="0 0"
							horizontal={false}
							vertical={false}
						/>
						<Legend />
						<Line type="monotone" dataKey="cases" stroke="blue" />
						<Line type="monotone" dataKey="deaths" stroke="red" />
						<Line
							type="monotone"
							dataKey="recovered"
							stroke="green"
						/>
						<Tooltip />
					</LineChart>
				</ResponsiveContainer>
			</div>
		);
	}
}

export default CountryChart;
