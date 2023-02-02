import React, { useState } from 'react';
import { useEffect} from 'react';
import Map, {Marker, Popup,} from 'react-map-gl';
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
  const [newPlace,setNewPlace] = useState(null);
  const [newTitle,setNewTitle] = useState(null);
  const [newRating,setNewRating] = useState(0);
  const [newDesc,setNewDesc] = useState(null);

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

  const handlePinOpen = (id,long,lat)=>{
    // console.log(typeof id);
    setCurrentPlaceId(id);
    setViewState({...viewState,latitude:lat,longitude:long})

  }
  const handleSubmitPin = async (e) => {
    e.preventDefault();  // By giving this, upon submitting the pin, the page will NOT refresh. Else it will
    console.log("cam ehere");
    const newPin = {
      username:"John",
      title:newTitle,
      desc:newDesc,
      rating:newRating,
      latitude:newPlace.lat,
      longitude:newPlace.long
    }
    console.log("New pin is: ",newPin);

    try{
        const response = await axios.post("/pins",newPin);
        console.log("Response us: ",response);
        setPins([...pins,response.data]);
        setNewPlace(null);
    }catch(err){
      console.log(err);
    }
  }
  const handleDoubleClick = (e)=>{
    
    console.log(e)
    const long = e.lngLat.lng;
    const lat = e.lngLat.lat;
    setNewPlace({long,lat});
  }
  return (
    <div className="App">
      
       <Map
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        style={{width: "100vw", height: "100vh"}}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={MAPBOX_TOKEN}
        onDblClick={handleDoubleClick}
        >
          <button className='button logout'>Logout</button>
         <button className='button login'>Login</button>
         <button className='button register'>Register</button> 
        {pins.map( (pin) =>(
  
          <>
            <Marker   longitude={pin.longitude} latitude={pin.latitude} color="red" onClick={()=>handlePinOpen(pin._id,pin.longitude,pin.latitude)}  />
            { pin._id === currentPlaceId && 
                <Popup  longitude={pin.longitude} latitude={pin.latitude} anchor="top" closeButton={true}  closeOnClick={false} onClose={()=>setCurrentPlaceId("")} >
                    <div className='card'>
                      <label >Place</label>
                      <h4>Effiel TOwer</h4>
                      <label >Review</label>
                      <p className="desc">{pin.desc}</p>
                      <label >Rating</label>
                      <div className="stars">
                        {Array(pin.rating).fill(<StarIcon className='star'></StarIcon>)}
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

         {newPlace && (
            <Popup  longitude={newPlace.long} latitude={newPlace.lat} anchor="top" closeButton={true}  closeOnClick={false} onClose={()=>setNewPlace(null)} >
              <div>
                <form onSubmit={handleSubmitPin} >
                  <label>Title</label>
                  <input type="text" placeholder='Enter Title' onChange={(e)=>(setNewTitle(e.target.value))}/>
                  <label>Review</label>
                  <textarea cols="30" rows="10" placeholder='Tell us about this place' onChange={(e)=>(setNewDesc(e.target.value))}></textarea>
                  <label>Rating</label>
                  <select  onChange={(e)=>(setNewRating(e.target.value))}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    
                  </select>
                  <button className='addpinbtn' type="submit">Add Pin</button>
                </form>
              </div>
            </Popup>
         )} 
        <button className='button logout'>Logout</button>
         <button className='button login'>Login</button>
         <button className='button register'>Register</button> 
      </Map>
         
    </div>
  );
}

export default App;