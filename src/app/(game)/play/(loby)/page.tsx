import React from 'react'

export default function page() {
  return (
    <section className='text-primary w-full lg:w-[calc(100vw-384px)] h-full flex flex-col justify-center items-center'>
      <h1 className='font-bold text-7xl sm:text-8xl lg:text-9xl uppercase mask-b-from-10'>Lathi</h1>
      <q className='lg:-mt-5 max-w-60 text-center lg:text-lg lg:max-w-2xl'>Mapan mapaning lathi, ajining diri saka obahing lathi.</q>
      
      <p className='mt-5 max-w-lg text-center text-lg hidden lg:block'>
        Selamat datang di <strong>Lathi</strong>, 
        sebuah perjalanan naratif di mana setiap kata yang Anda pilih 
        menentukan kehormatan Anda. 
        Di sini, Anda tidak hanya bermain peran, 
        tetapi juga menyelami kedalaman budaya melalui tata krama 
        dan kemurnian bahasa Krama Inggil.
      </p>
    </section>
  )
}
