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
   background_image_url: string,
   character_image_url: string,
   content: string,
   next_slide_id: string,
   vocabularies: Vocabulary[] | [],
   choices: Choice[] | []
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
   current_slide_id: string,
   current_hearts: number,
   is_game_over: boolean,
   is_completed: boolean
}