import Heading from "@/components/Heading";
import Header from "../../components/Header";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ListIcon, Users } from "lucide-react";
import { BiCategoryAlt } from "react-icons/bi";
import { BsSubtract } from "react-icons/bs";
import { PiLayoutLight } from "react-icons/pi";
import getTotalListing from "@/actions/getTotalListing";
import getTotalUsers from "@/actions/getTotalUsers";
import getTotalCategory from "@/actions/getTotalCategory";
import getTotalSubCategory from "@/actions/getTotalSubCategory";
import { OverView } from "@/components/Overview";
import { getGraphListing } from "@/actions/getGraphListing";


export default async function DashboardPage() {

  const totalListing=await getTotalListing();
  const totalUsers=await getTotalUsers();
  const totalCategory=await getTotalCategory();
  const totalSubCategory=await getTotalSubCategory();
  const graphListing=await getGraphListing();
  return (
    
    <div className="flex-col">
      <div
       className="
        flex-1
        space-y-4 p-8 pt-6
        ">
         <Heading
          title="Dashboard"
          subtitle="Overview of Kleinanzeigne"  /> 
       <Separator/>
       <div className="grid gap-4 grid-cols-4">
        <Card>
         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Listing
          </CardTitle>
          <PiLayoutLight className="h-4 w-4 text-muted-foreground "/>
          </CardHeader> 
          <CardContent>
            <div className="text-2xl font-bold">
              {totalListing}
            </div>
          </CardContent>
        </Card>

        <Card>
         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Users
          </CardTitle>
          <Users className="h-4 w-4 text-muted-foreground "/>
          </CardHeader> 
          <CardContent>
            <div className="text-2xl font-bold">
              {totalUsers}
            </div>
          </CardContent>
        </Card>

        <Card>
         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Category
          </CardTitle>
          <BiCategoryAlt className="h-4 w-4 text-muted-foreground "/>
          </CardHeader> 
          <CardContent>
            <div className="text-2xl font-bold">
              {totalCategory}
            </div>
          </CardContent>
        </Card>

        <Card>
         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total SubCategory
          </CardTitle>
          <BsSubtract className="h-4 w-4 text-muted-foreground "/>
          </CardHeader> 
          <CardContent>
            <div className="text-2xl font-bold">
              {totalSubCategory}
            </div>
          </CardContent>
        </Card>
       </div>
       <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Overview</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <OverView data={graphListing}/>
        </CardContent>
       </Card>
      </div>
    </div>
    
    
  )
}
