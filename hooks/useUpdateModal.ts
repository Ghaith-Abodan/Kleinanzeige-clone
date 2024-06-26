import { create } from "zustand";

interface UpdateModalStore{
    isOpen:boolean;
    onCategory:(id:string)=>void;
    onClose:()=>void;
    onSubCategory:(id:string)=>void;
    onFeature:(id:string)=>void;
    onUser:(id:string)=>void;
    id?:string;
    subCategory:boolean;
    category:boolean;
    feature:boolean;
    user:boolean;
}


const useUpdateModal =create<UpdateModalStore> ((set)=>({
isOpen:false,
id:undefined,
subCategory:false,
category:false,
feature:false,
user:false,
onUser:(id:string)=>set({isOpen:true,id:id,user:true}),
onCategory:(id:string)=>set({isOpen:true , id:id, category:true}),
onSubCategory:(id:string)=>set({isOpen:true,id:id,subCategory:true}),
onFeature:(id:string)=>set({isOpen:true,id:id,feature:true}),
onClose:()=>
set({isOpen:false,id:undefined,subCategory:false,category:false,feature:false,user:false}),
}));
 


export default useUpdateModal
