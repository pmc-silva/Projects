import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Map from './Map/map';
import Chart from './Chart/chart';
import Tabs from './tabs';

class MainArea extends Component {
	render() {
		return (
			<Container fluid>
				<Row>
					<Col sm="3">
						<Tabs></Tabs>
					</Col>
					<Col sm="9">
						<Row>
							<Map />
						</Row>
						<Row>
							<Chart />
						</Row>
					</Col>
				</Row>
			</Container>
		);
	}
}

export default MainArea;
