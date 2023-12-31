import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IUser, ServerResponse, IRepo } from '../../types/github/github'

export const githubApi = createApi({
  reducerPath: 'github/api',
  baseQuery: fetchBaseQuery({
    baseUrl: `https://api.github.com/`,
  }),
  refetchOnFocus: true,
  endpoints: (build) => ({
    searchUsers: build.query<IUser[], string>({
      query: (search: string) => ({
        url: 'search/users',
        params: {
          q: search,
          per_page: 30,
        },
      }),
      transformResponse: (response: ServerResponse<IUser>) => response.items,
    }),
    getUser: build.query<IUser, string>({
      query: (login: string) => ({
        url: `users/${login}`,
        params: {},
      }),
    }),
    getUserRepos: build.query<IRepo[], string>({
      query: (username: string) => ({
        url: `users/${username}/repos`,
        params: {
          sort: 'created',
          per_page: 10,
        },
      }),
    }),
  }),
})

export const {
  useSearchUsersQuery,
  useLazySearchUsersQuery,
  useGetUserQuery,
  useGetUserReposQuery,
} = githubApi
