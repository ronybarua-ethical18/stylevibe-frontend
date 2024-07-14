import type { Metadata } from 'next'
import { getServerSession } from 'next-auth/next'
import Providers from '@/lib/Providers'
import SessionProvider from './components/SessionProvider'
import './globals.css'
import AntRegistryProvider from '@/lib/AntRegistryProvider'
import { PropsWithChildren } from 'react'

export const metadata: Metadata = {
  title: 'Home | Style Vibe',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: PropsWithChildren) {
  const session = await getServerSession()

  return (
    <html lang="en">
      <body>
        <Providers>
          <SessionProvider session={session}>
            <AntRegistryProvider>{children}</AntRegistryProvider>
          </SessionProvider>
        </Providers>
      </body>
    </html>
  )
}