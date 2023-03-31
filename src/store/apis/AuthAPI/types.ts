/**
 * LOGIN
 */

export interface LoginRequest {
  email: string;
  password: string;
}
export interface LoginResponse {
  statusCode: number;
  messsage: string;
  data: LoginResponseData;
}

export interface LoginResponseData {
  user: LoginResponseDataUser;
  tokens: LoginResponseDataTokens;
}

export interface LoginResponseDataUser {
  id: number;
  email: string;
  name: string;
  role: string[];
  avatar_link: string;
}

export interface LoginResponseDataTokens {
  access_token: AccessToken;
  refresh_token: RefreshToken;
}

export interface AccessToken {
  access_token: string;
  expireAfter: string;
}

export interface RefreshToken {
  refresh_token: string;
  expireAfter: string;
}

/**
 * Refresh Token
 */

export interface RefreshTokenRequest {
  refresh_token: string;
}

export interface RefreshTokenResponse {
  statusCode: number;
  message: string;
  data: RefreshTokenResponseData;
}

export interface RefreshTokenResponseData {
  newTokens: NewTokens;
}

export interface NewTokens {
  access_token: string;
  refresh_token: string;
}

export interface ErrorResponseType {
  data: {
    message: string;
    statusCode: number;
  };
  status: number;
}
