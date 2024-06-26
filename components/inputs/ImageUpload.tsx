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

interface ImageUploaderProps{

  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}
const ImageUpload=({
 
  onChange,
  onRemove,
  value
}:ImageUploaderProps)=>{

    const handleUpload=useCallback((result:any)=>{
        onChange(result.info.secure_url)
    },[onChange])    

    return(
       <>
            <div
              className="
               my-4
               grid
               grid-cols-1
               md:grid-cols-2 
               gap-2
               max-h-[60vh]
               overflow-y-auto
               
               ">
            {value?.map((url)=>(
                <div 
                key={url} 
                className=" 
                relative 
                w-full 
                h-[200px] 
                ">
                <div className="z-10 absolute top-2 right-2">
                    <Button 
                    type="button" 
                    onClick={()=>onRemove(url)}
                    variant='secondary'
                    size='sm'>
                        <Trash className="h-4 w-4"/>
                    </Button>
                    </div> 
                  <Image
                   fill
                   alt="Image"
                   className="object-cover  rounded-md"
                   src={url}
                  />

                </div>
            ))}
            </div>
        <CldUploadWidget
         onUpload={handleUpload}
         uploadPreset="oj39ca6j"
         options={{
            maxFiles:20
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
export default ImageUpload;