export interface IButtonProps {
  title: string | undefined;
  onClick?: () => void;
  style?: any;
  link?: string;
  full?: boolean;
  size?: "small" | "medium" | "lager" | "extra";
  disabled?: boolean;
  loading?: boolean;
  type?: "button" | "submit" | "reset";
  bg?: "danger" | "primary" | "secondary";
  classNameTitle?: string;
  icon?: any;
  checked?:boolean
}
export interface IToolbar {
  setFile: any,
  canvas: any,
  setIsPanning: (value: boolean) => void,
  setDrawingMode: (value: any) => void,
  drawingMode: string,
  setPolygonPoints: (value: any) => void,
  setStartPoint: (value: any) => void,
  strokeWidth:any,
  handleStrokeWidthChange:(value:any) => void,
  fontSize:any,
  handleFontSizeChange:(value:any) => void,
  textColor:any,
  handleTextColorChange:(value:any) => void,
  fontFamily:any,
  setFontFamily:(value:any) => void,
  textInput:any,
  setTextInput:(value:any) => void,
  handleAddText:() => void,
  isPannings:boolean,
  handleDownloadDXF:() => void,
  scale:any,
  handleFileUpload:(event:any) => void
}