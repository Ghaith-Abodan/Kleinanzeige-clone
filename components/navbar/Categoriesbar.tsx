"use client"
import { Category } from "@prisma/client"
import Container from "../Container"
import CategoriesBox from "../CategoriesBox";
import { usePathname, useSearchParams } from "next/navigation";

interface CategoriesbarProps{
  allGategories?:Category[] | null;
}
const Categoriesbar = ({
  allGategories
}:CategoriesbarProps) => {

  const params=useSearchParams();
  const category=params?.get('category');
  const pathname=usePathname();

  const ismainPage=pathname === '/';

  if(!ismainPage){
    return null;
  }
  return (
    <Container>
      <div 
        className="
         pt-4
         flex
         flex-row
         items-center
         justify-between
         overflow-x-auto
      
         ">
          {allGategories && allGategories.map((item)=>(
            <CategoriesBox
              key={item.id}
              value={item.id}
              label={item.name} 
              selected={category === item.name}
            />
          ))}  
      </div>
    </Container>
  )
}

export default Categoriesbar
