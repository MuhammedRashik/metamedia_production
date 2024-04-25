
import React, { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export function  FatManLoding(props:any) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('../../../Models/fatmandancing.glb')
  const { actions,names } = useAnimations(animations, group)
 
  // useEffect(()=>{
  // actions[names[0]]?.reset().fadeIn(0.5).play()
  // },[])
  
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature" rotation={[Math.PI / 2, 0, 5.5]} position={[0,-1.5,0]} scale={0.013}>
          <primitive object={nodes.mixamorigHips} />
          <skinnedMesh name="Elvis_BodyGeo" geometry={nodes.Elvis_BodyGeo.geometry} material={materials.Character_Fat_Elvis_body_color1} skeleton={nodes.Elvis_BodyGeo.skeleton} />
          <skinnedMesh name="Elvis_BrowsAnimGeo" geometry={nodes.Elvis_BrowsAnimGeo.geometry} material={materials.Elvis_Eyes_MAT1} skeleton={nodes.Elvis_BrowsAnimGeo.skeleton} />
          <skinnedMesh name="Elvis_EyesAnimGeo" geometry={nodes.Elvis_EyesAnimGeo.geometry} material={materials.Elvis_Brows_MAT1} skeleton={nodes.Elvis_EyesAnimGeo.skeleton} />
          <skinnedMesh name="Elvis_MouthAnimGeo" geometry={nodes.Elvis_MouthAnimGeo.geometry} material={materials.Elvis_Mouth_MAT1} skeleton={nodes.Elvis_MouthAnimGeo.skeleton} />
        </group>
      </group>
    </group>
  )
}

export default FatManLoding
useGLTF.preload('../../../Models/fatmandancing.glb')
