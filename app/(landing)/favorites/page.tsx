import getCurrentUser from "@/actions/getCurrentUser";
import getFavoriteListings from "@/actions/getFavoriteListings"
import ClientOnly from "@/components/ClientOnly"
import EmptyState from "@/components/EmptyState"
import FavoritesClient from "./FavoritesClient";
import Heading from "@/components/Heading";

const FavoritesPage=async ()=>{

    const listings=await getFavoriteListings();
    const currentUser=await getCurrentUser();

    if(listings.length === 0){
        return(
            <ClientOnly>
             <EmptyState
               title="No Conversations founded"
               subtitle="it likes you don't have any Messages" 
            
             />
            </ClientOnly>
               )
    }

   return(
    
    <ClientOnly>
        <FavoritesClient
         listings={listings}
         currentUser={currentUser}
        />
    </ClientOnly>
   )
 
}

export default FavoritesPage