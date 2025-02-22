import {useState, useEffect} from 'react';
import {Canvas} from 'fabric';
import {
  handleObjectMoving,
  clearGuidelines,
} from '@/utils/objectSnappingHelper';
import {Guideline} from '@/types/canvas';

/**
 * useObjectSnapping
 *
 * This hook provides snapping functionality for objects on a Fabric.js canvas.
 * It allows objects to align with other objects' edges and centers.
 *
 * Supported snapping positions:
 * - Object-to-object alignment for precise positioning
 */

interface UseObjectSnappingProps {
  canvas: Canvas | null;
  guidelines: Guideline[];
  setGuidelines: any;
}
const useObjectSnapping = ({
  canvas,
  guidelines,
  setGuidelines,
}: UseObjectSnappingProps) => {
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

export default useObjectSnapping;
