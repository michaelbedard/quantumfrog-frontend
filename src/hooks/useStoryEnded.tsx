import React, { useState } from 'react';

const useStoryEnded = () => {
  const [isStoryEnded, setIsStoryEnded] = useState(false);

  return [isStoryEnded, setIsStoryEnded] as const; // Ensures tuple typing
};

export default useStoryEnded;