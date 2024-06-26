import { NextResponse } from "next/server";


import prisma from "@/libs/prismadb";

export async function POST(
  request: Request, 
) {
  const body = await request.json();
  const { 
    name,
   } = body;



   const category = await prisma.category.create({
    data: {
      name,
    }
  });

  return NextResponse.json(category);
}

