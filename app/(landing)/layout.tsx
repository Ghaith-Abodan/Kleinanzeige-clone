import Navbar from '@/components/navbar/Navbar'
import '../globals.css'
import type { Metadata } from 'next'


import getCurrentUser from '@/actions/getCurrentUser'
import getAllGategories from '@/actions/getAllGategories'
import PostModal from '@/components/modals/PostModal'
import getAllSubcategories from '@/actions/getAllSubcategories'
import getAllFeatures from '@/actions/getAllFeatures'
import ClientOnly from '@/components/ClientOnly'
import ProfileModal from '@/components/modals/ProfileModal'
import ConversationsModal from '@/components/modals/ConversationsModal'
import getConversations from '@/actions/getConversations'
import MessagesModal from '@/components/modals/MessagesModal'




export const metadata: Metadata = {
  title: 'Kleinanzeige',
  description: 'Kleinanzeige clone',
}

export default async function LandingLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const currentUser=await getCurrentUser();
  const gategories=await getAllGategories();
  const subCategoires=await getAllSubcategories();
  const allFeatures=await getAllFeatures();
  const conversations=await getConversations(currentUser?.id);

  return (
        <main >
          <ClientOnly>
          <PostModal
           categories={gategories}
           subCategories={subCategoires}
           allFeatures={allFeatures!}/>
        <ProfileModal currentUser={currentUser}/>
       
        <ConversationsModal
         conversations={conversations}
         currentUser={currentUser}    
        />
    
       <MessagesModal
        currentUser={currentUser}/>
        <Navbar currentUser={currentUser} allGategories={gategories}/>
        </ClientOnly>
        <div className='pt-28 pb-20'>
        {children}
        </div>
        
        </main>
  )
}
