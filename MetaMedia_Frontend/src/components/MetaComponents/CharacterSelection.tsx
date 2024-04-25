
import { OrbitControls } from "@react-three/drei"
import { Canvas, useFrame } from "@react-three/fiber"
import { toast } from "sonner"
import FatManLoding from "./Fatmandancing"
import Base from './Base'
import { useRef } from "react"
import { Group } from 'three';
import Dance from "./Dancertest"





function CharactorShow() {
    const groupRef = useRef<Group>(null); // Initialize with null instead of undefined
  
    // Rotate the group using useFrame
    useFrame(() => {
      if (groupRef.current) {
        groupRef.current.rotation.y += 0.01; // Adjust the rotation speed here
      }
    });
  
    return (
      <group ref={groupRef} name="charactorShow" position={[0,0,0]}  rotation={[0,0,0]} scale={0.5}>
        <Dance />
        {/* <FatManLoding/> */}
        <Base />
      </group>
    );
  }




const CharacterSelection=()=>{

    const groupRef:any = useRef();



    const handleCharacterPopUp=(index:number)=>{
        toast.success(index)
       
    }
    // useFrame(() => {
    //     if (groupRef.current) {
    //       groupRef.current.rotation.y += 0.01; // Adjust the rotation speed here
    //     }
    //   });
    return (
        <>
        {/* main div  */}
<div className="w-full h-full  fixed flex flex-col md:flex-row justify-between gap-0.5  items-center bg-gradient-to-l from-[#0f172a] via-[#334155] to-[#1e293b] ">
  
{/* first div for charectors listing  */}
<div className=" h-full w-full flex flex-col justify-between items-center ">
<div className="w-full  h-24 flex justify-start pl-5 items-center flex-wrap text-lg font-sans font-semibold text-[#cbd5e1]">
    SELECT YOUR CHARACTER
</div>

<div className="w-full h-full  relative overflow-hidden flex justify-center items-center pl-5 ">
  <div className="  w-11.5/12 h-4/6     rounded-md flex flex-wrap justify-evenly ">
     <div className="w-36 h-36  rounded-md ">
        <img src="https://i.pinimg.com/564x/21/86/34/218634afe48d237cc8fbea7a932c825d.jpg" className="w-full h-full object-cover rounded-md opacity-70 hover:rounded-md transition duration-700 ease-in-out hover:opacity-100 hover:h-[150px] hover:w-[150px] " alt="" />
     </div>
     <div className="w-36 h-36  rounded-md ">
        <img src="https://i.pinimg.com/564x/61/5e/8e/615e8e6a99fe86a81ed3ab8d6a662147.jpg" className="w-full h-full object-cover rounded-md opacity-70 hover:rounded-md transition duration-700 ease-in-out hover:opacity-100 hover:h-[150px] hover:w-[150px]" alt="" />
     </div>
     <div className="w-36 h-36  rounded-md ">
        <img src="https://i.pinimg.com/564x/75/79/0f/75790f64987c45b1f72df32dbbf13f4f.jpg" className="w-full h-full object-cover rounded-md opacity-70 hover:rounded-md transition duration-700 ease-in-out hover:opacity-100 hover:h-[150px] hover:w-[150px]" alt="" />
     </div>
     <div className="w-36 h-36  rounded-md ">
        <img src="https://i.pinimg.com/564x/f6/e4/2e/f6e42e9efd9e3dc7743a009ea8e37c82.jpg" className="w-full h-full object-cover rounded-md opacity-70 hover:rounded-md transition duration-700 ease-in-out hover:opacity-100 hover:h-[150px] hover:w-[150px]" alt="" />
     </div>
     <div className="w-36 h-36  rounded-md ">
        <img src="https://i.pinimg.com/564x/85/9d/07/859d07a129085f9eb3636c5ead1e1e16.jpg" className="w-full h-full object-cover rounded-md opacity-70 hover:rounded-md transition duration-700 ease-in-out hover:opacity-100 hover:h-[150px] hover:w-[150px]" alt="" />
     </div>
     <div className="w-36 h-36  rounded-md ">
        <img src="https://i.pinimg.com/564x/41/8c/ed/418ced0f93e2c0013368b8d1a49a44f2.jpg" className="w-full h-full object-cover rounded-md opacity-70 hover:rounded-md transition duration-700 ease-in-out hover:opacity-100 hover:h-[150px] hover:w-[150px]" alt="" />
     </div>
     <div className="w-36 h-36  rounded-md ">
        <img src="https://i.pinimg.com/564x/ee/dc/6c/eedc6ce3be44c2aa51d90249478c79b2.jpg" className="w-full h-full object-cover rounded-md opacity-70 hover:rounded-md transition duration-700 ease-in-out hover:opacity-100 hover:h-[150px] hover:w-[150px]" alt="" />
     </div>
     <div className="w-36 h-36  rounded-md ">
        <img src="https://i.pinimg.com/564x/4b/16/69/4b166995d7b34593a9595eb6ad7dedc3.jpg" className="w-full h-full object-cover rounded-md opacity-70 hover:rounded-md transition duration-700 ease-in-out hover:opacity-100 hover:h-[150px] hover:w-[150px]" alt="" />
     </div>
     <div className="w-36 h-36  rounded-md ">
        <img src="https://i.pinimg.com/564x/5d/11/5d/5d115dd478c01dbd127b9a93438d0e5e.jpg" className="w-full h-full object-cover rounded-md opacity-70 hover:rounded-md transition duration-700 ease-in-out hover:opacity-100 hover:h-[150px] hover:w-[150px]" alt="" />
     </div>
     
  </div>
 
</div>



<div className="w-full h-12 flex items-center p-5 gap-4">
<div>
 
{/* <button className="w-14 h-7 flex items-center justify-center rounded-md p-1  bg-[#334155] border-[#cbd5e1] border  text-[#cbd5e1]  text-[10px] font-sans font-semibold   ">SELECT</button> */}
</div>
<div>
<button className="w-14 h-7 flex items-center justify-center rounded-md p-1  bg-[#334155] border-[#cbd5e1] border  text-[#cbd5e1]  text-[10px] font-sans font-semibold   ">BACK</button>

</div>
</div> 

{/* first div for charectors listing  */}
</div>


{/* second deiv for charactar showing  */}
<div className=" h-full w-full ">
<Canvas shadows camera={{ position: [0, 0, 5], fov: 30 }}>
     <OrbitControls position={[0,0,0]} />
       <ambientLight intensity={1} />
       <directionalLight position={[-5,5,5]} castShadow />
   
       <CharactorShow />
      </Canvas>

{/* second deiv for charactar showing  */}
</div>


{/* third div for charector details  */}
<div className=" h-full w-full flex flex-col justify-center items-center p-5 ">

<div className="w-full h-4/6  flex flex-col justify-between rounded-md border-[0.1px] ">
<div className=" w-full h-2/6 flex justify-center items-center text-2xl font-sans text-[#cbd5e1] font-semibold ">Razik</div>
<div className=" w-full h-full flex justify-evenly items-center flex-wrap gap-1 p-6">
    <div className="border-[0.1px] border-[#cbd5e1] rounded-md w-20 h-20 text-sm font-mono flex justify-center items-center text-[#cbd5e1]">Dance</div>
    <div className="border-[0.1px] border-[#cbd5e1] rounded-md w-20 h-20">1</div>
    <div className="border-[0.1px] border-[#cbd5e1] rounded-md w-20 h-20">1</div>
    <div className="border-[0.1px] border-[#cbd5e1] rounded-md w-20 h-20">1</div>
    <div className="border-[0.1px] border-[#cbd5e1] rounded-md w-20 h-20">1</div>
    <div className="border-[0.1px] border-[#cbd5e1] rounded-md w-20 h-20">1</div>
    <div className="border-[0.1px] border-[#cbd5e1] rounded-md w-20 h-20">1</div>
    <div className="border-[0.1px] border-[#cbd5e1] rounded-md w-20 h-20">1</div>


</div>

</div>



{/* third div for charector details  */}
</div>

  {/* main div  */}
</div>
      


        </>
    )
}

export default CharacterSelection