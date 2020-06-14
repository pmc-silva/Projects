import React, { Component } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './map.css';

class Map extends Component {
	componentDidMount() {
		this.map = L.map('mapid').setView([0, 0], 1);

		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution:
				'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
			noWrap: true,
		}).addTo(this.map);

		this.circle = L.circle([40.6067353, -8.6428569], {
			color: 'red',
			fillColor: '#f03',
			fillOpacity: 0.5,
			radius: 500,
		}).addTo(this.map);
	}

	render() {
		return <div id="mapid" />;
	}
}

export default Map;
