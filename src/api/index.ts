import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const REACT_APP_GIPHY_API_KEY = "jTAuqirruj85Vtd9DISWXopoSqNOHRUG";

export interface Images {
  [key: string]: {
    width: string;
    height: string;
    size: string;
    frames: string;
    mp4: string;
    webp: string;
    webp_size: string;
    mp4_size: string;
    url: string;
  };
}

export interface Gif {
  type: string;
  id: string;
  slug: string;
  url: string;
  bitly_url: string;
  embed_url: string;
  username: string;
  source: string;
  rating: string;
  content_url: string;
  user: string;
  title: string;
  alt_text: string;
  images: Images;
}

export const apiService = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.giphy.com/v1/" }),
  endpoints: (builder) => ({
    getTrendingGifs: builder.query<Gif[], { limit?: number; offset?: number }>({
      query: ({ limit = 25, offset = 0 }) => ({
        url: `gifs/trending?api_key=${REACT_APP_GIPHY_API_KEY}&limit=${limit}&offset=${offset}`,
        method: "GET",
      }),
      transformResponse: (response: any) => response.data,
    }),
    getSearchGifs: builder.query<
      Gif[],
      { searchTerm: string; limit?: number; offset?: number }
    >({
      query: ({ searchTerm, limit = 25, offset = 0 }) => ({
        url: `gifs/search?api_key=${REACT_APP_GIPHY_API_KEY}&q=${searchTerm}&limit=${limit}&offset=${offset}`,
        method: "GET",
      }),
      transformResponse: (response: any) => response.data,
    }),
  }),
});

export const { useGetTrendingGifsQuery, useGetSearchGifsQuery } = apiService;
