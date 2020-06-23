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
import NovelCovid from 'novelcovid';
import { Spinner } from 'reactstrap';

class Chart extends Component {
	constructor(props) {
		super(props);
		this.state = null;
		this.api = new NovelCovid();
	}

	async componentDidMount() {
		const data = await this.api.historical(true);
		this.setState({ data });
	}

	render() {
		return (
			<div id="container">
				<ResponsiveContainer>
					{this.state ? (
						<AreaChart
							data={this.state.data}
							margin={{
								top: 10,
								right: 30,
								left: 0,
								bottom: 0,
							}}
						>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="date" />
							<YAxis />
							<Tooltip />
							<Area
								type="monotone"
								dataKey="values"
								stroke="#428bca"
								fill="#428bca"
							/>
						</AreaChart>
					) : (
						<Spinner color="dark" />
					)}
				</ResponsiveContainer>
			</div>
		);
	}
}

export default Chart;
