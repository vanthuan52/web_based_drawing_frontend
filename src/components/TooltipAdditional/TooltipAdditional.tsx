import React from 'react';
import {Tooltip} from 'react-tooltip';

interface TooltipAdditionalProps {
  tooltips: any;
}

const TooltipAdditional: React.FC<TooltipAdditionalProps> = ({tooltips}) => {
  return (
    <div>
      {tooltips.map((tooltip: any) => {
        <Tooltip
          id={tooltip.id}
          place={tooltip.place}
          content={tooltip.content}
        />;
      })}
    </div>
  );
};

export default TooltipAdditional;
