import {Canvas, Line, FabricObject} from 'fabric';
import {Guideline} from '@/types/canvas';

const SNAPPING_DISTANCE = 10;

export const handleObjectMoving = (
  canvas: Canvas,
  obj: FabricObject,
  guidelines: Guideline[],
  setGuidelines: (guidelines: Guideline[]) => void
) => {
  if (!canvas || !obj) return;

  const objects = canvas.getObjects().filter((o) => o !== obj);
  let newGuidelines: Guideline[] = [];
  clearGuidelines(canvas);

  let snapped = false;

  objects.forEach((other) => {
    if (!other.left || !other.top || !other.width || !other.height) return;

    const otherLeft = other.left;
    const otherTop = other.top;
    const otherRight = otherLeft + other.width * (other.scaleX ?? 1);
    const otherBottom = otherTop + other.height * (other.scaleY ?? 1);
    const otherCenterX = otherLeft + (other.width * (other.scaleX ?? 1)) / 2;
    const otherCenterY = otherTop + (other.height * (other.scaleY ?? 1)) / 2;

    const objLeft = obj.left ?? 0;
    const objTop = obj.top ?? 0;
    const objRight = objLeft + (obj.width ?? 0) * (obj.scaleX ?? 1);
    const objBottom = objTop + (obj.height ?? 0) * (obj.scaleY ?? 1);
    const objCenterX = objLeft + ((obj.width ?? 0) * (obj.scaleX ?? 1)) / 2;
    const objCenterY = objTop + ((obj.height ?? 0) * (obj.scaleY ?? 1)) / 2;

    // Snap to left, right, center X of other object
    if (Math.abs(objLeft - otherLeft) < SNAPPING_DISTANCE) {
      obj.set({left: otherLeft});
      newGuidelines.push(addGuideline(canvas, otherLeft, 'vertical'));
      snapped = true;
    }
    if (Math.abs(objRight - otherRight) < SNAPPING_DISTANCE) {
      obj.set({left: otherRight - (obj.width ?? 0) * (obj.scaleX ?? 1)});
      newGuidelines.push(addGuideline(canvas, otherRight, 'vertical'));
      snapped = true;
    }
    if (Math.abs(objCenterX - otherCenterX) < SNAPPING_DISTANCE) {
      obj.set({
        left: otherCenterX - ((obj.width ?? 0) * (obj.scaleX ?? 1)) / 2,
      });
      newGuidelines.push(addGuideline(canvas, otherCenterX, 'vertical'));
      snapped = true;
    }

    // Snap to top, bottom, center Y of other object
    if (Math.abs(objTop - otherTop) < SNAPPING_DISTANCE) {
      obj.set({top: otherTop});
      newGuidelines.push(addGuideline(canvas, otherTop, 'horizontal'));
      snapped = true;
    }
    if (Math.abs(objBottom - otherBottom) < SNAPPING_DISTANCE) {
      obj.set({top: otherBottom - (obj.height ?? 0) * (obj.scaleY ?? 1)});
      newGuidelines.push(addGuideline(canvas, otherBottom, 'horizontal'));
      snapped = true;
    }
    if (Math.abs(objCenterY - otherCenterY) < SNAPPING_DISTANCE) {
      obj.set({
        top: otherCenterY - ((obj.height ?? 0) * (obj.scaleY ?? 1)) / 2,
      });
      newGuidelines.push(addGuideline(canvas, otherCenterY, 'horizontal'));
      snapped = true;
    }
  });

  if (!snapped) {
    clearGuidelines(canvas);
  } else {
    setGuidelines(newGuidelines);
  }

  canvas.renderAll();
};

const addGuideline = (
  canvas: Canvas,
  position: number,
  type: 'vertical' | 'horizontal'
): Guideline => {
  const line =
    type === 'vertical'
      ? new Line([position, 0, position, canvas.height ?? 0], {
          stroke: 'blue',
          strokeWidth: 1,
          selectable: false,
          evented: false,
          strokeDashArray: [5, 5],
          opacity: 0.8,
        })
      : new Line([0, position, canvas.width ?? 0, position], {
          stroke: 'blue',
          strokeWidth: 1,
          selectable: false,
          evented: false,
          strokeDashArray: [5, 5],
          opacity: 0.8,
        });
  canvas.add(line);
  return line as Guideline;
};

export const clearGuidelines = (canvas: Canvas) => {
  const objects = canvas.getObjects('line') as Guideline[];
  objects.forEach((obj) => canvas.remove(obj));
  canvas.renderAll();
};
