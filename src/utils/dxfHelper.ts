import {fabric} from 'fabric';
import * as three from 'three';
import {fromDxf} from 'three-dxf';

export const importDxf = (dxfString: string, canvas: fabric.Canvas) => {
  try {
    const loader = new three.FileLoader();
    loader.load(dxfString, (data) => {
      const dxf = fromDxf(data);
      dxf.children.forEach((child) => {
        if (child instanceof three.LineSegments) {
          const material = new fabric.Line(
            [
              child.geometry.vertices[0].x,
              child.geometry.vertices[0].y,
              child.geometry.vertices[1].x,
              child.geometry.vertices[1].y,
            ],
            {
              stroke: 'black',
            }
          );
          canvas.add(material);
        }
      });
    });
  } catch (error) {
    console.log('Error import DXF: ', error);
  }
};

export const exportDXF = (canvas: fabric.Canvas): string => {
  let dxfString =
    '0\nSECTION\n2\nHEADER\n0\nENDSEC\n0\nSECTION\n2\nTABLES\n0\nENDSEC\n0\nSECTION\n2\nBLOCKS\n0\nENDSEC\n0\nSECTION\n2\nENTITIES\n';
  canvas.getObjects().forEach((obj) => {
    if (obj.type === 'line') {
      const line = obj as fabric.Line;
      dxfString += `0\nLINE\n8\n0\n10\n${line.x1}\n20\n${line.y1}\n11\n${line.x2}\n21\n${line.y2}\n`;
    }
  });
  dxfString += '0\nENDSEC\n0\nEOF\n';
  return dxfString;
};
