import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    charactersmodelsctm_gendarmeriectm_gendarmerie_variantb: THREE.SkinnedMesh
    charactersmodelsctm_gendarmeriectm_gendarmerie_variantb_1: THREE.SkinnedMesh
    charactersmodelsctm_gendarmeriectm_gendarmerie_variantb_2: THREE.SkinnedMesh
    charactersmodelsctm_gendarmeriectm_gendarmerie_variantb_3: THREE.SkinnedMesh
    charactersmodelsctm_gendarmeriectm_gendarmerie_variantb_4: THREE.SkinnedMesh
    pelvis: THREE.Bone
  }
  materials: {
    glove_hardknuckle_black: THREE.MeshStandardMaterial
    ctm_gendarmerie_basic_upperbody: THREE.MeshStandardMaterial
    ctm_gendarmerie_medic_pant: THREE.MeshStandardMaterial
    ctm_gendarmerie_gasmask: THREE.MeshStandardMaterial
    ctm_gendarmerie_visor_yellow: THREE.MeshStandardMaterial
  }
  animations: GLTFAction[]
}

type ContextType = Record<string, React.ForwardRefExoticComponent<JSX.IntrinsicElements['skinnedMesh'] | JSX.IntrinsicElements['bone']>>

 const ArmysModel=React.memo((props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/Models/army.glb') as GLTFResult
 
  
  return (
    <group {...props}  >
      <group rotation={[-Math.PI / 2, 0, -Math.PI / 2]} scale={0.025}>
        <primitive object={nodes.pelvis} />
        <skinnedMesh geometry={nodes.charactersmodelsctm_gendarmeriectm_gendarmerie_variantb.geometry} material={materials.glove_hardknuckle_black} skeleton={nodes.charactersmodelsctm_gendarmeriectm_gendarmerie_variantb.skeleton} />
        <skinnedMesh geometry={nodes.charactersmodelsctm_gendarmeriectm_gendarmerie_variantb_1.geometry} material={materials.ctm_gendarmerie_basic_upperbody} skeleton={nodes.charactersmodelsctm_gendarmeriectm_gendarmerie_variantb_1.skeleton} />
        <skinnedMesh geometry={nodes.charactersmodelsctm_gendarmeriectm_gendarmerie_variantb_2.geometry} material={materials.ctm_gendarmerie_medic_pant} skeleton={nodes.charactersmodelsctm_gendarmeriectm_gendarmerie_variantb_2.skeleton} />
        <skinnedMesh geometry={nodes.charactersmodelsctm_gendarmeriectm_gendarmerie_variantb_3.geometry} material={materials.ctm_gendarmerie_gasmask} skeleton={nodes.charactersmodelsctm_gendarmeriectm_gendarmerie_variantb_3.skeleton} />
        <skinnedMesh geometry={nodes.charactersmodelsctm_gendarmeriectm_gendarmerie_variantb_4.geometry} material={materials.ctm_gendarmerie_visor_yellow} skeleton={nodes.charactersmodelsctm_gendarmeriectm_gendarmerie_variantb_4.skeleton} />
      </group>
    </group>
  )
})

useGLTF.preload('/Models/army.glb')


export default ArmysModel