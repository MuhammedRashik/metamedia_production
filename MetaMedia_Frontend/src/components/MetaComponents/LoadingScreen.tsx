import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import FatManLoding from "./Fatmandancing";


const LoadingScreenComponent = () => {
  const [count, setCount] = useState(0);

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       setCount(prevCount => {
//         if (prevCount >= 100) {
//           clearInterval(intervalId);
//           return 100;
//         }
//         return prevCount + 1;
//       });
//     }, 50);

//     return () => clearInterval(intervalId);
//   }, []);

  return (
    <div className="w-screen h-screen  bg-[#ece9f0] flex justify-center items-center">
      <Canvas shadows camera={{ position: [3, 3, 3], fov: 30 }}>
      {/* <OrbitControls /> */}
       <ambientLight intensity={0.5} />
       <directionalLight position={[-5,5,5]} castShadow />
       <FatManLoding/>
      </Canvas>
      <div className="text-[500px] fixed w-screen h-screen font-mono text-white text-center z-10">{count}</div>
    </div>
  );
};


export default LoadingScreenComponent;
