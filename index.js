var map = L.map('map').setView([48.681817, 6.193542], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 50,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var marker = L.marker([48.681817, 6.1]).addTo(map);


var circle = L.circle([51.508, -0.11], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
}).addTo(map);

var polygon = L.polygon([
    [51.509, -0.08],
    [51.503, -0.06],
    [51.51, -0.047]
]).addTo(map);

marker.bindPopup("<b>Hello world!</b><br>I am a popup.");/*
.openPopup();*/
circle.bindPopup("I am a circle.");
polygon.bindPopup("I am a polygon.");

var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
}

var markerImage = L.marker([48.681817, 6.2]).addTo(map);
markerImage.bindPopup(`<img src="./qui.png" style="height : 1000px ; width : auto;">`, {maxWidth : Infinity});
/*await fetch("https://webetu.iutnc.univ-lorraine.fr/www/canals5/phox/api/photos",{ credentials: 'include'})
    .then(data => {
        console.log(data);
        //markerImage.bindPopup(data)
    }).catch (error => {
        console.log(error);
    })
    ;*/

map.on('click', onMapClick);