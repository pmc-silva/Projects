import React, { Component } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './map.css';

class Map extends Component {
	drawMap = () => {
		this.map = L.map('mapid').setView([10, 0], 2);

		this.mapLayer = L.tileLayer(
			'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
			{
				attribution:
					'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
				noWrap: true,
			}
		).addTo(this.map);
		this.circles = this.props.valuesArray.forEach((element) => {
			this.circle = L.circle([element.lat, element.long], {
				color: this.props.color,
				fillColor: this.props.color,
				fillOpacity: 0.5,
				radius: element.number,
			}).addTo(this.map);
		});
	};

	componentDidMount() {
		this.drawMap();
	}

	componentDidUpdate() {
		this.map.remove();

		this.drawMap();
	}

	render() {
		return <div id="mapid" />;
	}
}

export default Map;
