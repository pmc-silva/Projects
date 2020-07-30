import React, { Component } from 'react';
import {
	Row,
	Col,
	InputGroup,
	InputGroupAddon,
	Button,
	Input,
} from 'reactstrap';
import './inputBar.css';

class InputBar extends Component {
	render() {
		return (
			<div id="inputBar">
				<Row>
					<Col>
						<InputGroup>
							<InputGroupAddon addonType="prepend">
								<Button
									onClick={() => this.props.onSortClick()}
									color={this.props.colorType}
								>
									<i
										className={
											this.props.order === -1
												? 'fas fa-sort-numeric-up-alt'
												: 'fas fa-sort-numeric-up'
										}
									></i>
								</Button>
							</InputGroupAddon>
							<Input
								placeholder="search..."
								onChange={(text) =>
									this.props.filterCountries(
										text.target.value
									)
								}
								className={
									this.props.dayLight ? 'bg-white' : 'bg-dark'
								}
							/>
							<InputGroupAddon addonType="append">
								<Button
									onClick={() => this.props.setLightMode()}
									className={
										this.props.dayLight
											? 'bg-warning'
											: 'bg-dark'
									}
								>
									{this.props.dayLight ? (
										<i class="far fa-sun"></i>
									) : (
										<i class="far fa-moon"></i>
									)}
								</Button>
							</InputGroupAddon>
						</InputGroup>
					</Col>
				</Row>
			</div>
		);
	}
}

export default InputBar;
