import axios from "axios";
import type { MoviesResponse } from "@/types/moviesTypes";

export const fetchMovies = async (
  query?: string,
  page: number = 1,
  time_window: "day" | "week" = "day"
): Promise<MoviesResponse> => {
  const response = await axios.get("/api/movies", {
    params: {
      query,
      include_adult: false,
      language: "en-US",
      page,
      time_window,
    },
  });
  return response.data;
};
