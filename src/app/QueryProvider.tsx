"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useState } from "react";

interface Props {
  children: React.ReactNode;
}

export default function QueryProvider({ children }: Props) {
  const [queryclient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryclient}>{children}</QueryClientProvider>
  );
}
