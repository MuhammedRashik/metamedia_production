/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 public/Models/blackMan.gltf -t 
*/

import * as THREE from 'three'
import React, { useEffect, useRef } from 'react'
import { useGLTF, useAnimations, OrbitControls } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { useThree } from 'react-three-fiber'
import { useSocket } from '../../../utils/costumHook/useSoket'
import { useInput } from '../../../utils/costumHook/useInpute'
import { useSelector } from 'react-redux'

type GLTFResult = GLTF & {
  nodes: {
    Ch18: THREE.SkinnedMesh
    mixamorigHips: THREE.Bone
  }
  materials: {
    Ch18_Body: THREE.MeshStandardMaterial
  }
  animations: GLTFAction[]
}

type ActionName = 'idle' | 'jump' | 'run' | 'walk'
interface GLTFAction extends THREE.AnimationClip {
  name: ActionName
}
type ContextType = Record<string, React.ForwardRefExoticComponent<JSX.IntrinsicElements['skinnedMesh'] | JSX.IntrinsicElements['bone']>>




let camaraTarget = new THREE.Vector3()
export function BalckManModel({position}:any,props: JSX.IntrinsicElements['group']) {
  const socket = useSocket()
   const userData = useSelector((state: any) => state.persisted.user.userData);
  // const userData={
  //   userId:"hi"
  // }
  const controlRef = useRef<typeof OrbitControls>()
  const { camera } = useThree()
  const group = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF('../../../../Models/blackMan.gltf') as GLTFResult
  const { actions } = useAnimations(animations, group)
  const { backword, forward, left, right, shift } = useInput()
  const currentAction = useRef<ActionName>('idle')
  useEffect(()=>{
 actions.idle?.reset().play()
  },[])



  const updateCamaraTarget = (moveX: number, moveZ: number) => {
   
    
    camera.position.x += moveX
    camera.position.z += moveZ

    camaraTarget.x = position.x
    camaraTarget.y = position.y + 2
    camaraTarget.z = position.z

    if (controlRef.current) {
      controlRef.current.target = camaraTarget
    }
  }

  useEffect(() => {
    const handleKeyDown = (event:any) => {

    let moveDistance 
    if(currentAction.current=='walk'){
      moveDistance=0.2
    }else if(currentAction.current=='run'){
      moveDistance=0.6
    }else{
      moveDistance=0.2
    }


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
      // setPosition(newPosition);
     
      
   
     
      if(socket)socket.emit("setUserPosition", { userId: userData.userId, position: newPosition  })
     
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [position, socket]);

  useEffect(() => {
    let action: ActionName = 'idle'
    if (forward || backword || left || right) {
      action = 'walk'
      if (shift) {
        action = 'run'
      }
    } else {
      action = 'idle'
    }

    if (currentAction.current !== action) {
      const nextToPlay = actions[action]
      const current = actions[currentAction.current]
      if (current) {
        current.fadeOut(0.3)
      }
      if (nextToPlay) {
        nextToPlay.reset().fadeIn(0.3).play()
      }
      currentAction.current = action
    }
  }, [backword, forward, left, right, shift, actions])

  // useEffect(() => {
  //   if (socket) {
  //     socket.on("userPositionUpdated", ({ userId, position }) => {
  //       if (userId === userData.userId) {
  //         setPosition(new THREE.Vector3(position.x, position.y, position.z))
         
  //       }
  //     })

  //     return () => {
  //       socket.off("userPositionUpdated")
  //     }
  //   }
  // }, [socket, userData.userId])

  return (
   <>

  <OrbitControls ref={controlRef} />
    <group ref={group} {...props} position={[position.x,position.y,position.z]} dispose={null}>
      <group name="Scene" >
        <group name="Armature" position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.mixamorigHips} />
          <skinnedMesh name="Ch18" geometry={nodes.Ch18.geometry} material={materials.Ch18_Body} skeleton={nodes.Ch18.skeleton} />
        </group>
      </group>
    </group>
   
   </>
  )
}

useGLTF.preload('../../../../Models/blackMan.gltf')
