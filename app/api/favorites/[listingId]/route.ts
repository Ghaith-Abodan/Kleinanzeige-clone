import getCurrentUser from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";



export async function POST(
    request: Request,
    {params}:{params:{listingId:string}}
){

    const currentUser=await getCurrentUser();

    if(!currentUser){
        return NextResponse.error();
    }

    if(!params.listingId || typeof params.listingId !== "string"){
        throw new Error('Invalid ID');
    }

    let favoriteIds=[...(currentUser.favoriteIds || [])];

    favoriteIds.push(params.listingId);

    const user=await prisma?.user.update({
        where:{
            id:currentUser.id
        },
        data:{
            favoriteIds
        }
    });

    return NextResponse.json(user);
}

export async function DELETE(
    request:Request,
    {params}:{params:{listingId:string}}){
    
        const currentUser=await getCurrentUser();

        if(!currentUser){
            return NextResponse.error();
        }
 
        if(!params.listingId || typeof params.listingId !== "string"){
            throw new Error('Invalid ID');
        }

        let favoriteIds=[...(currentUser.favoriteIds) || []];

        favoriteIds=favoriteIds.filter((id)=>id !== params.listingId);

        const user=await prisma?.user.update({
            where:{
                id:currentUser.id
            },
            data:{
                favoriteIds
            }
        });

        return NextResponse.json(user);
}
