import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';
import { RootState, store } from '..';
import { logOut, setCredentials, setNewAccessToken } from '../slices/authSlice';
import { RefreshTokenResponse } from './AuthAPI/types';

const BASE_URL = process.env.REACT_APP_BASE_URL || '';

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth?.accessToken;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const auth = store.getState().auth;
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        // try to get a new token
        const refreshResult = (await baseQuery(
          '/authentication/refresh-token',
          api,
          extraOptions
        )) as RefreshTokenResponse;

        const newAccessToken = refreshResult?.data?.newTokens?.access_token;

        if (newAccessToken) {
          // store the new token
          api.dispatch(
            setCredentials({
              ...auth,
              accessToken: refreshResult?.data?.newTokens?.access_token,
              refreshToken: refreshResult?.data?.newTokens?.refresh_token,
            })
          );
          // retry the initial query
          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(logOut());
        }
      } finally {
        // release must be called once the mutex should be released again.
        release();
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};

const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Management', 'User'],
  endpoints: () => ({}),
});

export default apiSlice;
