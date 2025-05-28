import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "../utils"
import { useEffect } from "react";

function MapUpdater({position}){
    const map = useMap();

    useEffect(()=>{
        if(position){
            map.setView(position,13,{animate:true});
        }
    },[position,map]);
    return null;
}

export function MapComponent({position,name}){
    if(!position) return null;
    return(
        <MapContainer center={position} zoom={13} style={{width:'100%', height:'300px', marginTop:'20px'}}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"/>
            <Marker position={position}>
                <Popup>{name}</Popup>
            </Marker>
            <MapUpdater position={position}></MapUpdater>
        </MapContainer>
    )
}