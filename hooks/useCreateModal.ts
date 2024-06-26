
import { create } from "zustand";

interface CreateModalStore{
    isOpen:boolean;
    onOpen:()=>void;
    onClose:()=>void;
    subOpen:()=>void;
    featureOpen:()=>void;
    userOpen:()=>void;
    subcategory:boolean;
    feature:boolean;
    category:boolean;
    user:boolean;
}


const useCreateModal =create<CreateModalStore> ((set)=>({
isOpen:false,
feature:false,
subcategory:false,
category:false,
user:false,
userOpen:()=>set({isOpen:true,user:true}),
featureOpen:()=>set({isOpen:true,feature:true}),
subOpen:()=>set({isOpen:true,subcategory:true}),
onOpen:()=>set({isOpen:true,category:true}),
onClose:()=>set({isOpen:false,subcategory:false,feature:false,category:false,user:false}),

}));
 


export default useCreateModal
