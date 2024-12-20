import React from "react";
import ArtistCard from "./ArtistCard";

const Home = ({ searchResults }) => {
  return (
    <>
      <div className="flex items-center gap-2 mt-4">
        <p className="bg-white text-black px-4 py-1 rounded-2xl cursor-pointer">
          All
        </p>
        <p className="bg-neutral-700 hover:bg-white hover:text-black px-4 py-1 rounded-2xl cursor-pointer">
          Music
        </p>
        <p className="bg-neutral-700 hover:bg-white hover:text-black px-4 py-1 rounded-2xl cursor-pointer">
          Podcast
        </p>
      </div>
      <div className=" bg-neutral-900 overflow-auto">
        <div className="mb-4">
          {searchResults && (
            <h1 className="flex femy-5 font-bold text-2xl my-4">
              Search Results: Artists
            </h1>
          )}
          <div className="flex overflow-auto">
            {searchResults.length > 0 &&
              searchResults.map((item) => (
                <>
                  <ArtistCard
                    id={item.id}
                    name={item.name}
                    image={
                      item.images && item.images[0]
                        ? item.images[0].url
                        : "default-image-url.jpg"
                    }
                  />
                </>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
{
  /*
  // import React, { useEffect, useState } from "react";
  // import { getArtists, getAlbums, getTracks } from "../services/api";
  // import ArtistCard from "./ArtistCard";
  // import AlbumCard from "./AlbumCard";
  // const Home = () => {
  //   const [artists, setArtists] = useState([]);
  //   const [albums, setAlbums] = useState([]);
  //   const [tracks, setTracks] = useState([]);
  //   useEffect(() => {
  //     getArtists().then((data) => setArtists(data));
  //     getAlbums().then((data) => setAlbums(data));
  //     getTracks().then((data) => setTracks(data));
  //   }, []);
  //   return (
  //     <>
  //       <div className="mb-4">
  //         <h1 className="my-5 font-bold text-2xl">Popular Artists</h1>
  //         <div className="flex overflow-auto">
  //           {artists.map((artist) => (
  //             <ArtistCard key={artist.id} artist={artist} />
  //           ))}
  //         </div>
  //       </div>
  //       <div className="mb-4">
  //         <h1 className="my-5 font-bold text-2xl">Featured Albums</h1>
  //         <div className="flex overflow-auto">
  //           {albums.map((album) => (
  //             <AlbumCard key={album.id} album={album} />
  //           ))}
  //         </div>
  //       </div>
  //       <div className="mb-4">
  //         <h1 className="my-5 font-bold text-2xl">Today's Biggest Hits</h1>
  //         <div className="flex overflow-auto">
  //           {tracks.map((track) => (
  //             <TrackCard key={track.id} track={track} />
  //           ))}
  //         </div>
  //       </div>
  //     </>
  //   );
  // };
  // export default Home; */
}
