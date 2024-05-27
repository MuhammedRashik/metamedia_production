import * as THREE from 'three';
import React, { useEffect, useRef } from 'react';
import { OrbitControls } from '@react-three/drei';
import { useThree } from 'react-three-fiber';
import { useSocket } from '../../../utils/costumHook/useSoket';
import { useSelector } from 'react-redux';

const Box = ({ userId, user }:{userId:any,user:any}) => {
  const socket = useSocket();
  const controlRef = useRef(null);
  const { camera } = useThree();
  const group = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event:any) => {
      let moveDistance = 0.3;
      let newPosition = { ...user.position }; 

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

      socket?.emit("setUserPosition", { userId: userId, position: newPosition });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [userId, socket, user.position]);

  return (
    <>
      <OrbitControls ref={controlRef} />
      <mesh ref={group} dispose={null} position={new THREE.Vector3(user.position.x, user.position.y, user.position.z)}>
        <boxGeometry />
        <meshBasicMaterial color={'red'} />
      </mesh>
    </>
  );
};

export default Box;
