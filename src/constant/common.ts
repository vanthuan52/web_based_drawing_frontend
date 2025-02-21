export const ROUTER_PATH = {
  home: '/',
  board: '/board',
  login: '/log-in',
  signup: '/sign-up',
};

export const CANVAS_OBJECT_TYPE = {
  TEXTBOX: 'textbox',
  TEXT: 'text',
  POLYGON: 'polygon',
  CIRCLE: 'circle',
  RECT: 'rect',
  LINE: 'line',
  POINT: 'point',
  ELLIPSE: 'ellipse',
};

export const FABRIC_OBJECT_PROPERTIES = {
  LEFT: 'left',
  RIGHT: 'right',
  TOP: 'top',
  BOTTOM: 'bottom',
  WIDTH: 'width',
  HEIGHT: 'height',
  DIAMETER: 'diameter',
  OPACITY: 'opacity',
};

export const DEFAULT_INITIAL_CANVAS = {
  id: 'canvas-1',
  name: 'Untitled-1',
  json: null,
  active: true,
};

export const TEXT_ALIGNMENT = {
  LEFT: 'left',
  CENTER: 'center',
  RIGHT: 'right',
};

export const VERTICAL_ALIGNMENT = {
  TOP: 'top',
  CENTER: 'center',
  BOTTOM: 'bottom',
};

export const TOOLTIP_CONTENT = {
  ZOOMING_RATIO: {
    id: 'zooming-ratio-tooltip',
    content: 'Scale ratio',
  },
  X_POSITION: {
    id: 'left-tooltip',
    content: 'Left',
  },
  Y_POSITION: {
    id: 'top-tooltip',
    content: 'Top',
  },
  WIDTH: {
    id: 'width-tooltip',
    content: 'Width',
  },
  HEIGHT: {
    id: 'height-tooltip',
    content: 'Height',
  },
  DIAMETER: {
    id: 'diameter-tooltip',
    content: 'Diameter',
  },
  OPACITY: {
    id: 'opacity-tooltip',
    content: 'Opacity',
  },
  FILL: {
    id: 'fill-tooltip',
    content: 'Background color',
  },
  STROKE_COLOR: {
    id: 'stroke-color-tooltip',
    content: 'Stroke color',
  },
  STROKE_WIDTH: {
    id: 'stroke-width-tooltip',
    content: 'Stroke width',
  },
  FONT_SIZE: {
    id: 'font-size-tooltip',
    content: 'Font size',
  },
  FONT_WEIGHT: {
    id: 'font-weight-tooltip',
    content: 'Font weight',
  },
  FONT_FAMILY: {
    id: 'font-family-tooltip',
    content: 'Font family',
  },
  ALIGN_LEFT: {
    id: 'align-left-tooltip',
    content: 'Align left',
  },
  ALIGN_CENTER: {
    id: 'align-center-tooltip',
    content: 'Align center',
  },
  ALIGN_RIGHT: {
    id: 'align-right-tooltip',
    content: 'Align right',
  },
  HIDE_SHOW: {
    id: 'hide-show-tooltip',
    content: 'Hide/Shon',
  },
  MOVE_UP: {
    id: 'move-up-tooltip',
    content: 'Move up',
  },
  MOVE_DOWN: {
    id: 'move-down-tooltip',
    content: 'Move down',
  },
};

export const CANVAS_TOOLS = {
  SELECT: 'select',
  ZOOM: 'zooming',
  HAND: 'panning', // hand tool
  TEXT: 'text',
  RECT: 'rect',
  CIRCLE: 'circle',
  POLYGON: 'polygon',
  LINE: 'line',
  PENCIL: 'pencil',
  UNDO: 'undo',
  REDO: 'redo',
};
