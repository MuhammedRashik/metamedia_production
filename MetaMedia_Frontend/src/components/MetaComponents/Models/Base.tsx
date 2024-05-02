
import { useGLTF } from '@react-three/drei'

export function Base(props:any) {
  const { nodes, materials } = useGLTF('../../../Models/base.glb')
  return (
    <group {...props} dispose={null} position={[0,-1.6,0]} rotation={[0, 0, 0]} scale={0.4} >
      <mesh geometry={nodes.Cylinder_0.geometry} material={materials['Scene_-_Root']} rotation={[-Math.PI / 2, 0, 0]} />
    </group>
  )
}

useGLTF.preload('../../../Models/base.glb')

export default Base 