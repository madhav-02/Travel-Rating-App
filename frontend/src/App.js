import React from 'react';
import {render} from 'react-dom';
import Map, {Marker, NavigationControl, Popup} from 'react-map-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_API; // Set your mapbox token here

function App() {
  const [viewState, setViewState] = React.useState({
    latitude: 37.8,
    longitude: -122.5,
    width: 900,
    height:200,
    zoom: 14
  });
  const [showPopup, setShowPopup] = React.useState(true);

  return (
    <Map
      {...viewState}
      onMove={evt => setViewState(evt.viewState)}
      style={{width: "100vw", height: "100vh"}}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={MAPBOX_TOKEN}
    >
      <Marker longitude={2.2945} latitude={48.8584} color="red" />
      <NavigationControl />
      {showPopup && (
      <Popup longitude={2.2945} latitude={48.8584}
        anchor="top"
        onClose={() => setShowPopup(false)}>
        You are here
      </Popup>)}
    </Map>
  );
}

export default App;