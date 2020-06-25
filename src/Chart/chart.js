import React, { Component } from 'react';
import {
	AreaChart,
	Area,
	Tooltip,
	CartesianGrid,
	XAxis,
	YAxis,
	ResponsiveContainer,
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
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="date" />
						<YAxis />
						<Tooltip />
						<Area
							type="monotone"
							dataKey="value"
							stroke="#428bca"
							fill={this.props.color}
						/>
					</AreaChart>
				</ResponsiveContainer>
			</div>
		);
	}
}

export default Chart;
