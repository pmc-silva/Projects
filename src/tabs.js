import React from 'react';
import {
	Row,
	Col,
	Nav,
	NavItem,
	NavLink,
	TabContent,
	TabPane,
} from 'reactstrap';
import classNames from 'classnames';
import CovidData from './covidData';
import Countries from './countries';
import './countries.css';

class Tabs extends React.Component {
	panes = (tabNumber, color) => {
		return (
			<TabPane tabId={tabNumber}>
				<Row>
					<Col sm="12">
						<CovidData
							colorState={this.props.colorState}
							allDataArray={this.props.allData}
							dayLight={this.props.dayLight}
						/>
					</Col>
				</Row>
				<Row>
					<Col>
						<Countries
							dataToShow={this.props.whatToShow}
							colorState={color}
							countriesDataArray={this.props.countriesData}
							onSortClick={this.props.onSortClick}
							dayLight={this.props.dayLight}
						/>
					</Col>
				</Row>
			</TabPane>
		);
	};

	navItems = (tabNumber, tabName, color) => {
		return (
			<NavItem>
				<NavLink
					className={classNames(
						{
							active: this.props.tab === tabNumber,
						},
						'bg-'.concat(color).concat(' clearfix')
					)}
					onClick={() => {
						this.props.onTabChange(tabNumber);
					}}
				>
					<p className="text-white">{tabName}</p>
				</NavLink>
			</NavItem>
		);
	};

	render() {
		return (
			<div className={this.props.dayLight ? 'bg-white' : 'bg-dark'}>
				<Nav tabs justified>
					{this.navItems('1', 'Cases', 'primary')}
					{this.navItems('2', 'Deaths', 'danger')}
					{this.navItems('3', 'Recovered', 'success')}
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
