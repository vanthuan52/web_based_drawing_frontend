import React, {useState} from 'react';
import {Canvas} from 'fabric';
import clsx from 'clsx';

import CroppingSetting from '@/components/CroppingSetting/CroppingSetting';
import TypographyControls from '@/components/TypographyControls/TypographyControls';
import Appearance from '@/components/Appearance/Appearance';
import CanvasZooming from '@/components/CanvasZooming/CanvasZooming';
import Stroke from '@/components/Stroke/Stroke';
import ShapeProperties from '@/components/ShapeProperties/ShapeProperties';
import useCanvasSelection from '@/hooks/useCanvasSelection';
import ObjectAction from '@/components/ObjectAction/ObjectAction';
import styles from './properties.module.scss';

interface ElementPropertyProps {
  canvas: Canvas | null;
}

const Properties = ({canvas = null}: ElementPropertyProps) => {
  const {selectedObject} = useCanvasSelection({canvas});
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className={clsx(styles['properties'])}>
      <CanvasZooming canvas={canvas} />

      <ShapeProperties canvas={canvas} selectedObject={selectedObject} />

      <Appearance canvas={canvas} selectedObject={selectedObject} />

      <TypographyControls canvas={canvas} />

      <Stroke canvas={canvas} selectedObject={selectedObject} />

      <ObjectAction canvas={canvas} selectedObject={selectedObject} />

      <div className={styles['frames']}>
        <div className={styles['frames-header']}>
          <span className={styles['frames-title']}>Frames</span>
        </div>
        <div className={styles['frames-body']}>
          <div className={styles['frames-item']}>
            <div className={styles['frames-item__setting']}>
              <CroppingSetting canvas={canvas} refreshKey={refreshKey} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Properties;
