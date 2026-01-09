import React from 'react'

export default function RulesPage() {
  return (
   <section className='pt-10 lg:pt-40 p-[5vw] w-full h-fit flex flex-col items-center lg:items-start xl:items-center gap-15'>
      <h1 className='font-extrabold text-3xl lg:text-5xl xl:text-center text-secondary w-fit bg-primary px-5 py-3 rounded-xl -rotate-3 shadow-xl shadow-accent-foreground'>Panduan & Aturan</h1>
      
      {/* description */}
      <p className='text-lg indent-5 w-full'>
         Selamat datang di lobi utama <strong>Lathi</strong>. Sebelum Anda memulai perjalanan naratif (<strong>Lakon</strong>), 
         mohon dipahami panduan dan tata tertib berikut demi kelancaran pengalaman belajar dan bermain Anda.
      </p>

      <ol className='list-decimal w-full flex flex-col gap-5 text-lg px-5'>
         <li className='font-bold'> Mekanisme Utama Permainan
            <ol className='font-normal list-disc pl-5'>
               <li>Permainan ini berbasis <i>Visual Novel</i> di mana Anda akan menghadapi berbagai skenario percakapan dalam budaya Jawa.</li>
               <li>Sistem pilihan telah terletak di setiap titip krusial. Anda akan diberikan beberapa pilihan jawaban. Ketepatan Anda akan menentukan arah cerita dan nasib hubungan Anda dengan tokoh lain dan akhir dari cerita dalam Bagian/<i>Chapter</i> itu sendiri.</li>
               <li>Indikator suasana hati lawan bicara berpengaruh terhadap &quot;nyawa&quot; Anda. Keberhasilan Anda diukur melalui <i>Mood Meter</i> atau <i>Manah.</i> Setiap kesalahan dalam pemilihan kata yang kurang sesuai dengan <i>unggah-ungguh</i> akan mengurangi poin <i>Manah</i> Anda.</li>
               <li>Jika jumlah <i>Manah</i> mencapai angka nol atau habis, maka <strong>Lakon</strong> akan terhenti. Anda diwajibkan mengulang bab <i>(Chapter)</i> tersebut dari awal.</li>
            </ol>
         </li>
         <li className='font-bold'> Fitur Edukasi & Koleksi
            <ol className='font-normal list-disc pl-5'>
               <li>Selama permainan, Anda dapat mengakses pintasan kamus kosakata <i>(Bausastra Saku)</i> yang merupakan daftar arti kata sulit pada dialog saat itu dalam tingkatan <i>Ngoko, Krama</i> hingga <i>Bahasa Indonesia</i>. Pintasan terletak pada kanan layar.</li>
               <li>Setiap kosakata baru yang Anda temukan akan di dalam cerita akan otomatis tersimpan dalam menu <strong>Koleksi Kata</strong> di akun Anda yang telah terdaftar dan terverfikasi. <strong>Koleksi Kata</strong> adalah <i>Bausastra Saku</i> yang dapat menjadi penolong Anda ketika masuk ke dalam permainan dan menemukan kata sulit.</li>
               <li>Poin, status, dan <i>badge</i> yang Anda dapatkan dari ketepatan berbahasa dan kelengkapan cerita akan diakumulasikan untuk menentukan posisi Anda dalam <strong>Papan Peringkat</strong> <i>(Leaderboard)</i> bersama dengan pemain lain yang akan diperbarui setiap 6 jam sekali.</li>
            </ol>
         </li>
         <li className='font-bold'> Aturan & Etika Bermain
            <ol className='font-normal list-disc pl-5'>
               <li><strong>Lathi</strong> bukan hanya sekadar permainan pilihan ganda. Anda diharapkan memahami konteks kepada siapa Anda berbicara (lawan bicara) agar norma kesopanan dan budaya tetap terjaga, sehingga Anda bisa berhasil melalui cerita tersebut dengan baik.</li>
               <li>Perihal integritas data, <strong>Dilarang</strong> menggunakan pihak ketiga untuk memanipulasi skor atau membukan bab cerita <i>(Chapter)</i> secara ilegal. Hargai lawan Anda dan budaya yang sepantasnya mendapatkan kehormatan.</li>
               <li>Sistem melakukan penyimpana otomatis <i>(auto-save)</i> di setiap <i>slide</i> percakapan. Pastikan Anda masuk <i>(Log In)</i> agar data progres Anda tersimpan.</li>
            </ol>
         </li>
         <li className='font-bold'> Kendali Antarmuka <i>(User Interface)</i>
            <ol className='font-normal list-disc pl-5'>
               <li>Gunakan fitur <strong>Log</strong> untuk membaca kembali riwayat percakapan sebelumnya jika Anda kehilangan konteks cerita.</li>
               <li>Fitur <strong>Auto</strong> membantu proses dialog Anda berjalan otomatis tanpa perlu menekan tombol navigasi <i>Lanjut</i>.</li>
               <li>Gunakan menu yang berada di pojok kanan atas layar untuk mengakses pengaturan suara atau kembali ke lobi utama.</li>
            </ol>
         </li>
      </ol>

      <q className='font-bold text-center px-5 text-lg italic'>Ajining diri saka ing Lathi, ajining raga saka busana</q>
      <p className='text-lg text-center'>Selamat menjaga amanah bahasa dan memenangkan hati lawan bicara.</p>
   </section>
  )
}
