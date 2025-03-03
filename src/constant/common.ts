import {DEFAULT_OBJECT_COLOR} from './string';

export const ROUTER_PATH = {
  home: '/',
  board: '/board',
  login: '/log-in',
  signup: '/sign-up',
};

export const CANVAS_POSITION = {
  vertical: 'vertical',
  horizontal: 'horizontal',
  vertical_left: 'vertical-left',
  horizontal_top: 'horizontal-top',
  vertical_right: 'vertical-right',
  horizontal_bottom: 'horizontal-bottom',
  vertical_center: 'vertical-center',
  horizontal_center: 'horizontal-center',
};

export const CANVAS_OBJECT_TYPE = {
  textbox: 'textbox',
  text: 'text',
  polygon: 'polygon',
  circle: 'circle',
  rect: 'rect',
  line: 'line',
  point: 'point',
  ellipse: 'ellipse',
  path: 'path',
};

export const FABRIC_OBJECT_PROPERTIES = {
  left: 'left',
  right: 'right',
  top: 'top',
  bottom: 'bottom',
  width: 'width',
  height: 'height',
  diameter: 'diameter',
  opacity: 'opacity',
};

export const DEFAULT_INITIAL_CANVAS = {
  id: 'canvas-1',
  name: 'Page 1',
  json: null,
  active: true,
};

export const TEXT_ALIGNMENT = {
  left: 'left',
  center: 'center',
  right: 'right',
};

export const VERTICAL_ALIGNMENT = {
  top: 'top',
  center: 'center',
  bottom: 'bottom',
};

export const TOOLTIP_CONTENT = {
  zooming_ratio: {
    id: 'zooming-ratio-tooltip',
    content: 'Scale ratio',
  },
  x_position: {
    id: 'left-tooltip',
    content: 'Left',
  },
  y_position: {
    id: 'top-tooltip',
    content: 'Top',
  },
  width: {
    id: 'width-tooltip',
    content: 'Width',
  },
  height: {
    id: 'height-tooltip',
    content: 'Height',
  },
  diameter: {
    id: 'diameter-tooltip',
    content: 'Diameter',
  },
  opacity: {
    id: 'opacity-tooltip',
    content: 'Opacity',
  },
  fill: {
    id: 'fill-tooltip',
    content: 'Background color',
  },
  stroke_color: {
    id: 'stroke-color-tooltip',
    content: 'Stroke color',
  },
  stroke_width: {
    id: 'stroke-width-tooltip',
    content: 'Stroke width',
  },
  font_size: {
    id: 'font-size-tooltip',
    content: 'Font size',
  },
  font_weight: {
    id: 'font-weight-tooltip',
    content: 'Font weight',
  },
  font_family: {
    id: 'font-family-tooltip',
    content: 'Font family',
  },
  align_left: {
    id: 'align-left-tooltip',
    content: 'Align left',
  },
  align_center: {
    id: 'align-center-tooltip',
    content: 'Align center',
  },
  align_right: {
    id: 'align-right-tooltip',
    content: 'Align right',
  },
  align_top: {
    id: 'align-top-tooltip',
    content: 'Align top',
  },
  align_middle: {
    id: 'align-middle-tooltip',
    content: 'Align middle',
  },
  align_bottom: {
    id: 'align-bottom-tooltip',
    content: 'Align bottom',
  },
  hide_show: {
    id: 'hide-show-tooltip',
    content: 'Hide/Show',
  },
  move_up: {
    id: 'move-up-tooltip',
    content: 'Move up',
  },
  move_down: {
    id: 'move-down-tooltip',
    content: 'Move down',
  },
  delete_button: {
    id: 'delete-button-tooltip',
    content: 'Delete layer',
  },
};

export const CANVAS_TOOLS = {
  select: 'select',
  zooming: 'zooming',
  panning: 'panning', // hand tool
  text: 'text',
  rect: 'rect',
  circle: 'circle',
  polygon: 'polygon',
  line: 'line',
  pencil: 'pencil',
  undo: 'undo',
  redo: 'redo',
};

export const DEFAULT_OBJECT_PROPERTIES = {
  left: '0',
  top: '0',
  width: '0',
  height: '0',
  diameter: '0',
  color: DEFAULT_OBJECT_COLOR,
  strokeColor: DEFAULT_OBJECT_COLOR,
  strokeWidth: '1',
  opacity: '100',
  scaleX: '1',
  scaleY: '1',
  radius: '1',
  textAlign: 'left',
  fontFamily: 'Inter',
  fontSize: '24',
  fontWeight: 'normal',
  fontStyle: 'normal',
  originX: 'left',
  originY: 'top',
};
