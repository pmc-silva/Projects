import React, { Component } from 'react';
import {
	AreaChart,
	Area,
	Tooltip,
	CartesianGrid,
	XAxis,
	YAxis,
	ResponsiveContainer,
	Legend,
	ReferenceLine,
} from 'recharts';
import './chart.css';

class Chart extends Component {
	render() {
		return (
			<div id="container">
				<ResponsiveContainer>
					<AreaChart
						data={this.props.historyArray()}
						margin={{
							top: 10,
							right: 30,
							left: 30,
							bottom: 0,
						}}
					>
						<CartesianGrid
							strokeDasharray="0 0"
							horizontal={false}
							vertical={false}
						/>
						<XAxis
							dataKey="date"
							interval={2}
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
						<Tooltip />
						<Area
							name={this.props.dataToShow}
							type="monotone"
							dataKey="value"
							stroke="none"
							fill={this.props.color}
						/>
						<Legend iconType="square" verticalAlign="top" />
						<ReferenceLine />
					</AreaChart>
				</ResponsiveContainer>
			</div>
		);
	}
}

export default Chart;
