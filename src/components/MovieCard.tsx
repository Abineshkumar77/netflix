"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Movie } from "@/types/moviesTypes";
import { Heart } from "lucide-react";

interface MovieCardProps {
  movie: Movie;
  isFavorite: boolean;
  toggleFavorite: (movie: Movie) => void;
}

export default function MovieCard({
  movie,
  isFavorite,
  toggleFavorite,
}: MovieCardProps) {
  return (
    <Card className="w-72 rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300">
      {/* Poster */}
      <div className="relative h-96 w-full">
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title || movie.original_title}
          fill
          className="object-cover"
        />
        <button
          className="absolute top-2 right-2  bg-white/70 rounded-full p-2 hover:bg-white"
          onClick={() => toggleFavorite(movie)}
        >
          <Heart className={isFavorite ? "fill-red-500" : ""}></Heart>
        </button>
      </div>

      {/* Title + Release Year */}
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          {movie.title}{" "}
          {movie.release_date && (
            <span className="text-gray-500">
              ({movie.release_date.slice(0, 4)})
            </span>
          )}
        </CardTitle>
      </CardHeader>

      {/* Overview */}
      <CardContent>
        <p className="text-sm text-gray-600 line-clamp-3">
          {movie.overview || "No description available."}
        </p>
      </CardContent>
    </Card>
  );
}
