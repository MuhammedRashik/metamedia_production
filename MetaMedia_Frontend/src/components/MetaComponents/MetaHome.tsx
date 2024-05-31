import React, { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/cannon';
import { useSocket } from '../../utils/costumHook/useSoket'; 
import { HomeTownModel } from './Models/Home';
import { OrbitControls } from '@react-three/drei';
import randomColor from 'randomcolor';
import Peer from 'peerjs';
import { Mic, MicOff } from 'lucide-react';

const generateUniqueId = () => {
  return crypto.randomUUID();
};

const   MetaHome = () => {
  const [userId] = useState(generateUniqueId());
  const socket = useSocket();
  const [users, setUsers] = useState([]);
  const [position, setPosition] = useState({ x: 0, y: 0, z: 0 });
  const [audioEnabled, setAudioEnabled] = useState(false);
  const peerRef:any = useRef(null);
  const localStreamRef:any = useRef(null);
  const [myPeer,setMyPeer]:any=useState()

  useEffect(() => {
  

    const peer=new Peer(userId)
    setMyPeer(peer)

    try {
        

    } catch (error) {
        console.log(error,"ERROR FROM PEEER CONECTION");
        
    }

  }, [userId,audioEnabled]);

  useEffect(() => {
    if (socket) {
       
      socket.emit('addNewUserToMeta', { userId, position });

      socket.on('updateUsers', (updatedUsers) => {
        setUsers(updatedUsers);
      });

      return () => {
        socket.off('updateUsers');
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

  const callUser = (remoteUserId) => {
    if (audioEnabled && peerRef.current && !peerRef.current.destroyed) {
      navigator.mediaDevices.getUserMedia({ video: false, audio: true })
        .then((stream) => {
          localStreamRef.current = stream;
          const call = peerRef.current.call(remoteUserId, stream);

          if (call) {
            call.on('stream', (remoteStream) => {
              const audio = new Audio();
              audio.srcObject = remoteStream;
              audio.play();
            });
          } else {
            console.error('Failed to establish a call');
          }
        })
        .catch((err) => console.error('Failed to get local stream', err));
    } else {
      console.warn('PeerJS instance is not ready or destroyed');
    }
  };

  const toggleAudio = () => {
    setAudioEnabled((prevAudioEnabled) => {
      const newAudioEnabled = !prevAudioEnabled;

      if (newAudioEnabled) {
        navigator.mediaDevices.getUserMedia({ video: false, audio: true })
          .then((stream) => {
            localStreamRef.current = stream;
          })
          .catch((err) => console.error('Failed to get local stream', err));
      } else if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach(track => track.stop());
        localStreamRef.current = null;
      }

      return newAudioEnabled;
    });
  };

  return (
    <div className="w-screen h-screen fixed">
      <Canvas shadows>
        <ambientLight intensity={2} />
        <directionalLight />
        <Physics gravity={[0, -6.003, 0]} allowSleep={false} broadphase="SAP">
          <OrbitControls />
          {users.map(user => (
            <Box key={user.userId} position={user.position} callUser={()=>callUser(userId)} userId={user.userId} />
          ))}
          <HomeTownModel />
        </Physics>
      </Canvas>
      <button
        onClick={toggleAudio}
        className='bg-white w-8 h-8 rounded-lg flex justify-center items-center border-gray-300 border'
        style={{ position: 'absolute', top: 10, right: 10, zIndex: 1000 }}
      >
        {audioEnabled ? <Mic size={24} /> : <MicOff size={24} />}
      </button>
    </div>
  );
};

const Box = ({ position, callUser, userId }) => {
  const color = useRef(randomColor()).current;

  return (
    <mesh position={[position.x, position.y, position.z]} onClick={() => callUser(userId)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

export default MetaHome;
