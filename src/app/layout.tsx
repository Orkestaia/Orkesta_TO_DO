import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Sidebar } from '@/components/layout/Sidebar'
import { getProjectsConfig } from '@/actions/projects'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Orkesta To Do',
  description: 'Personal Management System',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const projects = await getProjectsConfig()

  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-neutral-950 text-neutral-100 flex h-screen overflow-hidden`}>
        <Sidebar projects={projects} />
        <main className="flex-1 ml-64 overflow-y-auto p-8 relative">
          {children}
        </main>
      </body>
    </html>
  )
}
