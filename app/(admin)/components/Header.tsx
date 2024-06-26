"use client"
import Avatar from "@/components/Avatar"
import { User } from "@prisma/client"
import { AiOutlineMenu } from "react-icons/ai"
import Mobilesidebar from "./MobileSidebar"



interface HeaderProps{
    currentUser?:User | null
}

const Header = ({
    currentUser
}:HeaderProps) => {

  return (
    <div className="flex items-center p-4">
       <Mobilesidebar/>
        <div className="flex w-full justify-end">
        <Avatar imageSrc={currentUser?.image}/> 
        </div>    
    </div>
  )
}

export default Header
