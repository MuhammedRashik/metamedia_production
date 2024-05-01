
import ErangleMap from '../MetaComponents/Models/ErangleMap'
import { Canvas ,useThree} from '@react-three/fiber';
import { OrbitControls ,Environment} from '@react-three/drei';

import CyberCity from '../MetaComponents/Models/CyberCity'
import Glass from '../MetaComponents/Models/Glass'
import ChinaCity from './Models/ChinaCity'
import { useEffect, useState } from 'react';
import { Vector3 } from 'three';
import LoadingScreen from './LoadingScreen'
import {} from '../../../public/texture/sky.jpg'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GetUserDataByIdFunction } from '../../utils/api/methods/MetaService/get';
import { toast } from 'sonner';
import {addMetaUser,clearMetaUser} from '../../utils/ReduxStore/Slice/metaUserSlice'
import { CreateNewUserFunction } from '../../utils/api/methods/MetaService/post';
const Map = () => {
    const userData = useSelector((state: any) => state.persisted.user.userData);
    const metauserData=useSelector((state:any)=>state.persisted.metaUser.metaUserData)
    const navigate=useNavigate()
    const [isLoading, setIsLoading] = useState(true);
    const [isCameraAnimated, setIsCameraAnimated] = useState(false);
  
    const handleModelLoaded = () => {
      setIsLoading(false);
      setIsCameraAnimated(true); 
    };
  


    useEffect(()=>{
        console.log('hereee',userData);
        if(Object.keys(userData).length === 0){
            navigate('/login')  
        }else{
           
            const getUserData=async()=>{
                const response=await GetUserDataByIdFunction(userData.userId)
                if(response.status){
                    clearMetaUser()
                    addMetaUser(response.data)
                   if(response.data.charactorName==""){
                      navigate("/meta/charectorSelection")
                   }else{
                    toast.success("Welocome ..!")
                   }
                }else{
                    //create a new user
                    const data={
                        userId:userData.userId
                    }
                    const response=await CreateNewUserFunction(data)
                    if(response.status){
                        clearMetaUser()
                        addMetaUser(response.data)
                        navigate("/meta/charectorSelection")
                    }
                }
            }
            getUserData()
        }
    },[userData])






    return (
      <>
        <div className='w-screen h-screen'>
          <Canvas shadows camera={{ position: [0, 300, 1000], fov: 30 }}>
          <Environment files={"../../../texture/sky.jpg"} background={"both"}/>
            <directionalLight position={[10, 10, 10]} castShadow intensity={7} />
            <directionalLight position={[-10, -10, -10]} castShadow intensity={7} />
            <ambientLight intensity={1} color={"red"} />
            <OrbitControls position={[0, 0, 0]} />
            <ChinaCity onModelLoaded={handleModelLoaded} />
            {isCameraAnimated && <CameraAnimation />}
          </Canvas>
          {isLoading && <LoadingScreen />}
        </div>
      </>
    );
  };
  
  const CameraAnimation = () => {
    const { camera } = useThree();
  
    useEffect(() => {
      const animationDuration = 5000; 
      const startPosition = new Vector3(0, 300, 800); 
      const endPosition = new Vector3(0, 50, 0); 
      const startTime = Date.now();
  
      const animateCamera = () => {
        const elapsedTime = Date.now() - startTime;
        const t = Math.min(elapsedTime / animationDuration, 1); // Interpolation parameter (between 0 and 1)
  
        // Interpolate camera position between start and end positions
        const newPosition = startPosition.clone().lerp(endPosition, t);
        camera.position.copy(newPosition);
  
        if (t < 1) {
          requestAnimationFrame(animateCamera);
        }
      };
  
      animateCamera();
  
      return () => {
        // Cleanup function
      };
    }, [camera]);
  
    return null; // This component doesn't render anything
  };
  
  export default Map;