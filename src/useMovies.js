import { useState, useEffect } from "react";

const KEY = "9f6abd01";
export function useMovies(query) {

    const [movies, setMovies] = useState([]);
    //const [watched, setWatched] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");


    /*
  useEffect( function() {
    fetch(`https://www.omdbapi.com/?s=Terminator&apikey=${KEY}`)
    .then(res => res.json()
    .then(data => setMovies(data.Search)));
  }, []);
  */

  // transfrom the function inside useEffect in async function

  useEffect(
    function () {

        //callback?.();

      const controller = new AbortController();

      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `https://www.omdbapi.com/?s=${query}&apikey=${KEY}`,
            {signal: controller.signal}
          );

          // deling with errors
          if (!res.ok) throw new Error(`Error fetching movies`);

          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie not found");

          setMovies(data.Search);
          setError("");
        } catch (err) {
          console.error(err.message);

          if(err.name !== "AbortError") {
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }

      fetchMovies();

      return function() {
        controller.abort();
      }
    },
    [query]
  );
 return {movies,isLoading, error}
}