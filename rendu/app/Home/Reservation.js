'use client'
import {useState} from "react";
import DateTimePicker from "react-datetime-picker";
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import {hostname} from "@/public/const/const";
import dataMeteo from "@/lib/meteo";


export const Form = ({children, name, id, visible, snackbar}) => {


    return (
        <div>
            {children}
        </div>

    )
}
