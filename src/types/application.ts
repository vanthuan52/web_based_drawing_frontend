import {FabricObjectType} from './canvas';

export type ApplicationTool =
  | FabricObjectType
  | 'pen' // drawing
  | 'select'
  | 'zooming'
  | 'panning'
  | 'undo'
  | 'redo'
  | 'clear'
  | 'none';

export type ToolItem = {
  id: ApplicationTool;
  label: string;
  icon: JSX.Element;
  action?: (tool: ApplicationTool) => void;
};

export type ToolItems = Record<string, ToolItem>;
