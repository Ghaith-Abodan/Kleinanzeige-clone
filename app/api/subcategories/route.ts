import { NextResponse } from "next/server";


import prisma from "@/libs/prismadb";

export async function POST(
  request: Request, 
) {
  const body = await request.json();
  const { 
    name,
    categoryId,
    featuresIds
   } = body;



   const subCategory = await prisma.subCategory.create({
    data: {
      name,
      categoryId,
      featuresIds:featuresIds
    }
  });

  return NextResponse.json(subCategory);
}

