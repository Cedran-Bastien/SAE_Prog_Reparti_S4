'use client'
import React, {useEffect} from "react";
import {useRouter} from "next/navigation";
import {MAP_APP_URL} from "@/Const";

const Onglet = ({text, route}) => {
    return (
        <p className="hover:bg-cyan-400 hover:rounded duration-500 px-3.5 my-1 ml-1 py-2.5 cursor-pointer" onClick={route} >{text}</p>
    );
}

const Menu = ({onglets}) => {
    const listOnglet = onglets.map((data) => <Onglet key={data.name} text={data.name} route={data.route}  />)
    return (
            <nav className="flex flex-row back bg-cyan-500 gap-2">
                {listOnglet}
                <a className="hover:bg-cyan-400 hover:rounded duration-500 px-3.5 my-1 py-2.5 cursor-pointer" href={MAP_APP_URL}> L&apos;application</a>
            </nav>
        )

}


export const Header = () => {
    const router = useRouter()
    const listOnglet = [{name : "Home", route: () => {router.push('/Home')}} ,{ name:"Travail réalisé", route: () => {router.push('/Work')}}]
    return (
        <div>
            <div className="bg-cyan-400">
                {/*<Image className="w-20" src={logo} alt={'logo du site'} />*/}
            </div>
            <Menu onglets={listOnglet} />
        </div>
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