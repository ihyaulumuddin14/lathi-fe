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
     content: "Wanci {sonten} ing kutha Surabaya. Hawa taksih panas, nanging swasana alon-alon dados ayem.",
     next_slide_id: "2",
     vocabularies: [
      {
         id: "vocab-1",
         word_krama: "Sonten",
         word_ngoko: "Surup",
         word_indo: "Sore"
      }
     ],
     choices: []
   },
 
   {
     id: "2",
     speaker_name: null,
     background_image_url: "/game_bg_dummy.webp",
     character_on_screen: [],
     content: "Ing satunggaling gang alit, wonten warung ingkang katingal {sederhana} nanging {resik}. Andi lungguh ngentosi kancanipun.",
     next_slide_id: "3",
     vocabularies: [],
     choices: []
   },
 
   {
     id: "3",
     speaker_name: "Andi",
     background_image_url: "/game_bg_dummy.webp",
     character_on_screen: [
       { image_url: "/game_char_dummy.webp", position: "left", is_active: true },   // Andi
       { image_url: "/game_char_dummy.webp", position: "right", is_active: false }  // Budi
     ],
     content: "Lho, Budi! Kados pundi kabar panjenengan? Saking mriki kok katingal {kesah} sanget.",
     next_slide_id: "4",
     vocabularies: [],
     choices: []
   },
 
   {
     id: "4",
     speaker_name: "Budi",
     background_image_url: "/game_bg_dummy.webp",
     character_on_screen: [
       { image_url: "/game_char_dummy.webp", position: "left", is_active: false },  // Andi
       { image_url: "/game_char_dummy.webp", position: "right", is_active: true }   // Budi
     ],
     content: "Inggih, Mas Andi. Sedinten makarya, raosipun awak kula kesel sanget.",
     next_slide_id: "5",
     vocabularies: [],
     choices: []
   },
 
   {
     id: "5",
     speaker_name: "Andi",
     background_image_url: "/game_bg_dummy.webp",
     character_on_screen: [
       { image_url: "/game_char_dummy.webp", position: "left", is_active: true },   // Andi
       { image_url: "/game_char_dummy.webp", position: "right", is_active: false }  // Budi
     ],
     content: "Menawi mekaten, langkung becik panjenengan {nedha} rumiyin. Supados badan saged santai.",
     next_slide_id: "6",
     vocabularies: [],
     choices: [
       { index: 0, text: "Inggih, kula badhe nedha rumiyin." },
       { index: 1, text: "Ora usah, aku langsung wae." },
       { index: 2, text: "Sebentar aja, Mas, terus lanjut." }
     ]
   },
 
   {
     id: "6",
     speaker_name: "Budi",
     background_image_url: "/game_bg_dummy.webp",
     character_on_screen: [
       { image_url: "/game_char_dummy.webp", position: "left", is_active: false },  // Andi
       { image_url: "/game_char_dummy.webp", position: "right", is_active: true }   // Budi
     ],
     content: "Inggih Mas, kula manut. Sakderenge kesah, kula kepengin nedha rumiyin wonten mriki.",
     next_slide_id: "7",
     vocabularies: [],
     choices: []
   },
 
   {
     id: "7",
     speaker_name: "Sekar",
     background_image_url: "/game_bg_dummy.webp",
     character_on_screen: [
       { image_url: "/game_char_dummy.webp", position: "left", is_active: false },  // Andi
       { image_url: "/game_char_dummy.webp", position: "right", is_active: true }   // Sekar
     ],
     content: "Budi punika sakmenika gadhah niyat badhe {sowan} dhateng griyanipun Pak Lurah.",
     next_slide_id: "8",
     vocabularies: [],
     choices: []
   },
 
   {
     id: "8",
     speaker_name: "Andi",
     background_image_url: "/game_bg_dummy.webp",
     character_on_screen: [
       { image_url: "/game_char_dummy.webp", position: "left", is_active: true },   // Andi
       { image_url: "/game_char_dummy.webp", position: "right", is_active: false }  // Sekar
     ],
     content: "Oh ngaten? Menawi sowan, mesthi wonten perkawis ingkang wigati, nggih?",
     next_slide_id: "9",
     vocabularies: [],
     choices: [
       { index: 0, text: "Inggih, perkawis bebrayan warga." },
       { index: 1, text: "Masalah kampung, Mas." },
       { index: 2, text: "Cuma mau ngobrol aja sih." }
     ]
   },
 
   {
     id: "9",
     speaker_name: "Budi",
     background_image_url: "/game_bg_dummy.webp",
     character_on_screen: [
       { image_url: "/game_char_dummy.webp", position: "left", is_active: false },  // Andi
       { image_url: "/game_char_dummy.webp", position: "right", is_active: true }   // Budi
     ],
     content: "Inggih Mas Andi. Kula badhe ngrembag bab kegiatan {bebrayan} supados langkung rukun.",
     next_slide_id: "10",
     vocabularies: [],
     choices: []
   },
 
   {
     id: "10",
     speaker_name: "Andi",
     background_image_url: "/game_bg_dummy.webp",
     character_on_screen: [
       { image_url: "/game_char_dummy.webp", position: "left", is_active: true },   // Andi
       { image_url: "/game_char_dummy.webp", position: "right", is_active: false }  // Budi
     ],
     content: "Menika sae sanget, Budi. Mugi rembuganipun lancar lan paring manfaat kangge sedaya.",
     next_slide_id: "11",
     vocabularies: [],
     choices: []
   },
 
   {
     id: "11",
     speaker_name: null,
     background_image_url: "/game_bg_dummy.webp",
     character_on_screen: [],
     content: "Sasampunipun nedha, Budi pamit saking warung lan tumuju griyanipun Pak Lurah.",
     next_slide_id: "12",
     vocabularies: [],
     choices: []
   },
 
   {
     id: "12",
     speaker_name: "Budi",
     background_image_url: "/game_bg_dummy.webp",
     character_on_screen: [
       { image_url: "/game_char_dummy.webp", position: "right", is_active: true }
     ],
     content: "(Ngetuk lawang) Kula nyuwun idin, Pak.",
     next_slide_id: "13",
     vocabularies: [],
     choices: []
   },
 
   {
     id: "13",
     speaker_name: "Pak Lurah",
     background_image_url: "/game_bg_dummy.webp",
     character_on_screen: [
       { image_url: "/game_char_dummy.webp", position: "left", is_active: true }
     ],
     content: "Inggih, monggo mlebet. Menawi kersa, lenggah rumiyin.",
     next_slide_id: "14",
     vocabularies: [],
     choices: []
   },
 
   {
     id: "14",
     speaker_name: "Pak Lurah",
     background_image_url: "/game_bg_dummy.webp",
     character_on_screen: [
       { image_url: "/game_char_dummy.webp", position: "left", is_active: true }
     ],
     content: "Perkawis punapa ingkang ndadosaken panjenengan sowan dalu-dalu niki?",
     next_slide_id: "15",
     vocabularies: [],
     choices: [
       { index: 0, text: "Kula nyuwun pitedah bab kegiatan warga." },
       { index: 1, text: "Aku pengin curhat soal kampung, Pak." },
       { index: 2, text: "Kula namung nyuwun arahan, Pak." }
     ]
   },

   {
      id: "15",
      speaker_name: "Budi",
      background_image_url: "/game_bg_dummy.webp",
      character_on_screen: [
        { image_url: "/game_char_dummy.webp", position: "right", is_active: true }
      ],
      content: "Inggih Pak Lurah. Kula lan warga remen rembugan bab kegiatan bebrayan, nanging taksih bingung langkahipun.",
      next_slide_id: "16",
      vocabularies: [],
      choices: []
    },
    {
      id: "16",
      speaker_name: "Pak Lurah",
      background_image_url: "/game_bg_dummy.webp",
      character_on_screen: [
        { image_url: "/game_char_dummy.webp", position: "left", is_active: true }
      ],
      content: "Menika sae. Pemuda kedah gadhah niyat becik kangge lingkunganipun.",
      next_slide_id: "17",
      vocabularies: [],
      choices: []
    },
    {
      id: "17",
      speaker_name: "Pak Lurah",
      background_image_url: "/game_bg_dummy.webp",
      character_on_screen: [
        { image_url: "/game_char_dummy.webp", position: "left", is_active: true }
      ],
      content: "Nanging sadèrèngipun tumindak, kedah wonten rembugan lan kesepakatan warga.",
      next_slide_id: "18",
      vocabularies: [],
      choices: []
    },
    {
      id: "18",
      speaker_name: "Budi",
      background_image_url: "/game_bg_dummy.webp",
      character_on_screen: [
        { image_url: "/game_char_dummy.webp", position: "right", is_active: true }
      ],
      content: "Inggih Pak. Menawi kersa, kados pundi caranipun ngajak warga supados remen melu?",
      next_slide_id: "19",
      vocabularies: [],
      choices: [
        { index: 0, text: "Nyuwun panjenengan maringi pitedah, Pak." },
        { index: 1, text: "Menurut Bapak sebaiknya gimana?" },
        { index: 2, text: "Kulo mohon arahan yang paling tepat." }
      ]
    },
    {
      id: "19",
      speaker_name: "Pak Lurah",
      background_image_url: "/game_bg_dummy.webp",
      character_on_screen: [
        { image_url: "/game_char_dummy.webp", position: "left", is_active: true }
      ],
      content: "Wonten kathah cara. Salah satunggalingipun, panjenengan saged sowan dhateng sesepuh rumiyin.",
      next_slide_id: "20",
      vocabularies: [],
      choices: []
    },
    {
      id: "20",
      speaker_name: "Pak Lurah",
      background_image_url: "/game_bg_dummy.webp",
      character_on_screen: [
        { image_url: "/game_char_dummy.webp", position: "left", is_active: true }
      ],
      content: "Menawi sesepuh sampun sarujuk, warga sanes biasanipun badhe ndherek.",
      next_slide_id: "21",
      vocabularies: [],
      choices: []
    },
    {
      id: "21",
      speaker_name: "Budi",
      background_image_url: "/game_bg_dummy.webp",
      character_on_screen: [
        { image_url: "/game_char_dummy.webp", position: "right", is_active: true }
      ],
      content: "Oh ngaten, Pak. Dados adab lan tata krama punika wigati sanget, nggih?",
      next_slide_id: "22",
      vocabularies: [],
      choices: []
    },
    {
      id: "22",
      speaker_name: "Pak Lurah",
      background_image_url: "/game_bg_dummy.webp",
      character_on_screen: [
        { image_url: "/game_char_dummy.webp", position: "left", is_active: true }
      ],
      content: "Inggih leres. Tata krama menika dhasar hubungan sosial ing bebrayan.",
      next_slide_id: "23",
      vocabularies: [],
      choices: []
    },
    {
      id: "23",
      speaker_name: "Pak Lurah",
      background_image_url: "/game_bg_dummy.webp",
      character_on_screen: [
        { image_url: "/game_char_dummy.webp", position: "left", is_active: true }
      ],
      content: "Caranipun matur, lenggah, lan pamit, sedaya gadhah teges piyambak.",
      next_slide_id: "24",
      vocabularies: [],
      choices: []
    },
    {
      id: "24",
      speaker_name: "Budi",
      background_image_url: "/game_bg_dummy.webp",
      character_on_screen: [
        { image_url: "/game_char_dummy.webp", position: "right", is_active: true }
      ],
      content: "Kula mangertos sakmenika, Pak. Matur nuwun sanget dhumateng pitedahipun.",
      next_slide_id: "25",
      vocabularies: [],
      choices: []
    },
    {
      id: "25",
      speaker_name: null,
      background_image_url: "/game_bg_dummy.webp",
      character_on_screen: [],
      content: "Rembugan lumampah kanthi lancar lan kebak pangajab kangge masa ngajeng.",
      next_slide_id: "26",
      vocabularies: [],
      choices: []
    },
    {
      id: "26",
      speaker_name: "Budi",
      background_image_url: "/game_bg_dummy.webp",
      character_on_screen: [
        { image_url: "/game_char_dummy.webp", position: "right", is_active: true }
      ],
      content: "Menawi sampun cekap, kula nyuwun pamit rumiyin, Pak Lurah.",
      next_slide_id: "27",
      vocabularies: [],
      choices: [
        { index: 0, text: "Kula nyuwun pamit, matur nuwun sanget." },
        { index: 1, text: "Saya pamit dulu ya, Pak." },
        { index: 2, text: "Nuwun sewu Pak, saya pulang dulu." }
      ]
    },
    {
      id: "27",
      speaker_name: "Pak Lurah",
      background_image_url: "/game_bg_dummy.webp",
      character_on_screen: [
        { image_url: "/game_char_dummy.webp", position: "left", is_active: true }
      ],
      content: "Inggih, monggo. Mugi sedaya rencana panjenengan saged kaleksanan kanthi becik.",
      next_slide_id: "28",
      vocabularies: [],
      choices: []
    },
    {
      id: "28",
      speaker_name: null,
      background_image_url: "/game_bg_dummy.webp",
      character_on_screen: [],
      content: "Budi medal saking griya Pak Lurah kanthi raos {lega} lan semangat enggal.",
      next_slide_id: "29",
      vocabularies: [],
      choices: []
    },
    {
      id: "29",
      speaker_name: null,
      background_image_url: "/game_bg_dummy.webp",
      character_on_screen: [],
      content: "Lampu-lampu kampung murup, ndadosaken dalan langkung cetha nalika Budi wangsul.",
      next_slide_id: "30",
      vocabularies: [],
      choices: []
    },
    {
      id: "30",
      speaker_name: null,
      background_image_url: "/game_bg_dummy.webp",
      character_on_screen: [],
      content: "Ing manahipun, Budi sampun mantep badhe ngleksanani pitedah saking Pak Lurah.",
      next_slide_id: null,
      vocabularies: [],
      choices: []
    }    
 ]; 
 


export const SessionDataDummy = {
   current_slide_id: "1",
   current_hearts: 1,
   is_game_over: false,
   is_completed: false
} as Session