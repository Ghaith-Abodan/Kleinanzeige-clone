import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

import prisma from "@/libs/prismadb";

export async function POST(
  request: Request, 
 
) {
  try{
    const body = await request.json();
    const { 
      email,
      name,
      password,
     } = body;
  
     const existingUser=await prisma.user.findUnique({
      where:{
        email: email,
      }

     });

     if(existingUser){
     
      return new NextResponse('Invalid Email Address',{status:400})
    
     }
      const hashedPassword = await bcrypt.hash(password, 12);
  
      const user = await prisma.user.create({
       data: {
         email,
         name,
         hashedPassword,
       }
     });
   
     return NextResponse.json(user,{status:200});
     

    
  }catch(error){
    return new NextResponse("Invalid Email Please renter an new Email", { status: 500 });
  }
 
}