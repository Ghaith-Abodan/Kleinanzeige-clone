"use client"

import { useCallback, useEffect, useState } from "react";
import { IoMdClose } from 'react-icons/io'
import Button from "../Button";
interface ModalProps{
    isOpen?: boolean;
    onClose:()=>void;
    onSubmit:()=>void;
    secondaryAction?:()=>void;
    title?:string; 
    actionLabel?:string;
    secondaryActionLabel?:string;
    disabled?:boolean;
    body?:React.ReactElement;
    footer?:React.ReactElement;
    
}
const Modal = ({
  isOpen, 
  onClose, 
  onSubmit, 
  title, 
  body, 
  actionLabel, 
  footer, 
  disabled,
  secondaryAction,
  secondaryActionLabel
}:ModalProps) => {

    const [showModal, setShowModal] = useState(isOpen);

    useEffect(()=>{
       setShowModal(isOpen); 
       
    },[isOpen])

    const handleClose=useCallback(()=>{
        if(disabled) return;

        setShowModal(false);

        setTimeout(()=>{
           onClose(); 
        },300)
    },[onClose,disabled]);

    const handleSubmit=useCallback(()=>{
        if(disabled) return;

        onSubmit();

    },[onSubmit,disabled]);

    const handleSecondaryAction=useCallback(()=>{
        if(disabled || !secondaryAction){
            return;

        }

        secondaryAction();

    },[secondaryAction,disabled]);

    if(!isOpen){
        return null;

    }


  return (
    <>
      <div
        className="
         flex
         items-center
         justify-center
         overflow-y-auto
         overflow-x-hidden
         fixed
         z-[50]
         bg-neutral-800/70
         inset-0
         outline-none
         focus:outline-none   
         
         ">
        <div 
          className="
           relative
           w-full
           md:w-4/6
           lg:w-3/6
           xl:w-2/5
           my-5
           mx-auto
           h-full
           md:h-auto
           lg:h-auto
           
           ">
           {/* content */} 
            <div 
              className={`
               translate
               duration-300
               h-full
               ${showModal 
                ? 'translate-y-0 opacity-100'
                :'translate-y-full opacity-0'}
               
               `}
                >
             <div
               className="
                 translate
                 h-full
                 w-full
                 md:h-auto
                 lg:h-auto
                 border-0
                 rounded-lg
                 shadow-lg
                 relative
                 flex
                 flex-col
                 bg-white
                 outline-none
                 focus:outline-none
                 
                 ">
                 {/* Header */} 
                 {title ?(
                    <div 
                className="
                  flex
                  items-center
                  justify-center
                  p-6
                  rounded-t
                  relative
                  border-b-[1px]
                  
                  ">
                <button 
                  className="
                    p-1
                    border-0
                    hover:opacity-70
                    transition
                    absolute
                    left-9
                    
                    "
                    onClick={handleClose}
                    >
                    <IoMdClose size={18}/>
                    </button>  

                  <div className="text-lg font-semibold">
                    {title}
                    </div>   
                </div>
                ):null}
               
                {/* body */} 
                <div className=" relative p-6 flex-auto">
                    {body}
                    </div>  
                {/* footer */} 
                  <div
                    className="flex flex-col gap-2 p-6">

                      <div 
                        className="
                        flex
                        flex-row
                        items-center
                        gap-4
                        w-full   
                        ">
                         {secondaryAction && secondaryActionLabel && (
                            <Button 
                            disabled={disabled} 
                            label={secondaryActionLabel} 
                            onClick={handleSecondaryAction}
                            outline
                            />  
                        )}
                        {actionLabel ?(  <Button 
                            disabled={disabled} 
                            label={actionLabel || ''} 
                            onClick={handleSubmit}
                        />):(null)}
                      
                        </div>  
                        {footer}
                    </div>  
                </div>     


            </div>
            </div>    
      </div>
    </>
  )
}

export default Modal
