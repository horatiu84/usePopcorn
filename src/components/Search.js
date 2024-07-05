import { useEffect, useRef } from "react";

export default function Search({query, setQuery}) {

  // the wrong way to select a DOM element 

  /*
  useEffect( function () {
    const el = document.querySelector('.search');
    el.focus(); 
  }, [])

  */

  // using useRef

  const inputEl = useRef( null);

  useEffect( function () {

    function callback(e) {

      if(document.activeElement === inputEl.current) return;

      if(e.code ===  "Enter")
      inputEl.current.focus(); 
      setQuery("");
    }

    document.addEventListener("keydown", callback);

    return () => document.removeEventListener("keydown", callback);

  },[setQuery])


    return (
      <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        ref={inputEl}
      />
    );
  }