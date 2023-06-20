'use client'
import React, {useEffect, useState} from "react";
import {usePathname, useRouter} from "next/navigation";
import Map from '@material-ui/icons/MapOutlined';
import School from '@material-ui/icons/SchoolOutlined';

const Onglet = ({text, route, icons}) => {
    const [classe, setClasse] = useState("")
    const path = usePathname()
    const router = useRouter()
    useEffect( () => {
        if (path === route  ) {
            setClasse("bg-blue-400 text-white")
        }else {
            setClasse("hover:bg-amber-50 duration-700")
        }
    }, [router,route, path])

    return (
        <div className={" p-5 cursor-pointer " + classe} onClick={() => {router.push(route)}}>
            <p>{text}</p>
            {icons}
        </div>

    );
}

const Menu = ({onglets}) => {
    const listOnglet = onglets.map((data) => <Onglet key={data.name} text={data.name} route={data.route} icons={data.icon}  />)
    return (
            <nav className="fixed z-10 bg-cyan-50 flex flex-col w-20 text-center h-full">
                {listOnglet}
            </nav>
        )

}


export const Header = () => {
    const listOnglet = [
        {
            name : "Map",
            route: '/Home',
            icon: <Map/>
        },

        {
            name: "Travail réalisé",
            route: '/Work',
            icon: <School/>
        }
    ]
    return (
        <Menu onglets={listOnglet} />
    )
}

// function redirectFooter(){
//     const router = useRouter();
//
//     useEffect(() => {
//         router.push("/Home/APropos")
//     }, [router])
// }
//
// export const Footer = ({ButtonText}) => {
//     return (
//         <div className={"bg-cyan-400 absolute bottom-0 text-center min-w-full py-2"}>
//                <p className="hover:bg-cyan-400 hover:rounded duration-500 px-3.5 my-1 py-2.5 cursor-pointer" onClick={redirectFooter} >{ButtonText}</p>
//         </div>
//     )
// }