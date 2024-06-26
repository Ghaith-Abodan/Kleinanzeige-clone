
import getCurrentUser from "@/actions/getCurrentUser";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function DELETE(
    request: Request, {params}:{params:{listingId:string}}
  ) {
   
    const currentUser=await getCurrentUser();

    if(!currentUser){
        return NextResponse.error();
    }
   
    try{
      if(!params.listingId || typeof params.listingId !== "string"){
        return new NextResponse("Invalid Id", { status: 500 });
      }
     const listing= await prisma.listing.deleteMany({
        where: {
          id:params.listingId,
          userId:currentUser.id
        },
       
      });
      return NextResponse.json(listing);
    }catch(error){
     
      return new NextResponse("Internal error", { status: 500 });
    }
  
  
   
  }