import { tagTypes } from '@/utils/tagTypes'
import { baseApi } from '../baseApi'

const stripeApi = baseApi.injectEndpoints({
  endpoints: build => ({
    connectStripeAccount: build.mutation({
      query: data => ({
        url: '/stripe/connect',
        method: 'POST',
      }),
      invalidatesTags: [tagTypes.USER],
    }),
  }),
})

export const { useConnectStripeAccountMutation } = stripeApi
