import  prisma  from '@/libs/prismadb';
interface GraphData{
    name:string;
    total:number;
}

export const getGraphListing=async()=>{

    const listings=await prisma.listing.findMany({
        include:{
            user:true
        }
    });

    const monthlyCount:{[key:number]:number}={};

    for (const listing of listings ){
        const month=listing.createdAt.getMonth();
        let revenueForListing=0;

       
        revenueForListing+=listing.price;
        monthlyCount[month]=(monthlyCount[month] || 0)+ revenueForListing;
    }
    const graphData:GraphData[]=[
        {name:"Jan",total:0},
        {name:"Feb",total:0},
        {name:"Mar",total:0},
        {name:"Apr",total:0},
        {name:"May",total:0},
        {name:"Jun",total:0},
        {name:"Jul",total:0},
        {name:"Aug",total:0},
        {name:"Sep",total:0},
        {name:"Oct",total:0},
        {name:"Nov",total:0},
        {name:"Dec",total:0},
    ];
    
    for (const month in monthlyCount){
        graphData[parseInt(month)].total=monthlyCount[parseInt(month)];
    }
    
    return graphData;
}

