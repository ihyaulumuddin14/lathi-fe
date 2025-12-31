import privateApi from "@/api/privateApi";

// POST start story session
export const startStory = async (chapterId: string) => {
   // const response = await privateApi.post(`/stories/chapters/${chapterId}/start`);
   // return response.data;
   
   await new Promise(res => setTimeout(res, 3000))
   return {
      success: true,
      message: "session started",
      data: null
   }
}

// POST story action
export const actionStory = async (chapterId: string, slideId: string, choiceIndex: number) => {
   const actionStoryPayload = {
      chapter_id: chapterId,
      slide_id: slideId,
      choice_index: choiceIndex
   }

   const response = await privateApi.post("/stories/action", actionStoryPayload)
   return response.data;
}

