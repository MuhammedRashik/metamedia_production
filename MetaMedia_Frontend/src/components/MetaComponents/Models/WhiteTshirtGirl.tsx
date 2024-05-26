import * as THREE from 'three'
import React, { forwardRef, useEffect, useRef, useState } from 'react'
import { useGLTF, useAnimations, OrbitControls } from '@react-three/drei'
import { useThree, useFrame } from 'react-three-fiber'
import { useInput } from '../../../utils/costumHook/useInpute'
import { useBox } from '@react-three/cannon'

let walkDirection = new THREE.Vector3();
let rotationAngle = new THREE.Vector3(0, 1, 0)
let rotationQuarternion = new THREE.Quaternion()
let camaraTarget = new THREE.Vector3()

type GLTFResult = GLTF & {
  nodes: {
    Ch22_Body: THREE.SkinnedMesh
    Ch22_Eyelashes: THREE.SkinnedMesh
    Ch22_Hair: THREE.SkinnedMesh
    Ch22_Pants: THREE.SkinnedMesh
    Ch22_Shirt: THREE.SkinnedMesh
    Ch22_Sneakers: THREE.SkinnedMesh
    mixamorig2Hips: THREE.Bone
  }
  materials: {
    Ch22_body: THREE.MeshStandardMaterial
    Ch22_hair: THREE.MeshStandardMaterial
  }
  animations: GLTFAction[]
}

type ActionName = 'idle' | 'run' | 'talk' | 'walk'
interface GLTFAction extends THREE.AnimationClip {
  name: ActionName
}

const directionOffset = ({ forward, backword, left, right }: any) => {
  var directionOffset = 0;
  if (forward) {
    if (left) {
      directionOffset = Math.PI / 4
    } else if (right) {
      directionOffset = -Math.PI / 4
    }
  } else if (backword) {
    if (left) {
      directionOffset = Math.PI / 4 + Math.PI / 2
    } else if (right) {
      directionOffset = -Math.PI / 4 - Math.PI / 2
    } else {
      directionOffset = Math.PI
    }
  } else if (left) {
    directionOffset = Math.PI / 2
  } else if (right) {
    directionOffset = -Math.PI / 2
  }

  return directionOffset
}

export function WhiteTshirtGirlModel({position,setPosition}:any,props: JSX.IntrinsicElements['group']) {
  const group = useRef<THREE.Group>(null)
  const { nodes, materials, animations } = useGLTF('../../../../Models/whiteTshirtGirl.gltf') as GLTFResult
  const { actions } = useAnimations(animations, group)
  const { backword, forward, left, right, shift } = useInput()
  const currentAction = useRef<ActionName>('idle')
  const controlRef = useRef<typeof OrbitControls>()
  const { camera } = useThree()

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
    actions.idle?.reset().play()
  }, [])

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

  useFrame((state, delta) => {
    if (currentAction.current === 'run' || currentAction.current === 'walk') {
      let angleYCamaraDirection = Math.atan2(
        camera.position.x - position.x,
        camera.position.z - position.z
      )

      let newDirectionOffset = directionOffset({
        forward, backword, left, right
      })

      rotationQuarternion.setFromAxisAngle(
        rotationAngle,
        angleYCamaraDirection + newDirectionOffset
      )

      group.current.quaternion.rotateTowards(rotationQuarternion, 0.2)

      camera.getWorldDirection(walkDirection)
      walkDirection.y = 0;
      walkDirection.normalize()
      walkDirection.applyAxisAngle(rotationAngle, newDirectionOffset)

      const velocity = currentAction.current === 'run' ? 10 : 5

      const moveX = walkDirection.x * velocity * delta
      const moveZ = walkDirection.z * velocity * delta

      setPosition((prev:any) => new THREE.Vector3(prev.x + moveX, prev.y, prev.z + moveZ))

      updateCamaraTarget(moveX, moveZ)
    }
  })

  return (
    <>
      <OrbitControls ref={controlRef} />
      <group ref={group} position={position} {...props} dispose={null}>
        <group name="Scene" >
          <group name="Armature002" position={[0, 0, 0]} rotation={[Math.PI / 2, 0, Math.PI]} scale={0.012}>
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
    </>
  )
}

useGLTF.preload('../../../../Models/whiteTshirtGirl.gltf')
