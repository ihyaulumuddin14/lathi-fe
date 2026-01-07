import privateApi from "@/api/privateApi";

// POST start story session
export const startStory = async (chapterId: string) => {
   const response = await privateApi.post(`/stories/chapters/${chapterId}/start`);
   return response.data;
}

// POST story action
export const actionStory = async (chapterId: string, slideId: string, choiceIndex: number | null) => {
   const response = await privateApi.post("/stories/action", {
      chapter_id: chapterId,
      slide_id: slideId,
      choice_index: choiceIndex
   })
   return response.data
}

