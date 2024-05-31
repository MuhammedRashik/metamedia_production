import { Route, Routes } from "react-router-dom";
import MetaHome from "../components/MetaComponents/MetaHome";
import PeerConectionCheck from "../components/MetaComponents/PeerConectionCheck";
import PeerComponent from "../components/MetaComponents/PeerComponent";


const MetaRouter=()=>{
    return (<>
   
    <Routes>
        {/* <Route path="/metaLogin" element={} /> */}
        {/* <Route path="/charactorSelection" element={} /> */}
        <Route path="/peer" element={<PeerComponent/>}/>
        <Route path="/*" element={<MetaHome/>} />


      </Routes>


    </>)
}

export default MetaRouter