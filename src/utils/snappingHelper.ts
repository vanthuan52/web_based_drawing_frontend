import {Canvas, Line, FabricObject} from 'fabric';
import {Guideline} from '@/types/canvas';

// Minimum distance to snap an object to a guideline
const SNAPPING_DISTANCE = 10;
export const CANVAS_POSITION = {
  VERTICAL: 'vertical',
  HORIZONTAL: 'horizontal',
  VERTICAL_LEFT: 'vertical-left',
  HORIZONTAL_TOP: 'horizontal-top',
  VERTICAL_RIGHT: 'vertical-right',
  HORIZONTAL_BOTTOM: 'horizontal-bottom',
  VERTICAL_CENTER: 'vertical-center',
  HORIZONTAL_CENTER: 'horizontal-center',
};

/**
 * Handles object movement and applies snapping logic
 * This function is triggered when an object is being moved. It checks the
 * object's position relative to the key points (edges and center of the canvas)
 * @param canvas
 * @param obj
 * @param guidelines
 * @param setGuidelines
 */
export const handleObjectMoving = (
  canvas: Canvas,
  obj: FabricObject,
  guidelines: Guideline[],
  setGuidelines: (guidelines: Guideline[]) => void
) => {
  if (!canvas || !obj) return;

  const canvasWidth = canvas.width ?? 0;
  const canvasHeight = canvas.height ?? 0;

  const left = obj.left ?? 0;
  const top = obj.top ?? 0;
  const right = left + (obj.width ?? 0) * (obj.scaleX ?? 1);
  const bottom = top + (obj.height ?? 0) * (obj.scaleY ?? 1);

  const centerX = left + ((obj.width ?? 0) * (obj.scaleX ?? 1)) / 2;
  const centerY = top + ((obj.height ?? 0) * (obj.scaleY ?? 1)) / 2;

  let newGuidelines: Guideline[] = [];
  clearGuidelines(canvas);

  let snapped = false;

  // Snap to left edge
  if (Math.abs(left) < SNAPPING_DISTANCE) {
    obj.set({left: 0});
    newGuidelines.push(
      addGuideline(canvas, 0, CANVAS_POSITION.VERTICAL_LEFT, 'vertical')
    );
    snapped = true;
  }

  // Snap to top edge
  if (Math.abs(top) < SNAPPING_DISTANCE) {
    obj.set({top: 0});
    newGuidelines.push(
      addGuideline(canvas, 0, CANVAS_POSITION.HORIZONTAL_TOP, 'horizontal')
    );
    snapped = true;
  }

  // Snap to right edge
  if (Math.abs(right - canvasWidth) < SNAPPING_DISTANCE) {
    obj.set({left: canvasWidth - (obj.width ?? 0) * (obj.scaleX ?? 1)});
    newGuidelines.push(
      addGuideline(
        canvas,
        canvasWidth,
        CANVAS_POSITION.VERTICAL_RIGHT,
        'vertical'
      )
    );
    snapped = true;
  }

  // Snap to bottom edge
  if (Math.abs(bottom - canvasHeight) < SNAPPING_DISTANCE) {
    obj.set({top: canvasHeight - (obj.height ?? 0) * (obj.scaleY ?? 1)});
    newGuidelines.push(
      addGuideline(
        canvas,
        canvasHeight,
        CANVAS_POSITION.HORIZONTAL_BOTTOM,
        'horizontal'
      )
    );
    snapped = true;
  }

  // snap to vertical center
  if (Math.abs(centerX - canvasWidth / 2) < SNAPPING_DISTANCE) {
    obj.set({
      left: canvasWidth / 2 - ((obj.width ?? 0) * (obj.scaleX ?? 1)) / 2,
    });
    newGuidelines.push(
      addGuideline(
        canvas,
        canvasWidth / 2,
        CANVAS_POSITION.VERTICAL_CENTER,
        'vertical'
      )
    );
    snapped = true;
  }

  // snap to horizontal center
  if (Math.abs(centerY - canvasHeight / 2) < SNAPPING_DISTANCE) {
    obj.set({
      top: canvasHeight / 2 - ((obj.height ?? 0) * (obj.scaleY ?? 1)) / 2,
    });
    newGuidelines.push(
      addGuideline(
        canvas,
        canvasHeight / 2,
        CANVAS_POSITION.HORIZONTAL_CENTER,
        'horizontal'
      )
    );
    snapped = true;
  }

  if (!snapped) {
    clearGuidelines(canvas);
  } else {
    setGuidelines(newGuidelines);
  }

  canvas.renderAll();
};

/**
 * Adds a vertical or horizontal guideline to the canvas
 * @param canvas
 * @param position Position x or y
 * @param id id of a guideline
 * @type Type of guideline
 */
const addGuideline = (
  canvas: Canvas,
  position: number,
  id: string,
  type: 'vertical' | 'horizontal'
): Guideline => {
  if (guidelineExists(canvas, id)) {
    return {} as Guideline;
  }

  const line =
    type === 'vertical'
      ? new Line([position, 0, position, canvas.height ?? 0], {
          id,
          stroke: 'red',
          strokeWidth: 1,
          selectable: false,
          evented: false,
          strokeDashArray: [5, 5],
          opacity: 0.8,
        })
      : new Line([0, position, canvas.width ?? 0, position], {
          id,
          stroke: 'red',
          strokeWidth: 1,
          selectable: false,
          evented: false,
          strokeDashArray: [5, 5],
          opacity: 0.8,
        });
  canvas.add(line);
  return line as Guideline;
};

/**
 * Clears all existing guidelines from the canvas
 */
export const clearGuidelines = (canvas: Canvas) => {
  const objects = canvas.getObjects('line') as Guideline[];
  objects.forEach((obj: Guideline) => {
    if (obj.id?.startsWith('vertical-') || obj.id?.startsWith('horizontal-')) {
      canvas.remove(obj);
    }
  });
  canvas.renderAll();
};

/**
 * Checks if a guideline already exists to avoid duplicates
 */
const guidelineExists = (canvas: Canvas, id: string) => {
  const objects = canvas.getObjects('line') as Guideline[];
  return objects.some((obj: Guideline) => obj.id === id);
};

// Old version of addGuideline
const createVerticalGuideline = (canvas: Canvas, x: number, id: string) => {
  return new Line([x, 0, x, canvas.height], {
    id,
    stroke: 'red',
    strokeWidth: 1,
    selectable: false,
    evented: false,
    strokeDashArray: [5, 5],
    opacity: 0.8,
  }) as Line;
};

// Old version of addGuideline
const createHorizontalGuideline = (canvas: Canvas, y: number, id: string) => {
  return new Line([0, y, canvas.width, y], {
    id,
    stroke: 'red',
    strokeWidth: 1,
    selectable: false,
    evented: false,
    strokeDashArray: [5, 5],
    opacity: 0.8,
  }) as Line;
};
