"use client"

import { AiOutlineMenu } from 'react-icons/ai'
import Avatar from '../Avatar'
import { useCallback, useEffect, useState } from 'react'
import MenuItem from './MenuItem'
import useRegisterModal from '@/hooks/useRegisterModal'
import useLoginModal from '@/hooks/useLoginModal'
import { User } from '@prisma/client'
import { signOut } from 'next-auth/react'
import usePostModal from '@/hooks/usePostModal'
import { useRouter } from 'next/navigation'
import useProfileModal from '@/hooks/useProfileModal.'
import useConversationsModal from '@/hooks/useConversationsModal'
import axios from 'axios'



interface userMenuProps{
  currentUser?:User | null;
}

const UserMenu = ({
  currentUser
}:userMenuProps) => {

    const [isOpen,setIsOpen]=useState(false);
    const registerModal=useRegisterModal();
    const loginModal=useLoginModal();
    const postModal=usePostModal();
    const profileModal=useProfileModal();
    const conversationsModal=useConversationsModal();
    const router=useRouter();
 
    const [unreadMessages,setUnreadMessages]=useState(0); 

   

    const toggleOpen=useCallback(async()=>{
        setIsOpen((value)=>!value);

        if(currentUser){
          try{
            const response=await axios.get(`/api/unreadMessages/${currentUser?.id}`)
            
             setUnreadMessages(response.data.count);
            
          
          
          }catch(error){
            console.log(error);
          }
        }else{
          return;
        }
      
    },[currentUser])

   
    const onPost=useCallback(()=>{
     if(!currentUser){
      return loginModal.onOpen();
     }
  
     postModal.onOpen();
    },[currentUser,loginModal,postModal])
  return (
    <div className="relative">
      <div className=" flex flex-row items-center gap-3">
        <div
          onClick={onPost}
          className="
           hidden
           md:block
           text-sm
           font-semibold
           py-3
           px-4
           rounded-full
           hover:bg-neutral-100
           transition
           cursor-pointer
           
           ">
            Add listing
        </div>
        <div 
          onClick={toggleOpen}
          className="
           p-4
           md:py-1
           md:px-2
           border-[1px]
           border-neutral-200
           rounded-full 
           flex
           flex-row
           gap-3
           items-center
           cursor-pointer
           hover:shadow-sm
           transition
           
           ">
           <AiOutlineMenu/>
           <div className='hidden md:block'>
           <Avatar imageSrc={currentUser?.image}/>
            </div> 
           
        </div>
        </div> 

        {isOpen && (
            <div className='
               absolute
               rounded-xl
               shadow-md
               w-[40vw]
               text-sm
               md:w-3/4
               bg-white
               overflow-hidden
               right-0
               top-12     
               
               '>
                <div className='flex flex-col cursor-pointer'>

                  {currentUser ? (
                     <>
                     <div className='flex items-center hover:bg-neutral-100 transition cursor-pointer justify-start gap-4'>
                     <MenuItem 
                       onClick={async()=>{
                        conversationsModal.onOpen();
                        toggleOpen();
                        try{
                          await axios.patch(`/api/unreadMessages/${currentUser.id}`)
                        }catch(erros){
                          console.log(erros);
                        }
                      }}
                       label='Messages'
                     />
                  
                       <div className='w-fit px-1 text-center rounded-full text-white bg-red-500'>
                       {unreadMessages}
                       
                       </div>   
                
                    
                     
                     </div>
                    
                      <MenuItem 
                       onClick={()=>{
                        router.push('/properties');
                        toggleOpen();
                       } }
                       label='My Properties'
                     />
                      <MenuItem 
                       onClick={()=>{
                        profileModal.onOpen();
                        toggleOpen();
                      }}
                       label='My Profile'
                     />
                      <MenuItem 
                       onClick={()=>{
                        router.push('/favorites')
                        toggleOpen();
                      }}
                       label='My Favorites'
                     />
                     <hr/>
                     <MenuItem 
                       onClick={()=>{
                        signOut();
                        toggleOpen();  
                      }}
                       label='Sign out'
                     />
                     </>
                  ):(
                    <>
                    <MenuItem 
                      onClick={()=>{
                        loginModal.onOpen();
                        toggleOpen();
                      }}
                      label='Login'
                    />
                      <MenuItem 
                      onClick={()=>{
                        registerModal.onOpen();
                        toggleOpen();
                      }}
                      label='Sign up'
                    />
                    </>
                    )}
                </div>
            </div>
        )} 
    </div>
  )
}

export default UserMenu
