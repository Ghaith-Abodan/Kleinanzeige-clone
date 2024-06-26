
import { GiPositionMarker } from "react-icons/gi";
import {CgCalendarDates} from "react-icons/cg"
import { format } from "date-fns";


interface ListingHeadProps{
    title:string;
    imagesSrc:string[];
    city:string;
    area:string;
    postCode:string;
    price:number;
    fixedPrice:string;
    createdAt:Date;

}

const ListingHead=({
    title,
    city,
    area,
    postCode,
    price,
    fixedPrice,
    createdAt
  
}:ListingHeadProps)=>{
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
  
   <div className=" mb-2 font-semibold text-2xl">
 {title}

   </div>
   <div className=" mb-2 font-bold text-xl text-green-500 ">
      {price} €  {fixedPrice} 
   </div>

   <div className=" flex flex-row items-center gap-2">

    <GiPositionMarker color="red" />
    <div className="">
    {`${city}-${area}-${postCode}`}
    </div>

    </div>      
        
    <div className=" flex flex-row items-center gap-2">
     <CgCalendarDates color="blue"/>
     <div>
        {format(createdAt,'MMMM do yyyy')}
        </div>   
    </div>    
  
   
</div>
       
     
   
    )
}

export default ListingHead