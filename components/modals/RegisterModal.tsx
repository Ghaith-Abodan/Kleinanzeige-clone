"use client"
import useRegisterModal from '@/hooks/useRegisterModal';
import axios from 'axios';
import { useCallback, useState } from 'react';
import { FieldValues, useForm ,SubmitHandler} from 'react-hook-form';
import {FcGoogle} from 'react-icons/fc'
import {AiFillGithub} from 'react-icons/ai'
import toast from 'react-hot-toast';
import Modal from './Modal';
import useLoginModal from '@/hooks/useLoginModal';
import Input from '../inputs/Input';
import Heading from '../Heading';
import Button from '../Button';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';



const RegisterModal = () => {
    const router=useRouter();
    const registerModal=useRegisterModal();
    const loginModal=useLoginModal();
    const [isLoading,setIsLoading]=useState(false);

    const {
        register,
        handleSubmit,
        setError, 
        clearErrors,
        formState:{
            errors,

        },
    }=useForm<FieldValues>({
        defaultValues:{
            name:'',
            email:'',
            password:'',
        },
    })

    const onSubmit:SubmitHandler<FieldValues>=(data)=>{
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if(!regex.test(data.email)){
        setError('email',{
          type:'manual',
          message:'Enter a valid email address'
        });
        toast.error('Invalid email address');  
        
      }else{
        clearErrors('email');
        setIsLoading(true);
        axios.post('/api/register',data)
       .then(()=>{
        
           toast.success('Register Success');
           registerModal.onClose();

           signIn('credentials',{
             ...data,
             redirect:false,
           })
           .then((callback)=>{
             setIsLoading(false);
   
             if(callback?.ok){
               toast.success('Logged in')
               router.refresh();
               loginModal.onClose();
             }
   
             if(callback?.error){
               toast.error(callback.error);
             }
           })
       
          
       })
       .catch((error:Error)=>{
          setError('email',{
          type:'manual',
          message:'This Email is Already Registered'
          })
           toast.error('This Email is Already Registered');
       })
       .finally(()=>{
           setIsLoading(false)
       })
      }
      
       
    }
    const onToggle = useCallback(() => {
        registerModal.onClose();
        loginModal.onOpen();
      }, [registerModal, loginModal])


      const bodyContent = (
        <div className="flex flex-col gap-4">
          <Heading
            title="Welcome to KleinAnzeigen"
            subtitle="Create an account!"
          />
          <Input
            id="email"
            label="Email"
            type="email"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
          <Input
            id="name"
            label="Name"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
          <Input
            id="password"
            label="Password"
            type="password"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
        </div>
      )

      const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
          <hr />
          <Button 
            outline 
            label="Continue with Google"
            icon={FcGoogle}
            onClick={() => signIn('google')} 
          />
          <Button 
            outline 
            label="Continue with Github"
            icon={AiFillGithub}
            onClick={() => signIn('github')}
          />
          <div 
            className="
              text-neutral-500 
              text-center 
              mt-4 
              font-light
            "
          >
            <p>Already have an account?
              <span 
                onClick={onToggle} 
                className="
                  text-neutral-800
                  cursor-pointer 
                  hover:underline
                "
                > Log in</span>
            </p>
          </div>
        </div>
      )  

  return (
    <Modal
    disabled={isLoading}
    isOpen={registerModal.isOpen}
    title='Register'
    actionLabel='Continue'
    onClose={registerModal.onClose}
    onSubmit={handleSubmit(onSubmit)}
    body={bodyContent}
    footer={footerContent}
    
    
    />
  )
}

export default RegisterModal
