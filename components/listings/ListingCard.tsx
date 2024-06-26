"use client"

import {  User } from "@prisma/client"
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import HeartButton from "../HeartButton";
import Button from "../Button";




interface ListingCardProps{

    data:any;
    onAction?:(id:string)=>void;
    disabled?:boolean;
    actionLabel?:string;
    actionId?:string;
    currentUser?:User | null;
}

const ListingCard=({
    data,
    onAction,
    disabled,
    actionLabel,
    actionId='',
    currentUser,
}:ListingCardProps)=>{

    const router= useRouter();

    const handleCanecl=useCallback((e:React.MouseEvent<HTMLButtonElement>)=>{
        e.stopPropagation();
        if(disabled){
            return;
        }
        onAction?.(actionId);
    },[actionId, disabled, onAction])


 return(
    <div 
    onClick={()=>router.push(`/listings/${data.id}`)}
      className="
       col-span-1 cursor-pointer group" >

    <div className="flex flex-col gap-2 w-full">
        <div 
          className="
          aspect-square
          w-full
          relative
          overflow-hidden
          rounded-xl     
          ">
          <Image
           fill
           alt="Listing"    
           src={data.imagesSrc[0]}
           className="
            object-cover
            h-full
            w-full
            group-hover:scale-110 
            transition   " 
          />  
          <div className=" absolute top-3 right-3">
            <HeartButton
             listingId={data.id}
             currentUser={currentUser} 
            />
            </div>    
        </div>
        <div className=" font-semibold text-lg  truncate">
           {data.title} 
        </div>

        <div className=" font-light text-neutral-500">
        {data.city}-{data.area}-{data.postcode}    
        </div>
        <div className="flex flex-row items-center gap-1">
            <div className="font-semibold">
                {data.price} € ,{data.fixedPrice}
            </div>
            
        </div>

        {onAction && actionLabel && (
        <Button
         disabled={disabled}
         small
         label={actionLabel}
         onClick={handleCanecl}
        />
       )}
             
          
     
    </div>
    
    </div>
 )
}

export default ListingCard