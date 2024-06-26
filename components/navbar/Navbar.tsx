

import Logo from "./Logo"
import Search from "./Search"


import UserMenu from "./UserMenu"
import Container from '../Container';
import { Category, User } from "@prisma/client";

import Categoriesbar from "./Categoriesbar";
import { useCallback } from "react";
import useLoginModal from "@/hooks/useLoginModal";


interface NavbarProps{
  currentUser?:User | null;
  allGategories?:Category[] | null;
}

const Navbar = ({
  currentUser,
  allGategories
}:NavbarProps) => {


  return (
    <div className=" fixed w-full bg-white z-10 shadow-sm ">
      <div className="py-4 border-b-[1px]">
      <Container>
    
     <div 
     className="
     flex 
     flex-row 
     items-center 
     justify-between 
     gap-3 
     md:gap-0
     " >

     <Logo/>  
     <Search allGategories={allGategories!}/>
      <UserMenu currentUser={currentUser}/>
     </div>
     </Container> 
     </div>
     <Categoriesbar allGategories={allGategories}/>
      </div>
      
  
  )
}

export default Navbar
