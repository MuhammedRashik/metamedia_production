import { Canvas } from "@react-three/fiber";
import Experience from '../components/MetaComponents/Test'

const MetaRouter=()=>{
    return (
        <>
        
    <Canvas shadows camera={{ position: [3, 3, 3], fov: 30 }}>
    <color attach="background" args={["#ececec"]} />
    <Experience />
    </Canvas>
        </>
    )
}

export default MetaRouter