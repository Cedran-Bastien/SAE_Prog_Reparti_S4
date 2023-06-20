'use client'

import 'leaflet/dist/leaflet.css'
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import {Marker, Popup} from "react-leaflet"
import {icon} from 'leaflet'
import velib from "@/lib/velib";
import probCirculations from "@/lib/probCirculations";
import {useState} from "react";

const stationVelibIcon = icon({
    iconUrl: '/velib_station.png', iconSize: [20, 20],

})

const restaurantIcon = icon({
    iconUrl: '/restaurant.png', iconSize: [40, 40]
})

const CirculationIcon = icon({
    iconUrl: '/prob_circulation.png', iconSize: [40, 40]

})

const RestaurantMarker= ({id, nom, adresse, lat, lng, changeVisibility}) => {
    return (
        <Marker position={[lat, lng]} icon={CirculationIcon}>
            <Popup>
                <div className="restaurant" id="${id}">
                    <h3>{nom}</h3>
                    <p>{adresse}</p>
                    <button onClick={() => {changeVisibility("")}}>Réserver</button>
                </div>
            </Popup>
        </Marker>
    )
}

const CirculationMarker = ({cause, adresse, lat, lng,starttime,endtime}) => {
    return (
        <Marker position={[lat, lng]} icon={CirculationIcon}>
        <Popup>
            <div className="restaurant" id="${id}">
                <h3>{cause}</h3>
                <p>{adresse}</p>
                <p>Start : {starttime}</p>
                <p>Supposed End :  {endtime}</p>
            </div>
        </Popup>
    </Marker>
    )
}

const MarkerVelib = ({adresse,freeVelo, freePlace, lat, lng}) => {
    return (
        <Marker position={[lat, lng]} icon={stationVelibIcon}>
            <Popup>
                <h3>Station Vlib</h3>
                <p>{adresse}</p>
                <p>nombre de velo libre : {freeVelo}</p>
                <p>nombre de place libre : {freePlace}</p>
            </Popup>
        </Marker>
    )
}

const AllProbCirc = ({changeVisibility}) => {
    //Getting data
    const [data, setData] = useState([])
    probCirculations.loadInfosRoutieres().then((data) => {
        setData(data)
    } ).catch (error => {
        console.log(error);
    })

    const markers = data.map((element) => {return(<CirculationMarker key={element.lon} cause={element.cause} adresse={element.address} lng={element.lon} starttime={element.starttime} lat={element.lat} endtime={element.endtime} changeVisibility={changeVisibility}/>) })

    return (
        <div>
            {markers}
        </div>
    )
}

const AllVeloLib = ({}) => {
    // Getting data
    const [data, setData] = useState([])
    velib.loadStationInfo().then((data) => {
        setData(data)
    } ).catch (error => {
        console.log(error);
    })

    const markers = data.map((element) => {return(<MarkerVelib key={element.station_infos.address} adresse={element.station_infos.address} lat={element.station_infos.lat} lng={element.station_infos.lon} freeVelo={element.stations_status.numbikes} freePlace={element.stations_status.numdocks} />) })

    return (
        <div>
            {markers}
        </div>
    )
}

const AllRestaurant = () => {
    const [data, setData] = useState([])
    fetch("").then((res) => {
        setData(res)
    })

    // const markers = data.map((item) => {return(<RestaurantMarker lng={} lat={} adresse={} nom={} id={}/>)})
}

export const Map =  ({changeVisibility}) => (
        <MapContainer className={"absolute z-0 top-0 rounded w-screen h-screen"} center={[48.681817, 6.193542]} zoom={13} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <AllProbCirc changeVisibility={changeVisibility}/>
            <AllVeloLib/>
        </MapContainer>
)