import React from 'react';
import {
	Row,
	Col,
	Nav,
	NavItem,
	NavLink,
	TabContent,
	TabPane,
	Input,
	InputGroup,
	InputGroupAddon,
	Button,
} from 'reactstrap';
import classNames from 'classnames';
import CovidData from './covidData';
import Countries from './countries';

class Tabs extends React.Component {
	panes = (tabNumber, color) => {
		return (
			<TabPane tabId={tabNumber}>
				<Row>
					<Col sm="12">
						<CovidData
							colorState={this.props.colorState}
							allDataArray={this.props.allData}
						/>
					</Col>
				</Row>
				<Row>
					<Col>
						<InputGroup>
							<InputGroupAddon addonType="prepend">
								<Button
									onClick={() => this.props.onSortClick()}
								>
									î
								</Button>
							</InputGroupAddon>
							<Input placeholder="search..." />
						</InputGroup>
					</Col>
				</Row>
				<Row>
					<Col>
						<Countries
							dataToShow={this.props.whatToShow}
							colorState={color}
							countriesDataArray={this.props.countriesData}
							onSortClick={this.props.onSortClick}
						/>
					</Col>
				</Row>
			</TabPane>
		);
	};

	navItems = (tabNumber, tabName) => {
		return (
			<NavItem>
				<NavLink
					className={classNames({
						active: this.props.tab === tabNumber,
					})}
					onClick={() => {
						this.props.onTabChange(tabNumber);
					}}
				>
					{tabName}
				</NavLink>
			</NavItem>
		);
	};

	render() {
		return (
			<div>
				<Nav tabs pills justified>
					{this.navItems('1', 'Cases')}
					{this.navItems('2', 'Deaths')}
					{this.navItems('3', 'Recovered')}
				</Nav>
				<TabContent activeTab={this.props.tab}>
					{this.panes('1', 'primary')}
					{this.panes('2', 'danger')}
					{this.panes('3', 'success')}
				</TabContent>
			</div>
		);
	}
}

export default Tabs;
