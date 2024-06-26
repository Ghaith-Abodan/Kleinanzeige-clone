import { Prisma } from "@prisma/client";

interface FeaturesBoxProps{
    features:Prisma.JsonValue[] ;
}


const FeaturesBox=({
    features
}:FeaturesBoxProps)=>{
    return(
        <div 
        className="
         bg-white-100
         border-[2px]
         border-neutral-200
         shadow-sm
         rounded-lg
         opacity-90
         flex
         flex-col
         gap-2 
         px-6
         py-4
        
                   
       ">
       {features.map((feature:any)=>(
        <div key={feature?.name} className=" flex items-center gap-2">
           <span className=" text-md">{feature.name}:</span> 
           <span className=" text-sm text-neutral-400 ">{feature.value}</span> 
        </div>
       ))} 

       </div> 
    )
}

export default FeaturesBox