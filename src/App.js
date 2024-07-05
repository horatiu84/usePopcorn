import { useState, useEffect } from "react";
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


export default function App() {

  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const {movies,isLoading,error} = useMovies(query);

  const [watched, setWatched] = useState(function() {
    const storedValue = localStorage.getItem('watched');
    return JSON.parse(storedValue)
  } );

  function handleSelectMovie(id) {
    setSelectedId((selected) => (id === selected ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddMovie(movie) {
    setWatched((movies) => [...movies, movie]);

    // OPTION 1 - using localStorage from the handler function

    // we can't use watched in the localStorage, since is still stale state
    // that means that the watched will not be updated, since setWatched is asynchronous

    // to have access to the updated watched, we need to create a new array
    // and adding the new movie : 
    //localStorage.setItem('watched', JSON.stringify([...watched, movie]));
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  // OPTTION 2 - using localStorage from a useEffect function

  useEffect( function () {
    // in an useEffect we'll have acces to the updated watched prop
    // since the useEffect function will run each time the watched 
    // prop will change 
    localStorage.setItem('watched', JSON.stringify(watched));
  }, [watched])
 



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
