import { useState, useEffect } from 'react'
import { Canvas } from 'react-three-fiber'
import { Physics } from '@react-three/cannon'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
import { useSocket } from '../../utils/costumHook/useSoket'
import { WhiteTshirtGirlModel } from './Models/WhiteTshirtGirl'
import { HomeTownModel } from './Models/Home'
import * as THREE from 'three'
import {BalckManModel} from '../MetaComponents/Models/BlackMan'
const MetaHome = () => {
  const [users, setUsers] = useState([])
  const userData = useSelector((state: any) => state.persisted.user.userData)
// const userData={
//     userId:"hi"
// }
  const socket: any = useSocket()
  const [position, setPosition] = useState(new THREE.Vector3(0, 0, 0))
  const [camaraPosition,setCamaraPosition]=useState(new THREE.Vector3(0,0,0))

  useEffect(() => {
    if (socket) {
      const dataPayload = { 
        
        userId: userData.userId ,
        position:position
    
    }
      socket.emit("addNewUserToMeta", (dataPayload))

      socket.on("updateUsers", (users: any): any => {
        toast.success('User list updated')
        setUsers(users)
      })

      socket.on("userPositionUpdated", ({ userId, position }: any) => {
        console.log('getting', position)
        if (userId === userData.userId) {
          setPosition(new THREE.Vector3(position.x, position.y, position.z))
        }
        setUsers((prevUsers: any) =>
          prevUsers.map((user: any) =>
            user.userId === userId ? { ...user, position } : user
          )
        )
      })

      return () => {
        socket.off("updateUsers")
        socket.off("userPositionUpdated")
      }
    }
  }, [socket, userData.userId])

  return (
    <div className="w-screen h-screen fixed">
      <Canvas shadows>
        <ambientLight intensity={2} />
        <directionalLight />
        <Physics gravity={[0, -6.003, 0]} allowSleep={false} broadphase="SAP">
         {users.map((user)=>{
            return(
                <>
               
                 <BalckManModel key={user.userId} position={new THREE.Vector3(user.position.x,user.position.y,user.position.z)} setPosition={setPosition}  camaraPosition={camaraPosition} setCamaraPosition={setCamaraPosition}/>
                </>
            )
         })}
          <HomeTownModel />
        </Physics>
      </Canvas>
    </div>
  )
}

export default MetaHome
