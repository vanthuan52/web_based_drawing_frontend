import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {fabric} from 'fabric';
import Button from '@/components/Common/Button/Button';
import {useDrawingTools} from '@/hooks/useDrawingTools';

const FabricContext = createContext(null);

export const useFabricCanvas = () => useContext(FabricContext);

const CanvasProvider = ({children}) => {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);

  useEffect(() => {
    const fabricCanvas = new fabric.Canvas(canvasRef.current, {
      selection: true,
    });

    setCanvas(fabricCanvas);
    return () => fabricCanvas.dispose();
  }, []);

  return (
    <FabricContext.Provider value={{canvas}}>
      <cavans ref={canvasRef} className="" />
      {chilren}
    </FabricContext.Provider>
  );
};
