import { Route, Routes } from "react-router-dom";
import MetaHome from "../components/MetaComponents/MetaHome";


const MetaRouter=()=>{
    return (<>
    {console.log('HHHHHII I MA REACHED INHERE')
    }
    <Routes>
        {/* <Route path="/metaLogin" element={} /> */}
        {/* <Route path="/charactorSelection" element={} /> */}
        <Route path="/*" element={<MetaHome/>} />

      </Routes>


    </>)
}

export default MetaRouter