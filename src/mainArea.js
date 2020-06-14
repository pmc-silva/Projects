import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Map from './Map/map';
import Chart from './Chart/chart';

class MainArea extends Component {
	render() {
		return (
			<Container fluid>
				<Row>
					<Col sm="3">Teste1</Col>
					<Col sm="9">
						<Row>
							<Map
								width={this.props.width}
								height={this.props.height}
							/>
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
