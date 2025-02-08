/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef, useEffect, useCallback } from "react";
import { fabric } from "fabric";
import Toolbars from "./toolBar";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import {
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { MenuIcon } from "lucide-react";
import { DrawingMode, Point } from "../constant/common";
import useMultiSelect from "../hooks/useMultiSelect";

const DXFViewer: React.FC = () => {
  const [file, setFile] = useState<any>(null);
  const [drawingMode, setDrawingMode] = useState<DrawingMode>("none");
  const [startPoint, setStartPoint] = useState<Point | null>(null);
  const [polygonPoints, setPolygonPoints] = useState<Point[]>([]);
  const [strokeWidth, setStrokeWidth] = useState<number>(1);
  const [textInput, setTextInput] = useState<string>("");
  const [fontSize, setFontSize] = useState<number>(24);
  const [textColor, setTextColor] = useState<string>("#000000");
  const [fontFamily, setFontFamily] = useState<string>("Arial");
  const [isPannings, setIsPanning] = useState<boolean>(false);
  const [scale, setScale] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [imageData, setImageData] = useState<HTMLImageElement | null>(null);

  const drawings = [
    { id: 1, name: "Drawing 1" },
    { id: 2, name: "Drawing 2" },
    { id: 3, name: "Drawing 3" },
  ];

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvas = useRef<fabric.Canvas | null>(null);
  const currentLine = useRef<fabric.Line | null>(null);
  const currentPolygon = useRef<fabric.Polygon | null>(null);
  const currentCircle = useRef<fabric.Circle | null>(null);
  const workerRef = useRef<Worker | null>(null);

  const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
  useEffect(() => {
    if (isDarkMode) setTextColor("#FFFFFF");
  }, [isDarkMode]);

  // Reduce image resolution for performance
  const reduceImageResolution = (img: HTMLImageElement): string => {
    const canvasTemp = document.createElement("canvas");
    const ctx = canvasTemp.getContext("2d");
    const scaleFactor = 0.5;
    canvasTemp.width = img.width * scaleFactor;
    canvasTemp.height = img.height * scaleFactor;
    if (ctx) ctx.drawImage(img, 0, 0, canvasTemp.width, canvasTemp.height);
    return canvasTemp.toDataURL();
  };

  // Convert Fabric canvas to DXF string
  const canvasToDXF = (canvasObj: fabric.Canvas): string => {
    let dxfContent =
      "0\nSECTION\n2\nHEADER\n0\nENDSEC\n0\nSECTION\n2\nTABLES\n0\nENDSEC\n0\nSECTION\n2\nBLOCKS\n0\nENDSEC\n0\nSECTION\n2\nENTITIES\n";
    canvasObj.getObjects().forEach((obj) => {
      if (obj.type === "line") {
        const line = obj as fabric.Line;
        dxfContent += `0\nLINE\n8\n0\n10\n${line.x1}\n20\n${line.y1}\n30\n0.0\n11\n${line.x2}\n21\n${line.y2}\n31\n0.0\n`;
      } else if (obj.type === "circle") {
        const circle = obj as fabric.Circle;
        const left = circle.left ?? 0;
        const top = circle.top ?? 0;
        const radius = circle.radius ?? 0;
        dxfContent += `0\nCIRCLE\n8\n0\n10\n${left + radius}\n20\n${
          top + radius
        }\n30\n0.0\n40\n${radius}\n`;
      } else if (obj.type === "polyline") {
        const points = (obj as fabric.Polyline).points;
        if (points && points.length > 0) {
          dxfContent += `0\nPOLYLINE\n8\n0\n10\n${points[0].x}\n20\n${points[0].y}\n30\n0.0\n`;
          points.slice(1).forEach((point) => {
            dxfContent += `0\nVERTEX\n8\n0\n10\n${point.x}\n20\n${point.y}\n30\n0.0\n`;
          });
          dxfContent += "0\nSEQEND\n";
        }
      }
    });
    dxfContent += "0\nENDSEC\n0\nSECTION\n2\nOBJECTS\n0\nENDSEC\n0\nEOF\n";
    return dxfContent;
  };

  // Download DXF file
  const handleDownloadDXF = useCallback(() => {
    if (canvas.current) {
      const dxfString = canvasToDXF(canvas.current);
      const blob = new Blob([dxfString], { type: "application/dxf" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "drawing.dxf";
      link.click();
    }
  }, []);

  // Toggle the left drawer open/close
  const toggleDrawer = (open: boolean) => setIsDrawerOpen(open);

  // Handle drawing selection from the list
  const handleClickItem = (drawing: any) => {
    console.log(`Selected: ${drawing.name}`);
  };

  // Initialize Fabric canvas (runs only once)
  useEffect(() => {
    if (canvasRef.current && !canvas.current) {
      canvas.current = new fabric.Canvas(canvasRef.current);
    }
  }, []);

  // Load background image
  useEffect(() => {
    const imageUrl = "your-large-image-url.png";
    const img = new Image();
    img.onload = () => {
      const reducedSrc = reduceImageResolution(img);
      const newImg = new Image();
      newImg.src = reducedSrc;
      setImageData(newImg);
    };
    img.src = imageUrl;
  }, []);

  // Add background image to the canvas once loaded
  useEffect(() => {
    if (imageData && canvas.current) {
      fabric.Image.fromURL(imageData.src, (img) => {
        canvas.current?.add(img);
      });
    }
  }, [imageData]);

  // Object hover and selection highlighting
  useEffect(() => {
    if (!canvas.current) return;
    const fabricCanvas = canvas.current;

    const handleMouseOver = (e: fabric.IEvent) => {
      const obj = e.target;
      if (obj) {
        if (!(obj as any).originalStroke) {
          (obj as any).originalStroke = obj.stroke;
        }
        obj.set("stroke", "rgba(255, 0, 0, 0.5)");
        obj.set("strokeWidth", strokeWidth + 1);
        fabricCanvas.renderAll();
      }
    };

    const handleMouseOut = (e: fabric.IEvent) => {
      const obj = e.target;
      if (obj) {
        obj.set(
          "stroke",
          (obj as any).originalStroke || (isDarkMode ? "white" : "black")
        );
        obj.set("strokeWidth", strokeWidth);
        fabricCanvas.renderAll();
      }
    };

    const handleMouseDownHighlight = (e: fabric.IEvent) => {
      const obj = e.target;
      if (obj) {
        obj.set("stroke", "rgb(255, 0, 0)");
        obj.set("strokeWidth", strokeWidth + 1);
        fabricCanvas.renderAll();
      }
    };

    const handleObjectAdded = (e: fabric.IEvent) => {
      if (e.target) {
        (e.target as any).originalStroke = e.target.stroke;
      }
    };

    fabricCanvas.on("mouse:over", handleMouseOver);
    fabricCanvas.on("mouse:out", handleMouseOut);
    fabricCanvas.on("mouse:down", handleMouseDownHighlight);
    fabricCanvas.on("object:added", handleObjectAdded);

    return () => {
      fabricCanvas.off("mouse:over", handleMouseOver);
      fabricCanvas.off("mouse:out", handleMouseOut);
      fabricCanvas.off("mouse:down", handleMouseDownHighlight);
      fabricCanvas.off("object:added", handleObjectAdded);
    };
  }, [strokeWidth, isDarkMode]);

  // Handle drawing modes: line, polygon, circle
  useEffect(() => {
    if (!canvas.current) return;
    const fabricCanvas = canvas.current;

    // LINE mode: draw a line by dragging
    if (drawingMode === "line") {
      const handleMouseDown = (e: fabric.IEvent) => {
        const pointer = fabricCanvas.getPointer(e.e);
        if (pointer) {
          setStartPoint({ x: pointer.x, y: pointer.y });
          const newLine = new fabric.Line(
            [pointer.x, pointer.y, pointer.x, pointer.y],
            {
              stroke: isDarkMode ? "white" : "blue",
              strokeWidth,
              selectable: true,
            }
          );
          fabricCanvas.add(newLine);
          currentLine.current = newLine;
        }
      };

      const handleMouseMove = (e: fabric.IEvent) => {
        if (startPoint && currentLine.current) {
          const pointer = fabricCanvas.getPointer(e.e);
          if (pointer) {
            currentLine.current.set({ x2: pointer.x, y2: pointer.y });
            fabricCanvas.renderAll();
          }
        }
      };

      const handleMouseUp = () => {
        if (startPoint && currentLine.current) {
          setStartPoint(null);
          currentLine.current.set({ selectable: true });
          currentLine.current = null;
        }
      };

      fabricCanvas.on("mouse:down", handleMouseDown);
      fabricCanvas.on("mouse:move", handleMouseMove);
      fabricCanvas.on("mouse:up", handleMouseUp);

      return () => {
        fabricCanvas.off("mouse:down", handleMouseDown);
        fabricCanvas.off("mouse:move", handleMouseMove);
        fabricCanvas.off("mouse:up", handleMouseUp);
      };
    }

    // POLYGON mode: collect points and draw a polygon
    if (drawingMode === "polygon") {
      const handleMouseDown = (e: fabric.IEvent) => {
        const pointer = fabricCanvas.getPointer(e.e);
        if (pointer) {
          setPolygonPoints((prev) => [...prev, { x: pointer.x, y: pointer.y }]);
          if (polygonPoints.length > 0) {
            const lastPoint = polygonPoints[polygonPoints.length - 1];
            const line = new fabric.Line(
              [lastPoint.x, lastPoint.y, pointer.x, pointer.y],
              {
                stroke: isDarkMode ? "white" : "blue",
                strokeWidth,
                selectable: true,
              }
            );
            fabricCanvas.add(line);
          }
        }
      };

      const handleDoubleClick = () => {
        if (polygonPoints.length > 2) {
          const polygon = new fabric.Polygon(polygonPoints, {
            fill: "rgba(0, 0, 255, 0.3)",
            stroke: isDarkMode ? "white" : "blue",
            strokeWidth,
            selectable: true,
          });
          fabricCanvas.add(polygon);
          setPolygonPoints([]);
          currentPolygon.current = polygon;
        }
      };

      fabricCanvas.on("mouse:down", handleMouseDown);
      fabricCanvas.on("mouse:dblclick", handleDoubleClick);

      return () => {
        fabricCanvas.off("mouse:down", handleMouseDown);
        fabricCanvas.off("mouse:dblclick", handleDoubleClick);
      };
    }

    // CIRCLE mode: draw a circle by dragging
    if (drawingMode === "circle") {
      fabricCanvas.selection = false;
      const handleMouseDown = (e: fabric.IEvent) => {
        const pointer = fabricCanvas.getPointer(e.e);
        if (pointer) {
          setStartPoint({ x: pointer.x, y: pointer.y });
          const newCircle = new fabric.Circle({
            left: pointer.x,
            top: pointer.y,
            radius: 0,
            fill: "transparent",
            stroke: isDarkMode ? "white" : "blue",
            strokeWidth,
            selectable: true,
            hasBorders: false,
            hasControls: false,
          });
          fabricCanvas.add(newCircle);
          currentCircle.current = newCircle;
        }
      };

      const handleMouseMove = (e: fabric.IEvent) => {
        if (!startPoint || !currentCircle.current) return;
        const pointer = fabricCanvas.getPointer(e.e);
        if (pointer) {
          const radius = Math.sqrt(
            Math.pow(pointer.x - startPoint.x, 2) +
              Math.pow(pointer.y - startPoint.y, 2)
          );
          currentCircle.current.set({ radius });
          fabricCanvas.renderAll();
        }
      };

      const handleMouseUp = () => {
        if (currentCircle.current) {
          currentCircle.current.set({ selectable: true });
          currentCircle.current = null;
        }
        setStartPoint(null);
      };

      fabricCanvas.on("mouse:down", handleMouseDown);
      fabricCanvas.on("mouse:move", handleMouseMove);
      fabricCanvas.on("mouse:up", handleMouseUp);

      return () => {
        fabricCanvas.off("mouse:down", handleMouseDown);
        fabricCanvas.off("mouse:move", handleMouseMove);
        fabricCanvas.off("mouse:up", handleMouseUp);
      };
    }

    // If not in drawing mode, enable normal selection.
    fabricCanvas.selection = true;
  }, [drawingMode, startPoint, polygonPoints, strokeWidth, isDarkMode]);

  // Handle panning and zooming
  useEffect(() => {
    if (!canvas.current || !isPannings) return;
    const fabricCanvas = canvas.current;
    let isPanningLocal = false;
    let lastPosX: number | null = null;
    let lastPosY: number | null = null;

    const handleMouseDown = (e: fabric.IEvent<Event>) => {
      const evt = e.e as MouseEvent;
      // If Alt is pressed, let multi-select handle it
      if (evt.button === 0 && !evt.altKey) {
        isPanningLocal = true;
        lastPosX = evt.clientX;
        lastPosY = evt.clientY;
        fabricCanvas.setCursor("grab");
        fabricCanvas.selection = false;
      }
    };

    const handleMouseMove = (e: fabric.IEvent<Event>) => {
      const evt = e.e as MouseEvent;
      if (isPanningLocal && lastPosX !== null && lastPosY !== null) {
        const deltaX = evt.clientX - lastPosX;
        const deltaY = evt.clientY - lastPosY;
        fabricCanvas.relativePan(new fabric.Point(deltaX, deltaY));
        lastPosX = evt.clientX;
        lastPosY = evt.clientY;
      }
    };

    const handleMouseUp = () => {
      isPanningLocal = false;
      lastPosX = null;
      lastPosY = null;
      fabricCanvas.setCursor("default");
      fabricCanvas.selection = true;
    };

    const handleMouseWheel = (e: fabric.IEvent<Event>) => {
      const evt = e.e as WheelEvent;
      const zoom = fabricCanvas.getZoom();
      const delta = evt.deltaY > 0 ? -0.1 : 0.1;
      const newZoom = Math.min(Math.max(zoom + delta, 0.5), 5);
      const pointer = fabricCanvas.getPointer(evt);
      fabricCanvas.zoomToPoint(pointer, newZoom);
      fabricCanvas.setZoom(newZoom);
      const scaleRatio = Math.round((1 / newZoom) * 500);
      setScale(`1:${scaleRatio}`);
      evt.preventDefault();
      evt.stopPropagation();
    };

    fabricCanvas.on("mouse:down", handleMouseDown);
    fabricCanvas.on("mouse:move", handleMouseMove);
    fabricCanvas.on("mouse:up", handleMouseUp);
    fabricCanvas.on("mouse:wheel", handleMouseWheel);

    return () => {
      fabricCanvas.off("mouse:down", handleMouseDown);
      fabricCanvas.off("mouse:move", handleMouseMove);
      fabricCanvas.off("mouse:up", handleMouseUp);
      fabricCanvas.off("mouse:wheel", handleMouseWheel);
    };
  }, [isPannings]);

  // Use the custom multi-select hook (Alt + drag)
  useMultiSelect(canvas.current, drawingMode);

  // Handle file upload and initialize DXF worker
  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const uploadedFile = event.target.files?.[0];
    if (!uploadedFile) {
      console.error("No file selected");
      return;
    }
    if (!uploadedFile.name.endsWith(".dxf")) {
      console.error("Invalid file type. Please upload a DXF file.");
      return;
    }
    if (workerRef.current) workerRef.current.terminate();
    initializeWorker(uploadedFile);
  };

  const initializeWorker = (file: File) => {
    workerRef.current = new Worker(new URL("./dxFWorker.ts", import.meta.url), {
      type: "module",
    });
    workerRef.current.postMessage(file);
    workerRef.current.onmessage = (e) => {
      const datas = e.data;
      if (datas.success === true) {
        setFile(datas.data);
      } else {
        console.error("Error parsing DXF:", datas.error);
      }
    };
    workerRef.current.onerror = (error) => {
      console.error("Worker error:", error.message);
    };
  };

  const calculateBoundingBox = (entities: any[]) => {
    let minX = Infinity,
      minY = Infinity,
      maxX = -Infinity,
      maxY = -Infinity;
    entities.forEach((entity) => {
      if (entity.vertices) {
        entity.vertices.forEach((vertex: Point) => {
          minX = Math.min(minX, vertex.x);
          minY = Math.min(minY, vertex.y);
          maxX = Math.max(maxX, vertex.x);
          maxY = Math.max(maxY, vertex.y);
        });
      }
    });
    return { minX, minY, maxX, maxY };
  };

  // Draw DXF file entities on the canvas
  useEffect(() => {
    if (file && canvas.current) {
      const { minX, minY, maxX, maxY } = calculateBoundingBox(file.entities);
      const dxfWidth = maxX - minX;
      const dxfHeight = maxY - minY;
      const canvasWidth = canvas.current.width || 1920;
      const canvasHeight = canvas.current.height || 800;
      const computedScale =
        Math.min(canvasWidth / dxfWidth, canvasHeight / dxfHeight) * 0.9;
      const offsetX =
        (canvasWidth - dxfWidth * computedScale) / 2 - minX * computedScale;
      const offsetY =
        (canvasHeight - dxfHeight * computedScale) / 2 - minY * computedScale;

      canvas.current.clear();

      const lines = file.entities.filter(
        (entity: any) => entity.type === "LINE"
      );
      lines.forEach((line: any, index: number) => {
        setTimeout(() => {
          const x1 = line.vertices[0].x * computedScale + offsetX;
          const y1 = line.vertices[0].y * computedScale + offsetY;
          const x2 = line.vertices[1].x * computedScale + offsetX;
          const y2 = line.vertices[1].y * computedScale + offsetY;
          const fabricLine = new fabric.Line([x1, y1, x2, y2], {
            stroke: isDarkMode ? "white" : "black",
            strokeWidth,
            selectable: true,
          });
          canvas.current?.add(fabricLine);
        }, index * 10);
      });
    }
  }, [file, strokeWidth, isDarkMode]);

  const handleStrokeWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      setStrokeWidth(value);
      if (canvas.current) {
        canvas.current
          .getActiveObjects()
          .forEach((obj) => obj.set("strokeWidth", value));
        canvas.current.renderAll();
      }
    }
  };

  const handleAddText = () => {
    if (canvas.current && textInput.trim()) {
      const textObj = new fabric.Text(textInput, {
        left: 100,
        top: 100,
        fontSize,
        fill: textColor,
        fontFamily,
        selectable: true,
      });
      canvas.current.add(textObj);
      canvas.current.renderAll();
      setTextInput("");
    }
  };

  const handleTextColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setTextColor(newColor);
    if (canvas.current) {
      const activeObject = canvas.current.getActiveObject();
      if (activeObject && activeObject.type === "text") {
        (activeObject as fabric.Text).set({ fill: newColor });
        canvas.current.renderAll();
      }
    }
  };

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = Number(e.target.value);
    setFontSize(newSize);
    if (canvas.current) {
      const activeObject = canvas.current.getActiveObject();
      if (activeObject && activeObject.type === "text") {
        (activeObject as fabric.Text).set({ fontSize: newSize });
        canvas.current.renderAll();
      }
    }
  };

  return (
    <>
      <div
        style={{
          display: "block",
          width: "auto",
          overflowX: "hidden",
          overflowY: "hidden",
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              padding={1}
            >
              <Typography variant="h6">DXF Viewer/Editor</Typography>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={() => toggleDrawer(true)}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </AppBar>
        </Box>

        <Drawer
          anchor="left"
          open={isDrawerOpen}
          onClose={() => toggleDrawer(false)}
        >
          <Box width={250}>
            <Box width={250} sx={{ borderBottom: 1 }}>
              <Typography
                variant="h6"
                align="center"
                style={{ padding: "16px" }}
              >
                List of Drawings
              </Typography>
            </Box>
            <List>
              {drawings.map((drawing) => (
                <ListItem
                  key={drawing.id}
                  component="li"
                  sx={{ cursor: "pointer" }}
                  onClick={() => handleClickItem(drawing)}
                >
                  <ListItemText primary={drawing.name} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>

        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbars
              setFile={setFile}
              canvas={canvas}
              setIsPanning={setIsPanning}
              isPannings={isPannings}
              setDrawingMode={setDrawingMode}
              drawingMode={drawingMode}
              setPolygonPoints={setPolygonPoints}
              setStartPoint={setStartPoint}
              strokeWidth={strokeWidth}
              handleStrokeWidthChange={handleStrokeWidthChange}
              fontSize={fontSize}
              handleFontSizeChange={handleFontSizeChange}
              textColor={textColor}
              handleTextColorChange={handleTextColorChange}
              fontFamily={fontFamily}
              setFontFamily={setFontFamily}
              textInput={textInput}
              setTextInput={setTextInput}
              handleAddText={handleAddText}
              handleDownloadDXF={handleDownloadDXF}
              scale={scale}
              handleFileUpload={handleFileUpload}
            />
          </AppBar>
        </Box>
        <Button onClick={handleDownloadDXF} title="Download" />
      </div>
      <div>
        <canvas id="canvas" ref={canvasRef} width={1920} height={800} />
      </div>
    </>
  );
};

export default DXFViewer;
