import leaflet_custom from './lib/leaflet_custom.js';
import velib from './lib/velib.js';
import probCirculations from './lib/probCirculations.js';
import {hostname} from "./rendu/public/const/const";

const map = L.map('map').setView([48.681817, 6.193542], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 50,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


const popup = L.popup();

//test marker restaurant
leaflet_custom.displayMarkerRestaurant(map,"test", "test", "",48.681817, 6.193542);
leaflet_custom.displayMarkerRestaurant(map,"test2", "test2","", 48.651417, 6.193542);

// ajout marker restaurant
function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent(`
<strong>Ajouter restaurant</strong>
<form method="get" class="form-example">
  <div class="form-example">
    <label for="name">Nom Restaurant: </label>
    <input type="text" name="Nom du restaurant" id="name" required>
  </div>
  <div class="form-example">
    <label for="adress">Adresse du restaurant: </label>
    <input type="text" name="Adresse restaurant" id="adress" required>
  </div>
  <div class="form-example">
    <input formaction="${hostname}" type="submit" value="Valider">
  </div>
</form>
` )
        .openOn(map);
}



map.on('click', onMapClick);

// velib
velib.loadStationInfo().then (data => {
    console.log(data);
    data.forEach(element => {
        leaflet_custom.displayMarkerVelib(map,"Station Vélib", element.address, element.lat, element.lon);
    });
}).catch (error => {
    console.log(error);
})

//probCirculation
probCirculations.loadInfosRoutieres().then (data => {
    console.log(data);
    data.forEach(element => {

        leaflet_custom.displayMarkerProbCirculation(map,element.cause, element.address, element.lat, element.lon,element.starttime,element.endtime);
    });
});


