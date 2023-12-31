'use client'

import 'leaflet/dist/leaflet.css'
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import {Marker, Popup, useMapEvents} from "react-leaflet"
import {icon} from 'leaflet'

import probCirculations from "@/lib/probCirculations";
import {useEffect, useState} from "react";
import velib from "@/lib/velib";
import {hostname} from "@/app/utils";
import {useRouter} from "next/navigation";

const stationVelibIcon = icon({
    iconUrl: '/velib_station.png', iconSize: [20, 20],

})

const restaurantIcon = icon({
    iconUrl: '/restaurant.png', iconSize: [40, 40]
})

const CirculationIcon = icon({
    iconUrl: '/prob_circulation.png', iconSize: [40, 40]

})

const RestaurantMarker= ({setId, id, nom, adresse, lat, lng, changeVisibility}) => {
    const ID = id
    return (
        <Marker position={[lat, lng]} icon={restaurantIcon}>
            <Popup>
                <div className="restaurant" id="${id}">
                    <h3>{nom}</h3>
                    <p>{adresse}</p>
                    <button onClick={() => {
                        setId(ID)
                        changeVisibility("")
                    }}>Réserver</button>
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
                <p>nombre de velo libre : {freeVelo} unités</p>
                <p>nombre de place libre : {freePlace} unités</p>
            </Popup>
        </Marker>
    )
}

const AllProbCirc = () => {
    //Getting data
    const [data, setData] = useState([])
    probCirculations().then((data) => {
        setData(data)
    } ).catch (error => {
        console.log(error);
    })

    const markers = data.map((element) => {return(<CirculationMarker key={element.lon} cause={element.cause} adresse={element.address} lng={element.lon} starttime={element.starttime} lat={element.lat} endtime={element.endtime}/>) })

    return (
        <div>
            {markers}
        </div>
    )
}

const AllVeloLib = ({}) => {
    // Getting data
    const [data, setData] = useState([])

    velib().then((data) => {
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

const AllRestaurant = ({setleId,changeVisibility}) => {
    const route = useRouter()
    const [data, setData] = useState([])
    useEffect(() => {


        fetch(hostname+"/db/restaurants").then((res) => {
            res.json().then( (data => {
                setData(data.restaurants)
            }))
        }).catch((err) => {
            console.log(err)
        })
    },[route])



    const markers = data.map((item) => {return(<RestaurantMarker  key={item.id} changeVisibility={changeVisibility} setId={setleId} lng={item.longitude} lat={item.latitude} adresse={item.adresse} nom={item.nom} id={item.id}/>)})



    return (
        <div>
            {markers}
        </div>
    )
}

const Event = ({closeReserv,displayCreate, setLat, setLong}) => {
    const map = useMapEvents({
        click: (e) => {
            setLat(e.latlng.lat)
            setLong(e.latlng.lng)
            closeReserv(" invisible")
            displayCreate("")
        },
    })
}

export const Map =  ({changeVisibility, createVisibility, setLat, setLong, setId }) => {

    return (
        <MapContainer className={"absolute z-0 top-0 rounded w-screen h-screen"} center={[48.681817, 6.193542]}
                      zoom={13} scrollWheelZoom={true}>
            <Event closeReserv={changeVisibility} displayCreate={createVisibility} setLat={setLat} setLong={setLong}/>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <AllProbCirc/>
            <AllVeloLib/>
            <AllRestaurant changeVisibility={changeVisibility} setleId={setId}/>
        </MapContainer>
    )
}
