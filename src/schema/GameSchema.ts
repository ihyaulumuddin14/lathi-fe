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
   characters: {
      name: string,
      image_url: string,
      is_active: boolean
   }[],
   audio_file_url: string,
   speaker_name: string,
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
   history_log: History[],
}

export type History = {
   speaker: string,
   text: string,
   is_user: boolean,
   timestamp: string
}

export type DictionaryItem = Vocabulary & {
   is_locked: boolean
}

export type Pagination = {
   current_page: number,
   total_page: number,
   total_items: number,
   items_per_page: number
}

export type LeaderboardItem = {
   rank: number,
   user_id: string,
   username: string,
   avatar_url: string,
   title: string,
   score: number
}