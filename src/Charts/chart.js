import React, { Component } from 'react';
import {
	AreaChart,
	Area,
	Tooltip,
	CartesianGrid,
	XAxis,
	YAxis,
	ResponsiveContainer,
	ReferenceLine,
} from 'recharts';
import './chart.css';

class Chart extends Component {
	render() {
		return (
			<div id="container">
				<ResponsiveContainer
					className={this.props.dayLight ? 'bg-white' : 'bg-dark'}
					xs="12"
				>
					<AreaChart
						data={this.props.historyArray()}
						margin={{
							top: 40,
							right: 20,
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
							stroke={this.props.dayLight ? 'black' : 'white'}
						/>
						<YAxis
							tickFormatter={(tick) =>
								new Intl.NumberFormat('ru-RU', {
									style: 'decimal',
								}).format(tick / 1000) + ' k'
							}
							stroke={this.props.dayLight ? 'black' : 'white'}
						/>
						<Tooltip
							labelFormatter={(value) =>
								new Date(value).toLocaleDateString('en-En', {
									day: 'numeric',
									month: 'short',
								})
							}
							wrapperStyle={{ backgroundColor: 'black' }}
							itemStyle={{
								color: 'black',
							}}
							labelStyle={{
								color: this.props.color,
							}}
						/>
						<Area
							name={this.props.dataToShow}
							type="monotone"
							dataKey="value"
							stroke={
								this.props.dayLight ? this.props.color : 'white'
							}
							fill={this.props.color}
						/>
						<ReferenceLine />
					</AreaChart>
				</ResponsiveContainer>
			</div>
		);
	}
}

export default Chart;
