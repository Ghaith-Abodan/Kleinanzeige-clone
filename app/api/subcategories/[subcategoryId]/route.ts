import prisma from "@/libs/prismadb";

import { NextResponse } from "next/server";




export async function GET(
  request: Request,  {params}:{params:{subcategoryId:string}}
  ) {
   
  
    try{
      if(!params.subcategoryId ){
        return new NextResponse("Invalid Id", { status: 500 });
      }
      const subCategory = await prisma.subCategory.findUnique({
        where: {
          id:params.subcategoryId,
        },
        include:{
            category:true,
        }
      });
    
      return NextResponse.json(subCategory);
    }catch(error){
      return new NextResponse("Internal error", { status: 500 });
    }

  }

  export async function PATCH(
    request: Request, {params}:{params:{subcategoryId:string}}
  ) {
  
    try{
      if(!params.subcategoryId ){
        return new NextResponse("Invalid Id", { status: 500 });
      }
      const body = await request.json();
      const { 
        name,
        categoryId,
        featuresIds
       } = body;
  
     const subcategory = await prisma.subCategory.update({
      where: {
        id:params.subcategoryId,
      },
      data:{
        name,
        categoryId,
        featuresIds:featuresIds
    }})
  
    return NextResponse.json(subcategory);
    }catch(error){
      return new NextResponse("error", { status: 500 });
    }
     
  }

  export async function DELETE(
    request: Request, {params}:{params:{subcategoryId:string}}
  ) {
   
   
    try{
      if(!params.subcategoryId ){
        return new NextResponse("Invalid Id", { status: 500 });
      }
     const subcategory= await prisma.subCategory.delete({
        where: {
          id:params.subcategoryId,
        },
       
      });
      return NextResponse.json(subcategory);
    }catch(error){
      
      return new NextResponse("Internal error", { status: 500 });
    }
  
  
   
  }