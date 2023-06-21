import fetch_proxy from "./fetchproxy.js";

export async function dataMeteo(date, heure) {

    const response = await fetch_proxy("https://www.infoclimat.fr/public-api/gfs/json?_ll=48.67103,6.15083&_auth=ARsDFFIsBCZRfFtsD3lSe1Q8ADUPeVRzBHgFZgtuAH1UMQNgUTNcPlU5VClSfVZkUn8AYVxmVW0Eb1I2WylSLgFgA25SNwRuUT1bPw83UnlUeAB9DzFUcwR4BWMLYwBhVCkDb1EzXCBVOFQoUmNWZlJnAH9cfFVsBGRSPVs1UjEBZwNkUjIEYVE6WyYPIFJjVGUAZg9mVD4EbwVhCzMAMFQzA2JRMlw5VThUKFJiVmtSZQBpXGtVbwRlUjVbKVIuARsDFFIsBCZRfFtsD3lSe1QyAD4PZA%3D%3D&_c=19f3aa7d766b6ba91191c8be71dd1ab2");
    const data = await response.json();
    const tabBis = [];

    const processData = (key, value) => {
        let nebu = value.nebulosite;
        let temp = value.temperature;
        let humi = value.humidite;
        let vmoy = value.vent_moyen;
        let vrafales = value.vent_rafales;
        let vdirection = value.vent_direction;

        if (temp instanceof Object) {
            temp = temp["sol"] - 273;
            temp = Math.floor(temp);
        }

        if (nebu instanceof Object) {
            nebu = getNebulosityDescription(nebu["totale"]);
        }

        if (humi instanceof Object) {
            humi = humi["2m"];
        }

        if (vmoy instanceof Object) {
            vmoy = Math.floor(vmoy["10m"] * 3.6);
        }

        if (vrafales instanceof Object) {
            vrafales = Math.floor(vrafales["10m"] * 3.6);
        }

        if (vdirection instanceof Object) {
            vdirection = getDirectionFromDegrees(vdirection["10m"]);
        }

        const keyVal = [
            key,
            ["humitide", humi],
            ["pluie", value.pluie],
            ["vent_moyen", vmoy],
            ["vent_rafales", vrafales],
            ["vent_direction", vdirection],
            ["temperature", temp],
            ["nebulosite", nebu]
        ];

        tabBis.push(keyVal);
    };

    if (response.ok) {
        if (date !== undefined && heure !== undefined) {
            const datetime = `${date} ${heure}`;

            Object.entries(data)
                .slice(5)
                .forEach(([key, value]) => {
                    if (key === datetime) {
                        processData(key, value);
                    }
                });
        } else {
            Object.entries(data)
                .slice(5)
                .forEach(([key, value]) => {
                    processData(key, value);
                });
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