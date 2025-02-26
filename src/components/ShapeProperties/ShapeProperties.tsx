import React from 'react';
import {Tooltip} from 'react-tooltip';
import {Canvas, FabricObject} from 'fabric';
import './ShapeProperties.scss';
import {ObjectProperty} from '@/types/canvas';
import {canvasObjectActions} from '@/redux/slice/canvasObjectSlice';
import {RootState, useAppDispatch, useAppSelector} from '@/redux/store';
import Input from '@/components/Common/Input/Input';

interface ShapePropertiesProps {
  canvas: Canvas | null;
  selectedObject: FabricObject | null;
}

const ShapeProperties = ({canvas, selectedObject}: ShapePropertiesProps) => {
  const dispatch = useAppDispatch();

  const {left, top, width, height, diameter} = useAppSelector(
    (state: RootState) => state.canvasObject
  );

  const handleLeftChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const intValue = parseInt(e.target.value.replace(/,/g, ''), 10) || 0;
    const stringValue = intValue.toString();

    if (!selectedObject || !canvas) return;

    dispatch(
      canvasObjectActions.updateObjectProperties({
        left: stringValue,
      } as ObjectProperty)
    );

    selectedObject.set({left: intValue});
    selectedObject.setCoords();
    canvas.renderAll();
  };

  const handleTopChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const intValue = parseInt(e.target.value.replace(/,/g, ''), 10) || 0;
    const stringValue = intValue.toString();

    if (!selectedObject || !canvas) return;

    dispatch(
      canvasObjectActions.updateObjectProperties({
        top: stringValue,
      } as ObjectProperty)
    );

    selectedObject.set({top: intValue});
    selectedObject.setCoords();
    canvas.renderAll();
  };

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const intValue = parseInt(e.target.value.replace(/,/g, ''), 10) || 0;
    const stringValue = intValue.toString();

    if (!selectedObject || !canvas) return;

    dispatch(
      canvasObjectActions.updateObjectProperties({
        width: stringValue,
      } as ObjectProperty)
    );

    const originalWidth = selectedObject.width || 1;

    const newScaleX = intValue / originalWidth;
    const newScaleY = selectedObject.scaleY;

    selectedObject.set({
      scaleX: newScaleX,
      scaleY: newScaleY,
    });

    selectedObject.setCoords();
    canvas.renderAll();
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const intValue = parseInt(e.target.value.replace(/,/g, ''), 10) || 0;
    const stringValue = intValue.toString();

    if (!selectedObject || !canvas) return;

    dispatch(
      canvasObjectActions.updateObjectProperties({
        height: stringValue,
      } as ObjectProperty)
    );

    const originalHeight = selectedObject.height || 1;

    const newScaleX = selectedObject.scaleX;
    const newScaleY = intValue / originalHeight;

    selectedObject.set({
      scaleX: newScaleX,
      scaleY: newScaleY,
    });

    selectedObject.setCoords();
    canvas.renderAll();
  };

  const handleDiameterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const intValue = parseInt(e.target.value.replace(/,/g, ''), 10) || 0;
    const stringValue = intValue.toString();

    if (!selectedObject || !canvas || selectedObject.type !== 'circle') return;

    dispatch(
      canvasObjectActions.updateObjectProperties({
        diameter: stringValue,
      } as ObjectProperty)
    );

    selectedObject.set({
      radius: intValue / 2, // half of diameter
      scaleX: 1,
      scaleY: 1,
    });

    selectedObject.setCoords();
    canvas.renderAll();
  };

  return (
    <div className="property">
      <div className="property-header">
        <span className="property-title">Properties</span>
      </div>
      <div className="property-body">
        {[
          {
            label: 'X',
            value: left,
            setter: handleLeftChange,
            prop: 'left',
            tooltipId: 'x-position-tooltip',
          },
          {
            label: 'Y',
            value: top,
            setter: handleTopChange,
            prop: 'top',
            tooltipId: 'y-position-tooltip',
          },
          {
            label: 'W',
            value: width,
            setter: handleWidthChange,
            prop: 'width',
            tooltipId: 'width-tooltip',
          },
          {
            label: 'H',
            value: height,
            setter: handleHeightChange,
            prop: 'height',
            tooltipId: 'height-tooltip',
          },
          {
            label: 'D',
            value: diameter,
            setter: handleDiameterChange,
            prop: 'diameter',
            tooltipId: 'diameter-tooltip',
          },
        ].map(({label, value, setter, prop, tooltipId}) => (
          <div key={label} className="property-item">
            <div className="property-item__value" data-tooltip-id={tooltipId}>
              <div className="property-item__label">{label}</div>
              <Input
                placeholder={prop}
                className="property-item__input"
                value={value}
                noBorder
                noPadding
                onChange={setter}
              />
            </div>
          </div>
        ))}
      </div>
      <Tooltip id="x-position-tooltip" place="top" content="X-position" />
      <Tooltip id="y-position-tooltip" place="top" content="Y-position" />
      <Tooltip id="width-tooltip" place="top" content="Width" />
      <Tooltip id="height-tooltip" place="top" content="Height" />
      <Tooltip id="diameter-tooltip" place="top" content="Diameter" />
    </div>
  );
};

export default ShapeProperties;
