import { useEffect, useRef, useState } from "react"
import { useSocket } from "../../utils/costumHook/useSoket"
import { Canvas, useFrame} from '@react-three/fiber'
import {HomeTownModel} from './Models/Home'
import { CameraControls, Helper, OrbitControls, PerspectiveCamera } from "@react-three/drei"
import { AmbientLight, BoxHelper, DirectionalLight, DirectionalLightHelper, PointLightHelper } from "three"
import { Physics, usePlane, useBox } from '@react-three/cannon'

import {WhiteTshirtGirlModel} from './Models/WhiteTshirtGirl'
import { useSelector } from "react-redux"
import { toast } from "sonner"

const MetaHome=()=>{
    const [users, setUsers] = useState([]);
    const userData = useSelector((state: any) => state.persisted.user.userData);
const socket:any=useSocket()

useEffect(()=>{
if(socket){
    const dataPayload={
        userId:userData.userId,
    }
    socket.emit("addNewUserToMeta",(dataPayload))


    socket.on("updateUsers", (users:any):any => {
        toast.success('User list updated');
        setUsers(users);
      });


      socket.on("userPositionUpdated", ({ userId, position }:any) => {
        console.log('getiing',position);
        
        setUsers((prevUsers:any) =>
          prevUsers.map((user:any) =>
            user.userId === userId ? { ...user, position } : user
          )
        );
      });

      return () => {
        socket.off("updateUsers");
        socket.off("userPositionUpdated");
      };

}

},[socket])
    return (
        <>
        <div className="w-screen h-screen fixed">

       <Canvas shadows  >
     
        <ambientLight intensity={2}/>
       <directionalLight  />
       {/* <Helper type={} args={[10,'blue']} /> */}
       
     
  
  <Physics gravity={[0, -6.003, 0]} allowSleep={false} broadphase="SAP">
   

    <WhiteTshirtGirlModel/>
     <HomeTownModel />
   
    </Physics> 
       </Canvas>
        </div>

       
        </>
    )
}

export default MetaHome





  
