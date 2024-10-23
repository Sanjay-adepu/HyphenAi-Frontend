// ScriptInput.js
import React, { useState } from 'react';

function ScriptInput({ onSubmit }) {
  const [scriptText, setScriptText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(scriptText);  // Submit the script text to parent component
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={scriptText}
        onChange={(e) => setScriptText(e.target.value)}
        placeholder="Enter your script here..."
        rows="10"
        cols="50"
      />
      <br />
      <button type="submit">Process Script</button>
    </form>
  );
}

export default ScriptInput;