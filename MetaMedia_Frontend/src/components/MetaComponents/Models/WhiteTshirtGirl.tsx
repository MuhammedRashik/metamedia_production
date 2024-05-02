

import  { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export function WhiteTshirtGirlModel(props:any) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('../../../Models/whiteTshirtGirl.glb')
  const { actions,names} = useAnimations(animations, group)
  console.log(names,'Namessss');
    useEffect(()=>{
  actions[names[4]]?.reset().fadeIn(0.5).play()
  },[])
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature" rotation={[Math.PI / 2, 0, 5.5]} position={[0,-1.3,0]} scale={0.013}>
          <primitive object={nodes.mixamorig2Hips} />
          <skinnedMesh name="Ch22_Body" geometry={nodes.Ch22_Body.geometry} material={materials.Ch22_body} skeleton={nodes.Ch22_Body.skeleton} />
          <skinnedMesh name="Ch22_Eyelashes" geometry={nodes.Ch22_Eyelashes.geometry} material={materials.Ch22_hair} skeleton={nodes.Ch22_Eyelashes.skeleton} />
          <skinnedMesh name="Ch22_Hair" geometry={nodes.Ch22_Hair.geometry} material={materials.Ch22_hair} skeleton={nodes.Ch22_Hair.skeleton} />
          <skinnedMesh name="Ch22_Pants" geometry={nodes.Ch22_Pants.geometry} material={materials.Ch22_body} skeleton={nodes.Ch22_Pants.skeleton} />
          <skinnedMesh name="Ch22_Shirt" geometry={nodes.Ch22_Shirt.geometry} material={materials.Ch22_body} skeleton={nodes.Ch22_Shirt.skeleton} />
          <skinnedMesh name="Ch22_Sneakers" geometry={nodes.Ch22_Sneakers.geometry} material={materials.Ch22_body} skeleton={nodes.Ch22_Sneakers.skeleton} />
        </group>
      </group>
    </group>
  )
}

export default WhiteTshirtGirlModel
useGLTF.preload('../../../Models/whiteTshirtGirl.glb')
