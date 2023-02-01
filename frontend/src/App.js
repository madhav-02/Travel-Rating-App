import React, { useState } from 'react';
import { useEffect} from 'react';
import Map, {Marker, Popup} from 'react-map-gl';
import StarIcon from '@mui/icons-material/Star';
import 'mapbox-gl/dist/mapbox-gl.css';
import './App.css'
import axios from "axios"
import {format} from "timeago.js"
const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_API; // Set your mapbox token here

function App() {
  const [viewState, setViewState] = useState({
    latitude: 48.8584,
    longitude: 2.2945,
    width: 900,
    height:200,
    zoom: 14
  });
  const [pins, setPins] = useState([]);
  
  const [currentPlaceId, setCurrentPlaceId] = useState("");  // currentPlaceId - is the _id of the pin that is currenly open.

  useEffect(()=>{
    const getPins = async ()=>{
      try{  
        const res = await axios.get("/pins");
        // console.log("JEREE",res);
        setPins(res.data);
        // console.log("Pins are: ",pins);
      }catch(err){
        console.log(err);
      }
    }
    getPins();
  },[])

useEffect(()=>{
  console.log(currentPlaceId);
},[currentPlaceId])

  const handlePinOpen = (id)=>{
    console.log(typeof id);
    setCurrentPlaceId(id);
  }
  return (
    <div className="App">
      <Map
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        style={{width: "100vw", height: "100vh"}}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={MAPBOX_TOKEN}
        
        >
        {pins.map( (pin) =>(
  
          <>
          
          {console.log(`pin._id: ${pin._id}, currentPlaceId: ${currentPlaceId}`)}
          {console.log(`Comparison result: ${pin._id === currentPlaceId}`)}
            <Marker   longitude={pin.longitude} latitude={pin.latitude} color="red" onClick={()=>handlePinOpen(pin._id)}  />
            { pin._id === currentPlaceId && 
                <Popup  longitude={pin.longitude} latitude={pin.latitude} anchor="top" closeButton={true}  closeOnClick={false} onClose={()=>setCurrentPlaceId("")} >
                    <div className="card">
                      <label >Place</label>
                      <h4>Effiel TOwer</h4>
                      <label >Review</label>
                      <p className="desc">{pin.desc}</p>
                      <label >Rating</label>
                      <div className="stars">
                        <StarIcon className='star'></StarIcon>
                        <StarIcon className='star'></StarIcon>
                        <StarIcon className='star'></StarIcon>
                        <StarIcon className='star'></StarIcon>
                        <StarIcon className='star'></StarIcon>
                      </div>
                      
                      <label >Information</label>
                      <span className="username">Created by: <b>{pin.username}</b></span>
                      <span className="date">{format(pin.createdAt)}</span>
                    </div>
              </Popup>
            }

          </>
          ))
        }
      </Map>
    </div>
  );
}

export default App;