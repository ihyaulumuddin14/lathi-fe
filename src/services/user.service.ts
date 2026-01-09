import privateApi from "@/api/privateApi"

export const editUserService = async (editUserPayload: {
   username: string
}) => {
   const response = await privateApi.patch("/users/profile", editUserPayload);
   return response.data
}

export const deleteUserService = async () => {
   const response = await privateApi.delete("/users/account")
   return response.data
}