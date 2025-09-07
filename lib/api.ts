import { LoginResponse, User } from "@/types";
import { loginSchema } from "./schemas";

const API_BASE_URL = "https://api-yeshtery.dev.meetusvr.com/v1";

export const login = async (credentials: {
  email: string;
  password: string;
}): Promise<LoginResponse> => {
  const validatedCredentials = loginSchema.parse(credentials);

  const response = await fetch(`${API_BASE_URL}/yeshtery/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...validatedCredentials,
      isEmployee: true, // Always true for this app
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || `Login failed with status ${response.status}`
    );
  }

  const data = await response.json();
  return data;
};

export const getUserInfo = async (token: string): Promise<User> => {
  const response = await fetch(`${API_BASE_URL}/user/info`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    if (response.status === 401) {
      throw new Error("Session expired. Please login again.");
    }
    throw new Error(
      errorData.message ||
        `Failed to get user info with status ${response.status}`
    );
  }

  const data = await response.json();
  return data;
};
