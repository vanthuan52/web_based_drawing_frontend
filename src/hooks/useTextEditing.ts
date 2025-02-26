import {useEffect, useState} from 'react';
import {Canvas, Textbox} from 'fabric';
import {CANVAS_OBJECT_TYPE} from '@/constant/common';

interface UseTextEditingProps {
  canvas: Canvas | null;
}

const useTextEditing = ({canvas}: UseTextEditingProps) => {
  const [selectedText, setSelectedText] = useState<Textbox | null>(null);

  useEffect(() => {
    if (!canvas) return;

    const handleSelection = () => {
      const activeObject = canvas.getActiveObject();
      if (activeObject && activeObject.type === CANVAS_OBJECT_TYPE.textbox) {
        setSelectedText(activeObject as Textbox);
      } else {
        setSelectedText(null);
      }
    };
    canvas.on('selection:created', handleSelection);
    canvas.on('selection:updated', handleSelection);
    canvas.on('selection:cleared', () => setSelectedText(null));

    return () => {
      canvas.off('selection:created', handleSelection);
      canvas.off('selection:updated', handleSelection);
      canvas.off('selection:cleared', () => setSelectedText(null));
    };
  }, [canvas]);

  const addText = () => {
    if (!canvas) return;
    const text = new Textbox('New text', {
      left: 50,
      top: 50,
      fontSize: 24,
      fill: '#000000',
      fontFamily: 'Inter',
      width: 200,
      editable: true,
    });

    canvas.add(text);
    canvas.setActiveObject(text);
    canvas.renderAll();
  };

  const updateText = (property: keyof Textbox, value: any) => {
    if (!selectedText || !canvas) return;
    selectedText.set(property, value);
    canvas.renderAll();
  };

  return {selectedText, addText, updateText};
};

export default useTextEditing;
