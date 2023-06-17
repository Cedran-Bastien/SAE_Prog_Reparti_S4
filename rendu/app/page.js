'use client'

import {useRouter} from "next/navigation";
import {useEffect} from "react";

export default function Redirect() {
    const router = useRouter()
    useEffect(( ) => {
        if (!router){
            return
        }

        router.push('/Home')
    }, [router])

    return <></>
}