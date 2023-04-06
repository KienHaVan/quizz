import apiSlice from '../apiSlice';

export const managementApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllQuestions: builder.query({
      providesTags: [{ type: 'Question', id: 'LIST' }],
      query: (params) => ({
        url: 'questions',
        method: 'GET',
        params,
      }),
    }),
    addNewQuestion: builder.mutation({
      query: (body) => ({
        url: 'questions',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Question', id: 'LIST' }],
    }),
  }),
});

export const { useGetAllQuestionsQuery } = managementApiSlice;
