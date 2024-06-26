import { create } from "zustand";

interface RemoveModalStore{
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


const useRemoveModal =create<RemoveModalStore> ((set)=>({
isOpen:false,
subCategory:false,
feature:false,
category:false,
user:false,
id:undefined,
onSubCategory:(id:string)=>set({isOpen:true,id:id,subCategory:true}),
onCategory:(id:string)=>set({isOpen:true , id:id, category:true}),
onFeature:(id:string)=>set({isOpen:true , id:id, feature:true}),
onUser:(id:string)=>set({isOpen:true,id:id,user:true}),
onClose:()=>set({isOpen:false,id:undefined,subCategory:false,feature:false,category:false}),
}));
 


export default useRemoveModal
