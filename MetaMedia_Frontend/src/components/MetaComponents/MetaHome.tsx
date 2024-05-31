import React, { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/cannon';
import { useSocket } from '../../utils/costumHook/useSoket'; 
import { HomeTownModel } from './Models/Home';
import { OrbitControls } from '@react-three/drei';
import randomColor from 'randomcolor';
import Peer from 'peerjs';
import { Mic, MicOff } from 'lucide-react';
import { useSelector } from 'react-redux';

const generateUniqueId = () => {
  return crypto.randomUUID();
};

const MetaHome = () => {
  // const [userId] = useState(generateUniqueId());
  const userId = useSelector((state: any) => state.persisted.user.userData.userId);
  const socket = useSocket();
  const [users, setUsers] = useState([]);
  const [position, setPosition] = useState({ x: 0, y: 0, z: 0 });
  const [audioEnabled, setAudioEnabled] = useState(false);
  const peerRef:any = useRef(null);
  const localStreamRef:any = useRef(null);
  const connectionsRef:any = useRef({});
  const [myPeer, setMyPeer] = useState(null);

  useEffect(() => {
    const peer = new Peer(userId);
    peerRef.current = peer;
    setMyPeer(peer);

    peer.on('open', id => {
      console.log('My peer ID is: ' + id);
      socket.emit('addNewUserToMeta', { userId, position, peerId: id });
    });

    peer.on('call', call => {
      if (localStreamRef.current) {
        call.answer(localStreamRef.current);
      }
      call.on('stream', remoteStream => {
        const audio = new Audio();
        audio.srcObject = remoteStream;
        audio.play();
      });
    });

    return () => {
      if (peerRef.current) {
        peerRef.current.destroy();
      }
    };
  }, [userId, socket, position]);

  useEffect(() => {
    if (socket) {
      socket.on('updateUsers', updatedUsers => {
        setUsers(updatedUsers);
      });

      return () => {
        socket.off('updateUsers');
      };
    }
  }, [socket]);

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

  useEffect(() => {
    if (audioEnabled) {
      navigator.mediaDevices.getUserMedia({ video: false, audio: true })
        .then((stream) => {
          localStreamRef.current = stream;

          users.forEach(user => {
            if (user.userId !== userId && !connectionsRef.current[user.userId]) {
              callUser(user.userId, user.peerId);
            }
          });

          setInterval(() => {
            users.forEach(user => {
              if (user.userId !== userId && !connectionsRef.current[user.userId]) {
                callUser(user.userId, user.peerId);
              }
            });
          }, 5000);
        })
        .catch((err) => console.error('Failed to get local stream', err));
    } else if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => track.stop());
      localStreamRef.current = null;
      Object.values(connectionsRef.current).forEach(conn => conn.close());
      connectionsRef.current = {};
    }
  }, [audioEnabled, users]);

  const callUser = (remoteUserId, remotePeerId) => {
    if (audioEnabled && peerRef.current && remotePeerId && !peerRef.current.destroyed) {
      const call = peerRef.current.call(remotePeerId, localStreamRef.current);
      connectionsRef.current[remoteUserId] = call;

      call.on('stream', (remoteStream) => {
        const audio = new Audio();
        audio.srcObject = remoteStream;
        audio.play();
      });

      call.on('close', () => {
        delete connectionsRef.current[remoteUserId];
      });
    }
  };

  const toggleAudio = () => {
    setAudioEnabled((prevAudioEnabled) => !prevAudioEnabled);
  };

  return (
    <div className="w-screen h-screen fixed">
      <Canvas shadows>
        <ambientLight intensity={2} />
        <directionalLight />
        <Physics gravity={[0, -6.003, 0]} allowSleep={false} broadphase="SAP">
          <OrbitControls />
          {users.map(user => (
            <Box key={user.userId} position={user.position} userId={user.userId} />
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

const Box = ({ position, userId }) => {
  const color = useRef(randomColor()).current;

  return (
    <mesh position={[position.x, position.y, position.z]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

export default MetaHome;
