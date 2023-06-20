'use client'

import {Map} from "@/app/Home/map";
import {ReservForm} from "@/app/Home/Reservation";
import {useState} from "react";

export default function rendu() {
    const [formVisibility, setVisibility] = useState(" invisible")
    const [text, setText] = useState("")
    const [textVisibility, setTextVisibility] = useState(" invisible")
    return (
        <div>
            <Map changeVisibility={setVisibility}/>
            <ReservForm visible={[formVisibility, setVisibility]} snackbar={[setText, setTextVisibility]}/>
            <p className={"" + textVisibility}>{text}</p>
        </div>
    )
}