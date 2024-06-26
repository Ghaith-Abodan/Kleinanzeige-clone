import Navbar from '@/components/navbar/Navbar'
import './globals.css'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import ToasterProvider from '@/providers/ToasterProvider'
import RegisterModal from '@/components/modals/RegisterModal'
import LoginModal from '@/components/modals/LoginModal'
import ClientOnly from '@/components/ClientOnly'
import SearchModal from '@/components/modals/SearchModal'
import ProfileModal from '@/components/modals/ProfileModal'


const font = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Kleinanzeige',
  description: 'Kleinanzeige clone',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

 

  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
        <ToasterProvider/>
         <SearchModal/> 
        
        <RegisterModal/>
        <LoginModal/>
        </ClientOnly>
        {children}
      </body>
    </html>
  )
}
