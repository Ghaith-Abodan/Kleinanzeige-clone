"use client"



import {  useState } from 'react';
import { FieldValues, useForm ,SubmitHandler} from 'react-hook-form';

import toast from 'react-hot-toast';
import Modal from './Modal';

import Input from '../inputs/Input';
import Heading from '../Heading';



import axios from 'axios';

import { useRouter } from 'next/navigation';
import { Category, Featur } from '@prisma/client';

import ComboInput from '../inputs/ComboInput';
import useCreateModal from '@/hooks/useCreateModal';

import MultiValueInput from '../inputs/MultiValueInput';
import MultiSelectInput from '../inputs/MultiSelectInput';



interface CreateModalProps{
  allGategories:Category[] | null;
  allFeatures:Featur[];
}

const CreateModal = ({
  allGategories,
  allFeatures
}:CreateModalProps) => {

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState:{
        errors,
    },
}=useForm<FieldValues>({
    defaultValues:{
       name:'',
       categoryId:'',
       featureValues:[],
       featuresIds:[],
       email:'',
       password:'',
    },
})

 
  const router=useRouter();
  const createModal=useCreateModal();
  const [isLoading,setIsLoading]=useState(false);


    const onSubmit:SubmitHandler<FieldValues>=async(data)=>{
        
     
      setIsLoading(true);
      try{
        if (createModal.subcategory){
      
          axios.post('/api/subcategories',data)
          .then(()=>{
          toast.success('Created successfully');
          router.refresh();
          
          })
          .catch(()=>{
            toast.error('Something went wrong');
          })
        }else if(createModal.category){
          axios.post(`/api/categories`,data)
          .then(()=>{
            toast.success('Created successfully');
            router.refresh();
           
           })
           .catch(()=>{
            toast.error('Something went wrong');
          })
        }else if(createModal.feature){
       axios.post(`/api/features`,data)
       .then(()=>{
        toast.success('Created successfully');
        router.refresh();
       
       })
       .catch(()=>{
        toast.error('Something went wrong');
      })
       
        }else if(createModal.user){
          axios.post('/api/register',data)
          .then(()=>{
            router.refresh();
            toast.success('Created successfully');
          })
          .catch(()=>{
            toast.error('Invalid email or password');
          })
        }

        setIsLoading(false);
       
        reset();
        createModal.onClose();
      
     
       
      }catch(error:any){
        toast.error('Something went wrong');
      }
      finally
      {
        setIsLoading(false);
       
      } 
        }
    
        let bodyContent;
      
      if(createModal.subcategory){
        bodyContent=(
          <div className="flex flex-col gap-4">
          <Heading
            title='Create SubCategory'
            subtitle='Add a new SubCategory'
          />
            <Input
          
          id="name"
          label="Name"
          type="text"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />

       <ComboInput
       id='categoryId'
       placeHolder='Select a Category'
       disabled={isLoading}
       required
       errors={errors}
       data={allGategories}
       control={control}   
       
       />

      <MultiSelectInput
       id='featuresIds'
       label='Select a features'
       disabled={isLoading}
       required
       errors={errors}
       data={allFeatures}
       control={control}   
       
       />
          </div>
        )
      }else if(createModal.category){
        bodyContent = (
      
          <div className="flex flex-col gap-4">
            <Heading
              title='Create category'
              subtitle='Add a new category'
            />
           
            <Input
            
              id="name"
              label="Name"
              type="text"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />
           

          </div>
        )
      }else if (createModal.feature){
        bodyContent = (
      
          <div className="flex flex-col gap-4">
            <Heading
              title='Create feature'
              subtitle='Add a new feature'
            />
           
            <Input
            
              id="name"
              label="Name"
              type="text"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />
           <MultiValueInput
              id='featureValues'
              label='Value'
              disabled={isLoading}
              required
              errors={errors}
              control={control}   
                      />
          </div>
        )
      }else if(createModal.user){
         bodyContent = (
          <div className="flex flex-col gap-4">
            <Heading
              title="Create user"
              subtitle="Create a new user account!"
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
      }
      

  return (
    <Modal
    disabled={isLoading}
    isOpen={createModal.isOpen}
    title='Creating'
    actionLabel='Create'
    onClose={createModal.onClose}
    onSubmit={handleSubmit(onSubmit)}
    body={bodyContent}
  
    />
  )
}

export default CreateModal
