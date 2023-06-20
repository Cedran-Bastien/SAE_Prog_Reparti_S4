'use client'
import {useState} from "react";
import DateTimePicker from "react-datetime-picker";
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';


export const ReservForm = ({name, id, visible, snackbar}) => {
    let res;
    const [error, setError] = useState("")
    const [dateValue, setValue] = useState(new Date())

    const reserver = () => {
        setError("")
        if (dateValue.getMinutes() !== 0){
            setError("Minutes must be equal to 00")
        }

        // fetch("",{method: 'POST'}).then((res) => {
        //     snackbar[0]("Reservation Success")
        //     snackbar[1]("")
        // })
    }

    return (
        <div className={"flex flex-col gap-5 z-10 bg-cyan-50 right-10 top-10 m-5 p-5 rounded-2xl fixed" + visible[0]}>
            <p>Reserver dans le restaurant : {name}</p>
            <div className={"inline-block gap-1"}>
                <label htmlFor="name">Date de réservation () : </label>
                <DateTimePicker onChange={setValue} value={dateValue}/>
            </div>
            <label className={"text-red-600 text-center font-bold"}>{error}</label>
            <button className={"hover:bg-cyan-400 duration-500"} onClick={reserver}>Reserver</button>
        </div>
    )
}
