'use client'

import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#f3f3fa] px-5 flex items-center justify-center">
      <section className="w-full max-w-lg rounded-2xl border border-[#e6e4f3] bg-white p-8 text-center shadow-[0_18px_50px_rgba(60,45,130,0.12)]">
        <p className="text-sm font-semibold text-[#5b43c2]">Shadamon Investment</p>
        <h1 className="mt-2 text-6xl font-black text-[#15151f]">404</h1>
        <h2 className="mt-2 text-xl font-bold text-[#15151f]">Page not found</h2>
        <p className="mt-2 text-sm text-[#6b6b7b]">The investment page you requested does not exist.</p>
        <Link href="/" className="mt-6 inline-flex rounded-lg bg-[#136b50] px-5 py-2.5 text-sm font-bold text-white">
          Investment Home
        </Link>
      </section>
    </main>
  )
}
