'use client'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation';
import React from 'react'

const NotFound = () => {
  const router = useRouter();
  return (
    <section className='section-wrapper flex justify-center items-center p-[6vw]'>
      <div className="wrapper flex flex-col gap-4 items-center w-full max-w-lg">
        <h1 className='text-3xl text-foreground font-bold'>Jangan tersesat..</h1>
        <p className='text-sm text-muted-foreground text-center'>Permisi, sepertinya halaman yang Anda cari tidak ada atau sudah pindah alamat.</p>
        <div className='w-full flex flex-col gap-2 relative z-0 mt-5'>
          <Button onClick={() => router.back()} variant={"secondary"}>Kembali</Button>
          <Button onClick={() => router.push("/")} >Beranda</Button>
        </div>
      </div>
    </section>
  )
}

export default NotFound