export type Chapter = {
   id: string,
   title: string,
   description: string,
   cover_image_url: string,
   order_index: number,
   is_locked: boolean,
   is_completed: boolean
}

export type Slide = {
   id: string,
   speaker_name: string | null,
   background_image_url: string | null,
   character_on_screen: {
      image_url: string,
      position: "left" | "right",
      is_active: boolean
   }[],
   content: string | null,
   next_slide_id: string | null,
   vocabularies: Vocabulary[],
   choices: Choice[]
}

export type Vocabulary = {
   id: string,
   word_krama: string,
   word_ngoko: string,
   word_indo: string
}

export type Choice = {
   index: number,
   text: string
}

export type Session = {
   session_id: string,
   current_slide_id: string,
   current_hearts: number,
   is_game_over: boolean,
   is_completed: boolean,
   history_log: History[]
}

export type History = {
   speaker: string,
   text: string,
   is_user: boolean,
   timestamp: string
}