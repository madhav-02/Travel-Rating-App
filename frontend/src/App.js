import React, { useState } from 'react';
import {render} from 'react-dom';
import { useEffect} from 'react';
import Map, {Marker, NavigationControl, Popup} from 'react-map-gl';
import Brightness3Icon from '@mui/icons-material/Brightness3';
import StarIcon from '@mui/icons-material/Star';
import 'mapbox-gl/dist/mapbox-gl.css';
import './App.css'
import axios from "axios"
const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_API; // Set your mapbox token here

function App() {
  const [viewState, setViewState] = useState({
    latitude: 48.8584,
    longitude: 2.2945,
    width: 900,
    height:200,
    zoom: 14
  });
  const [showPopup, setShowPopup] = useState(true);
  const [pins, setPins] = useState([]);


  useEffect(()=>{
    const getPins = async ()=>{
      try{  
        const res = await axios.get("/pins");
        console.log("JEREE",res);
        setPins(res.data);
      }catch(err){
        console.log(err);
      }
    }
    getPins();
  },[])


  return (
    <div className="App">
      <Map
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        style={{width: "100vw", height: "100vh"}}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={MAPBOX_TOKEN}
        >
        {pins.map( pin =>(
          <>
          <Marker longitude={pin.longitude} latitude={pin.latitude} color="red" />
          <NavigationControl />
          {showPopup && (
            <Popup longitude={pin.longitude} latitude={pin.latitude}
            anchor="top"
            onClose={() => setShowPopup(false)}>
            <div className="card">
            <label >Place</label>
            <h4>Effiel TOwer</h4>
            <label >Review</label>
            <p className="desc">Very beautiful place</p>
            <label >Rating</label>
            <div className="stars">
            <StarIcon className='star'></StarIcon>
            <StarIcon className='star'></StarIcon>
            <StarIcon className='star'></StarIcon>
            <StarIcon className='star'></StarIcon>
            <StarIcon className='star'></StarIcon>
            </div>
            
            <label >Information</label>
            <span className="username">Created by: <b>Madhav</b></span>
            <span className="date">1 hr ago</span>
            </div>
          </Popup>)}
          </>
          ))}
      </Map>
    </div>
  );
}

export default App;