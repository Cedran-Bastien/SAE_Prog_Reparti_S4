'use client'

import {Work} from "@/app/Work/work";
import Image from "next/image";
import Architechture from "../../public/Architechture.png"
import {useState} from "react";
import {hostname, setHostName} from "@/app/utils";

export default function Rendu() {
    const [value, setValue] = useState("")
    const [error, setError] = useState("")

    return (
        <div className="m-5 flex flex-col gap-2">
            <div className="flex flex-row gap-2">
                <label>Set the new hostname</label>
                <input className="border-2 border-black" type="text"  onChange={(e) => {
                    setValue(e.target.value)
                }}/>
            </div>
            <button className="content-center duration-500 p-2 hover:bg-cyan-400" onClick={() => {
                setHostName(value)
                console.log(hostname)
                setError( hostname + " Set up !!")
            }}> Save </button>
            <div className="text-red-500 font-bold">
                {error}
            </div>
        </div>
    )
}