"use client"
import { useRouter } from "next/navigation";
import Modal from "./Modal"
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Heading from "../Heading";

import useRemoveModal from "@/hooks/useRemoveModal";



const RemoveModal = () => {

    const router=useRouter();
    const removeModal=useRemoveModal();
    const [isLoading,setIsLoading]=useState(false);
    

   

      const onConfirm=async()=>{

        if(removeModal.id !== undefined)
        {
            try{
                setIsLoading(true);
                if(removeModal.subCategory){
                  await axios.delete(`/api/subcategories/${removeModal.id}`)
                  .then(()=>{
                    router.refresh();
                  })
                }else if(removeModal.category){
                  await axios.delete(`/api/categories/${removeModal.id}`)
                  .then(()=>{
                    router.refresh();
                  })
                }else if(removeModal.feature){
                  await axios.delete(`/api/features/${removeModal.id}`)
                  .then(()=>{
                    router.refresh();
                  })
                }else if(removeModal.user){
                  await axios.delete(`/api/users/${removeModal.id}`)
                  .then(()=>{
                    router.refresh();
                  })
                }
        
                setIsLoading(false);
                toast.success('Deleted successfully');
             
                removeModal.onClose();
              } catch(error:any){
                toast.error(error.message);
              }  
              finally{
                setIsLoading(false);
              } 
        }
      
       
  
          }
      
          
      
  
        const bodyContent = (
          <div className="flex flex-col gap-4">
            <Heading
              title='Are you sure?'
              subtitle='This action cannot be undone.'
            />
          </div>
        )
  
        
  
    return (
      <Modal
      disabled={isLoading}
      isOpen={removeModal.isOpen}
      title='Removing'
      actionLabel='Delete'
      onClose={removeModal.onClose}
      onSubmit={onConfirm}
      body={bodyContent}
    
      />
      
   
  )
}

export default RemoveModal
