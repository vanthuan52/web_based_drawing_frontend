import React, {useState} from 'react';
import clsx from 'clsx';
import {useDispatch} from 'react-redux';
import {Canvas} from 'fabric';
import {
  Circle,
  Component,
  Hand,
  Hexagon,
  Minus,
  MousePointer2,
  Pencil,
  PenTool,
  Redo2,
  Square,
  Trash2,
  Type,
  Undo2,
} from 'lucide-react';
import styles from './CanvasTools.module.scss';
import Cropping from '@/components/Cropping/Cropping';
import useTextEditing from '@/hooks/useTextEditing';
import {RootState, useAppSelector} from '@/redux/store';
import {toolActions} from '@/redux/slice/toolSlice';
import {ApplicationTool, ToolItems} from '@/types/application';
import CustomPopover from '@/components//Common/CustomPopover/CustomPopoper';
import ToolItem from './ToolItem';
import {canvasActions} from '@/redux/slice/canvasSlice';

const controlTools: ToolItems = {
  select: {
    id: 'select',
    label: 'Select',
    icon: <MousePointer2 size={18} />,
  },
  panning: {
    id: 'panning',
    label: 'Hand tool',
    icon: <Hand size={18} />,
  },
};

const shapeTools: ToolItems = {
  rect: {
    id: 'rect',
    label: 'Rect',
    icon: <Square size={18} />,
  },
  circle: {
    id: 'circle',
    label: 'Circle',
    icon: <Circle size={18} />,
  },
  line: {
    id: 'line',
    label: 'Line',
    icon: <Minus size={18} />,
  },
  ellipse: {
    id: 'ellipse',
    label: 'Ellipse',
    icon: <Circle size={18} />,
  },
  polygon: {
    id: 'polygon',
    label: 'Polygon',
    icon: <Hexagon size={18} />,
  },
};

const drawTools: ToolItems = {
  pen: {
    id: 'pen',
    label: 'Pen',
    icon: <PenTool size={18} />,
  },
  pencil: {
    id: 'pencil',
    label: 'Pencil',
    icon: <Pencil size={18} />,
  },
};

const textTools: ToolItems = {
  text: {
    id: 'text',
    label: 'Text',
    icon: <Type size={18} />,
  },
};

const additionalTools: ToolItems = {
  undo: {
    id: 'undo',
    label: 'Undo',
    icon: <Undo2 size={18} />,
  },
  redo: {
    id: 'redo',
    label: 'Redo',
    icon: <Redo2 size={18} />,
  },
  clear: {
    id: 'clear',
    label: 'Clear',
    icon: <Trash2 size={18} />,
  },
};

interface CanvasToolsProps {
  canvas: Canvas | null;
  undo?: any;
  canUndo?: boolean;
  redo?: any;
  canRedo?: boolean;
}

const CanvasTools = ({
  canvas,
  undo,
  canUndo,
  redo,
  canRedo,
}: CanvasToolsProps) => {
  const dispatch = useDispatch();
  const activeTool = useAppSelector(
    (state: RootState) => state.tool.activeTool
  );

  const {addText} = useTextEditing({canvas});

  const [refreshKey, setRefreshKey] = useState(0);

  const setActiveTool = (tool: ApplicationTool) => {
    if (tool === 'none') return;

    dispatch(toolActions.setActiveTool(tool));

    switch (tool) {
      case 'text': {
        addText();
        dispatch(toolActions.setActiveTool('select'));
        break;
      }
      case 'clear': {
        canvas?.clear();
        canvas?.renderAll();
        dispatch(toolActions.setActiveTool('select'));
        dispatch(canvasActions.resetLayers());
        break;
      }
      case 'undo': {
        dispatch(toolActions.setActiveTool('select'));
      }
      case 'redo': {
        dispatch(toolActions.setActiveTool('select'));
      }
      default:
        break;
    }
  };

  const handleFramesUpdated = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  return (
    <div className={styles['canvas-tools']}>
      <div className={styles['tools']}>
        <ToolItem
          tools={controlTools}
          activeTool={activeTool}
          setActiveTool={setActiveTool}
          defaultToolId={'select'}
        />

        <ToolItem
          tools={shapeTools}
          activeTool={activeTool}
          setActiveTool={setActiveTool}
          defaultToolId={'rect'}
        />

        <ToolItem
          tools={textTools}
          activeTool={activeTool}
          setActiveTool={setActiveTool}
          defaultToolId={'text'}
        />

        <ToolItem
          tools={drawTools}
          activeTool={activeTool}
          setActiveTool={setActiveTool}
          defaultToolId={'pencil'}
        />

        <div className={styles['tools-item']}>
          <div className={styles['tools-item__dropdown']}>
            <CustomPopover trigger={<Component size={24} />}>
              <div className={styles['menu']}>
                {Object.values(additionalTools).map((tool) => (
                  <div
                    key={tool.id}
                    className={clsx(styles['menu-item'], {
                      [styles['active']]: activeTool === tool.id,
                      [styles['disabled']]: tool.id !== 'clear',
                    })}
                    onClick={() => setActiveTool(tool.id)}>
                    <div className={styles['menu-item__icon']}>{tool.icon}</div>
                    <div className={styles['menu-item__label']}>
                      {tool.label}
                    </div>
                  </div>
                ))}
              </div>
            </CustomPopover>
          </div>
        </div>

        {/* <div className={styles['tools-item']}>
            <Cropping canvas={canvas} onFramesUpdated={handleFramesUpdated} />
          </div> */}
      </div>
    </div>
  );
};

export default CanvasTools;
