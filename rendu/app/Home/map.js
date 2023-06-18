'use client'

import 'leaflet/dist/leaflet.css'
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import {Marker, Popup} from "react-leaflet"

const stationVelibIcon = L.icon({
    iconUrl: '/velib_station.png', iconSize: [20, 20],

})

const restaurantIcon = L.icon({
    iconUrl: '/restaurant.png', iconSize: [40, 40]
})

const probCirculationIcon = L.icon({
    iconUrl: '/prob_circulation.png', iconSize: [40, 40]

})

const RestorantMarker = ({map, id, nom, adresse, lat, lng}) => {

    return (
        <Marker position={[lat, lng]} icon={restaurantIcon}>
        <Popup>
            <div className="restaurant" id="${id}">
                <h3>nom</h3>
                <p>adresse</p>
                <button onClick={() => {
                    // window.open(`page\\reservation.html?id=${id}`, "_self");
                }}>Réserver</button>
            </div>
        </Popup>
    </Marker>
    )
}

const displayMarkerVelib = () => {
    return (
        <Marker position={[lat, lng]} icon={restaurantIcon}>
            <Popup>
                {/*<div className="velibStation">*/}
                    <h3>${nom}</h3>
                    <p>${adresse}</p>
                {/*</div>    */}
            </Popup>
        </Marker>
    )
}

export const Map =  () => (
        <MapContainer className={"absolute z-0 top-0 rounded w-screen h-screen"} center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
        </MapContainer>
)