'use client'

import {Form, ReservForm} from "@/app/Home/Reservation";
import {useState} from "react";
import dynamic from "next/dynamic";
import {dataMeteo} from "@/lib/meteo";
import DateTimePicker from "react-datetime-picker";
import {hostname} from "@/app/utils";


export default function Rendu(){
    const [error, setError] = useState("")
    const [dateValue, setValue] = useState(new Date())
    const [freePlace, setFreePlace] = useState(0)
    const [meteo, setMeteo] = useState("")
    const [id, setId ] = useState()
    const [nbPersonne, setNB] = useState(0)
    const [nom, setNom] = useState("")
    const [prenom, setPrenom] = useState("")
    const [tel, setTel] = useState("")
    const [adresse,setAdresse] = useState("")
    const [lat,setLta] = useState()
    const [long, setLong] = useState()
    const [table, setTable] = useState()
    const [formCreateVisibility, setCreateVisibility] = useState( " invisible")
    const [color, setColor] = useState(" text-green-700")



    const reserver = () => {
        setError("")
        if (dateValue.getMinutes() !== 0){
            setError("Minutes must be equal to 00")
        }

        let month;
        let day;

        if (dateValue.getMonth().toString().length === 1){
            month = "0"+dateValue.getMonth()
        }

        if (dateValue.getDay().toString().length === 1){
            day = "0"+dateValue.getDay()
        }

        fetch(hostname+"/db/restaurants/reserver",{
            method: "POST",
            headers: {

                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify({
                "id_resto": id,
                "date": `${dateValue.getFullYear()}-${month}-${day}`,
                "heure": dateValue.getHours(),
                "personnes": nbPersonne,
                "nom": nom,
                "prenom": prenom,
                "tel": tel

            })}).then(res => res.json()).then( (res,data) => {
                setColor(" text-green-700")
                setText("Reservation Success")
                setTextVisibility("")
        }).catch(err => console.log(err));
    }

    const updateValue = () => {
        let month;
        let day;

        console.log(dateValue.getMonth().toString().length)

        if (dateValue.getMonth().toString().length === 1){
            month = "0"+dateValue.getMonth()
        }

        console.log(dateValue.getDay().toString().length)
        if (dateValue.getDay().toString().length === 1){
            day = "0"+dateValue.getDay()
        }
        fetch(hostname+`/db/restaurants/${id}/reservation/${dateValue.getFullYear()+"-"+month+"-"+day}/${dateValue.getHours()}`).then((res) => {
            console.log(res)
            res.json().then( (data) => {
                console.log(data)
               setFreePlace(data.tables.dispo_tables)
            })
        })
        let hour
        if (dateValue.getHours().toString().length === 1){
            hour = "0"+dateValue.getMonth()
        }
        dataMeteo(dateValue.getFullYear()+"-"+month+"-"+day, hour+":00:00").then((res) => {
            console.log(res)
            if (res[2][1] > 0) {
                setMeteo(`il y aura du soleil, des vents ${res[3][1]} et une temperature de ${res[6][1 ]}`)
            } else {
                setMeteo(`il y aura de la pluie, des vents ${res[3][1]} et une temperature de ${res[6][1 ]}`)
            }
        })
    }
    updateValue()


    const [formVisibility, setVisibility] = useState(" invisible")
    const [text, setText] = useState("")
    const [textVisibility, setTextVisibility] = useState(" invisible")

    const MapWithNoSSR = dynamic(async () => (await import("../Home/map")).Map, {
        ssr: false
    });

    return (
        <div>
            <MapWithNoSSR changeVisibility={setVisibility} createVisibility={setCreateVisibility} setId={setId} setLat={setLta} setLong={setLong}/>
            <Form>
                <div className={`flex z-40 flex-col gap-5 bg-cyan-50 right-10 top-10 m-5 p-5 rounded-2xl fixed ${formVisibility}`}>
                    <p>Reservation </p>
                    <div className={"inline-block gap-3"}>
                        <label htmlFor="name">nom : </label>
                        <input className="border-black border-2" onChange={(event) => {
                            setNom(event.target.value)
                        }} type="text" value={nom}/>
                    </div>
                    <div className={"inline-block gap-3"}>
                        <label htmlFor="name">prénom : </label>
                        <input className="border-black border-2" onChange={(event) => {
                            setPrenom(event.target.value)
                        }} type="text" value={prenom}/>
                    </div>
                    <div className={"inline-block gap-3"}>
                        <label htmlFor="name">Telephone : </label>
                        <input className="border-black border-2" onChange={(event) => {
                            setTel(event.target.value)
                        }} type="text" value={tel}/>
                    </div>
                    <div  className={"inline-block gap-3"}>
                        <label htmlFor="name">nombre de personnes : </label>
                        <input className="border-black border-2" onChange={(event) => {
                            setNB(event.target.value)
                        }} type="number" value={nbPersonne}/>
                    </div>
                    <div onChange={updateValue} className={"inline-block gap-3"}>
                        <label htmlFor="name">Date de réservation () : </label>
                        <DateTimePicker onChange={setValue} value={dateValue}/>
                    </div>
                    <p>Meteo : {meteo}</p>
                    <p>nombre de table (4 places) libre : {freePlace} tables</p>
                    <label className={"text-red-600  text-center font-bold"}>{error}</label>
                    <button className={"hover:bg-cyan-400 duration-500"} onClick={reserver}>Reserver</button>
                </div>
            </Form>
            <Form>
                <div className={`flex z-20 flex-col gap-5 z-10 bg-cyan-50 right-10 top-10 m-5 p-5 rounded-2xl fixed ${formCreateVisibility}`}>
                    <strong>Ajouter restaurant</strong>
                        <div className="form-example">
                            <label htmlFor="name">Nom Restaurant: </label>
                            <input className="border-2 border-black" type="text"  id="name" onChange={(event) => {
                                setNom(event.target.value)
                            }} required/>
                        </div>
                        <div className="form-example">
                            <label htmlFor="adresse">Adresse du restaurant: </label>
                            <input className="border-2 border-black" type="text"  id="adresse" onChange={(event) => {
                                setAdresse(event.target.value)
                            }} required/>
                        </div>
                        <div className="form-example">
                            <label htmlFor="nbTable">nombre de table Max: </label>
                            <input className="border-2 border-black" type="text"  id="nbTable" onChange={(event) => {
                                setTable(event.target.value)
                            }} required/>
                        </div>
                        <div className="flex flex-row justify-center">
                            <input className="text-center hover:bg-cyan-300 p-2 rounded" onClick={() => {
                                fetch(hostname+"/db/restaurants/ajouterresto/ajouterresto",
                                    {
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json"
                                        },
                                        body: JSON.stringify({
                                            "nom": document.querySelector("#name").value,
                                            "adresse": document.querySelector("#adresse").value,
                                            "latitude": lat,
                                            "longitude": long,
                                            "nb_tables": document.querySelector("#nbTable").value
                                        })
                                    }).then(res => res.json()).then(data => {
                                    setCreateVisibility(" invisible")
                                    setColor(" text-green-700")
                                    setText(" Correctly added")
                                    setTextVisibility("")
                                });
                            }} formAction={`${hostname}`} type="submit" value="Valider"/>
                        </div>
                </div>
            </Form>
            <p onClick={() => setTextVisibility(" invisible")} className={`font-bold ${color} cursor-pointer ${textVisibility}` }>{text}</p>
        </div>
    )
}