import {  Route, Routes } from 'react-router-dom';
import CharacterSelection from '../components/MetaComponents/CharacterSelection';
import Loader from '../components/MetaComponents/LoadingScreen';
import { useEffect, useState } from 'react';
import Map from '../components/MetaComponents/Map'
import { Canvas ,useThree} from '@react-three/fiber';
const MetaRouter = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  return (

    <>
    <Routes>
     
        <Route path="/*" element={ <Map/> } />
        <Route path="/charectorSelection" element={isLoading ? <Loader /> : <CharacterSelection />}/>
          
      
     
        </Routes>
    </>
  );
};

export default MetaRouter;
