
interface SubCategoryInputProps{
    id:string;
    label:string;
    onClick:(value:string)=>void;
    selected?:boolean;
}

const SubCategoryInput = ({
    id,
    label,
    onClick,
    selected,
}:SubCategoryInputProps) => {

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

export default SubCategoryInput
