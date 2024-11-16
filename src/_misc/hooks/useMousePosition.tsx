
  import React, { useState } from 'react';

const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  return [mousePosition, setMousePosition] as const; // Ensures tuple typing
};

export default useMousePosition;