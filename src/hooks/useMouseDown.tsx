
import React, { useState } from 'react';

const useMouseDown = () => {
  const [mouseDown, setMouseDown] = useState<boolean>(false);

  return [mouseDown, setMouseDown] as const; // Ensures tuple typing
};

export default useMouseDown;