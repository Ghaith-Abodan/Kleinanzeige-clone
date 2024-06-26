
interface CategoryInputProps{
    id:string;
    label:string;
    onClick:(value:string)=>void;
    selected?:boolean;
}

const CategoryInput = ({
    id,
    label,
    onClick,
    selected,
}:CategoryInputProps) => {

  return (
    <div
     onClick={()=>onClick(id)}
     className={`
     rounded-md
     border-2
     p-4
     flex
     justify-start
     font-semibold   
     gap-2
     hover:border-black
     transition
     cursor-pointer
     ${selected ? 'border-black':'border-neutral-200'}
     
     `}
      
    >
    
      {label}
    </div>
  )
}

export default CategoryInput
