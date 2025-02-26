import {useState, useEffect} from 'react';
import {Canvas} from 'fabric/*';

interface UseCanvasSnappingProps {
  canvas: Canvas | null;
  dimensions: any;
  setDimensions: any;
}
const useCanvasResize = ({
  canvas,
  dimensions,
  setDimensions,
}: UseCanvasSnappingProps) => {
  // Firstly, grab the user's screen to set canvas width and height
  useEffect(() => {
    const handleResize = () => {
      setDimensions({width: window.innerWidth, height: window.innerHeight});
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });
};

export default useCanvasResize;
