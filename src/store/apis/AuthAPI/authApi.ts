import { RoleType } from '../../../types';
import { AuthStateType } from '../../slices/authSlice';
import apiSlice from '../apiSlice';
import { LoginResponse } from './types';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: 'authentication/login',
        method: 'POST',
        body: credentials,
      }),
      transformResponse: (response: LoginResponse) => {
        const { user, tokens } = response?.data;

        const transformResponse: AuthStateType = {
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            avatarLink: user.avatar_link,
            roles: [...user.roles] as RoleType[],
          },
          accessToken: tokens.access_token.access_token,
          refreshToken: tokens.refresh_token.refresh_token,
        };

        return transformResponse;
      },
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: 'authentication/register',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApiSlice;
