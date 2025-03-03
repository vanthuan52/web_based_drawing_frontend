import {useState, useEffect} from 'react';
import {Canvas} from 'fabric';
import {
  handleObjectMoving,
  clearGuidelines,
} from '@/utils/objectAlignmentHelper';
import {CustomFabricObject} from '@/types/canvas';

/**
 * useObjectAlignment
 *
 * This hook provides alignment functionality for objects on a Fabric.js canvas.
 * It allows objects to align with other objects' edges and centers.
 *
 * Supported snapping positions:
 * - Object-to-object alignment for precise positioning
 */

interface UseObjectAlignmentProps {
  canvas: Canvas | null;
  guidelines: CustomFabricObject[];
  setGuidelines: any;
}
const useObjectAlignment = ({
  canvas,
  guidelines,
  setGuidelines,
}: UseObjectAlignmentProps) => {
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

export default useObjectAlignment;
