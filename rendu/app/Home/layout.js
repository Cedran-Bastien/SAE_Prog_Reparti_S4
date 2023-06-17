import {Footer, Header} from "@/app/Home/general";
import '../globals.css'
export default function home({ children }) {
  return (
      <div>
          <Header/>
          <div id="map"></div>
          <Footer ButtonText={"Notre travail"} />
      </div>
  )
}
