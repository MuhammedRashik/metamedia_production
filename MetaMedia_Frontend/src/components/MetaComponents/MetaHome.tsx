import { useEffect, useRef, useState } from "react"
import { useSocket } from "../../utils/costumHook/useSoket"
import { Canvas, useFrame} from '@react-three/fiber'
import {HomeTownModel} from './Models/Home'
import { CameraControls, Helper, OrbitControls, PerspectiveCamera } from "@react-three/drei"
import { AmbientLight, BoxHelper, DirectionalLight, DirectionalLightHelper, PointLightHelper } from "three"
import { Physics, usePlane, useBox } from '@react-three/cannon'
import randomColor from 'randomcolor';
import {WhiteTshirtGirlModel} from './Models/WhiteTshirtGirl'
import { useSelector } from "react-redux"
import { toast } from "sonner"

const MetaHome=()=>{
    const [users, setUsers] = useState([]);
    const userData = useSelector((state: any) => state.persisted.user.userData);
    const [position, setPosition] = useState({ x: 0, y: 0, z: 0 });
const socket:any=useSocket()

useEffect(() => {
    if (socket) {
      const dataPayload = { userId: userData.userId };
      socket.emit("addNewUserToMeta", dataPayload);

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
  }, [socket]);


  useEffect(() => {
    const handleKeyDown = (event:any) => {
      const moveDistance = 0.1;
      let newPosition = { ...position };
      switch (event.key) {
        case 'ArrowUp':
          newPosition.z -= moveDistance;
          break;
        case 'ArrowDown':
          newPosition.z += moveDistance;
          break;
        case 'ArrowLeft':
          newPosition.x -= moveDistance;
          break;
        case 'ArrowRight':
          newPosition.x += moveDistance;
          break;
        default:
          return;
      }
      setPosition(newPosition);
     
      
     if(socket){
      console.log(newPosition);
      socket.emit("setUserPosition", { userId: userId, position: newPosition });
     }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [position, socket]);


    return (
        <>
        <div className="w-screen h-screen fixed">

       <Canvas shadows  >
     
        <ambientLight intensity={2}/>
       <directionalLight  />
      
       
     
  
  <Physics gravity={[0, -6.003, 0]} allowSleep={false} broadphase="SAP">
  <WhiteTshirtGirlModel />
  {users.map((user) => (
            <Box position={user.position} />
            ))}

   
     <HomeTownModel />
   
    </Physics> 
       </Canvas>
        </div>

       
        </>
    )
}

export default MetaHome



const Box = ({ position }:any) => {
    const color = useRef(randomColor()).current; // Ensure color stays consistent
    return (
      <mesh position={[position.x, position.y, position.z]}>
        <OrbitControls />
        
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color={color} />
      </mesh>
    );
  }
  


  
