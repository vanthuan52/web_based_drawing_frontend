import React, {useState} from 'react';
import {Tooltip} from 'react-tooltip';
import {Canvas} from 'fabric';
import './ShapeProperties.scss';
import Input from '../Common/Input/Input';

interface ShapePropertiesProps {
  canvas: Canvas | null;
  left: string;
  onLeftChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  top: string;
  onTopChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  width: string;
  onWidthChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  height: string;
  onHeightChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  diameter: string;
  onDiameterChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ShapeProperties = ({
  canvas,
  left,
  onLeftChange,
  top,
  onTopChange,
  width,
  onWidthChange,
  height,
  onHeightChange,
  diameter,
  onDiameterChange,
}: ShapePropertiesProps) => {
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
            setter: onLeftChange,
            prop: 'left',
            tooltipId: 'x-position-tooltip',
          },
          {
            label: 'Y',
            value: top,
            setter: onTopChange,
            prop: 'top',
            tooltipId: 'y-position-tooltip',
          },
          {
            label: 'W',
            value: width,
            setter: onWidthChange,
            prop: 'width',
            tooltipId: 'width-tooltip',
          },
          {
            label: 'H',
            value: height,
            setter: onHeightChange,
            prop: 'height',
            tooltipId: 'height-tooltip',
          },
          {
            label: 'D',
            value: diameter,
            setter: onDiameterChange,
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
