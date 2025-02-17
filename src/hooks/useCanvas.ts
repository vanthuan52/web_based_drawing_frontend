import React from 'react';
import {Canvas, Line, Polygon, Rect, Circle, Textbox} from 'fabric';

interface UseFabricCanvasProps {
  canvas: Canvas | null;
}
const useCanvas = ({canvas}: UseFabricCanvasProps) => {
  const addLine = () => {
    if (canvas) {
      const rect = new Line([70, 100, 100, 150], {
        left: 50,
        stroke: 'orange',
        strokeWidth: 1,
      });

      canvas.add(rect);
    }
  };

  const addRectangle = () => {
    if (canvas) {
      const rect = new Rect({
        top: 100,
        left: 50,
        width: 50,
        height: 50,
        fill: 'red',
      });
      canvas.add(rect);
    }
  };

  const addCircle = () => {
    if (canvas) {
      const rect = new Circle({
        radius: 100,
        left: 50,
        stroke: 'blue',
        strokeWidth: 1,
        fill: 'blue',
      });

      canvas.add(rect);
    }
  };

  const addPolygon = () => {
    if (canvas) {
      const rect = new Polygon(
        [
          {x: 200, y: 10},
          {x: 250, y: 50},
          {x: 250, y: 180},
          {x: 150, y: 180},
          {x: 150, y: 50},
        ],
        {
          fill: 'green',
        }
      );

      canvas.add(rect);
    }
  };

  const addText = () => {
    if (!canvas) return;

    const text = new Textbox('Enter text here', {
      left: 50,
      top: 50,
      fontSize: 24,
      fill: '#000000',
      fontFamily: 'Arial',
      width: 200,
      editable: true,
    });

    canvas.add(text);
  };

  return {addLine, addRectangle, addPolygon, addCircle, addText};
};

export default useCanvas;
