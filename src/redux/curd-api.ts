import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export interface GitHubFile {
  name: string
  path: string
  sha: string
  size: number
  url: string
  html_url: string
  git_url: string
  download_url: string
  type: "file" | "dir"
  content?: string // Raw decoded text content
  json?: any // Parsed JSON content if valid
  encoding?: string
  decodedContent?: string
  parsedContent?: any
}

export interface APIResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// RTK Query API definition
export const crudApi = createApi({
  reducerPath: "crudApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://valkoma-kamii-hem-api.vercel.app/api/valkoma-kamii/",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json")
      headers.set("x-internal-call", "true")
      return headers
    },
  }),
  tagTypes: ["File"],
  endpoints: (builder) => ({
    getFile: builder.query<APIResponse<GitHubFile>, string>({
      query: (path) => `/files/${path}`,
      providesTags: (_result, _error, path) => [{ type: "File", id: path }],
    }),

    createOrUpdateFile: builder.mutation<APIResponse<GitHubFile>, { path: string; content: any; message?: string }>({
      query: ({ path, ...body }) => ({
        url: `/files/${path}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (_result, _error, { path }) => [{ type: "File", id: path }, "File"],
    }),

    deleteFile: builder.mutation<APIResponse<void>, { path: string; message?: string }>({
      query: ({ path, message }) => ({
        url: `/files/${path}${message ? `?message=${encodeURIComponent(message)}` : ""}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, { path }) => [{ type: "File", id: path }, "File"],
    }),

    getJSONFile: builder.query<APIResponse<any>, string>({
      query: (path) => `/files/${path}`,
      transformResponse: (response: APIResponse<GitHubFile>) => {
        if (response.success && response.data?.json) {
          return {
            ...response,
            data: response.data.json,
          }
        }
        return response
      },
      providesTags: (_result, _error, path) => [{ type: "File", id: path }],
    }),

    updateJSONFile: builder.mutation<APIResponse<GitHubFile>, { path: string; data: any; message?: string }>({
      query: ({ path, data, message }) => ({
        url: `/files/${path}`,
        method: "PUT",
        body: {
          content: data,
          message: message || `Update ${path}`,
        },
      }),
      invalidatesTags: (_result, _error, { path }) => [{ type: "File", id: path }, "File"],
    }),
  }),
})

export const {
  useGetFileQuery,
  useCreateOrUpdateFileMutation,
  useDeleteFileMutation,
  useGetJSONFileQuery,
  useUpdateJSONFileMutation,
} = crudApi

export const crudApiReducer = crudApi.reducer
export const crudApiMiddleware = crudApi.middleware

export const setupGitHubStore = (store: any) => {
  store.injectReducer("crudApi", crudApiReducer)
  store.middleware.concat(crudApiMiddleware)
}
