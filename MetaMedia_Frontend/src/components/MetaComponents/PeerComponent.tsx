import React, { useState, useEffect, useRef } from 'react';
import Peer from 'peerjs';
import { toast } from 'sonner';
import { useSocket } from '../../utils/costumHook/useSoket';

const generateUniqueId = () => {
  return crypto.randomUUID();
};

const PeerComponent = React.memo(() => {
  const socket = useSocket();
  const [peerId, setPeerId] = useState('');
  const [remotePeerId, setRemotePeerId] = useState('');
  const [connections, setConnections] = useState([]);
  const [incoming, setIncoming] = useState([]);
  const [outgoing, setOutgoing] = useState([]);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [localStream, setLocalStream] = useState(null);
  const [remoteStreams, setRemoteStreams] = useState({});
  const videoRef = useRef(null);
  const remoteVideoRefs = useRef({});
  const [userId] = useState(generateUniqueId());
  const peerRef:any = useRef(null);

  useEffect(() => {
    // Initialize PeerJS
    const peer = new Peer(userId);
    peerRef.current = peer;

    // Set peer ID on open
    peer.on('open', id => {
      setPeerId(id);
      console.log('My peer ID is: ' + id);
    });

    // Handle incoming connections
    peer.on('connection', conn => {
      console.log('Incoming connection from: ' + conn.peer);
      setIncoming(prev => [...prev, conn.peer]);
      setConnections(prev => [...prev, conn]);

      conn.on('data', data => {
        console.log('Received:', data);
        setMessages(prevMessages => [...prevMessages, { sender: conn.peer, text: data }]);
      });

      conn.on('open', () => {
        conn.send('Hello from the host!');
      });
    });

    // Handle incoming calls
    peer.on('call', call => {
      call.answer(localStream); // Answer the call with your own video/audio stream
      call.on('stream', remoteStream => {
        // Receive remote stream and set it to the video tag
        setRemoteStreams(prevStreams => ({ ...prevStreams, [call.peer]: remoteStream }));
        if (remoteVideoRefs.current[call.peer]) {
          remoteVideoRefs.current[call.peer].srcObject = remoteStream;
        }
      });
    });

    // Cleanup on component unmount
    return () => {
      peer.destroy();
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [userId, localStream]);

  useEffect(() => {
    // Get user media
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        setLocalStream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch(err => {
        console.error('Failed to get local stream', err);
      });
  }, []);

  const connectToPeer = () => {
    if (peerRef.current && remotePeerId) {
      const conn = peerRef.current.connect(remotePeerId);

      conn.on('open', () => {
        console.log('Connected to: ' + remotePeerId);
        setOutgoing(prev => [...prev, remotePeerId]);
        setConnections(prev => [...prev, conn]);
        conn.send('Hello from ' + peerId);

        // Call the remote peer with your local video/audio stream
        const call = peerRef.current.call(remotePeerId, localStream);
        call.on('stream', remoteStream => {
          // Receive remote stream and set it to the video tag
          setRemoteStreams(prevStreams => ({ ...prevStreams, [call.peer]: remoteStream }));
          if (remoteVideoRefs.current[call.peer]) {
            remoteVideoRefs.current[call.peer].srcObject = remoteStream;
          }
        });
      });

      conn.on('data', data => {
        console.log('Received:', data);
        setMessages(prevMessages => [...prevMessages, { sender: conn.peer, text: data }]);
      });
    }
  };

  const sendMessage = () => {
    if (connections.length > 0 && message) {
      connections.forEach(conn => {
        conn.send(message);
      });
      setMessages(prevMessages => [...prevMessages, { sender: 'Me', text: message }]);
      setMessage('');
    }
  };

  return (
    <div className='w-screen h-screen bg-gray-100'>
      <div className=''>
        <label>Your Peer ID: </label>
        <span>{peerId}</span>
      </div>
      <div>
        <input
          type='text'
          value={remotePeerId}
          onChange={(e) => setRemotePeerId(e.target.value)}
          placeholder='Enter remote peer ID'
        />
        <button onClick={connectToPeer}>Connect</button>
      </div>
      <div>
        <label>Incoming Connections: </label>
        <span>{incoming.join(', ')}</span>
      </div>
      <div>
        <label>Outgoing Connections: </label>
        <span>{outgoing.join(', ')}</span>
      </div>
      <div>
        <input
          type='text'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder='Enter your message'
        />
        <button onClick={sendMessage}>Send</button>
      </div>
      <div>
        <label>Messages:</label>
        <div>
          {messages.map((msg, index) => (
            <div key={index}>
              <strong>{msg.sender}: </strong>{msg.text}
            </div>
          ))}
        </div>
      </div>
      <div className='flex'>
        <div className='mr-4'>
          <label>Me</label>
          <video className='w-[200px] h-[200px] bg-red-300' ref={videoRef} autoPlay muted></video>
        </div>
        {Object.keys(remoteStreams).map(peerId => (
          <div key={peerId} className='mr-4'>
            <label>{peerId}</label>
            <video className='w-[200px] h-[200px] bg-blue-300' ref={el => remoteVideoRefs.current[peerId] = el} autoPlay></video>
          </div>
        ))}
      </div>
    </div>
  );
})

export default PeerComponent;
