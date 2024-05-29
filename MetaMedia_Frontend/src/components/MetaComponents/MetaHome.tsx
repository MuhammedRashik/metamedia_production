import React, { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/cannon';
import { useSocket } from '../../utils/costumHook/useSoket';
import { HomeTownModel } from './Models/Home';
import { OrbitControls } from '@react-three/drei';
import randomColor from 'randomcolor';
import Peer from 'simple-peer';
import { useSelector } from 'react-redux';

const generateUniqueId = () => {
  return crypto.randomUUID();
};




const MetaHome = () => {

//   const [userId] = useState(generateUniqueId());
  const userId = useSelector((state: any) => state.persisted.user.userData.userId);
  const socket = useSocket();
  const [users, setUsers] = useState([]);
  const [position, setPosition] = useState({ x: 0, y: 0, z: 0 });


  useEffect(() => {
   
        if (socket) {
          socket.emit('addNewUserToMeta', { userId, position });

          socket.on('updateUsers', (updatedUsers) => {
            setUsers(updatedUsers);
          });

         

          return () => {
            socket.off('updateUsers');
            socket.off('signal');
          };
        }
      
     
  }, [socket, userId, position]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      let moveDistance = 0.3;
      let newPosition = { ...position };

      switch (event.key) {
        case 'ArrowUp':
          newPosition.z += moveDistance;
          break;
        case 'ArrowDown':
          newPosition.z -= moveDistance;
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

      setPosition(newPosition);
      if (socket) socket.emit('setUserPosition', { userId, position: newPosition });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [position, userId, socket]);



  
 
  

  return (
    <div className="w-screen h-screen fixed">
      <Canvas shadows>
        <ambientLight intensity={2} />
        <directionalLight />
        <Physics gravity={[0, -6.003, 0]} allowSleep={false} broadphase="SAP">
          <OrbitControls />
          {users.map(user => (
            <Box key={user.userId} position={user.position} />
          ))}
          <HomeTownModel />
        </Physics>
      </Canvas>
    </div>
  );
};

const Box = ({ position }) => {
  const color = useRef(randomColor()).current;

  return (
    <mesh position={[position.x, position.y, position.z]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

export default MetaHome;
