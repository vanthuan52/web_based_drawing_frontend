import {Line} from 'fabric';

export interface Guideline extends Line {
  id: string;
}

export interface FabricObjectProperty {
  type: string;
  left: number; // x coordinate
  top: number; // y coordinate
  width: number;
  height: number;
  color: string;
  diameter: number;
}

export type CanvasObjectType =
  | 'textbox'
  | 'text'
  | 'path'
  | 'polyline'
  | 'line'
  | 'rect'
  | 'circle'
  | 'polygon'
  | 'point'
  | 'pencil'
  | 'ellipse';

export type CanvasTool =
  | CanvasObjectType
  | 'pen'
  | 'select'
  | 'zooming'
  | 'panning'
  | 'undo'
  | 'redo';
