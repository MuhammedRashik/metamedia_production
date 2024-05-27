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
  const peersRef:any = useRef([]);
  const userStream:any = useRef(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: false, audio: true })
      .then((stream) => {
        console.log('User media stream obtained');
        userStream.current = stream;

        if (socket) {
          socket.emit('addNewUserToMeta', { userId, position });

          socket.on('updateUsers', (updatedUsers) => {
            setUsers(updatedUsers);
            updatedUsers.forEach((user:any) => {
                console.log(user,'----');
                
              if (user.userId !== userId) {
                const peer:any = createPeer(user.userId, socket.id, stream);
                console.log(peer,'Perr');
                
                peersRef.current.push({
                  peerID: user.userId,
                  peer,
                });
              }
            });
          });

          socket.on('signal', (data) => {
            console.log('Signal received from server:', data);
            const item = peersRef.current.find((p) => p.peerID === data.from);
            console.log(item,'itemsss after sifnal');
            
            if (item) {
              item.peer.signal(data.signal);
            } else {
              const peer = addPeer(data.signal, data.from, stream);
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
      })
      .catch((error) => {
        console.error('Error getting user media:', error);
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
      if (socket) socket.emit('setUserPosition', { userId, position: newPosition });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [position, userId, socket]);

  const createPeer = (userToSignal, callerID, stream) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on('signal', (signal) => {
      console.log('Generated signal:', signal);
      if (socket) socket.emit('signal', { signal, to: userToSignal, from: callerID });
    });

    peer.on('connect', () => {
      console.log('Peer connection established');
    });

    peer.on('stream', (remoteStream) => {
      console.log('Received remote stream');
      const audioElement = document.createElement('audio');
      audioElement.srcObject = remoteStream;
      audioElement.play();
    });

    peer.on('error', (err) => {
      console.error('Peer error:', err);
    });

    return peer;
  };

  const addPeer = (incomingSignal, callerID, stream) => {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on('signal', (signal) => {
        console.log('on signam 22 ',signal);
        
      if (socket) socket.emit('signal', { signal, to: callerID, from: socket.id });
    });

    peer.on('connect', () => {
      console.log('Peer connection established');
    });

    peer.on('stream', (remoteStream) => {
      console.log('Received remote stream');
      const audioElement = document.createElement('audio');
      console.log(audioElement,'AUTDIO ELEMNT');
      
      audioElement.srcObject = remoteStream;
      audioElement.play();
      console.log('here');
      
    });

    peer.on('error', (err) => {
      console.error('Peer error:', err);
    });

    peer.signal(incomingSignal);

    return peer;
  };

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
