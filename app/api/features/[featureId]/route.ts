import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";


export async function GET(
  request: Request,  {params}:{params:{featureId:string}}
  ) {
   
  
    try{
      if(!params.featureId ){
        return new NextResponse("Invalid Id", { status: 500 });
      }
      const feature = await prisma.featur.findUnique({
        where: {
          id:params.featureId,
        }
      });
    
      return NextResponse.json(feature);
    }catch(error){
      return new NextResponse("Internal error", { status: 500 });
    }

  }

  export async function PATCH(
    request: Request, {params}:{params:{featureId:string}}
  ) {
  
    try{
      if(!params.featureId ){
        return new NextResponse("Invalid Id", { status: 500 });
      }
      const body = await request.json();

      const {name,featureValues}=body;

      const feature = await prisma.featur.update({
      where: {
        id:params.featureId,
      },
      data:{
        name,
        value:featureValues
      }
    });
  
    return NextResponse.json(feature);
    }catch(error){
      return new NextResponse("Internal error", { status: 500 });
    }
     
  }

  export async function DELETE(
    request: Request, {params}:{params:{featureId:string}}
  ) {
   
   
    try{
      if(!params.featureId ){
        return new NextResponse("Invalid Id", { status: 500 });
      }
     const feature= await prisma.featur.delete({
        where: {
          id:params.featureId,
        },
       
      });
      return NextResponse.json(feature);
    }catch(error){
     
      return new NextResponse("Internal error", { status: 500 });
    }
  
  
   
  }
