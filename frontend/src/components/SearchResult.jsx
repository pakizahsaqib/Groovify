import React from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import ArtistCard from "./Artist/ArtistCard";

function SearchResults() {
  const { searchResults } = useOutletContext();
  const navigate = useNavigate();

  return (
    <div>
      {searchResults.length > 0 ? (
        <>
          <h1 className="m-1 font-bold text-2xl p-4">
            Search Results: Artists
          </h1>
          <div className="flex overflow-auto p-4">
            {searchResults.map((item) => (
              <ArtistCard
                key={item.id}
                id={item.id}
                name={item.name}
                image={
                  item.images && item.images[0]
                    ? item.images[0].url
                    : "default-image-url.jpg"
                }
              />
            ))}
          </div>
        </>
      ) : (
        navigate("/main")
      )}
    </div>
  );
}

export default SearchResults;
