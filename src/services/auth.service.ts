import authApi from "@/api/authApi";
import { LoginCredentials, RegisterCredentials } from "@/schema/AuthSchema";

// POST register
export const registerService = async (registerPayload: RegisterCredentials) => {
  const response = await authApi.post("/auth/register", registerPayload);
  return response.data
}

// POST login
export const loginService = async (loginPayload: LoginCredentials) => {
  const response = await authApi.post("/auth/login", loginPayload);
  return response.data;
}

// POST logout
export const logoutService = async () => {
  const response = await authApi.post("/auth/logout");
  return response.data;
}

// POST refresh
export const refreshService = async () => {
   const response = await authApi.post("/auth/refresh");
   return response.data;
}

// POST verify
export const verifyService = async (verifyPayload: {
   token: string
}) => {
   const response = await authApi.post("/auth/verify", verifyPayload);
   return response.data
}