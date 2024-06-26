"use client"

import Container from "@/components/Container";
import Gallery from "@/components/listings/Gallery";
import ListingHead from "@/components/listings/ListingHead";
import { Category, Listing, SubCategory, User } from "@prisma/client";

import FeaturesBox from "@/components/listings/FeaturesBox";
import DescriptionBox from "@/components/listings/DescriptionBox";
import MessageInput from "@/components/inputs/MessageInput";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";



interface ListingClientProps{
    listing:Listing &{
        user:User,
        category:Category ,
        subCategory:SubCategory,
    }
    currentUser:User | null;
}


const ListingClient=({
    listing,
    currentUser
}:ListingClientProps)=>{
 
    const router=useRouter();
    const [isLoading,setIsLoading]=useState(false);

    console.log(listing.id)
    const {
        register,
        handleSubmit,
        reset,
     
        formState:{
            errors,
        },
    }=useForm<FieldValues>({
        defaultValues:{
           message:'',
          
        },
    })

    const onSubmit:SubmitHandler<FieldValues>=async(data)=>{
        
     
        setIsLoading(true);
        try{
        
            axios.post('/api/conversations',{
                message:data.message,
                currentUser:currentUser?.id,
                userId:listing.userId,
                listingId:listing.id,
            })
            .then(()=>{
            toast.success('Created successfully');
            router.push('/');
            })
          }catch(error:any){
          toast.error('Something went wrong');
        }
        finally
        {
          setIsLoading(false);
         
        } 
  
  
  
          }
    
    return(
        <Container>
           <div className="max-w-screen-2xl mx-auto ">

         
           <div 
                className="
                mx-auto
                max-w-3xl
                flex
                flex-col      
                gap-6     
                ">
               
             <Gallery
              imagesSrc={listing.imagesSrc}
              id={listing.id}
              currentUser={currentUser}
                />
            
          

              <ListingHead
               title={listing.title}
               imagesSrc={listing.imagesSrc}
               city={listing.city}
               area={listing.area}
               postCode={listing.postcode}
               price={listing.price}
               fixedPrice={listing.fixedPrice}  
               createdAt={listing.createdAt}
              />  
         
              <FeaturesBox
                features={listing.features}
               /> 
             
              <DescriptionBox
                description={listing.description}
               /> 
                <MessageInput
                 id="message"
                 label="Write a message to owner this listing"
                 disabled={isLoading}
                 register={register}
                 errors={errors}
                 required
                
                
                />
                <Button onClick={handleSubmit(onSubmit)} className=" bg-green-500 hover:bg-green-600 transition  font-bold" size='sm'  >

                Send
                </Button>
              </div>

                </div>

       
            
         
        </Container>
    )
}

export default ListingClient