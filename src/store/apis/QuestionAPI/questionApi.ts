import apiSlice from '../apiSlice';

export const questionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuestions: builder.query({
      query: (arg) => `/questions/play?total=${arg}`,
    }),
    submitQuestions: builder.mutation({
      query: (listQuestionSubmitted) => ({
        url: 'questions/submit',
        method: 'POST',
        body: listQuestionSubmitted,
      }),
    }),
  }),
});

export const { useGetQuestionsQuery, useSubmitQuestionsMutation } =
  questionApiSlice;
