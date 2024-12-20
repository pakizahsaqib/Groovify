import axios from "axios";

export const getArtists = async () => {
  try {
    const response = await axios.get("http://localhost:3000/artists");
    return response.data;
  } catch (error) {
    console.error("Error fetching artists:", error);
    return [];
  }
};

export const getAlbums = async () => {
  try {
    const response = await axios.get("http://localhost:3000/albums");
    return response.data;
  } catch (error) {
    console.error("Error fetching albums:", error);
    return [];
  }
};

export const getTracks = async () => {
  try {
    const response = await axios.get("http://localhost:3000/tracks");
    return response.data;
  } catch (error) {
    console.error("Error fetching tracks:", error);
    return [];
  }
};
