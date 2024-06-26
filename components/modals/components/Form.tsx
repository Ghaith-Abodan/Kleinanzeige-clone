'use client';

import { 
  HiPaperAirplane, 
  HiPhoto
} from "react-icons/hi2";
import MessageInput from "./MessageInput";
import { 
  FieldValues, 
  SubmitHandler, 
  useForm 
} from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import useMessagesModal from "@/hooks/useMessagesModal";
import toast from "react-hot-toast";



interface FormProps{
  conversationId: string;
}

const Form = ({
  conversationId
}: FormProps) => {
  
  const router=useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: {
      errors,
    }
  } = useForm<FieldValues>({
    defaultValues: {
      message: ''
    }
  });
  const messagesModal=useMessagesModal();
  const onSubmit: SubmitHandler<FieldValues> =async (data) => {
    
    setValue('message','',{shouldValidate: true});

  await axios.post('/api/messages',{
    ...data,
    conversationId
   })
   .then(async()=>{

    const conversationData= await axios.get(`/api/conversations/${conversationId}`)
    .then((data)=>{
      messagesModal.onRefersh(data.data)
    })
    .catch((error:any)=>{
      toast.error(error);
    })
   })
  }

  

  return ( 
    <div 
      className="
        py-4 
    
        bg-white 
        border-t 
        flex 
        items-center 
        gap-2 
        lg:gap-4 
        w-full
      "
    >
     
      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className="flex items-center gap-2  w-full"
      >
        <MessageInput 
          id="message" 
          register={register} 
          errors={errors} 
          required 
          placeholder="Write a message"
        />
        <button 
          type="submit" 
          className="
            rounded-full 
            p-2 
            bg-green-500 
            cursor-pointer 
            hover:bg-green-600 
            transition
          "
        >
          <HiPaperAirplane
            size={18}
            className="text-white"
          />
        </button>
      </form>
    </div>
  );
}
 
export default Form;