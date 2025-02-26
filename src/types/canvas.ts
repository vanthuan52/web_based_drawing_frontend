import {FabricObjectProps, Line} from 'fabric';

export interface Guideline extends Line {
  id: string;
}

export interface ObjectProperty {
  left: string;
  top: string;
  width: string;
  height: string;
  diameter: string;
  color: string;
  strokeColor: string;
  strokeWidth: string;
  opacity: string;
  scaleX: string;
  scaleY: string;
  radius: string;
  textAlign: string;
  fontFamily: string;
  fontWeight: string;
  fontSize: string;
  fontStyle: string;
  originX: string;
  originY: string;
}

export type FabricObjectProperty =
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
  | 'radius'
  | 'textAlign'
  | 'fontFamily'
  | 'fontWeight'
  | 'fontSize'
  | 'fontStyle'
  | 'originX'
  | 'originY';

export type FabricObjectType =
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

export interface CanvasObject {
  id: string;
  type: FabricObjectType;
  props: Partial<FabricObjectProps>;
}

export interface UpdateObjectPorperty {
  key: FabricObjectProperty;
  value: string;
}
