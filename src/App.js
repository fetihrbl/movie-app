import './App.css';
import { useState } from 'react';
import ReactPlayer from 'react-player';
import movieTrailer from 'movie-trailer';

function App() {

  const [video, setVideo] = useState("");
  const [videoURL, setVideoURL] = useState("");
  const [error, setError] = useState(null);

  async function handleSearch() {
    setError(null);
    setVideoURL("");

    try {
      const url = await movieTrailer(video);
      if (url) {
        setVideoURL(url);
      } else {
        throw new Error("Trailer not found!");
      }
    } catch (err) {
      setError("⚠️ No trailer found. Try a different title.");
    }
  }

  return (
    <div className="App">
      <h1>🎬 Movie Trailer Finder</h1>
      <div className="search-box">
        <label>Search for a movie/show:</label>
        <input
          type='text'
          value={video}
          onChange={(e) => setVideo(e.target.value)}
          placeholder='Enter movie title...'
        />
        <button onClick={handleSearch}>🔍 Search</button>
      </div>
      {error && <p className="error">{error}</p>}
      {videoURL && (
        <ReactPlayer url={videoURL} controls={true} />
      )}
    </div>
  );
}

export default App;
