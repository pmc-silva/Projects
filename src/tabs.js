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

class Tabs extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			activeTab: '1',
		};
	}

	toggle = (tab) => {
		if (this.state.activeTab !== tab) {
			this.setState({ activeTab: tab });
		}
	};

	filteredArray = (arr, arrFilter) => {
		const filtArray = arr;
		if (arrFilter === '') {
			return filtArray;
		}
		return filtArray.filter((task) => task.complete === arrFilter);
	};

	panes = (tabNumber, covidState, color) => {
		return (
			<TabPane tabId={tabNumber}>
				<Row>
					<Col sm="12">
						<CovidData dataToShow={covidState} colorState={color} />{' '}
						<Countries dataToShow={covidState} colorState={color} />
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
						active: this.state.activeTab === tabNumber,
					})}
					onClick={() => {
						this.toggle(tabNumber);
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
				<TabContent activeTab={this.state.activeTab}>
					{this.panes('1', 'cases', 'primary')}
					{this.panes('2', 'deaths', 'danger')}
					{this.panes('3', 'recovered', 'success')}
				</TabContent>
			</div>
		);
	}
}

export default Tabs;
