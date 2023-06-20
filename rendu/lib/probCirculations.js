import fetch_proxy from "./fetchproxy.js";

export async function loadInfosRoutieres() {
    let pr = await fetch_proxy("https://carto.g-ny.org/data/cifs/cifs_waze_v2.json");

    let data;

    if (pr.ok) {
        data = await pr.json();

        data = data.incidents;
        data =  data.map((e) =>
             (
                {
                    creationTime: e.creationTime,
                    starttime: e.starttime,
                    endtime: e.endtime,
                    cause: e.description,
                    address: e.location.street,
                    lat: e.location.polyline.split(" ")[0],
                    lon: e.location.polyline.split(" ")[1]


                })
        );

    }

    return await data;
}

export default {loadInfosRoutieres: loadInfosRoutieres};