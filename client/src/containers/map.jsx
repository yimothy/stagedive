import React, { PropTypes as T } from 'react'
import classnames from 'classnames'
import { GoogleApiWrapper, Marker} from 'google-maps-react'
import AppBar from './app-bar';
import GOOGLEMAPSAPIKEY from './GOOGLEMAPSAPIKEY.js';
import ReactDOM from 'react-dom';

export class Map extends React.Component {
  componentDidUpdate(prevProps, prevState) {
    console.log('prevProps:: ', prevProps);
    console.log('prevState:: ', prevState);
    console.log('this.props.google:: ', this.props.google)
    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }
  }
  loadMap() {
    console.log('loading map')
    console.log('loadMap this.props:: ', this.props);
    console.log('loadMapthis.props.google:: ', this.props.google)
    if (this.props && this.props.google) {
      console.log('loadMap this.props:: ', this.props);
      console.log('loadMapthis.props.google:: ', this.props.google)

      const { google } = this.props;
      const maps = google.maps;
      const mapRef = this.refs.map;
      console.log('mapRef:: ', mapRef);
      const node = ReactDOM.findDOMNode(mapRef);
      let crd;
      const position = navigator.geolocation.getCurrentPosition((pos) => {
        const zoom = 16;
        crd = pos.coords;
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        const center = new maps.LatLng(crd.latitude, crd.longitude)
        const mapConfig = Object.assign({}, {
          center: center,
          zoom: zoom
        })
        this.map = new maps.Map(node, mapConfig);
        console.log('this.map::', this.map);
        return this.map
      })
      // let zoom = 14;
      // let lat = 37.774929;
      // let lng = -122.419416;
      // const center = new maps.LatLng(lat, lng);
      // const mapConfig = Object.assign({}, {
      //   center: center,
      //   zoom: zoom
      // })
      // this.map = new maps.Map(node, mapConfig);
    }

  }
  render() {
    return (
      <div ref='map'>
        Loading..
      </div>
    )
  }
}

export class MapComponent extends React.Component {
  render() {
    const style = {
      width: '100vw',
      height: '100vh'
    }
    return (
      <div ref="map" style={style}>
        <h1>Explore</h1>
        <Map google={this.props.google} />
      </div>
    );
  }
}

export default GoogleApiWrapper({ apiKey: GOOGLEMAPSAPIKEY })(MapComponent);
