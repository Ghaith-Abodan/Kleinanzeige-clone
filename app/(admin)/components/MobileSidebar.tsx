"use client"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { AiOutlineMenu } from "react-icons/ai"
import Sidebar from "./Sidebar"

import { useEffect, useState } from "react"


const Mobilesidebar = () => {
  const [isMounted,setIsMounted]=useState(false);

  useEffect(()=>{
    setIsMounted(true)
  },[])

  if(!isMounted){
    return null;
    
  }
  return (
    <Sheet>
      <SheetTrigger>
      <div 
          className="
           md:hidden 
           p-2
           cursor-pointer
           hover:shadow-sm
           hover:bg-neutral-100 
           transition
           
           ">
           <AiOutlineMenu size={25}/>
           </div>
      </SheetTrigger>
      <SheetContent side="left" className="p-0" >
      <Sidebar/>
      </SheetContent>
    </Sheet>
   
  )
}

export default Mobilesidebar
