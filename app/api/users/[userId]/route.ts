

import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
import  bcrypt  from 'bcrypt';

export async function PATCH(
    request: Request, {params}:{params:{userId:string}}
  ) {
     
    try{
      if(!params.userId ){
        return new NextResponse("Invalid Id", { status: 500 });
      }
      
      const body = await request.json();

      const {name,password,image,isAdmin,isActive}=body;

      if(body.hasOwnProperty('isAdmin')){

        
        const user = await prisma.user.update({
          where: {
            id:params.userId,
          },
          data:{
            active:isActive,
            role:isAdmin? 'admin' :'user',
            
          }
        });
        return NextResponse.json(user);
      
      }
      if(password!=='' && image!==''){
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await prisma.user.update({
            where: {
              id:params.userId,
            },
            data:{
              name,
              hashedPassword:hashedPassword,
              image
            }
          });
          return NextResponse.json(user);
      }else{
        const user = await prisma.user.update({
            where: {
              id:params.userId,
            },
            data:{
              name,
            }
          });
          return NextResponse.json(user);
      }
      

      
  
    
}catch(error){
  return new NextResponse("Internal error", { status: 500 });
}
 
}

export async function GET(
  request: Request, {params}:{params:{userId:string}}
) {
   
  try{
    if(!params.userId ){
      return new NextResponse("Invalid Id", { status: 500 });
    }
   

      const user = await prisma.user.findUnique({
          where: {
            id:params.userId,
          },
         
        });
        return NextResponse.json(user);
    }catch(error){
    return new NextResponse("Internal error", { status: 500 });
}

}
export async function DELETE(
  request: Request, {params}:{params:{userId:string}}
) {
   
  try{
    if(!params.userId ){
      return new NextResponse("Invalid Id", { status: 500 });
    }
   

       const user=  await prisma.user.delete({
          where: {
            id:params.userId,
          },
         
        });
        return NextResponse.json(user);
    }catch(error){
    return new NextResponse("Internal error", { status: 500 });
}

}
