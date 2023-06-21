'use client'

import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

export const Form = ({children, name, id, visible, snackbar}) => {
    return (
        <div>
            {children}
        </div>

    )
}
