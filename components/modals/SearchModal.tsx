"use client"

import qs from "query-string";
import useSearchModal from "@/hooks/useSearchModal";
import Modal from "./Modal";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import Heading from "../Heading";

import SearchInput from "../inputs/SearchInput";

enum STEPS{
    TITLE=0,
    LOCATION=1,
}
const SearchModal=()=>{
    const router=useRouter();
    const params=useSearchParams();

    const [step,setStep]=useState(STEPS.TITLE);
    const [title,setTitle]=useState('');
    const [city,setCity]=useState('');
    const [area,setArea]=useState('');
    const [postCode,setPostCode]=useState('');

    const searchModal=useSearchModal();

    
    const onBack=useCallback(()=>{
        setStep((value)=> value - 1)
    },[]) ;

    const onNext=useCallback(()=>{
        setStep((value)=> value + 1)
    },[])

    const onSubmit=useCallback(async()=>{
        if(step!== STEPS.LOCATION){
            return onNext();
        }

        let currentQuery={};
        if(params){
            currentQuery=qs.parse(params.toString());

        }

        const updateQuery:any={
            ...currentQuery,
            title,
            city,
            area,
            postCode,
        }

        const url=qs.stringifyUrl({
            url:'/',
            query:updateQuery
        },{skipNull:true});

        setStep(STEPS.TITLE);

        searchModal.onClose();

        router.push(url);

    },[area, city, onNext, params, postCode, router, searchModal, step, title]);

    const actionLabel=useMemo(()=>{
        if(step===STEPS.LOCATION){
            return 'Search';
        }

        return 'Next'
    },[step]);

    const secodaryActionLabel=useMemo(()=>{
        if(step===STEPS.TITLE){
            return undefined;
        }

        return 'Back'
    },[step]);


     let bodyContent=(
        <div className=" flex flex-col gap-8">
            <Heading
             title="What do you search for?"
             subtitle="Enter the title of the search"

            />

          <SearchInput
        
           label="Title"
           value={title}
           onChange={(value)=> setTitle(value)} 
          
          />

        </div>
     )

     if(step ===STEPS.LOCATION){
        bodyContent=(
            <div className=" flex flex-col gap-8">
               <Heading
                title="Where do you search ?"
                subtitle="Enter the Place of your search"
               />    

        <SearchInput
        
        label="City"
        value={city}
        onChange={(value)=> setCity(value)} 
       
       />
           <SearchInput
        
        label="Area"
        value={area}
        onChange={(value)=> setArea(value)} 
       
       />
            <SearchInput
        
        label="Postcode"
        value={postCode}
        onChange={(value)=> setPostCode(value)} 
       
       />
 

            </div>
        )
     }
    return(

    <Modal
    isOpen={searchModal.isOpen}
    onClose={searchModal.onClose}
    onSubmit={onSubmit}
    title="Filters"
    actionLabel={actionLabel}
    secondaryAction={step === STEPS.TITLE ? undefined : onBack}
    secondaryActionLabel={secodaryActionLabel} 
    body={bodyContent} 
                
    />
    )
}

export default SearchModal;