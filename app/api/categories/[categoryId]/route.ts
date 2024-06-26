import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";


export async function GET(
  request: Request,  {params}:{params:{categoryId:string}}
  ) {
   
  
    try{
      if(!params.categoryId ){
        return new NextResponse("Invalid Id", { status: 500 });
      }
      const category = await prisma.category.findUnique({
        where: {
          id:params.categoryId,
        }
      });
    
      return NextResponse.json(category);
    }catch(error){
      return new NextResponse("Internal error", { status: 500 });
    }

  }

  export async function PATCH(
    request: Request, {params}:{params:{categoryId:string}}
  ) {
  
    try{
      if(!params.categoryId ){
        return new NextResponse("Invalid Id", { status: 500 });
      }
      const body = await request.json();

      const {name}=body;
     const category = await prisma.category.update({
      where: {
        id:params.categoryId,
      },
      data:{
        name
      }
    });
  
    return NextResponse.json(category);
    }catch(error){
      return new NextResponse("Internal error", { status: 500 });
    }
     
  }

  export async function DELETE(
    request: Request, {params}:{params:{categoryId:string}}
  ) {
   
   
    try{
      if(!params.categoryId ){
        return new NextResponse("Invalid Id", { status: 500 });
      }
     const category= await prisma.category.delete({
        where: {
          id:params.categoryId,
        },
       
      });
      return NextResponse.json(category);
    }catch(error){
      console.log(error);
      return new NextResponse("Internal error", { status: 500 });
    }
  
  
   
  }