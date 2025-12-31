import Navbar from '@/components/Navbar'
import React from 'react'

export default function LandingPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}
