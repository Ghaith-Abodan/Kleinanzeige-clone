import { NextResponse } from "next/server";


import prisma from "@/libs/prismadb";
import getCurrentUser from "@/actions/getCurrentUser";

export async function POST(
  request: Request, 
) {

  const currentUser=await getCurrentUser();

  if(!currentUser){
    return NextResponse.error();
  }
  const body = await request.json();
  const { 
    categoryId,
    subCategoryId,
    city,
    area,
    postcode,
    features,
    imagesSrc,
    price,
    title,
    description,
    fixedPrice,
   } = body;


   Object.keys(body).forEach((value:any)=>{
    if(!body[value]){
        console.log('fehler')
        NextResponse.error();
    }
   })
   const listing = await prisma.listing.create({
    data: {
        categoryId,
        subCategoryId,
        city,
        area,
        postcode,
        features,
        imagesSrc,
        price:parseInt(price,10),
        title,
        description,
        fixedPrice,
        userId:currentUser.id
    }
  });

  return NextResponse.json(listing);
}

