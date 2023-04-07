import apiSlice from '../apiSlice';

export const managementApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllQuestions: builder.query({
      providesTags: [{ type: 'Management', id: 'LIST' }],
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
      invalidatesTags: [{ type: 'Management', id: 'LIST' }],
    }),
    addNewAnswer: builder.mutation({
      query: (body) => ({
        url: 'answers',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Management', id: 'LIST' }],
    }),
    deleteQuestion: builder.mutation({
      query: ({ questionId }) => ({
        url: `questions/${questionId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Management', id: 'LIST' }],
    }),
    getQuestion: builder.query({
      query: ({ questionId }) => `questions/${questionId}`,
      providesTags: (result, error, arg) => [
        { type: 'Management', id: arg.questionId },
      ],
    }),
    updateQuestion: builder.mutation({
      query: ({ questionId, ...body }) => ({
        url: `questions/${questionId}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Management', id: arg.questionId },
      ],
    }),
    updateAnswer: builder.mutation({
      query: ({ answerId, ...body }) => ({
        url: `answers/${answerId}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Management', id: arg.questionId },
      ],
    }),
  }),
});

export const {
  useGetAllQuestionsQuery,
  useAddNewQuestionMutation,
  useAddNewAnswerMutation,
  useDeleteQuestionMutation,
  useGetQuestionQuery,
  useUpdateQuestionMutation,
  useUpdateAnswerMutation,
} = managementApiSlice;
