const stationVelibIcon = L.icon({
    iconUrl: 'img/velib_station.png', iconSize: [20, 20],

})

const restaurantIcon = L.icon({
    iconUrl: 'img/restaurant.png', iconSize: [40, 40]
})

const probCirculationIcon = L.icon({
    iconUrl: 'img/prob_circulation.png', iconSize: [20, 20]

})


const displayMarkerRestaurant = (map, id, nom, adresse, lat, lng) => {
    const marker = L.marker([lat, lng], {icon: restaurantIcon}).addTo(map);
    marker.bindPopup(`
<div class="restaurant" id = "${id}">
<h3>${nom}</h3>
<p>${adresse}</p>

<button class=restaurant_button type="button"> Réserver </button>
</div>

`);
    marker.on('popupopen', function (e) {
        e.popup.getElement().querySelector(".restaurant_button").addEventListener("click", function () {
            window.open(`page\\reservation.html?id=${id}`, "_self");
        });
    });
}

const displayMarkerVelib = (map, nom, adresse, lat, lng) => {
    const marker = L.marker([lat, lng], {icon: stationVelibIcon}).addTo(map);
    marker.bindPopup(`
    <div class="velibStation">
<h3>${nom}</h3>
<p>${adresse}</p>
`);

}

const displayMarkerProbCirculation = (map, cause, adresse, lat, lng,starttime,endtime) => {
    const marker = L.marker([lat, lng], {icon: probCirculationIcon}).addTo(map);
    marker.bindPopup(`
    <div class="probCirculation">
<h3>${cause}</h3>
<p>${adresse}</p>
<p>${starttime}</p>
<p>${endtime}</p>
`);

}

export default {
    displayMarkerRestaurant: displayMarkerRestaurant,
    displayMarkerVelib: displayMarkerVelib,
    displayMarkerProbCirculation: displayMarkerProbCirculation
};