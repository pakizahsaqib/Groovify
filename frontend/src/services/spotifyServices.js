import axios from "axios";

const BASE_URL = "https://api.spotify.com/v1";

const spotifyServices = {
  getPlaybackState: (token) =>
    axios.get(`${BASE_URL}/me/player`, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  getAvailableDevices: (token) =>
    axios.get(`${BASE_URL}/me/player/devices`, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  getCurrentlyPlayingTrack: async (token) => {
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
        console.warn("No track is currently playing.");
        return { data: { item: null } };
      }
    } catch (err) {
      if (err.response?.status === 204) {
        console.warn("No content: Nothing is currently playing.");
        return { data: { item: null } };
      }
      throw err;
    }
  },

  startResumePlayback: (token, deviceId, uris) =>
    axios.put(
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
    ),

  pausePlayback: (token) =>
    axios.put(
      `${BASE_URL}/me/player/pause`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    ),

  skipToNextTrack: (token) =>
    axios.post(
      `${BASE_URL}/me/player/next`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    ),

  skipToPreviousTrack: (token) =>
    axios.post(
      `${BASE_URL}/me/player/previous`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    ),

  seekToPosition: (token, positionMs) =>
    axios.put(
      `${BASE_URL}/me/player/seek`,
      {},
      {
        params: { position_ms: positionMs },
        headers: { Authorization: `Bearer ${token}` },
      }
    ),

  setRepeatMode: (token, state) =>
    axios.put(
      `${BASE_URL}/me/player/repeat`,
      {},
      { params: { state }, headers: { Authorization: `Bearer ${token}` } }
    ),

  setPlaybackVolume: (token, volumePercent) =>
    axios.put(
      `${BASE_URL}/me/player/volume`,
      {},
      {
        params: { volume_percent: volumePercent },
        headers: { Authorization: `Bearer ${token}` },
      }
    ),

  setShuffleState: (token, state) =>
    axios.put(
      `${BASE_URL}/me/player/shuffle`,
      {},
      { params: { state }, headers: { Authorization: `Bearer ${token}` } }
    ),
};

export default spotifyServices;
