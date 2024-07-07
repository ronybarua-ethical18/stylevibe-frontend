import { axiosBaseQuery } from '@/config/axiosBaseQuery'
import { getBaseUrl } from '@/config/envConfig'
import { tagTypesList } from '@/utils/tagTypes'
import { createApi } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery({ baseUrl: getBaseUrl() }),
  endpoints: builder => ({}),
  tagTypes: tagTypesList,
})
