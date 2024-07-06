import { useState } from "react";
import { useMovies } from "./useMovies";

import Navbar from "./components/Navbar";
import Logo from "./components/Logo";
import Search from "./components/Search";
import NumResults from "./components/NumResults";
import Main from "./components/Main";
import Box from "./components/Box";
import Loader from "./components/Loader";
import MovieList from "./components/MovieList";
import ErrorMessage from "./components/ErrorMessage";
import MovieDetails from "./components/MovieDetails";
import WatchedSummary from "./components/WatchedSummary";
import WatchedMovieList from "./components/WatchedMovieList";
import { useLocalStorageState } from "./useLocalStorageState";


export default function App() {

  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const {movies,isLoading,error} = useMovies(query);

  const [watched,setWatched] = useLocalStorageState([], "watched");



  function handleSelectMovie(id) {
    setSelectedId((selected) => (id === selected ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddMovie(movie) {
    setWatched((movies) => [...movies, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }





  return (
    <>
      <Navbar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Navbar>

      <Main>
        <Box>
          {/* {isLoading ? <Loader /> : <MovieList movies={movies} /> } */}
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList onSelectMovie={handleSelectMovie} movies={movies} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails
              onCloseMovie={handleCloseMovie}
              selectedId={selectedId}
              onAddWatched={handleAddMovie}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList watched={watched} onDelete= {handleDeleteWatched} />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
