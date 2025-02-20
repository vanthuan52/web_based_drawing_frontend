import {useState, useEffect} from 'react';
import {Canvas} from 'fabric/*';
import {handleObjectMoving, clearGuidelines} from '@/utils/snappingHelper';
import {Guideline} from '@/types/canvas';

interface UseCanvasSnappingProps {
  canvas: Canvas | null;
  guidelines: Guideline[];
  setGuidelines: any;
}
const useCanvasSnapping = ({
  canvas,
  guidelines,
  setGuidelines,
}: UseCanvasSnappingProps) => {
  useEffect(() => {
    if (!canvas) return;

    canvas.on('object:moving', (event: any) => {
      handleObjectMoving(canvas, event.target, guidelines, setGuidelines);
    });

    canvas.on('object:modified', () => {
      clearGuidelines(canvas);
    });
  }, [canvas]);
};

export default useCanvasSnapping;
