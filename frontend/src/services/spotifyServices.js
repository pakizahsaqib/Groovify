import axios from "axios";

const BASE_URL = "https://api.spotify.com/v1";

const spotifyServices = {
  getPlaybackState: async (token) => {
    if (!token) {
      console.error("Error: Token is required to fetch playback state.");
      return null;
    }

    try {
      const response = await axios.get(`${BASE_URL}/me/player`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error(
        "Error fetching playback state:",
        error.response?.data || error.message
      );
      return null;
    }
  },

  getAvailableDevices: async (token) => {
    if (!token) {
      console.error("Error: Token is required to fetch available devices.");
      return null;
    }

    try {
      const response = await axios.get(`${BASE_URL}/me/player/devices`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error(
        "Error fetching available devices:",
        error.response?.data || error.message
      );
      return null;
    }
  },

  getCurrentlyPlayingTrack: async (token) => {
    if (!token) {
      console.error(
        "Error: Token is required to fetch the currently playing track."
      );
      return { data: { item: null } };
    }

    try {
      const response = await axios.get(
        `${BASE_URL}/me/player/currently-playing`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data && response.data.item) {
        return response;
      } else {
        console.warn("Warning: No track is currently playing.");
        return { data: { item: null } };
      }
    } catch (error) {
      if (error.response?.status === 204) {
        console.warn("No content: Nothing is currently playing.");
        return { data: { item: null } };
      }
      console.error(
        "Error fetching currently playing track:",
        error.response?.data || error.message
      );
      return { data: { item: null } };
    }
  },

  startResumePlayback: async (token, deviceId, uris) => {
    if (!token) {
      console.error("Error: Token is required to start/resume playback.");
      return null;
    }

    try {
      const response = await axios.put(
        `${BASE_URL}/me/player/play`,
        { uris },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            device_id: deviceId,
          },
        }
      );
      console.log("Playback started/resumed successfully.");
      return response.data;
    } catch (error) {
      console.error(
        "Error starting/resuming playback:",
        error.response?.data || error.message
      );
      return null;
    }
  },

  pausePlayback: async (token) => {
    if (!token) {
      console.error("Error: Token is required to pause playback.");
      return null;
    }

    try {
      const response = await axios.put(
        `${BASE_URL}/me/player/pause`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Playback paused successfully.");
      return response.data;
    } catch (error) {
      console.error(
        "Error pausing playback:",
        error.response?.data || error.message
      );
      return null;
    }
  },

  skipToNextTrack: async (token) => {
    if (!token) {
      console.error("Error: Token is required to skip to the next track.");
      return null;
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/me/player/next`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Skipped to the next track successfully.");
      return response.data;
    } catch (error) {
      console.error(
        "Error skipping to the next track:",
        error.response?.data || error.message
      );
      return null;
    }
  },

  skipToPreviousTrack: async (token) => {
    if (!token) {
      console.error("Error: Token is required to skip to the previous track.");
      return null;
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/me/player/previous`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Skipped to the previous track successfully.");
      return response.data;
    } catch (error) {
      console.error(
        "Error skipping to the previous track:",
        error.response?.data || error.message
      );
      return null;
    }
  },

  seekToPosition: async (token, positionMs) => {
    if (!token) {
      console.error("Error: Token is required to seek to a position.");
      return null;
    }

    try {
      const response = await axios.put(
        `${BASE_URL}/me/player/seek`,
        {},
        {
          params: { position_ms: positionMs },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Seeked to position successfully.");
      return response.data;
    } catch (error) {
      console.error(
        "Error seeking to position:",
        error.response?.data || error.message
      );
      return null;
    }
  },

  setRepeatMode: async (token, state) => {
    if (!token) {
      console.error("Error: Token is required to set repeat mode.");
      return null;
    }

    try {
      const response = await axios.put(
        `${BASE_URL}/me/player/repeat`,
        {},
        { params: { state }, headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Repeat mode set successfully.");
      return response.data;
    } catch (error) {
      console.error(
        "Error setting repeat mode:",
        error.response?.data || error.message
      );
      return null;
    }
  },

  setPlaybackVolume: async (token, volumePercent) => {
    if (!token) {
      console.error("Error: Token is required to set playback volume.");
      return null;
    }

    try {
      const response = await axios.put(
        `${BASE_URL}/me/player/volume`,
        {},
        {
          params: { volume_percent: volumePercent },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Playback volume set successfully.");
      return response.data;
    } catch (error) {
      console.error(
        "Error setting playback volume:",
        error.response?.data || error.message
      );
      return null;
    }
  },

  setShuffleState: async (token, state) => {
    if (!token) {
      console.error("Error: Token is required to set shuffle state.");
      return null;
    }

    try {
      const response = await axios.put(
        `${BASE_URL}/me/player/shuffle`,
        {},
        { params: { state }, headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Shuffle state set successfully.");
      return response.data;
    } catch (error) {
      console.error(
        "Error setting shuffle state:",
        error.response?.data || error.message
      );
      return null;
    }
  },
};

export default spotifyServices;
