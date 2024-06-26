"use client"



import {  useState } from 'react';
import { FieldValues, useForm ,SubmitHandler, Form, Controller} from 'react-hook-form';

import toast from 'react-hot-toast';
import Modal from './Modal';

import Input from '../inputs/Input';
import Heading from '../Heading';
import  bcrypt  from 'bcrypt';


import axios from 'axios';

import { useRouter } from 'next/navigation';
import {  User } from '@prisma/client';


import useProfileModal from '@/hooks/useProfileModal.';
import Image from 'next/image';
import ImageProfileUpload from '../inputs/ImageProfileUpload';




interface ProfileModalProps{
 currentUser:User | null;
}

const ProfileModal = ({
    currentUser
}:ProfileModalProps) => {

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState:{
        errors,
    },
}=useForm<FieldValues>({
    defaultValues:{
       name:currentUser?.name || '',
       password:'',
       confirmPassword:'',
       image:currentUser?.image || '',
     
    },
})

 const image=watch('image');
 

  const router=useRouter();
  const profileModal=useProfileModal();
  const [isLoading,setIsLoading]=useState(false);


    const onSubmit:SubmitHandler<FieldValues>=async(data)=>{
        
     
      setIsLoading(true);
      try{
        if(data.password !== data.confirmPassword){
            return toast.error('Password is not confirm ');
        }

        axios.patch(`/api/users/${currentUser?.id}`,data)
        .then(()=>{
          toast.success('updated successfully');  
          profileModal.onClose();  
          reset();
          router.refresh();

         })


      }catch(error:any){
        toast.success('someting went wrong');
      }finally{
        setIsLoading(false);
       
      } 




        }
    
        let bodyContent;
      
     
        bodyContent=(
          <div className="flex flex-col gap-8">
          <Heading
            title={`welcome ${currentUser?.name}`}
            subtitle='You can here edit your profile'
          />
            
          <div className=' flex items-center gap-3'>
            {image || currentUser?.image
            ?(
                <Image
                alt="profile_image"
                width={75}
                height={75}
                priority
                className=" rounded-full object-cover"     
                src={image || currentUser?.image  }
               
               />
            ): <Image
            alt="profile_image"
            width={46}
            height={46}
            priority
            className=" rounded-full object-cover"     
            src='/images/placeholder.jpg'
           
           />}
           
       <ImageProfileUpload
        value={image}
        onChange={(value)=>setValue('image', value)}

        
       />
      
        </div>  

       <Input
       id="name"
       label= 'name'
       disabled={isLoading}
       type="text"
       register={register}
       errors={errors}
      
       
       
       />
    {currentUser?.hashedPassword && (
     <> 
  <Input
  id="password"
  label="Password"
  disabled={isLoading}
  type="password"
  register={register}
  errors={errors}
 
  
  />

  <Input
  id="confirmPassword"
  label="ConfirmPassword"
  disabled={isLoading}
  type="password"
  register={register}
  errors={errors}
 
  
  
  /> 
  </>     
    )}
      

      
     
          </div>
        )
      
      
      

  return (
    <Modal
    disabled={isLoading}
    isOpen={profileModal.isOpen}
    title='Profile'
    actionLabel='Save'
    onClose={profileModal.onClose}
    onSubmit={handleSubmit(onSubmit)}
    body={bodyContent}
  
    />
  )
}

export default ProfileModal
