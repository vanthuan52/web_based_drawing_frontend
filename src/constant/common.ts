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
  TOP: 'TOP',
  CENTER: 'center',
  BOTTOM: 'bottom',
};

export const TOOLTIP_CONTENT = {
  ZOOMING_RATIO: {
    id: 'zooming-ratio-tooltip',
    content: 'Scale ratio',
  },
};
