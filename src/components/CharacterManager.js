// CharacterManager.js
import React from 'react';

function CharacterManager({ data }) {
  return (
    <div>
      <h2>Characters</h2>
      {data.map((character, index) => (
        <p key={index}>{character.name}: {character.action}</p>
      ))}
    </div>
  );
}

export default CharacterManager;