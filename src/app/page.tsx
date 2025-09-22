"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchMovies } from "@/services/moviesService";
import type { Movie, MoviesResponse } from "@/types/moviesTypes";
import { useEffect, useState } from "react";
import { SearchBar } from "@/components/ui/search-bar";
import MovieCard from "@/components/MovieCard";
import { useDebounce } from "use-debounce";
import { Heart } from "lucide-react";

export default function MovieSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedValue] = useDebounce(searchQuery, 300);
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) setFavorites(JSON.parse(stored));
  }, []);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ["movies", debouncedValue],
    queryFn: ({ pageParam = 1 }) =>
      fetchMovies(debouncedValue, pageParam as number),
    enabled: !!debouncedValue && !showFavorites,
    initialPageParam: 1,
    getNextPageParam: (lastPage: MoviesResponse) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
  });

  const handleSearch = (query: string) => {
    console.log("culprit");
    setSearchQuery(query);
    setShowFavorites(false);
  };

  const handleToggleFavorite = (movie: Movie) => {
    setFavorites((prev) => {
      const exists = prev.find((m) => m.id === movie.id);
      let newFavourites = [];
      if (exists) {
        newFavourites = prev.filter((m) => m.id !== movie.id);
      } else {
        newFavourites = [...prev, movie];
      }

      localStorage.setItem("favorites", JSON.stringify(newFavourites));
      return newFavourites;
    });
  };

  const isFavorite = (movie: Movie) => favorites.some((m) => m.id === movie.id);

  useEffect(() => {
    if (showFavorites) return;
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 300 &&
        hasNextPage &&
        !isFetchingNextPage
      ) {
        fetchNextPage();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, showFavorites]);

  // Combine all pages' movies
  const displayedMovies = showFavorites
    ? favorites
    : data
    ? data.pages.flatMap((page) => page.results)
    : [];

  return (
    <div>
      <header>
        <h1 className="bg-sky-400 text-2xl font-bold mb-4 text-center p-8">
          Movie Search
        </h1>
      </header>

      <div className="flex items-center justify-center gap-2 mb-4">
        <SearchBar
          placeholder="Search for movies..."
          onSearch={handleSearch}
          className="w-full max-w-md"
        />
        <button
          onClick={() => setShowFavorites((prev) => !prev)}
          className={`p-2 rounded-full border transition ${
            showFavorites
              ? "bg-red-200 border-red-400"
              : "bg-gray-100 border-gray-300"
          }`}
          title="Show Favorites"
        >
          <Heart
            className={`w-6 h-6 ${
              showFavorites ? "fill-red-500 text-red-500" : "text-gray-500"
            }`}
          />
        </button>
      </div>

      <h2 className="text-xl font-bold mb-4 pl-8">
        {showFavorites ? "Your Favorite Movies" : "Movie Results"}
      </h2>

      {!showFavorites && isLoading && <p>Loading ...</p>}
      {!showFavorites && isError && <p>Something went wrong</p>}
      {!showFavorites &&
        !isLoading &&
        displayedMovies.length === 0 &&
        debouncedValue && <p>No movies found for "{debouncedValue}"</p>}
      {showFavorites && favorites.length === 0 && (
        <p>You have no favorite movies yet.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 px-8">
        {displayedMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            isFavorite={isFavorite(movie)}
            toggleFavorite={() => handleToggleFavorite(movie)}
          />
        ))}
      </div>
    </div>
  );
}
