"use client"
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { TbPhotoPlus } from 'react-icons/tb'
import { Button } from "../ui/button";
import { ImagePlus, Trash } from "lucide-react";

declare global{
    var cloudinary:any;
}

interface ImageProfileUploadProps{

  onChange: (value: string) => void;
 
  value: string;
}
const ImageProfileUpload=({
 
  onChange,

  value
}:ImageProfileUploadProps)=>{

    const handleUpload=useCallback((result:any)=>{
        onChange(result.info.secure_url)
    },[onChange])    

    return(
       <>
         
        <CldUploadWidget
         onUpload={handleUpload}
         uploadPreset="oj39ca6j"
         options={{
            maxFiles:1
         }}
        >

       {({ open }) => {
          const onClick = () => {
            open();
          };

          return (
            <Button 
              type="button" 
             
              variant="secondary" 
              onClick={onClick}
            >
              <ImagePlus className="h-4 w-4 mr-2" />
              Upload an Image
            </Button>
          );
        }}
            </CldUploadWidget>

            </> 
    )
}
export default ImageProfileUpload;