import authApi from "@/api/authApi";
import { LoginCredentials } from "@/schema/AuthSchema";

// POST register
export const registerService = async (registerPayload: LoginCredentials) => {
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