import Peer from "peerjs";
import React, { useEffect, useRef, useState } from "react"

const PeerConectionCheck =React.memo(()=>{

    const [myPeer,setMyPeer]:any=useState()
    const [stream,setStream]:any=useState()
    const [userId] = useState(generateUniqueId());
    const videoRef:any=useRef()
    useEffect(()=>{


        if (window.RTCPeerConnection) {
            console.log("WebRTC is supported");
          } else {
            console.log("WebRTC is not supported");
          }
          
        const peer =new Peer(userId)
        setMyPeer(peer)

        try {
            navigator.mediaDevices.getUserMedia(({video:false,audio:true})).then((stream)=>{
                setStream(stream)
            })
    
        } catch (error) {
            console.log(error,"ERROR FROM PEEER CONECTION");
            
        }
    
    },[userId])



    useEffect(()=>{
        console.log('here');
        
         if(videoRef.current) videoRef.current.srcObject=stream 
    },[stream])

    return (
      <div className="w-screen h-screen flex justify-center items-center">

<audio ref={videoRef} className="w-1/2 h-1/2" autoPlay/>
      </div> 
    )
})


export default PeerConectionCheck
const generateUniqueId = () => {
    return crypto.randomUUID();
  }