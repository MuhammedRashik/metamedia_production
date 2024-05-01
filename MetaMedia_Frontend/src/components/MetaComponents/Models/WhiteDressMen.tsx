/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 public/Models/whiteDressMen.glb 
*/

import React, { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export function WhiteDressMen({selectedImote}:any,props:any) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('../../../Models/whiteDressMen.glb')
  const { actions ,names} = useAnimations(animations, group)

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
        <group name="Armature001" rotation={[Math.PI / 2, 0, 5.5]} position={[0,-1.3,0]} scale={0.013}>
          <primitive object={nodes.mixamorig7Hips} />
        </group>
        <group name="Armature003" rotation={[Math.PI / 2, 0, 5.5]} position={[0,-1.3,0]} scale={0.013}>
          <primitive object={nodes.mixamorig7Hips_1} />
          <skinnedMesh name="Ch08_Beard" geometry={nodes.Ch08_Beard.geometry} material={materials.Ch08_hair} skeleton={nodes.Ch08_Beard.skeleton} />
          <skinnedMesh name="Ch08_Body" geometry={nodes.Ch08_Body.geometry} material={materials.Ch08_body} skeleton={nodes.Ch08_Body.skeleton} />
          <skinnedMesh name="Ch08_Eyelashes" geometry={nodes.Ch08_Eyelashes.geometry} material={materials.Ch08_hair} skeleton={nodes.Ch08_Eyelashes.skeleton} />
          <skinnedMesh name="Ch08_Hair" geometry={nodes.Ch08_Hair.geometry} material={materials.Ch08_hair} skeleton={nodes.Ch08_Hair.skeleton} />
          <skinnedMesh name="Ch08_Hoodie" geometry={nodes.Ch08_Hoodie.geometry} material={materials.Ch08_body1} skeleton={nodes.Ch08_Hoodie.skeleton} />
          <skinnedMesh name="Ch08_Pants" geometry={nodes.Ch08_Pants.geometry} material={materials.Ch08_body1} skeleton={nodes.Ch08_Pants.skeleton} />
          <skinnedMesh name="Ch08_Sneakers" geometry={nodes.Ch08_Sneakers.geometry} material={materials.Ch08_body1} skeleton={nodes.Ch08_Sneakers.skeleton} />
        </group>
      </group>
    </group>
  )
}

export default WhiteDressMen
useGLTF.preload('../../../Models/whiteDressMen.glb')