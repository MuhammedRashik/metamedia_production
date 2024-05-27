import React, { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/cannon';
import { useSocket } from '../../utils/costumHook/useSoket';
import { HomeTownModel } from './Models/Home';
import { OrbitControls } from '@react-three/drei';
import { BalckManModel } from './Models/BlackMan';
import WhiteManModel from './Models/WhiteMan'
import randomColor from 'randomcolor';
import Peer from 'simple-peer';
import { useSelector } from 'react-redux';
// Generate a unique ID for the user
const generateUniqueId = () => {
  return crypto.randomUUID();
};

const MetaHome = () => {
    // const [userId] = useState(generateUniqueId());
    const userId = useSelector((state: any) => state.persisted.user.userData.userId);
    const socket = useSocket();
    const [users, setUsers] = useState([]);
    const [position, setPosition] = useState({ x: 0, y: 0, z: 0 });
    const peersRef:any = useRef([]);
    const userStream = useRef();
  
    useEffect(() => {
      navigator.mediaDevices.getUserMedia({ video: false, audio: true })
        .then((stream:any) => {
          userStream.current = stream;
  if(socket){
    socket.emit('addNewUserToMeta', { userId, position });
  
    socket.on('updateUsers', (updatedUsers) => {
      setUsers(updatedUsers);
      updatedUsers.forEach((user:any) => {
        if (user.userId !== userId) {
          const peer:any = createPeer(user.userId, socket.id, stream);
          peersRef.current.push({
            peerID: user.userId,
            peer,
          });
        }
      });
    });

    socket.on('signal', (data) => {
      const item:any = peersRef.current.find((p:any) => p.peerID === data.from);
      if (item) {
        item.peer.signal(data.signal);
      } else {
        const peer:any = addPeer(data.signal, data.from, stream);
        peersRef.current.push({
          peerID: data.from,
          peer,
        });
      }
    });

    return () => {
      socket.off('updateUsers');
      socket.off('signal');
    };
  }
       
        });
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
            newPosition.x += moveDistance;
            break;
          case 'ArrowRight':
            newPosition.x -= moveDistance;
            break;
          default:
            return;
        }
  
        setPosition(newPosition);
       if(socket) socket.emit('setUserPosition', { userId, position: newPosition });
      };
  
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }, [position, userId, socket]);
  
    function createPeer(userToSignal, callerID, stream) {
      const peer = new Peer({
        initiator: true,
        trickle: false,
        stream,
      });
  
      peer.on('signal', (signal:any) => {
        console.log('inside peer');
        
        if(socket)socket.emit('signal', { signal, to: userToSignal, from: callerID });
      });
  
      return peer;
    }
  
    function addPeer(incomingSignal, callerID, stream) {
      const peer = new Peer({
        initiator: false,
        trickle: false,
        stream,
      });
  
      peer.on('signal', signal => {
       if(socket) socket.emit('signal', { signal, to: callerID, from: socket.id });
      });
  
      peer.signal(incomingSignal);
  
      return peer;
    }
  
    return (
      <div className="w-screen h-screen fixed">
        <Canvas shadows>
          <ambientLight intensity={2} />
          <directionalLight />
          <Physics gravity={[0, -6.003, 0]} allowSleep={false} broadphase="SAP">
            <OrbitControls />
            {users.map(user => (
              <Box key={user.userId} position={user.position} userId={userId} />
            ))}
            <HomeTownModel />
          </Physics>
        </Canvas>
      </div>
    );
  };
  
  const Box = ({ position, userId }) => {
    const color = useRef(randomColor()).current;
  
    return (
      <>
        <OrbitControls />
        <mesh position={[position.x, position.y, position.z]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={color} />
        </mesh>
      </>
    );
  };
  
  export default MetaHome;