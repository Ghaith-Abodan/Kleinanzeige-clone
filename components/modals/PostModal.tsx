
"use client"

import usePostModal from "@/hooks/usePostModal"
import Modal from "./Modal"
import { useCallback, useMemo, useState } from "react";
import Heading from "../Heading";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Category, Featur, Prisma, SubCategory } from "@prisma/client";
import CategoryInput from "../inputs/CategoryInput";
import SubCategoryInput from "../inputs/SubCategoryInput";


import FeaturesInput from "../inputs/FeaturesInput";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";

import PriceInput from "../inputs/PriseInput";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import MessageInput from "../inputs/MessageInput";


enum STEPS{

    CATEGORY=0,
    SUBCATEGORY=1,
    INFO=2,
    IMAGES=3,
    LOCATION=4,
    DESCRIPTION=5,
    PRICE=6
}

interface PostModalProps{
    categories:Category[] | null;
    subCategories:SubCategory[] | null;
    allFeatures:Featur[];
}

const PostModal = ({
    categories ,
    subCategories,
    allFeatures
}:PostModalProps) => {
    const router=useRouter();
    const postModal=usePostModal();

    const [step,setStep]=useState(STEPS.CATEGORY);
    const [subcategories,setSubcategories]=useState<SubCategory[]>([]);
    const [featuresInfo,setFeaturesInfo]=useState<Prisma.JsonValue[]>([]);
    const [isLoading,setIsloading]=useState(false);
   
    const { 
        register, 
        handleSubmit,
        setValue,
        watch,
        control,
        formState: {
          errors,
        },
        reset,
      } = useForm<FieldValues>({
        defaultValues: {
          categoryId: '',
          subCategoryId:'',
          city: '',
          area:'',
          postcode:'',
          features: [],
          imagesSrc: [],
          price: 1,
          title: '',
          description: '',
          fixedPrice:'',
        }
      });

      const categoryId=watch('categoryId');
      const subCategoryId=watch('subCategoryId'); 
      const features=watch('features');
      const imagesSrc=watch('imagesSrc');
    
     
      const setCustomValue=(id:string,value:string) =>{
        setValue(id,value,{
            shouldDirty:true,
            shouldTouch:true,
            shouldValidate:true,
        })
      }

    const onBack=()=>{
        setStep((value)=> value - 1);
    }

    const onNext=()=>{
        setStep((value)=> value + 1);
    }

    const onSumbit:SubmitHandler<FieldValues>=(data)=>{
      if(step!== STEPS.PRICE){
        return onNext();
      }
      setIsloading(true);

     
  
    axios.post('/api/listings',data)
     .then(()=>{
       toast.success('Created Success');
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY)
        postModal.onClose();
      })
      .catch(()=>{
        toast.error('Something went wrong');
      })
      .finally(()=>{
        setIsloading(false);
      })
    }

    const actionLabel=useMemo(()=>{
        if(step === STEPS.PRICE){
            return 'Create';
        }

        return 'Next';
    },[step])

    const secondaryActionLabel=useMemo(()=>{
        if(step === STEPS.CATEGORY){
            return undefined;
        }

        return 'Back';
    },[step])

    let bodyContent=(
        <div className="flexx flex-col gap-8">
           <Heading
            title="Which of these Category belong your Post? "
            subtitle="Pick a category"
           
           />
           <div
            className="
             mt-4
             grid
             grid-cols-1
             md:grid-cols-2 
             gap-3
             max-h-[50vh]
             overflow-y-auto
             
             ">
                {categories?.map((item)=>(
                    <div
                      key={item.id}
                      className="col-span-1">
                    <CategoryInput 
                      onClick={(value)=>{
                        setCustomValue('categoryId',value)
                       const subcategoriesFilter= subCategories?.filter((sub)=> sub.categoryId === value)
                       setSubcategories(subcategoriesFilter!)
                      }}
                      id={item.id}
                      selected={categoryId === item.id}
                      label={item.name}  />        
                    </div>
                ))}
            </div> 
        </div>
    )

    if(step === STEPS.SUBCATEGORY){
      bodyContent=(
        <div className="flexx flex-col gap-8">
        <Heading
         title="Which of these SubCategory belong your Post? "
         subtitle="Pick a subcategory"
        
        />
              <div
              className="
               mt-4
               grid
               grid-cols-1
               md:grid-cols-2 
               gap-3
               max-h-[50vh]
               overflow-y-auto
               
               ">
            {subcategories?.map((item)=>(
              <div key={item.id}
              className="col-span-1"
              >
              <SubCategoryInput
                  onClick={(value)=>{
                  setCustomValue('subCategoryId',value)
                  setFeaturesInfo((subCategories?.find((sub)=> sub.id === value)?.featuresIds)|| []) 
    
                }}
                id={item.id}
                selected={subCategoryId === item.id}
                label={item.name} 
              
              />  
              </div>
            ))}    
               </div>
  
        </div>
      )
    
    }

    if(step===STEPS.INFO){
      bodyContent=(
        <div className="flex flex-col gap-8">
          <Heading
           title="Share some basics about your post"
           subtitle="What properties of your post"
          />  
              <div
              className="
               mt-4
               grid
               grid-cols-1
          
               gap-2
               max-h-[50vh]
               overflow-y-auto
               
               ">
              
                {featuresInfo?.map((item:any,index:number,array)=>(
             <div key={item.value}
                   className="col-span-1"
              >
              <FeaturesInput
           
              id={item.value}
              label={item.label} 
              data={allFeatures}
              onChange={(value)=>{
              
                features[index]=value;
                
              }}
              />
                  
             </div>
             
            ))}  
        </div>
     </div>
      )
            }

    if(step === STEPS.IMAGES){
      bodyContent=(
        <div className="flexx flex-col gap-8">
        <Heading
         title="Add photos of your post "
         subtitle="Show what your thing looks like"
        
        />
        

            <ImageUpload 
            value={imagesSrc}
            onRemove={(url)=>{setValue('imagesSrc',imagesSrc.filter((current:any)=>current !== url))
                            }}
            onChange={(url)=>{
              setValue('imagesSrc',[...imagesSrc,url])}}
              />
               </div>
           
  
     
      )
        }

    if(step === STEPS.LOCATION){
         bodyContent=(
            <div className="flex flex-col gap-8">
             <Heading
              title="where is your place located? "
              subtitle="Help to find you"
                  
             />
             <Input
                id="city"
                label="City"
                disabled={isLoading}
                type="text"
                register={register}
                errors={errors}
                required
             
             />
                 <Input
                id="area"
                label="Area"
                disabled={isLoading}
                type="text"
                register={register}
                errors={errors}
                required
             
             />
                 <Input
                id="postcode"
                label="Postcode"
                disabled={isLoading}
                type="number"
                max={5}
                register={register}
                errors={errors}
                required
             
             />
                
             </div>
            
           
                )
              
        }    

    if(step === STEPS.DESCRIPTION){
          bodyContent=(
             <div className="flex flex-col gap-8">
              <Heading
               title="How would you describe your Post? "
               subtitle="Short and sweet works best"
                   
              />
              <Input
                 id="title"
                 label="Title"
                 disabled={isLoading}
                 type="text"
                 register={register}
                 errors={errors}
                 required
              
              />
                  <MessageInput
                 id="description"
                 label="Description"
                 disabled={isLoading}
                 register={register}
                 errors={errors}
                 required
              
              />
                 
                 
              </div>
             
            
                 )
               
         }    
    
    if(step === STEPS.PRICE){
          bodyContent=(
             <div className="flex flex-col gap-8">
              <Heading
               title="Now, set your proce "
               subtitle="What is the price"
                   
              />
              <Input
                 id="price"
                 label="Price"
                 disabled={isLoading}
                 type="number"
                 register={register}
                 errors={errors}
                 formatPrice
                 required
              
              />
              <PriceInput
                id='fixedPrice'
                placeHolder='Fiexd Prise'
                disabled={isLoading}
                required
                errors={errors}
                control={control}   
       
       />
             
                 
                 
              </div>
             
            
                 )
               
         }      
              
  return (
    <Modal
       isOpen={postModal.isOpen}
       onClose={postModal.onClose}
       onSubmit={handleSubmit(onSumbit)}
       actionLabel={actionLabel}
       secondaryActionLabel={secondaryActionLabel}
       secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
       title="Kleinanzeogen your Post!" 
       body={bodyContent}
    
    
    />
      
    
  )
}

export default PostModal
