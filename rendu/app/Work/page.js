import {Work} from "@/app/Work/work";
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
            content:"Il correspond, dans l'architecture générale de RMI, au service central. Il permet le lien entre le client et le service BDD",
            html: ""
        },

        {
            title: "Données_Circulation",
            content: "Ce sont des données publiques auxquelles on accède directement à partir du client. Nous n'avons pas de probleme de CORS et donc pas besoin de passer par le server proxy.",
            html: ""
        },
        {
            title: "Service_BDD",
            content: "Ce service permet de faire le lien entre la base de données et le proxy. Il récupère les données dans la base de données et les retournent au proxy au format JSON pour une facilité d'utilisation pour le client",
            html: ""
        },
        {
            title: "Base de données (BDD)",
            content: "Nous enregistrons les données correspondant aux restaurants et aux réservations dans ceux-ci à une certaine date. Ce sont ces restaurants qui seront affichés sur la carte" +
                ". ",
            html: ""
        },
        {
            title: "Client",
            content: "Le client passe à travers internet ou le proxy si besoin. Une fois ces données recuperées, il va partager ces données afin de pouvoir les afficher sur le navigateur." +
                "C'est le front-end de l'application.",
            html:""
        },
        {
            title: "Données-bloquées",
            content: "Certaines données publiques nécessitent que le serveur active les CORS Multi-origine pour y avoir accès. Il faut ainsi passer par le Proxy pour activer ces CORS en ajoutant l'Header 'Content type' ",
            html: ""
        },
        {
            title: "Lien",
            content: "les liens a avoir",
            html: (
                <div>
                    <a href={"https://github.com/Cedran-Bastien/SAE_Prog_Reparti_S4"}> Git</a>
                    <a href="Https://webetu.iutnc.univ-lorraine.fr/www/lath3u/">Template du site</a>
                </div> )
        }
    ]
    return (
        <Work tab={tab}/>
    )
}