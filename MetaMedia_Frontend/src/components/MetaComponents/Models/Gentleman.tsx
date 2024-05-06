/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 public/Models/gentleman.glb 
*/

import React, { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export function GentleManModel({selectedImote}:any,props:any) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('../../../Models/gentleman.glb')
  const { actions,names } = useAnimations(animations, group)
  const currentAction = useRef<any>(null);

  useEffect(() => {
   
    const findIndex: number = names.findIndex((item: any) => item === selectedImote);
    if (findIndex !== -1) {
      if (currentAction.current) {
        currentAction.current.stop(); // Stop the currently playing animation
      }
      currentAction.current = actions[names[findIndex]]; // Update the current action
      currentAction.current.reset().fadeIn(0.5).play(); // Play the new animation
    }
  }, [selectedImote]);
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature002" rotation={[Math.PI / 2, 0, 5.5]} position={[0,-1.3,0]} scale={0.013}>
          <primitive object={nodes.mixamorigHips} />
          <skinnedMesh name="Ch23_Belt" geometry={nodes.Ch23_Belt.geometry} material={materials.Ch23_body} skeleton={nodes.Ch23_Belt.skeleton} />
          <skinnedMesh name="Ch23_Body" geometry={nodes.Ch23_Body.geometry} material={materials.Ch23_body} skeleton={nodes.Ch23_Body.skeleton} />
          <skinnedMesh name="Ch23_Eyelashes" geometry={nodes.Ch23_Eyelashes.geometry} material={materials.Ch23_hair} skeleton={nodes.Ch23_Eyelashes.skeleton} />
          <skinnedMesh name="Ch23_Hair" geometry={nodes.Ch23_Hair.geometry} material={materials.Ch23_hair} skeleton={nodes.Ch23_Hair.skeleton} />
          <skinnedMesh name="Ch23_Pants" geometry={nodes.Ch23_Pants.geometry} material={materials.Ch23_body} skeleton={nodes.Ch23_Pants.skeleton} />
          <skinnedMesh name="Ch23_Shirt" geometry={nodes.Ch23_Shirt.geometry} material={materials.Ch23_body} skeleton={nodes.Ch23_Shirt.skeleton} />
          <skinnedMesh name="Ch23_Shoes" geometry={nodes.Ch23_Shoes.geometry} material={materials.Ch23_body} skeleton={nodes.Ch23_Shoes.skeleton} />
          <skinnedMesh name="Ch23_Suit" geometry={nodes.Ch23_Suit.geometry} material={materials.Ch23_body} skeleton={nodes.Ch23_Suit.skeleton} />
        </group>
      </group>
    </group>
  )
}


export default GentleManModel
useGLTF.preload('../../../Models/gentleman.glb')