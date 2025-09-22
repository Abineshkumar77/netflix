// hooks/useFavorites.ts
"use client";

import { useEffect, useState } from "react";
import type { Movie } from "@/types/moviesTypes";

export function useFavorites() {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  // Save to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (movie: Movie) => {
    setFavorites((prev) => {
      const exists = prev.some((fav) => fav.id === movie.id);
      if (exists) {
        return prev.filter((fav) => fav.id !== movie.id);
      } else {
        return [...prev, movie];
      }
    });
  };

  const isFavorite = (id: number) => favorites.some((fav) => fav.id === id);

  return { favorites, toggleFavorite, isFavorite };
}
