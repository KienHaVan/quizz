import apiSlice from '../apiSlice';

export const questionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuestions: builder.query({
      query: (arg) => `/questions/play?total=${arg}`,
    }),
  }),
});

export const { useGetQuestionsQuery } = questionApiSlice;
