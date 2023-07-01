import React, { Suspense } from 'react'
import Navbar from './layout/Navbar'
import Footer from './layout/Footer'
import { Outlet } from 'react-router-dom'
import Spinner from './layout/Spinner'

const RootLayout = () => {
  return (
    <div className="flex flex-col justify-between h-screen">
      <Navbar />
      <main className="px-5">
        <Suspense fallback={<Spinner />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}

export default RootLayout
