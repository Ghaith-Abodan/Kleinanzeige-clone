import { NextResponse } from "next/server";


import prisma from "@/libs/prismadb";

export async function POST(
  request: Request, 
) {
  const body = await request.json();
  const { 
    name,
    featureValues,
   } = body;



   const feature = await prisma.featur.create({
    data: {
      name,
      value:featureValues  
    },
    
  });

  return NextResponse.json(feature);
}

