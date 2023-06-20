import fetch_proxy from "./fetchproxy.js";

export default async function dataMeteo() {

    let pr = await fetch_proxy("https://www.infoclimat.fr/public-api/gfs/json?_ll=48.67103,6.15083&_auth=ARsDFFIsBCZRfFtsD3lSe1Q8ADUPeVRzBHgFZgtuAH1UMQNgUTNcPlU5VClSfVZkUn8AYVxmVW0Eb1I2WylSLgFgA25SNwRuUT1bPw83UnlUeAB9DzFUcwR4BWMLYwBhVCkDb1EzXCBVOFQoUmNWZlJnAH9cfFVsBGRSPVs1UjEBZwNkUjIEYVE6WyYPIFJjVGUAZg9mVD4EbwVhCzMAMFQzA2JRMlw5VThUKFJiVmtSZQBpXGtVbwRlUjVbKVIuARsDFFIsBCZRfFtsD3lSe1QyAD4PZA%3D%3D&_c=19f3aa7d766b6ba91191c8be71dd1ab2");
    let data;
    let tabBis = [];

    if (pr.ok){
        data = await pr.json();
        let cpt = 0;
        for (const [cle, valeur] of Object.entries(data)) {

            if(cpt>4) {

                let nebu = valeur.nebulosite;
                let temp = valeur.temperature;
                let humi = valeur.humidite;
                let vmoy = valeur.vent_moyen;
                let vrafales = valeur.vent_rafales;
                let vdirection = valeur.vent_direction;

                if (temp instanceof Object) {
                    temp = temp["sol"];
                    temp = temp - 273;
                    temp = Math.floor(temp);
                }

                if (nebu instanceof Object) {
                    nebu = nebu["totale"];
                    nebu = getNebulosityDescription(nebu);
                }

                if (humi instanceof Object) {
                    humi = humi["2m"];
                }

                if (vmoy instanceof Object) {
                    vmoy = vmoy["10m"];
                    vmoy = Math.floor(vmoy * 3.6);

                }

                if (vrafales instanceof Object) {
                    vrafales = vrafales["10m"];
                    vrafales = Math.floor(vrafales * 3.6);
                }

                if (vdirection instanceof Object) {
                    vdirection = vdirection["10m"];
                    vdirection = getDirectionFromDegrees(vdirection);
                }

                let keyVal = [];

                keyVal.push(cle);
                keyVal.push(["humitide", humi]);
                keyVal.push(["pluie", valeur.pluie]);
                keyVal.push(["vent_moyen", vmoy]);
                keyVal.push(["vent_rafales", vrafales]);
                keyVal.push(["vent_direction", vdirection]);
                keyVal.push(["temperature", temp]);
                keyVal.push(["nebulosite", nebu]);

                tabBis.push(keyVal);
            }
            cpt++;
        }

    }

    return tabBis;

}



function getDirectionFromDegrees(degrees) {
    const directions = [
        { min: 0, max: 22.5, label: 'Nord' },
        { min: 22.5, max: 67.5, label: 'Nord-Est' },
        { min: 67.5, max: 112.5, label: 'Est' },
        { min: 112.5, max: 157.5, label: 'Sud-Est' },
        { min: 157.5, max: 202.5, label: 'Sud' },
        { min: 202.5, max: 247.5, label: 'Sud-Ouest' },
        { min: 247.5, max: 292.5, label: 'Ouest' },
        { min: 292.5, max: 337.5, label: 'Nord-Ouest' },
        { min: 337.5, max: 360, label: 'Nord' }
    ];

    degrees = degrees % 360;

    for (const direction of directions) {
        if (degrees >= direction.min && degrees < direction.max) {
            return direction.label;
        }
    }

    return 'Inconnue';
}

function getNebulosityDescription(nebulosity) {

    const descriptions = [
        { range: [0, 11], label: 'Clair' },
        { range: [11, 31], label: 'Partiellement nuageux' },
        { range: [31, 71], label: 'Nuageux' },
        { range: [71, 101], label: 'Très nuageux' }
    ];

    for (const description of descriptions) {
        if (nebulosity >= description.range[0] && nebulosity < description.range[1]) {
            return description.label;
        }
    }

    return 'Inconnue';
}