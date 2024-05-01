import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";


import Base from "./Models/Base";
import { useRef, useState } from "react";
import { Group } from "three";

import WhiteDressMen from "./Models/WhiteDressMen";
import ChinaGirlModel from "./Models/ChinaGirl";
import BlackManModel from "./Models/BlackMan";
import YellowGirlModel from "./Models/YellowGirl";
import GentleManModel from "./Models/Gentleman";
import KidModel from "./Models/Kid";
import CaptainLadyModel from "./Models/CaptainLady";
import FreekBoyModel from "./Models/FreekBoy";
import FootBallBoyModel from "./Models/FootballBoy";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { SelectNewCharactorFunction } from "../../utils/api/methods/MetaService/post";
import {addMetaUser,clearMetaUser} from '../../utils/ReduxStore/Slice/metaUserSlice'
import { useNavigate } from "react-router-dom";
function CharactorShow({selectedCharacter,selectedImote}:any) {
  const groupRef = useRef<Group>(null); 
 
  const renderSelectedCharacter = () => {
   switch (selectedCharacter) {
     case "footballBoy":
       return <FootBallBoyModel  selectedImote={selectedImote} />;
     case "blackMan":
       return <BlackManModel selectedImote={selectedImote} />;
     case "chinaGirl":
       return <ChinaGirlModel  selectedImote={selectedImote}/>;
     case "WhiteDressMen":
         return <WhiteDressMen selectedImote={selectedImote}/>;
     case "YellowGirlModel":
         return <YellowGirlModel  selectedImote={selectedImote}/>;
     case "GentleManModel":
         return <GentleManModel  selectedImote={selectedImote}/>;
     case "KidModel":
         return <KidModel selectedImote={selectedImote} />;
     case "CaptainLadyModel":
         return <CaptainLadyModel selectedImote={selectedImote} />;
      case "FreekBoyModel":
         return <FreekBoyModel  selectedImote={selectedImote}/>;
     default:
       return <FreekBoyModel selectedImote={selectedImote}/>;
   }
 };



  useFrame(() => {
    if (groupRef.current ) {

      groupRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group
      ref={groupRef}
      name="charactorShow"
      position={[0, 0, 0]}
      rotation={[0, 0, 0]}
      scale={0.5}
    >
      <ambientLight intensity={1} />
      {renderSelectedCharacter()}
      <Base />
    </group>
  );
}

const CharacterSelection = () => {
   const userData = useSelector((state: any) => state.persisted.user.userData);
  const metauserData=useSelector((state:any)=>state.persisted.metaUser.metaUserData)
  const navigate=useNavigate()
   const [selectedCharacter, setSelectedCharacter] = useState(null);
   const [selectedImote,setSelectedImote]=useState<string>("idle")

   const handleCharacterSelection = (character:any) => {
     setSelectedCharacter(character);
   };
  
   const handleCharacterSelect=async()=>{
      toast.success(`Selected ${selectedCharacter}`)
const data={
   userId: userData.userId,
   charactorName:selectedCharacter

}
    
const response=await SelectNewCharactorFunction(data)
if(response.status){
   clearMetaUser()
   addMetaUser(response.data)
   navigate('/meta')
}

   }


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
              <div className="w-36 h-36  rounded-md " onClick={()=>handleCharacterSelection("footballBoy")}>
                <img
                  src="../ModelPics/football.png"
                  className="w-full h-full object-cover rounded-md opacity-70 hover:rounded-md transition duration-700 ease-in-out hover:opacity-100 hover:h-[150px] hover:w-[150px] border border-[#64748b]"
                  alt=""
                />
              </div>
              <div className="w-36 h-36  rounded-md " onClick={()=>handleCharacterSelection("blackMan")}>
                <img
                  src="../ModelPics/blackMan.png"
                  className="w-full h-full object-cover rounded-md opacity-70 hover:rounded-md transition duration-700 ease-in-out hover:opacity-100 hover:h-[150px] hover:w-[150px] border border-[#64748b]"
                  alt=""
                />
              </div>
              <div className="w-36 h-36  rounded-md " onClick={()=>handleCharacterSelection("chinaGirl")}>
                <img
                  src="../ModelPics/chinaLady.png"
                  className="w-full h-full object-cover rounded-md opacity-70 hover:rounded-md transition duration-700 ease-in-out hover:opacity-100 hover:h-[150px] hover:w-[150px] border border-[#64748b]"
                  alt=""
                />
              </div>
              <div className="w-36 h-36  rounded-md "  onClick={()=>handleCharacterSelection("FreekBoyModel")}>
                <img
                  src="../ModelPics/freekBoy.png"
                  className="w-full h-full object-cover rounded-md opacity-70 hover:rounded-md transition duration-700 ease-in-out hover:opacity-100 hover:h-[150px] hover:w-[150px] border border-[#64748b]"
                  alt=""
                />
              </div>
              <div className="w-36 h-36  rounded-md " onClick={()=>handleCharacterSelection("KidModel")}>
                <img
                  src="../ModelPics/kid.png"
                  className="w-full h-full object-cover rounded-md opacity-70 hover:rounded-md transition duration-700 ease-in-out hover:opacity-100 hover:h-[150px] hover:w-[150px] border border-[#64748b]"
                  alt=""
                />
              </div>
              <div className="w-36 h-36  rounded-md " onClick={()=>handleCharacterSelection("YellowGirlModel")}>
                <img
                  src="../ModelPics/yellowLady.png"
                  className="w-full h-full object-cover rounded-md opacity-70 hover:rounded-md transition duration-700 ease-in-out hover:opacity-100 hover:h-[150px] hover:w-[150px] border border-[#64748b]"
                  alt=""
                />
              </div>
              <div className="w-36 h-36  rounded-md " onClick={()=>handleCharacterSelection("CaptainLadyModel")}>
                <img
                  src="../ModelPics/captainLady.png"
                  className="w-full h-full object-cover rounded-md opacity-70 hover:rounded-md transition duration-700 ease-in-out hover:opacity-100 hover:h-[150px] hover:w-[150px] border border-[#64748b]"
                  alt=""
                />
              </div>
              <div className="w-36 h-36  rounded-md " onClick={()=>handleCharacterSelection("WhiteDressMen")}>
                <img
                  src="../ModelPics/whiteMan.png"
                  className="w-full h-full object-cover rounded-md opacity-70 hover:rounded-md transition duration-700 ease-in-out hover:opacity-100 hover:h-[150px] hover:w-[150px] border border-[#64748b] "
                  alt=""
                />
              </div>
              <div className="w-36 h-36  rounded-md " onClick={()=>handleCharacterSelection("GentleManModel")}>
                <img
                  src="../ModelPics/gentleman.png"
                  className="w-full h-full object-cover rounded-md opacity-70 hover:rounded-md transition duration-700 ease-in-out hover:opacity-100 hover:h-[150px] hover:w-[150px] border border-[#64748b]"
                  alt=""
                />
              </div>
            </div>
          </div>

          <div className="w-full h-12 flex items-center p-5 gap-4">
            <div>
              {/* <button className="w-14 h-7 flex items-center justify-center rounded-md p-1  bg-[#334155] border-[#cbd5e1] border  text-[#cbd5e1]  text-[10px] font-sans font-semibold   ">SELECT</button> */}
            </div>
            <div>
              <button className="w-14 h-7 flex items-center justify-center rounded-md p-1  bg-[#334155] border-[#cbd5e1] border  text-[#cbd5e1]  text-[10px] font-sans font-semibold   ">
                BACK
              </button>
            </div>
          </div>

          {/* first div for charectors listing  */}
        </div>

        {/* second deiv for charactar showing  */}
        <div className=" h-full w-full ">
          <Canvas shadows camera={{ position: [0, 0, 5], fov: 30 }}>
            <OrbitControls position={[0, 0, 0]} />
            <ambientLight intensity={1} />
            <directionalLight position={[-5, 5, 5]} castShadow />

            <CharactorShow  selectedCharacter={selectedCharacter} selectedImote={selectedImote}/>
          </Canvas>

          {/* second deiv for charactar showing  */}
        </div>

        {/* third div for charector details  */}
        <div className=" h-full w-full flex flex-col justify-center items-center p-5 ">
          <div className="w-full h-4/6  flex flex-col justify-between rounded-md  ">
            <div className=" w-full h-2/6 flex justify-center items-center text-2xl font-sans text-[#cbd5e1] font-semibold ">
              Razik
            </div>
            <div className=" w-full h-full flex justify-evenly items-center flex-wrap gap-1 p-6">
              <div className="border-[0.1px] border-[#cbd5e1] rounded-md w-20 h-20 text-sm font-mono flex justify-center items-center text-[#cbd5e1]" onClick={()=>setSelectedImote("dance")}>
                Dance
              </div>
              <div className="border-[0.1px] border-[#cbd5e1] rounded-md w-20 h-20 text-sm font-mono flex justify-center items-center text-[#cbd5e1]" onClick={()=>setSelectedImote("fight")}>
                Fight
              </div>
              <div className="border-[0.1px] border-[#cbd5e1] rounded-md w-20 h-20 text-sm font-mono flex justify-center items-center text-[#cbd5e1]" onClick={()=>setSelectedImote("idle")}>
                Idle
              </div>
              <div className="border-[0.1px] border-[#cbd5e1] rounded-md w-20 h-20 text-sm font-mono flex justify-center items-center text-[#cbd5e1]" onClick={()=>setSelectedImote("jump")}>
                jump
              </div>
              <div className="border-[0.1px] border-[#cbd5e1] rounded-md w-20 h-20 text-sm font-mono flex justify-center items-center text-[#cbd5e1]" onClick={()=>setSelectedImote("drink")}>
                Drink
              </div>
              <div className="border-[0.1px] border-[#cbd5e1] rounded-md w-20 h-20 text-sm font-mono flex justify-center items-center text-[#cbd5e1]" onClick={()=>setSelectedImote("watch")}>
                watch
              </div>
              <div className="border-[0.1px] border-[#cbd5e1] rounded-md w-20 h-20 text-sm font-mono flex justify-center items-center text-[#cbd5e1]" onClick={()=>setSelectedImote("call")}>
                call
              </div>
              <div className="border-[0.1px] border-[#cbd5e1] rounded-md w-20 h-20 text-sm font-mono flex justify-center items-center text-[#cbd5e1] " onClick={()=>setSelectedImote("walk")}>
                walk
              </div>
            </div>
          </div>

          {/* third div for charector details  */}
          <div className="w-full flex justify-center items-center h-full">
  <button className="w-20 h-8 rounded-md text-[#cbd5e1] border-[0.1px] border-[#cbd5e1] 
  bg-gradient-to-b from-[#334155] to-[#1e293b] hover:from-[#1e293b] hover:to-[#334155]
  focus:outline-none focus:ring-2 focus:ring-[#cbd5e1] focus:border-transparent
  disabled:opacity-50 disabled:cursor-not-allowed text-sm "
  onClick={handleCharacterSelect}
//   disabled={isDisabled}
  >
    SELECT
  </button>
</div>
        </div>

        {/* main div  */}
      </div>
    </>
  );
};

export default CharacterSelection;
