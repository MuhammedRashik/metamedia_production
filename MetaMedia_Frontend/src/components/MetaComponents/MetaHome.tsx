import { useState, useEffect } from 'react'
import { Canvas } from 'react-three-fiber'
import { Physics } from '@react-three/cannon'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
import { useSocket } from '../../utils/costumHook/useSoket'
import { WhiteTshirtGirlModel } from './Models/WhiteTshirtGirl'
import { HomeTownModel } from './Models/Home'
import * as THREE from 'three'

const MetaHome = () => {
  const [users, setUsers] = useState([])
  const userData = useSelector((state: any) => state.persisted.user.userData)
  const socket: any = useSocket()
  const [position, setPosition] = useState(new THREE.Vector3(0, 0, 0))

  useEffect(() => {
    console.log(position, '=====')
    if(socket){
        const payload={
            userId:userData.userId,
            position:position
        }
        socket.emit('setUserPosition',payload)
    }
  }, [position])

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
         {users.map((user:any)=>{
            return(
                <>
                 <WhiteTshirtGirlModel key={user.userId} position={user.position} setPosition={setPosition} />
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
