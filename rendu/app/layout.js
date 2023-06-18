'use client'
import 'leaflet/dist/leaflet.css'
import {Footer, Header} from "@/app/general";
import './globals.css'

export default function RootLayout({ children }) {
  return (
    <html className={"h-full"} lang="en">
      <head>
          <meta charSet="utf-8"/>
          <title>Calcule</title>
      </head>
      <body className={"h-full flex flex-row"}>
      <Header/>
      <div className={"pl-20"}>

      </div>
      {children}

      {/*<Footer ButtonText={"Notre travail"} />*/}
      </body>
    </html>
  )
}
