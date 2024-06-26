
interface SearchInputProps{
    value: string;
    label:string;
    onChange:(value:string)=>void;

}

const SearchInput = ({
    value,
    label,
    onChange,
   
}:SearchInputProps) => {

  return (
    <div 
    className="w-full relative">
    <input
       value={value}
       onChange={(e)=>onChange(e.target.value)} 
       placeholder=" "
       className={`
       peer
       w-full
       p-4
       pt-6
       font-medium
       bg-white
       border-2
       rounded-md
       outline-none
       transition
       disabled:opacity-70
       disabled:cursor-not-allowed
       `}
       
       />
    
       <label
         className={`
         absolute
         text-neutral-300
         text-md
         duration-150
         transform
         -translate-y-3
         top-5
         left-3
         z-10
         origin-[0]
         peer-placeholder-shown:scale-100 
         peer-placeholder-shown:translate-y-0 
         peer-focus:scale-75
         peer-focus:-translate-y-4
       
        
         `}
         

             >
        {label}
       </label>
    </div>
  )
}

export default SearchInput