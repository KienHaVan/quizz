import apiSlice from '../apiSlice';

export const questionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuestions: builder.query({
      query: (arg) => `/questions/play?total=${arg}`,
      keepUnusedDataFor: 0,
    }),
    submitQuestions: builder.mutation({
      query: (listQuestionSubmitted) => ({
        url: 'questions/submit',
        method: 'POST',
        body: listQuestionSubmitted,
      }),
    }),
    uploadThumbnail: builder.mutation({
      query: (data) => ({
        url: 'questions/upload-thumbnail',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useGetQuestionsQuery,
  useSubmitQuestionsMutation,
  useUploadThumbnailMutation,
} = questionApiSlice;
