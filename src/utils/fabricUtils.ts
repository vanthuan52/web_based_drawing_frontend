import {Circle, Line} from 'fabric';

export const createCircle = (x: number, y: number, radius: number) => {
  return new Circle({
    left: x,
    top: y,
    radius,
    fill: 'green',
    selectable: true,
  });
};

export const createLine = (x1: number, y1: number, x2: number, y2: number) => {
  return new Line([x1, y1, x2, y2], {stroke: 'blue', strokeWidth: 3});
};
