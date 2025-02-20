import React, {useState, useRef, useEffect} from 'react';
import {createPortal} from 'react-dom';
import './CustomPopover.scss';

type AnchorOrigin = {
  vertical: 'top' | 'bottom' | 'center';
  horizontal: 'left' | 'right' | 'center';
};

type TransformOrigin = {
  vertical: 'top' | 'bottom' | 'center';
  horizontal: 'left' | 'right' | 'center';
};

type CustomPopoverProps = {
  children: React.ReactNode;
  trigger: React.ReactNode;
  className?: string;
  anchorOrigin?: AnchorOrigin;
  transformOrigin?: TransformOrigin;
  gap?: number;
};

const CustomPopover: React.FC<CustomPopoverProps> = ({
  children,
  trigger,
  className,
  anchorOrigin = {vertical: 'top', horizontal: 'left'},
  transformOrigin = {vertical: 'bottom', horizontal: 'left'},
  gap = 20,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<{top: number; left: number}>({
    top: 0,
    left: 0,
  });
  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const togglePopover = () => {
    setIsOpen((prev) => !prev);
  };

  const closePopover = (event: MouseEvent) => {
    if (
      popoverRef.current &&
      !popoverRef.current.contains(event.target as Node) &&
      triggerRef.current &&
      !triggerRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  const updatePopoverPosition = () => {
    if (triggerRef.current && popoverRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const popoverRect = popoverRef.current.getBoundingClientRect();

      let top = triggerRect.bottom + window.scrollY + gap;
      let left = triggerRect.left + window.scrollX;

      if (top + popoverRect.height > window.innerHeight) {
        top = triggerRect.top - popoverRect.height + window.scrollY - gap;
      }
      if (left + popoverRect.width > window.innerWidth) {
        left = window.innerWidth - popoverRect.width - 10;
      }

      setPosition({top, left});
    }
  };

  useEffect(() => {
    if (isOpen) {
      updatePopoverPosition();
      document.addEventListener('mousedown', closePopover);
      window.addEventListener('resize', updatePopoverPosition);
      window.addEventListener('scroll', updatePopoverPosition);
    } else {
      document.removeEventListener('mousedown', closePopover);
      window.removeEventListener('resize', updatePopoverPosition);
      window.removeEventListener('scroll', updatePopoverPosition);
    }

    return () => {
      document.removeEventListener('mousedown', closePopover);
      window.removeEventListener('resize', updatePopoverPosition);
      window.removeEventListener('scroll', updatePopoverPosition);
    };
  }, [isOpen]);

  return (
    <div className={`popover-container ${className || ''}`}>
      <div className="popover-trigger" onClick={togglePopover} ref={triggerRef}>
        {trigger}
      </div>
      {isOpen &&
        createPortal(
          <div
            className="popover-content"
            ref={popoverRef}
            style={{
              position: 'absolute',
              top: `${position.top}px`,
              left: `${position.left}px`,
            }}>
            {children}
          </div>,
          document.body
        )}
    </div>
  );
};

export default CustomPopover;
