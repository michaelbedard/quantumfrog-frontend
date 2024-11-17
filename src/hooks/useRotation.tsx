import React, { useState } from 'react';

const useRotation = () => {
  const [rotation, setRotation] = useState(0);

  return [rotation, setRotation] as const; // Ensures tuple typing
};

export default useRotation;