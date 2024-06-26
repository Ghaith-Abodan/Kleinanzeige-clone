"use client"

import { cn } from "@/lib/utils"
import { PiLayoutLight } from "react-icons/pi"
import {BiCategoryAlt} from "react-icons/bi"
import {BsSubtract} from "react-icons/bs"
import {FiUsers} from "react-icons/fi"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { twMerge } from "tailwind-merge"
import { MdOutlineFeaturedPlayList } from "react-icons/md"
const routes=[

    {
        label:"Dashboard",
        icon:PiLayoutLight,
        href:"/dashboard",
        color:"text-sky-500"
    },
    {
        label:"Categories",
        icon:BiCategoryAlt,
        href:"/categories",
        color:"text-violet-500"
    },
    {
        label:"SubCategories",
        icon:BsSubtract,
        href:"/subcategories",
        color:"text-pink-700"
    },
    {
      label:"Features",
      icon:MdOutlineFeaturedPlayList,
      href:"/features",
      color:"text-green-700"
  },
    {
        label:"Users",
        icon:FiUsers,
        href:"/users",
        color:"text-orange-700"
    },
]

const Sidebar = () => {

  const pathname=usePathname();
  return (
    <div 
      className="
      space-y-4 
      py-4
      flex 
      flex-col 
      h-full 
      bg-[#111827] 
      text-white
       ">
     <div className="px-3 py-2 flex-1">
        <Link
        href="/"
        className="flex items-center pl-3 mb-14
        ">
         <div className=" relative w-8 h-8 mr-4">
            <Image
                fill
              
                alt="Logo"
                src="/images/Kleinanzeigen_Logo2.png"
            
            />
            </div>   
         <h1 className="text-2xl font-bold">
            Kleinanzeigen
            </h1>   
        
        </Link>
        <div className="space-y-1">
           {
            routes.map((route)=>(
                <Link
                  href={route.href}
                  key={route.href}
                  className={twMerge(`
                  text-sm
                  group
                  flex
                  p-3
                  w-full
                  justify-start
                  font-medium
                  cursor-pointer
                  hover:text-white
                  hover:bg-white/10 
                  rounded-lg
                  transition
                  
                  `,pathname === route.href ? ' text-white bg-white/10':'text-zinc-400' )}
                  
                   
                   
                >
                 <div className="flex items-center flex-1">
                    <route.icon className={cn('h-5 w-5 mr-3',route.color)}/>
                      {route.label}                     
                    </div>   
                </Link>
            ))
           } 

        </div>
     </div>
    </div>
  )
}

export default Sidebar
