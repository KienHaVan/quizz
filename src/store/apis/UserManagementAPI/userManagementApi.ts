import apiSlice from '../apiSlice';
import { GetOwnProfileType } from './type';

export const userManagementSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: (params) => ({
        url: 'user',
        method: 'GET',
        params,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.result.map(({ id }: { id: number }) => ({
                type: 'User' as const,
                id,
              })),
              { type: 'User', id: 'LIST' },
            ]
          : [{ type: 'User', id: 'LIST' }],
    }),
    getUser: builder.query({
      query: ({ userId }) => `user/${userId}`,
      providesTags: (result, error, arg) => [{ type: 'User', id: arg.userId }],
    }),
    getOwnProfile: builder.query({
      query: () => 'user/my-profile',
      providesTags: () => [{ type: 'User', id: 'Profile' }],
      transformResponse: (response: GetOwnProfileType) => response.data,
    }),
    createUser: builder.mutation({
      query: (body) => ({
        url: 'user',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'User', id: 'LIST' }],
    }),
    deleteUser: builder.mutation({
      query: ({ userId }) => ({
        url: `user/${userId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'User', id: 'LIST' }],
    }),
    updateUser: builder.mutation({
      query: ({ userId, ...body }) => ({
        url: `user/${userId}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'User', id: arg.userId },
      ],
    }),
    uploadAvatar: builder.mutation({
      query: (data) => ({
        url: 'user/upload-avatar',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'User', id: 'Profile' }],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useUploadAvatarMutation,
  useGetOwnProfileQuery,
} = userManagementSlice;
