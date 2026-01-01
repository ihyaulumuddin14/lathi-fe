import { Chapter, Slide, Session } from "@/schema/GameSchema"
import { User } from "@/stores/useAuthStore"

export const userDummy = {
  id: "234235",
  username: "ulum",
  email: "ulum@gmail.com"
} as User

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
     id: "1",
     speaker_name: null,
     background_image_url: "/game_bg_dummy.webp",
     character_on_screen: [],
     content: "Wanci sonten ing kutha Surabaya. Hawa panas taksih krasa, nanging ing satunggaling warung alit, swasana katingal ayem.",
     next_slide_id: "2",
     vocabularies: [],
     "choices": []
   },
   {
     id: "2",
     speaker_name: null,
     background_image_url: "/game_bg_dummy.webp",
     character_on_screen: [],
     content: "Warung menika namanipun \"Warmindo Andi\". Ingkang gadhah, satunggaling nom-noman ingkang grapyak lan remen guyon.",
     next_slide_id: "3",
     vocabularies: [],
     choices: []
   },
   {
     id: "3",
     speaker_name: "Sekar",
     background_image_url: "/game_bg_dummy.webp",
     character_on_screen: [
      {
         image_url: "/game_char_dummy.webp",
         position: "left",
         is_active: false
      },
      {
         image_url: "/game_char_dummy.webp",
         position: "right",
         is_active: true
      }
     ],
     content: "Sore itu, Budi berniat {sowan} ke rumah Pak Lurah",
     next_slide_id: "4",
     vocabularies: [
      {
         id: "vocab-uuid-1",
         word_krama: "Sowan",
         word_ngoko: "Bertamu",
         word_indo: "Berkunjung"
      }
     ],
     choices: []
   },
   {
     id: "4",
     speaker_name: "Andi",
     background_image_url: "/game_bg_dummy.webp",
     character_on_screen: [
      {
         image_url: "/game_char_dummy.webp",
         position: "left",
         is_active: true
      },
      // {
      //    image_url: "/game_char_dummy.webp",
      //    position: "right",
      //    is_active: true
      // }
     ],
     content: "(Nyelehake mangkok ing meja) Iki lho, Indomie telor kornet spesial! Mung gawe Cah Ayu sing paling mannis sak Surabaya.",
     next_slide_id: "5",
     vocabularies: [],
     choices: []
   }
] as Slide[]


export const SessionDataDummy = {
   current_slide_id: "3",
   current_hearts: 2,
   is_game_over: false,
   is_completed: false
} as Session