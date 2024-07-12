import { tagTypes } from '@/utils/tagTypes'
import { baseApi } from '../baseApi'

const serviceApi = baseApi.injectEndpoints({
  endpoints: build => ({
    createService: build.mutation({
      query: data => ({
        url: '/services',
        method: 'POST',
        data: data,
      }),
      invalidatesTags: [tagTypes.SERVICES],
    }),
    getServices: build.query({
      query: params => ({
        url: '/services',
        method: 'GET',
        params: params,
      }),
      providesTags: [tagTypes.SERVICES],
      keepUnusedDataFor: 10,
    }),
    getService: build.query({
      query: params => ({
        url: `/services/${params}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: tagTypes.SERVICES, id }],
    }),
  }),
})

export const {
  useCreateServiceMutation,
  useGetServicesQuery,
  useGetServiceQuery,
} = serviceApi
