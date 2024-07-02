import { SerializedError } from "@reduxjs/toolkit";

// Authentication-related
export interface Token {
  exp: number;
  iat: number;
  sub: string;
}
export interface User {
  _id: string;
  email: string;
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