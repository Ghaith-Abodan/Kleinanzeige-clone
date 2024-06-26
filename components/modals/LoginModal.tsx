"use client"
import useRegisterModal from '@/hooks/useRegisterModal';
import { signIn } from 'next-auth/react'
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
import { useRouter } from 'next/navigation';


const LoginModal = () => {

    const router=useRouter();
    const registerModal=useRegisterModal();
    const loginModal=useLoginModal();
    const [isLoading,setIsLoading]=useState(false);

    const {
        register,
        handleSubmit,
        formState:{
            errors,
        },
    }=useForm<FieldValues>({
        defaultValues:{
            email:'',
            password:'',
        },
    })

    const onSubmit:SubmitHandler<FieldValues>=(data)=>{
        setIsLoading(true);

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
    }
    const onToggle = useCallback(() => {
      loginModal.onClose();
        registerModal.onOpen();
       
      }, [registerModal, loginModal])


      const bodyContent = (
        <div className="flex flex-col gap-4">
          <Heading
            title="Welcome back"
            subtitle="Login to your account!"
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
            <p>First time using Kleinanzeigen?
              <span 
                onClick={onToggle} 
                className="
                  text-neutral-800
                  cursor-pointer 
                  hover:underline
                "
                > Sign up</span>
            </p>
          </div>
        </div>
      )  

  return (
    <Modal
    disabled={isLoading}
    isOpen={loginModal.isOpen}
    title='Login'
    actionLabel='Continue'
    onClose={loginModal.onClose}
    onSubmit={handleSubmit(onSubmit)}
    body={bodyContent}
    footer={footerContent}
    
    
    />
  )
}

export default LoginModal
