import React from 'react';
import {Canvas, FabricObject} from 'fabric';
import {Trash} from 'lucide-react';
import {Tooltip} from 'react-tooltip';
import Button from '@/components/Common/Button/Button';
import {TOOLTIP_CONTENT} from '@/constant/common';
import './ObjectAction.scss';

interface ObjectActionProps {
  canvas: Canvas | null;
  selectedObject: FabricObject | null;
}

const ObjectAction = ({canvas, selectedObject}: ObjectActionProps) => {
  const handleDeleteObject = () => {
    if (selectedObject && canvas) {
      canvas.remove(selectedObject);
      canvas.discardActiveObject();
      canvas.renderAll();
      //setSelectedObject(null);
    }
  };

  return (
    <div className={'actions'}>
      <div className={'actions-header'}>
        <span className={'actions-title'}>Actions</span>
      </div>
      <div className={'actions-body'}>
        <div
          className={'actions-item'}
          data-tooltip-id={TOOLTIP_CONTENT.delete_button.id}>
          <Button
            className={'actions-item__button'}
            color={'danger'}
            disabled={!selectedObject}
            onClick={handleDeleteObject}>
            <Trash size={18} className={'actions-item__icon'} />
          </Button>
        </div>
      </div>
      <Tooltip
        id={TOOLTIP_CONTENT.delete_button.id}
        place="top"
        content={TOOLTIP_CONTENT.delete_button.content}
      />
    </div>
  );
};

export default ObjectAction;
