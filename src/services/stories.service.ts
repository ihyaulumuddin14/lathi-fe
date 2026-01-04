import privateApi from "@/api/privateApi";

// POST start story session
export const startStory = async (chapterId: string) => {
   // const response = await privateApi.post(`/stories/chapters/${chapterId}/start`);
   // return response.data;
   
   await new Promise(res => setTimeout(res, 1000))
   return {
      success: true,
      message: "session started",
      data: null
   }
}

// POST story action
export const actionStory = async (chapterId: string, slideId: string, choiceIndex: number | null) => {
   const actionStoryPayload = {
      chapter_id: chapterId,
      slide_id: slideId,
      choice_index: choiceIndex
   }

   const result = Math.floor(Math.random() * 10)

   if (choiceIndex !== null) {
      await new Promise(res => setTimeout(res, 3000))
   }
   return {
      is_game_over: false,
      is_completed: false,
      message: "",
      remaining_hearts: 3,
      character_reaction: result <= 3 ? "angry" : result >= 6 ? "happy" : "normal",
      next_slide_id: String(Number(slideId) + 1)
   }

   // const response = await privateApi.post("/stories/action", actionStoryPayload)
   // return response.data;
}

