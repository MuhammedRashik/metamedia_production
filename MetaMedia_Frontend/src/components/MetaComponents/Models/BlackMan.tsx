import * as THREE from 'three';
import React, { useEffect, useRef, useState } from 'react';
import { useGLTF, useAnimations, OrbitControls } from '@react-three/drei';

import { useInput } from '../../../utils/costumHook/useInpute';


type GLTFResult = GLTF & {
  nodes: {
    Ch18: THREE.SkinnedMesh;
    mixamorigHips: THREE.Bone;
  };
  materials: {
    Ch18_Body: THREE.MeshStandardMaterial;
  };
  animations: GLTFAction[];
};

type ActionName = 'idle' | 'jump' | 'run' | 'walk';
interface GLTFAction extends THREE.AnimationClip {
  name: ActionName;
}



export function BalckManModel({position}:any, props: JSX.IntrinsicElements['group']) {

  // const userData = useSelector((state: any) => state.persisted.user.userData);
  const controlRef = useRef<typeof OrbitControls>();
  const group = useRef<THREE.Group>();
  const { nodes, materials, animations } = useGLTF('../../../../Models/blackMan.gltf') as GLTFResult;
  const { actions } = useAnimations(animations, group);
  const { backword, forward, left, right, shift } = useInput();
  const currentAction = useRef<ActionName>('idle');

  useEffect(() => {
    actions.idle?.reset().play();
  }, [actions]);


  useEffect(() => {
    let action: ActionName = 'idle';
    if (forward || backword || left || right) {
      action = shift ? 'run' : 'walk';
    }

    if (currentAction.current !== action) {
      const nextToPlay = actions[action];
      const current = actions[currentAction.current];
      if (current) {
        current.fadeOut(0.3);
      }
      if (nextToPlay) {
        nextToPlay.reset().fadeIn(0.3).play();
      }
      currentAction.current = action;
    }
  }, [backword, forward, left, right, shift, actions]);

  return (
    <>
      <OrbitControls ref={controlRef} />
      <mesh position={new THREE.Vector3(position.x,position.y,position.z)} >
      <group ref={group} {...props}  dispose={null}>
        <group name="Scene">
          <group name="Armature" position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
            <primitive object={nodes.mixamorigHips} />
            <skinnedMesh name="Ch18" geometry={nodes.Ch18.geometry} material={materials.Ch18_Body} skeleton={nodes.Ch18.skeleton} />
          </group>
        </group>
      </group>
      </mesh>
    </>
  );
}

useGLTF.preload('../../../../Models/blackMan.gltf');

