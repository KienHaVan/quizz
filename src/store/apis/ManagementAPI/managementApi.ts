import apiSlice from '../apiSlice';

export const managementApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllQuestions: builder.query({
      query: (params) => ({
        url: 'questions',
        method: 'GET',
        params,
      }),
    }),
  }),
});

export const { useGetAllQuestionsQuery } = managementApiSlice;
