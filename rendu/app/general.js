'use client'
import React from "react";
// import logo from  '../public/logo.png'
import {useRouter} from "next/navigation";
import Image from "next/image";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import * as getenv from 'getenv'
import {MAP_APP_URL} from "@/Const";

const Onglet = ({text, route}) => {
    return (
        <p className="hover:bg-cyan-400 hover:rounded duration-500 px-3.5 my-1 ml-1 py-2.5 cursor-pointer" onClick={route} >{text}</p>
    );
}

const NavMain = ({onglets}) => {
    const listOnglet = onglets.map((data) => <Onglet key={data.name} text={data.name} route={data.route}  />)
    return (
            <nav className="flex flex-row back bg-cyan-500 gap-2">
                {listOnglet}
                <a className="hover:bg-cyan-400 hover:rounded duration-500 px-3.5 my-1 py-2.5 cursor-pointer" href={MAP_APP_URL}> L'application</a>
            </nav>
        )

}


export const Header = () => {
    const router = useRouter()
    const listOnglet = [{ name:"Ce qui a été fait", route: () => {router.push('/Home')}}]
    return (
        <div>
            <div className="bg-cyan-400">
                {/*<Image className="w-20" src={logo} alt={'logo du site'} />*/}
            </div>
            <NavMain onglets={listOnglet} />
        </div>
    )
}