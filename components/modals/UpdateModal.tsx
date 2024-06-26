"use client"

import { useEffect, useState } from 'react';
import { FieldValues, useForm ,SubmitHandler} from 'react-hook-form';

import toast from 'react-hot-toast';
import Modal from './Modal';

import Input from '../inputs/Input';
import Heading from '../Heading';



import axios from 'axios';

import { useRouter } from 'next/navigation';

import { Category, Featur } from '@prisma/client';
import ComboInput from '../inputs/ComboInput';
import useUpdateModal from '@/hooks/useUpdateModal';
import MultiValueInput from '../inputs/MultiValueInput';
import MultiSelectInput from '../inputs/MultiSelectInput';
import SwitchInput from '../inputs/SwitchInput';



interface UpdateModalProps{
  allGategories:Category[] | null;
  allFeatures:Featur[]
}


const UpdateModal = ({
  allGategories,
  allFeatures
}:UpdateModalProps) => {

  const {
    register,
    handleSubmit,
    reset,
    setValue,
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
       isAdmin:false,
       isActive:true,
    },
})

 
  const router=useRouter();
  const updateModal=useUpdateModal();
 
  const [name ,setName]=useState('');
  const [isUser ,setIsUser]=useState(false);
  const [isLoading,setIsLoading]=useState(false);

    
  useEffect(() => {
    
    if(updateModal.id !== undefined){
   

      const fetshCategory=async()=>{
  
         setIsLoading(true);
        try{
          if(updateModal.subCategory){
            const subCategory=await axios.get(`/api/subcategories/${updateModal.id}`)
            if(subCategory)
            {
            setName(subCategory.data.name);
            setValue('name',name);
            setValue('categoryId',subCategory.data.categories.id)
         
            setValue('featuresIds',subCategory.data.featuresIds)
          }
          }else if(updateModal.category){
            const category=await axios.get(`/api/categories/${updateModal.id}`)
            if(category)
            {
            setName(category.data.name);
            setValue('name',name);
          }
          }else if(updateModal.feature){
            const feature= await axios.get(`/api/features/${updateModal.id}`)
            if(feature){
            setName(feature.data.name);
            setValue('name',name);
            setValue('featureValues',feature.data.value)
            }
          }else if(updateModal.user){
            const userDetails= await axios.get(`/api/users/${updateModal.id}`)
            if(userDetails){
            if(userDetails.data.role==='admin'){
              setIsUser(true);
             
            }else{
              setIsUser(false);
            }  
            setValue('isAdmin',isUser);
            setValue('isActive',userDetails.data.active)
            }
          }
          
        }catch(error){
        console.log(error);
        }finally{
          setIsLoading(false);
        }
      }
      fetshCategory();
    }

  },[allFeatures, isUser, name, setValue, updateModal.category, updateModal.feature, updateModal.id, updateModal.subCategory, updateModal.user])

    const onSubmit:SubmitHandler<FieldValues>=async(data)=>{
        setIsLoading(true);

      try{
        if(updateModal.subCategory){
        
          axios.patch(`/api/subcategories/${updateModal.id}`,data)
         .then(()=>{
           router.refresh();
          })
         }else if(updateModal.category){
          axios.patch(`/api/categories/${updateModal.id}`,data)
          .then(()=>{
            router.refresh();
          })
         }else if(updateModal.feature){
          axios.patch(`/api/features/${updateModal.id}`,data)
          .then(()=>{
            router.refresh();
          })
         }
         else if(updateModal.user){
          console.log(data);
          axios.patch(`/api/users/${updateModal.id}`,data)
          .then(()=>{
            router.refresh();
          })
         }
          setIsLoading(false);
          toast.success('updated successfully');
          reset();
          updateModal.onClose();
        
         
       
      }catch(error:any){
        toast.success('someting went wrong');
      }finally{
        setIsLoading(false);
       
      } 

        }
    let bodyContent;
        if(updateModal.subCategory){
          bodyContent = (
            <div className="flex flex-col gap-4">
              <Heading
                title='Update SubCategory'
                subtitle='Update a SubCategory'
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
        }else if(updateModal.category){
          bodyContent = (
            <div className="flex flex-col gap-4">
              <Heading
                title='Update Category'
                subtitle='Update a category'
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
        }else if(updateModal.feature){
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
        }else if(updateModal.user){
          bodyContent = (
      
            <div className="flex flex-col gap-4">
              <Heading
                title='Update'
                subtitle='Select the status of this user'
              />
             
              <SwitchInput
              id='isActive'
              label='Active'
              placeHolder='hier you can block the user or unblock'
              disabled={isLoading}
              control={control} 
              
              
              />

              <SwitchInput
              id='isAdmin'
              label='Admin'
              placeHolder='hier you can change the role of user (Admin or User)'
              disabled={isLoading}
              control={control} 
              
              
              />
            </div>
          )
        }
    
     

      

  return (
    <Modal
    disabled={isLoading}
    isOpen={updateModal.isOpen}
    title='Updating'
    actionLabel='Save changes'
    onClose={updateModal.onClose}
    onSubmit={handleSubmit(onSubmit)}
    body={bodyContent}
  
    
    
    />
  )
}

export default UpdateModal
