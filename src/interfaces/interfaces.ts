import { SerializedError } from "@reduxjs/toolkit";

// Authentication-related
export interface Token {
  user_id: string;
  sub: string;
  exp: number;
  iat: number;
}
export interface User {
  user_id: string;
  sub: string;
}

export interface LoginData {
  email: string;
  password: string;
}

// Extra
export interface CustomError extends SerializedError {
  msg?: string;
  status?: number;
}