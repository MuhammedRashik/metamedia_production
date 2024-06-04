import { Plus } from 'lucide-react';
import { img_Story_baseUrl } from '../../../utils/common/baseUrl';
import React from 'react';


const Highlight = React.memo( ({setOpenHighlight, index, highlight, extra, setAddHighlight }:any) => {
  
    return (
        <>
        {!extra && highlight.media[0] ? 
      <div className="highlight-item" onClick={()=>setOpenHighlight(index)}>
        <img
          className="rounded-full border-2 border-black w-14 h-14 sm:w-16 sm:h-16 md:h-20 md:w-20 lg:w-24 lg:h-24 opacity-90"
          src={`${img_Story_baseUrl}${highlight?.media[0]}`}
          alt="HL"
        />
      </div>
       :
        <div className="highlight-item">
        <button onClick={()=>setAddHighlight(true)} className="rounded-full border-2 flex justify-center items-center border-black w-14 h-14 sm:w-16 sm:h-16 md:h-20 md:w-20 lg:w-24 lg:h-24">
            <Plus className={`w-10 h-10 lg:w-20 lg:h-20`}/>
        </button>
      </div>
     }
    </>
    );
  })

export default Highlight
