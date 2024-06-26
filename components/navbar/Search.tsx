"use client"
import useSearchModal from '@/hooks/useSearchModal'
import { Categories } from '@prisma/client';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import {BiSearch } from 'react-icons/bi'

interface SearchProps{
  allGategories:Categories [];
}
const Search = ({
  allGategories,
}:SearchProps) => {

  const searchModal=useSearchModal();
  const params=useSearchParams();
  
  const category=params?.get('category');
  const title=params?.get('title');
  const city=params?.get('city');
 
  const categoryLabel=useMemo(()=>{
    if(category){
      let categoryName=allGategories.find((item)=>item.id===category)?.name
      return categoryName
    }

    return 'Category'
  },[allGategories, category])

  const titleLabel=useMemo(()=>{
    if(title){
      return title
    }

    return 'Anything'
  },[title])

  const cityLabel=useMemo(()=>{
    if(city){
      return city
    }

    return 'Anywhere'
  },[city])

  return (
    <div
     onClick={searchModal.onOpen}  
     className="
      border-[1px]
      w-full
      md:w-auto
      py-2
      rounded-full
      shadow-sm
      hover:shadow-md
      transition
      cursor-pointer
     ">
      <div className="flex flex-row items-center justify-between">
        <div 
           className="
            text-sm
            font-semibold
            px-6
            
            ">
             {categoryLabel}   
        </div>

        <div 
          className="
          hidden
          sm:block
          text-sm
          font-semibold
          px-6
          border-x-[1px]
          flex-1
          text-center       
          ">
           {titleLabel} 

        </div>

        <div 
          className="
           text-sm
           pl-6
           pr-2
           text-gray-600
           flex
           flex-row
           items-center
           gap-3  
           ">

           <div className="hidden sm:block">
           {cityLabel}
            </div> 
            <div className="p-2 bg-green-500 rounded-full text-white">
            <BiSearch size={18}/>
            </div>
        </div>

      </div>
    </div>
  )
}

export default Search
