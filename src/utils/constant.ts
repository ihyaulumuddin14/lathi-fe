import { Chapter, Slide, Session } from "@/schema/GameSchema"

export const userDummy = {
  id: "234235",
  username: "ulum",
  email: "ulum@gmail.com"
}

export const accessTokenDummy = "fgsdfgsdg3425"

export const chaptersDummy = [
   {
      id: "018e3a2d-9b1e-7b1e-8b1e-1b1e1b1e1b1e",
      title: "Sowan Pak Lurah",
      description: "Belajar tata krama saat bertamu ke rumah orang yang lebih tua.",
      cover_image_url: "https://abilverse.bccdev.id/minio-web/lathi-storage/covers/chapter1.jpg",
      order_index: 1,
      is_locked: false,
      is_completed: false
    },
    {
      id: "018e3a2d-9b1e-7b1e-8b1e-2b2e2b2e2b2e",
      title: "Mangan Ing Warung",
      description: "Adab makan dan memesan makanan.",
      cover_image_url: "https://abilverse.bccdev.id/minio-web/lathi-storage/covers/chapter2.jpg",
      order_index: 2,
      is_locked: false,
      is_completed: false
    },
    {
      id: "018e3a2d-9b1e-7b1e-8b1e-2b2e2s2e2b2e",
      title: "Sowan Mertua",
      description: "Langkah terakhir keputusan besar hidup",
      cover_image_url: "https://abilverse.bccdev.id/minio-web/lathi-storage/covers/chapter2.jpg",
      order_index: 3,
      is_locked: true,
      is_completed: false
    }
] as Chapter[]

export const slidesDummy = [
   {
     id: "018e3a2d-slide-1",
     background_image_url: "https://.../bg_joglo.jpg",
     character_image_url: "",
     content: "Sore itu, Budi berniat {sowan} ke rumah Pak Lurah.",
     next_slide_id: "018e3a2d-slide-2...",
     vocabularies: [
       {
         id: "vocab-uuid-1",
         word_krama: "Sowan",
         word_ngoko: "Bertamu",
         word_indo: "Berkunjung"
       }
     ],
     "choices": []
   },
   {
     id: "018e3a2d-slide-3",
     background_image_url: "https://.../bg_joglo.jpg",
     character_image_url: "https://.../char_paklurah_normal.png",
     content: "(Pilih jawaban yang sopan)",
     next_slide_id: null,
     vocabularies: [],
     choices: [
      {
         index: 0,
         text: "Inggih Pak, pangestunipun sae."
      },
      {
         index: 1,
         text: "Iyo Pak, apik-apik wae."
      }
     ]
   }
] as Slide[]


export const SessionDataDummy = {
   current_slide_id: "018e3a2d-slide-3",
   current_hearts: 3,
   is_game_over: false,
   is_completed: false
} as Session