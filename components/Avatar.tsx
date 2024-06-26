"use client"

import Image from "next/image"


interface AvatarProps{
imageSrc?:string | null | undefined;
} 
const Avatar = ({
  imageSrc
}:AvatarProps) => {
  return (
    <Image 
      className=" rounded-full"
      height="40"
      width="40"
      alt="Avatr"
      src={imageSrc || "/images/placeholder.jpg" }    />
      
   
  )
}

export default Avatar
