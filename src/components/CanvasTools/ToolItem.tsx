import React from 'react';
import clsx from 'clsx';
import {ChevronDown} from 'lucide-react';
import styles from './CanvasTools.module.scss';
import CustomPopover from '@/components/Common/CustomPopover/CustomPopoper';
import {ApplicationTool, ToolItems} from '@/types/application';

interface ToolItemProps {
  tools: ToolItems;
  activeTool: ApplicationTool;
  setActiveTool: (tool: ApplicationTool) => void;
  defaultToolId: ApplicationTool;
}

const ToolItem: React.FC<ToolItemProps> = ({
  tools,
  activeTool,
  setActiveTool,
  defaultToolId,
}) => {
  const currentTool = tools[activeTool] || tools[defaultToolId];

  return (
    <div className={styles['tools-item']}>
      <div
        className={clsx(styles['tools-item__main'], {
          [styles['active']]: activeTool in tools,
        })}
        onClick={() => setActiveTool(defaultToolId)}>
        {React.cloneElement(currentTool.icon, {size: 24})}
      </div>
      {Object.keys(tools).length > 1 && (
        <div className={styles['tools-item__dropdown']}>
          <CustomPopover trigger={<ChevronDown size={14} />}>
            <div className={styles['menu']}>
              {Object.values(tools).map((tool) => (
                <div
                  key={tool.id}
                  className={clsx(styles['menu-item'], {
                    [styles['active']]: activeTool === tool.id,
                  })}
                  onClick={() => setActiveTool(tool.id)}>
                  <div className={styles['menu-item__icon']}>{tool.icon}</div>
                  <div className={styles['menu-item__label']}>{tool.label}</div>
                </div>
              ))}
            </div>
          </CustomPopover>
        </div>
      )}
    </div>
  );
};

export default ToolItem;
