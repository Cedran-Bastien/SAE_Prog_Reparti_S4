import fetch_proxy from "./fetchproxy.js";
import {loadInfosRoutieres} from "@/lib/probCirculations";

async function fetchData (url) {
    const response = await fetch_proxy(url);
    if (response.ok) {
        return await response.json();
    }
    return null;
}

 export default async function loadStationInfo() {
    let url = "https://transport.data.gouv.fr/gbfs/nancy/station_information.json";
    const dataI = await fetchData(url);

    url = "https://transport.data.gouv.fr/gbfs/nancy/station_status.json";
    const dataS = await fetchData(url);

    return fusion(dataI,dataS);
}

async function extractStationInfo(data){
    const tabData = data.data.stations;
    return await tabData.map(e =>
        ({
            address: e.address,
            lat: e.lat,
            lon: e.lon
        })
    );
}

async function extractStationStatus(data){
    const tabData = data.data.stations;
    return await tabData.map((e) =>
        ({
            numbikes : e.num_bikes_available,
            numdocks : e.num_docks_available
        })
    );
}

async function fusion(dataInf,dataStat){
    let tabStationInf = await extractStationInfo(dataInf);
    let tabStationStatus = await extractStationStatus(dataStat);
    let fusionTab = [];

    for (let i = 0 ; i < tabStationInf.length ; i++)
    {
        let element =
            {
                station_infos : tabStationInf[i],
                stations_status : tabStationStatus[i]
            };

        fusionTab.push(element);
    }

    return fusionTab;
}


