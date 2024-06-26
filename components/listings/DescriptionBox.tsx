
interface DescriptionBoxProps{
    description:string;
}

const DescriptionBox=({
    description 
}:DescriptionBoxProps)=>{
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
        <div className=" text-md">
            Description
        </div>
        <p className=" text-neutral-400 text-sm leading-5">
            {description}
        </p>
        </div>
    )
}
export default DescriptionBox;