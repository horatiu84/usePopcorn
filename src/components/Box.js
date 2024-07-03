import { useState } from "react";
export default function Box({ children }) {
    const [isOpen, setIsOpen] = useState(true);
  
    return (
      <div className="box">
        <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
          {isOpen ? "–" : "+"}
        </button>
        {isOpen && children}
      </div>
    );
  }
  
  // we don't need WatchedBox anymore, since we reuse the Box component!
  
  /*
  function WatchedBox() {
    const [isOpen2, setIsOpen2] = useState(true);
  
    return (
      <div className="box">
        <button
          className="btn-toggle"
          onClick={() => setIsOpen2((open) => !open)}
        >
          {isOpen2 ? "-" : "+"}
        </button>
        {isOpen2 && (
          <>
            <WatchedSummary watched={watched} />
            <WatchedMovieList watched={watched} />
          </>
        )}
      </div>
    );
  }
  */