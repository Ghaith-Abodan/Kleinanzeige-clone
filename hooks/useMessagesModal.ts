import { create } from "zustand";

interface MessagesModalStore{
    isOpen:boolean;
    onOpen:(conversationData:any)=>void;
    onClose:()=>void;
    onRefersh:(conversationData:any)=>void;
    id?:string;
    conversationData:any;
    
}


const useMessagesModal =create<MessagesModalStore> ((set)=>({
    
isOpen:false,
conversationData:undefined,
onOpen:(conversationData:any)=>set({isOpen:true,conversationData:conversationData}),
onClose:()=>set({isOpen:false,conversationData:undefined}),
onRefersh:(conversationData:any)=>set({isOpen:true,conversationData:conversationData}),
}));
 


export default useMessagesModal
