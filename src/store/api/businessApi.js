import { apiSlice } from './apiSlice';

export const businessApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBusinessProfile: builder.query({
      query: (businessId) => `/business/${businessId}`,
      providesTags: ['Business'],
    }),
    updateBusiness: builder.mutation({
      query: ({ businessId, data }) => ({
        url: `/business/${businessId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Business'],
    }),
    createBusiness: builder.mutation({
      query: (data) => ({
        url: '/business',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Business'],
    }),
  }),
});

export const {
  useGetBusinessProfileQuery,
  useUpdateBusinessMutation,
  useCreateBusinessMutation,
} = businessApi; 