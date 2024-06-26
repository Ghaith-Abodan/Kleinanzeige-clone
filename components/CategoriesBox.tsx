"use client"

import {useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import qs from 'query-string';

interface CategoriesBoxProps{
    value:string;
    label:string;
    selected?:boolean;
}
const CategoriesBox = ({
    value,
    label,
    selected
}:CategoriesBoxProps) => {
    const router=useRouter();
    const params=useSearchParams();

    const handleClick=useCallback(()=>{
        let currentQeury={};
        if(params){
            currentQeury=qs.parse(params.toString());

        }

        const updatedQuery:any={
            ...currentQeury,
            category:value
        }

        if(params?.get('category')===value){

            delete updatedQuery.category;
            
        }
        const url=qs.stringifyUrl({
            url:'/',
            query:updatedQuery

        },{skipNull:true})

        router.push(url)
    },[params, router, value])

  return (
    <div 
      onClick={handleClick}
      className={`
      flex
      items-center
      justify-center  
      font-medium
      text-sm  
      p-2
      border-b-2
      hover:text-neutral-800
      transition
     
      cursor-pointer
      ${selected 
        ? 'border-b-neutral-800 text-neutral-800'
        : 'border-transparent text-neutral-500'}       
      
      `}
      >
      {label}
    </div>
  )
}

export default CategoriesBox
