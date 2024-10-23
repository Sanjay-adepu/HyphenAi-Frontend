// App.js
import React, { useState } from 'react';
import './styles.css';
import ScriptInput from './components/ScriptInput';
import SceneRenderer from './components/SceneRenderer';
import CharacterManager from './components/CharacterManager';
import VideoPreview from './components/VideoPreview';
import APIService from './services/APIService';

function App() {
  const [script, setScript] = useState(''); // Stores the user's script input
  const [generatedData, setGeneratedData] = useState(null); // Data returned from the backend after parsing the script
  const [loading, setLoading] = useState(false); // State for loading animation while waiting for backend response
  const [videoUrl, setVideoUrl] = useState(null); // Stores the video preview URL after generation

  // Handle script submission
  const handleScriptSubmit = async (scriptText) => {
    setLoading(true);
    setScript(scriptText);

    try {
      // Call the backend API to process the script and generate data
      const response = await APIService.processScript(scriptText);
      setGeneratedData(response.data); // Parsed script data from backend
      setLoading(false);
    } catch (error) {
      console.error('Error during script processing:', error);
      setLoading(false);
    }
  };

  // Handle video generation
  const handleGenerateVideo = async () => {
    if (!generatedData) {
      alert('Please input a script and process it first!');
      return;
    }

    try {
      setLoading(true);
      // Call the backend API to generate the video based on the parsed data
      const response = await APIService.generateVideo(generatedData);
      setVideoUrl(response.data.videoUrl); // URL for video preview
      setLoading(false);
    } catch (error) {
      console.error('Error generating video:', error);
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>HypenAi - 3D Animated Video Generator</h1>

      {/* Script Input Component */}
      <ScriptInput onSubmit={handleScriptSubmit} />

      {/* Loading state */}
      {loading && <p>Loading...</p>}

      {/* Display Character Manager and Scene Renderer only after script is processed */}
      {generatedData && !loading && (
        <>
          {/* Manage and display characters */}
          <CharacterManager data={generatedData.characters} />

          {/* Render the scene */}
          <SceneRenderer data={generatedData.scenes} />
          
          {/* Button to generate video */}
          <button onClick={handleGenerateVideo}>Generate Video</button>
        </>
      )}

      {/* Video preview component */}
      {videoUrl && !loading && <VideoPreview videoUrl={videoUrl} />}
    </div>
  );
}

export default App;