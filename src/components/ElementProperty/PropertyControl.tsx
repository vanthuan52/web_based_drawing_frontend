import React from 'react';
import {Canvas, FabricObject} from 'fabric';
import styles from './ElementProperty.module.scss';
import Input from '../Common/Input/Input';

interface PropertyControlProps {
  selectedObject: FabricObject | null;
  properties: any;
  setProperties: any;
  canvas: Canvas | null;
}

const PropertyControl = ({
  selectedObject,
  properties,
  setProperties,
  canvas,
}: PropertyControlProps) => {
  const handleChange =
    (property: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(e.target.value.replace(/,/g, ''), 10) || 0;
      setProperties((prev: any) => ({...prev, [property]: value}));

      if (selectedObject) {
        selectedObject.set({[property]: value});
        selectedObject.setCoords();
        canvas?.renderAll();
      } else {
      }
    };

  return (
    <div className={styles['property']}>
      <span className={styles['property-title']}>Properties</span>
      {['left', 'top', 'width', 'height', 'diameter'].map((prop: string) => (
        <Input
          key={prop}
          value={properties[prop]}
          noBorder
          noPadding
          onChange={handleChange(prop)}
        />
      ))}
    </div>
  );
};

export default PropertyControl;
