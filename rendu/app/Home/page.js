import {Home} from "@/app/Home/home";
import Image from "next/image";
import Architechture from "../../public/Architechture.png"

export default function rendu() {
    const tab = [
        {
            title: "Architechture globale",
            content: "",
            html: (<Image width={500} src={Architechture} alt={"Architechture.png"}/>)
        },
        {
            title: "Proxy",
            content:"Il correspond, dans l'architecture général de RMI, au service centrale. Il permet le lien entre le client et le service BDD",
            html: ""
        },

        {
            title: "Données_Circulation",
            content: "Ce sont des données public auquel on accedent directement a partir du client. Nous avons pas de probleme de CORS et donc pas besoin de passer par le server proxy.",
            html: ""
        },
        {
            title: "Service_BDD",
            content: "Ce service permet de faire le lien entre la base de donnée et le proxy. Il recupere les données dans la base de données et les retournes au proxy au format JSON pour une facilité d'utilisation par le client",
            html: ""
        },
        {
            title: "Base de données (BDD)",
            content: "Nous enregistrons les données correspondant au restautrant et au réservation dans ceux ci a une certaine date. Ce sont ces restaurant qui seront afficher sur la carte" +
                ". ",
            html: ""
        }
    ]
    return (
        <Home tab={tab}/>
    )
}