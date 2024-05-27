import * as THREE from 'three';
import React, { useEffect, useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { useBox } from '@react-three/cannon';
import { useFrame } from '@react-three/fiber'; // Updated import
import useKeyboardControls from '../Utils/useKeyboardControls'; // Import the custom hook

type GLTFResult = GLTF & {
  nodes: {
    Ch22_Body: THREE.SkinnedMesh;
    Ch22_Eyelashes: THREE.SkinnedMesh;
    Ch22_Hair: THREE.SkinnedMesh;
    Ch22_Pants: THREE.SkinnedMesh;
    Ch22_Shirt: THREE.SkinnedMesh;
    Ch22_Sneakers: THREE.SkinnedMesh;
    mixamorig2Hips: THREE.Bone;
  };
  materials: {
    Ch22_body: THREE.MeshStandardMaterial;
    Ch22_hair: THREE.MeshStandardMaterial;
  };
  animations: GLTFAction[];
};

type ActionName = 'idle' | 'run' | 'talk' | 'walk';
interface GLTFAction extends THREE.AnimationClip {
  name: ActionName;
}
type ContextType = Record<
  string,
  React.ForwardRefExoticComponent<JSX.IntrinsicElements['skinnedMesh'] | JSX.IntrinsicElements['bone']>
>;

export function WhiteTshitLadyModel(props: JSX.IntrinsicElements['group']) {
  const group = useRef<THREE.Group>();
  const { nodes, materials, animations } = useGLTF('../Models/whiteTshirtLady.gltf') as GLTFResult;
  const { actions, names } = useAnimations(animations, group);

 
  const [ref, api] = useBox(() => ({ mass: 1, position: [0, 0.01, 0], ...props }));
  const positionRef = useRef([0, 5, 0]);

  // Use the custom hook to get key states
  const keys = useKeyboardControls();


  const actionManageFunction=(index:number)=>{
    if(actions){
      console.log(actions,'---',names,'--',index);
      
      // actions?.idle.reset().fadeIn(0.5).play()
    }
  }
  useFrame(() => {
  
  if(keys.ArrowUp){
    if(keys.Shift){
      console.log('running up');
    }
    // actionManageFunction(0)

  }else if( keys.ArrowDown){
    if(keys.Shift){
      console.log('running down');
    }
    console.log('down');
  }else if(keys.ArrowLeft){
    if(keys.Shift){
      console.log('running left');
    }
    console.log('left');

  }else if(keys.ArrowRight){
    if(keys.Shift){
      console.log('running right');
    }
    console.log('right');
  }else {

  }
    
  });

  return (
    <group ref={ref} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature002" position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]} scale={0.012}>
          <primitive object={nodes.mixamorig2Hips} />
          <skinnedMesh
            name="Ch22_Body"
            geometry={nodes.Ch22_Body.geometry}
            material={materials.Ch22_body}
            skeleton={nodes.Ch22_Body.skeleton}
          />
          <skinnedMesh
            name="Ch22_Eyelashes"
            geometry={nodes.Ch22_Eyelashes.geometry}
            material={materials.Ch22_hair}
            skeleton={nodes.Ch22_Eyelashes.skeleton}
          />
          <skinnedMesh
            name="Ch22_Hair"
            geometry={nodes.Ch22_Hair.geometry}
            material={materials.Ch22_hair}
            skeleton={nodes.Ch22_Hair.skeleton}
          />
          <skinnedMesh
            name="Ch22_Pants"
            geometry={nodes.Ch22_Pants.geometry}
            material={materials.Ch22_body}
            skeleton={nodes.Ch22_Pants.skeleton}
          />
          <skinnedMesh
            name="Ch22_Shirt"
            geometry={nodes.Ch22_Shirt.geometry}
            material={materials.Ch22_body}
            skeleton={nodes.Ch22_Shirt.skeleton}
          />
          <skinnedMesh
            name="Ch22_Sneakers"
            geometry={nodes.Ch22_Sneakers.geometry}
            material={materials.Ch22_body}
            skeleton={nodes.Ch22_Sneakers.skeleton}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('../Models/whiteTshirtLady.gltf');
