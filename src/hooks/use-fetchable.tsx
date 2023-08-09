import { useState } from "react";

// Fetchable pattern used for all requests
export type Fetchable<T> = {
    isFetched: boolean;
    isLoading: boolean;
    data: null | T;
    error: null | string;
  };

  // Spawn default state for fetchable when needed
export const FETCHABLE = () => ({
    isFetched: false,
    isLoading: false,
    data: null,
    error: null,
  });

  
export const useFetchable = <T,>() => useState<Fetchable<T>>(FETCHABLE());
