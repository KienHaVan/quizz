import apiSlice from '../apiSlice';

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
              ...result.data.result.map(({ id }: any) => ({
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
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userManagementSlice;
