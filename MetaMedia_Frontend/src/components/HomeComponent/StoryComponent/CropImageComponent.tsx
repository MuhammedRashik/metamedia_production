import { ZoomIn, ZoomOut } from "lucide-react";
import { useState } from "react";
import Cropper from "react-easy-crop";

const CropImageComponent = ({ selectedFile ,imageUrl,setCroppedImage,setTrimVideo}: any) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [aspect, setAspect]: any = useState([1 / 1]);
  const [croppedAreaPixels,setCroppedAreaPixels] = useState<any>('')

  const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };
    const cropImage = async () => {
        if (!croppedAreaPixels) {
          return;
        }
    
        const canvas = document.createElement('canvas');
        const image = new Image();
        image.src = imageUrl;
        await new Promise<void>(resolve => {
          image.onload = () => {
            resolve();
          };
        });
        
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = croppedAreaPixels.width;
        canvas.height = croppedAreaPixels.height;
        const ctx:any = canvas.getContext('2d');
        ctx.drawImage(
          image,
          croppedAreaPixels.x * scaleX,
          croppedAreaPixels.y * scaleY,
          croppedAreaPixels.width * scaleX,
          croppedAreaPixels.height * scaleY,
          0,
          0,
          croppedAreaPixels.width,
          croppedAreaPixels.height
        );
    
        const croppedImageBase64:any = canvas.toDataURL('image/jpeg');
        setTrimVideo(true)
        setCroppedImage(croppedImageBase64)
  }

  const handleZoomIn = () => {
    if (zoom < 3) {
      setZoom(zoom + 0.1);
    }
  };

  const handleZoomOut = () => {
    if (zoom > 1) {
      setZoom(zoom - 0.1);
    }
  };
  return (
    <div className="flex justify-center h-[400px] md:h-[600px]">
    <div
      className="flex justify-center items-center h-full w-full"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="rounded-lg shadow-lg w-[500px] h-[450px] flex border border-black flex-col justify-between relative p-8">
       {selectedFile && <X size={26} className="absolute right-2 top-2 text-black" onClick={()=>setSelectedFile(null)}/>}
        {!selectedFile && <p className="text-center text-black">Drag photos and videos here</p> }
        {!selectedFile && <ImagePlus width={80} height={200} className="self-center text-black"/>}
        {selectedFile ? (
          <>
            <p className="mb-4 text-black">File: {selectedFile.name}</p>
            {selectedFile.type?.startsWith("image") ? (
              <div className="flex justify-center">

                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="Selected"
                  className=" w-72 h-80"
                />
              </div>
            ) : selectedFile.type?.startsWith("video") ? (
              <video
                src={URL.createObjectURL(selectedFile)}
                controls
                className="max-w-full h-auto"
              />
            ) : (
              <p className="text-red-800">Unsupported file type</p>
            )}
          </>
        ) : (
          <div className="flex justify-center">

          <label
            htmlFor="fileInput"
            className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 text-center bg-[#C1506D] bottom-0 text-white font-semibold px-1 w-40 py-2 rounded-lg"
          >
            Choose File
          </label>
          </div>
        )}
        <input
          type="file"
          id="fileInput"
          className="hidden"
          accept="image/*,video/*"
          onChange={handleFileChange}
        />
      </div>
    </div>

  </div>
  );
};

export default CropImageComponent;
