"use client"

import Link from "next/link"

function HomePage() {
  return (
    <div>
      <h1>Welcome to the home page</h1>
      <Link href='/profile'>Profile</Link>
    </div>
  )
}

export default HomePage