import {FabricObject, Line} from 'fabric';

export type CustomFabricObject = FabricObject & {
  id?: string;
  name?: string;
  status?: boolean;
  isGuideline?: boolean;
};

export type PlainFabricObject = Record<string, any>;

export interface Guideline extends Line {
  id: string;
  isGuideline: boolean;
}

// export interface ObjectProperty {
//   left: string;
//   top: string;
//   width: string;
//   height: string;
//   diameter: string;
//   color: string;
//   strokeColor: string;
//   strokeWidth: string;
//   opacity: string;
//   scaleX: string;
//   scaleY: string;
//   radius: string;
//   textAlign: string;
//   fontFamily: string;
//   fontWeight: string;
//   fontSize: string;
//   fontStyle: string;
//   originX: string;
//   originY: string;
// }

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

export type ObjectProperty = Record<FabricObjectProperty, string>;

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

export interface UpdateObjectPorperty {
  key: FabricObjectProperty;
  value: string;
}
