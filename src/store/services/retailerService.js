// services/retailerService.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const retailerService = createApi({
  reducerPath: "retailerService",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://gold.loyaltty.com",
    prepareHeaders: (headers, { getState }) => {
      const state = getState();
      const token = state?.auth?.token;
      headers.set("authorization", token ? `Bearer ${token}` : "");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/retailer/login",
        method: "POST",
        body: credentials,
      }),
    }),
    sendLoginOtp: builder.mutation({
      query: (data) => ({
        url: "/auth/retailer/send-otp",
        method: "POST",
        body: data,
      }),
    }),
    sendForgotPasswordOtp: builder.mutation({
      query: (data) => ({
        url: "/auth/retailer/forgot-password",
        method: "POST",
        body: data,
      }),
    }),
    verifyForgotPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/retailer/verify-forgot-password",
        method: "POST",
        body: data,
      }),
    }),
    getActiveDeals: builder.query({
      query: () => ({
        url: "/retailer/deal?filterBy=active&orderBy=created_at&page=1&limit=30",
        method: "GET",
      }),
    }),
    getPastDeals: builder.query({
      query: () => ({
        url: "/retailer/deal?filterBy=past&orderBy=created_at&page=1&limit=30",
        method: "GET",
      }),
    }),
    getFutureDeals: builder.query({
      query: () => ({
        url: "/retailer/deal?filterBy=upcoming&orderBy=created_at&page=1&limit=30",
        method: "GET",
      }),
    }),
    getUserInfo: builder.query({
      query: () => ({
        url: "/auth/retailer/verify-token",
        method: "GET",
      }),
    }),
    getDealInfo: builder.query({
      query: (id) => ({
        url: `/retailer/deal/${id}`,
        method: "GET",
      }),
    }),
    createNewDeal: builder.mutation({
      query: (dealData) => ({
        url: "/retailer/deal/create",
        method: "POST",
        body: dealData,
      }),
    }),
    updateDeal: builder.mutation({
      query: ({ dealId, dealData }) => ({
        url: `/retailer/deal/${dealId}`,
        method: "PUT",
        body: dealData,
      }),
    }),
    uploadDealPicture: builder.mutation({
      query: ({ dealId, pictureData }) => ({
        url: `/retailer/deal/${dealId}/picture`,
        method: "POST",
        body: pictureData,
      }),
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: "/auth/retailer/change-password",
        method: "POST",
        body: data,
      }),
    }),
    deleteAccount: builder.mutation({
      query: () => ({
        url: "/auth/retailer",
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSendLoginOtpMutation,
  useSendForgotPasswordOtpMutation,
  useVerifyForgotPasswordMutation,
  useGetActiveDealsQuery,
  useGetPastDealsQuery,
  useGetFutureDealsQuery,
  useGetUserInfoQuery,
  useGetDealInfoQuery,
  useCreateNewDealMutation,
  useUpdateDealMutation,
  useUploadDealPictureMutation,
  useChangePasswordMutation,
  useDeleteAccountMutation,
} = retailerService;

export default retailerService;
