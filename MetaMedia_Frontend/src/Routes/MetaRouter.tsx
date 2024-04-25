
import CharacterSelection from "../components/MetaComponents/CharacterSelection";
import LoadingScreenComponent from "../components/MetaComponents/LoadingScreen";
import { useEffect, useState } from "react";

const MetaRouter = () => {
  const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsLoading(false);
//     }, 6000);
//     return () => clearTimeout(timer);
//   }, []);

  
  
  
  return (
    <>
      {isLoading && (
        <>
          <LoadingScreenComponent />
        </>
      )}
      <div className="w-screen h-screen fixed">
        <CharacterSelection/>
      </div>
    </>
  );
};

export default MetaRouter;
