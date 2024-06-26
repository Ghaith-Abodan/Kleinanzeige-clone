
import '../globals.css'
import type { Metadata } from 'next'
import getCurrentUser from '@/actions/getCurrentUser'
import Sidebar from './components/Sidebar'
import Header from './components/Header'


import RemoveModal from '@/components/modals/RemoveModal'
import getAllGategories from '@/actions/getAllGategories'
import CreateModal from '@/components/modals/CreateModal'
import UpdateModal from '@/components/modals/UpdateModal'
import getAllFeatures from '@/actions/getAllFeatures'
import ClientOnly from '@/components/ClientOnly'
import { useRouter } from 'next/navigation'
import EmptyState from '@/components/EmptyState'



export const metadata: Metadata = {
  title: 'Kleinanzeige',
  description: 'Kleinanzeige clone',
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
 
  const currentUser=await getCurrentUser();
  const allCategories=await getAllGategories();
  const allfeatures=await getAllFeatures();

  if(currentUser?.role!=='admin'){
    return (
      <ClientOnly>
             <EmptyState
               title="No Access"
               subtitle="it looks like you don't have permission" 
            
             />
            </ClientOnly>
    )
    
  }
  return (
    <ClientOnly>
   <div className='h-full relative'>
    <div 
      className='
       hidden
       h-full
       md:flex
       md:w-72
       md:flex-col
       md:fixed
       md:inset-y-0
       z-80
      
       
       '>
        
     <Sidebar/>
    </div>
    <main className='md:pl-72'>
      <CreateModal allGategories={allCategories} allFeatures={allfeatures!}/>
      <UpdateModal allGategories={allCategories} allFeatures={allfeatures!}/>
      <RemoveModal/>
     
      <Header currentUser={currentUser}/>
      {children}
    </main>
   </div>
   </ClientOnly>
  )
}
