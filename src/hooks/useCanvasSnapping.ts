import {useState, useEffect} from 'react';
import {Canvas} from 'fabric/*';
import {handleObjectMoving, clearGuidelines} from '@/utils/snappingHelper';
import {Guideline} from '@/types/canvas';

interface UseCanvasSnappingProps {
  canvas: Canvas | null;
  guidelines: Guideline[];
  setGuidelines: any;
}
/**
 * This hook enables snapping an object to the edges and the
 * center of the canvas
 * It supports snapping to the left, right, and certer vertically,
 * as well as the top, bottom, and center horizontally
 * @param param0
 */
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
