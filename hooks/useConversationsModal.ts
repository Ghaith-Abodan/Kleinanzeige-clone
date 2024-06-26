import { create } from "zustand";

interface ConversationsModalStore{
    isOpen:boolean;
    onOpen:()=>void;
    onClose:()=>void;
}


const useConversationsModal =create<ConversationsModalStore> ((set)=>({
isOpen:false,
onOpen:()=>set({isOpen:true}),
onClose:()=>set({isOpen:false}),
}));
 


export default useConversationsModal
