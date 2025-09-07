export interface LoginResponse {
  token: string;
  refreshToken: string;
}

export type ApiError = {
  message: string;
  status: number;
};

export interface User {
  id: string;
  name: string;
  email: string;
}
