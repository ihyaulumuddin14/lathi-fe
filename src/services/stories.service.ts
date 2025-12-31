import privateApi from "@/api/privateApi";

// POST start story session
export const startStory = async (storyId: string) => {
   const response = await privateApi.post(`/stories/chapters/${storyId}/start`);
   return response.data;
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

