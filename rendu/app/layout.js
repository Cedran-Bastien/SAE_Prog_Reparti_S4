'use client'

import {Footer, Header} from "@/app/general";
import './globals.css'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
          <meta charSet="utf-8"/>
          <title>Calcule</title>
          <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
                integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
                crossOrigin=""/>
          <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
                  integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
                  crossOrigin="" async={true}></script>
      </head>
      <body>
      <Header/>
      {children}
      {/*<Footer ButtonText={"Notre travail"} />*/}
      </body>
    </html>
  )
}
