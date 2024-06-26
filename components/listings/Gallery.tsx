"use client"

import { Tab } from "@headlessui/react";
import Image from "next/image";

import { cn } from "@/lib/utils";
import HeartButton from "../HeartButton";

import { User } from "@prisma/client";

interface GalleryProps{
    imagesSrc:string[];
    id:string;
    currentUser:User | null; 
}
const Gallery=({
    imagesSrc=[],
    id,
    currentUser
}:GalleryProps)=>{

   return(
   
    <Tab.Group as="div" className="flex flex-col-reverse ">
       <div className="mt-6  ">
        <Tab.List className=" grid grid-cols-12 gap-6 relative" >
        
        
            {imagesSrc.map((image,index)=>(
                 <Tab key={index}
                 className="
                  relative
                  flex
                  aspect-square
                  cursor-pointer
                  items-center
                  justify-center
                  rounded-md
                  bg-white
              
                  
                  ">
                  {({selected})=>(
                    <div>
                        <span 
                          className="
                          absolute
                          w-full
                          aspect-square
                          inset-0
                          overflow-hidden
                          rounded-md
                          
                          ">
                          <Image
                          fill
                          src={image}
                          alt=""
                          className=" object-cover object-center w-full  "   
                         
                          />  
            
                        </span>
                        <span
                         className={cn(
                            'absolute inset-0 rounded-md ring-2 ring-offset-2',
                            selected ?'ring-neutral-400':'ring-transparent'
                         )}
                        />
            
                        
                    </div>
                  )}  
                </Tab>
            ))}
            </Tab.List>       
        </div>
        <Tab.Panels className=" aspect-square w-full h-full ">

            {imagesSrc.map((image)=>(
                <Tab.Panel key={image}>
                   <div 
                   className=" 
                   aspect-square 
                   relative 
                   sm:rounded-lg
                   overflow-hidden
                   h-full
                   w-full 
                     " >
                   <Image
                   
                   fill
                   src={image}
                   alt="image"
                   className=" object-cover object-center w-full " 
                   
                   />    
                   <div className=" absolute top-5 right-5">
                    <HeartButton
                       listingId={id} 
                       currentUser={currentUser}
                     /> 
                     </div>
                    </div> 
                </Tab.Panel>
            ))}
         </Tab.Panels>    

    </Tab.Group>
  
   ) 

}
export default Gallery