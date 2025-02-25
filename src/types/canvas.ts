import {FabricObjectProps, Line} from 'fabric';

export interface Guideline extends Line {
  id: string;
}
export interface FabricObjectProperty {
  left: string; // x coordinate
  top: string; // y coordinate
  width: string;
  height: string;
  diameter: string;
  color: string;
  strokeColor: string;
  strokeWidth: string;
  opacity: string;
}

export type ObjectProperty =
  | 'left'
  | 'top'
  | 'width'
  | 'height'
  | 'diameter'
  | 'color'
  | 'strokeColor'
  | 'strokeWidth'
  | 'opacity'
  | 'scaleX'
  | 'scaleY'
  | 'radius';

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

export interface CanvasObject {
  id: string;
  type: CanvasObjectType;
  props: Partial<FabricObjectProps>;
}

export interface UpdateObjectPorperty {
  key: ObjectProperty;
  value: string;
}
