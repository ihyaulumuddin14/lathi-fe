import privateApi from "@/api/privateApi";


export const fetcher = async (url: string) => {
  const response = await privateApi.get(url);
  return response.data;
};