import React, {ReactNode, useEffect} from 'react';
import {createPortal} from 'react-dom';
import {X} from 'lucide-react';
import styles from './Modal.module.scss';

interface ModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  children: ReactNode;
  showHeader?: boolean;
  showCloseButton?: boolean;
  showOverlay?: boolean;
  width?: string;
  height?: string;
  position?: 'center' | 'top' | 'bottom' | 'left' | 'right';
}

const Modal: React.FC<ModalProps> = ({
  title,
  isOpen,
  onClose,
  onConfirm,
  children,
  showHeader = true,
  showCloseButton = true,
  showOverlay = true,
  width = '400px',
  height = 'auto',
  position = 'center',
}) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return;

  return createPortal(
    <div className={styles['']}>
      {showOverlay && <div className={styles['']} onClick={onClose} />}
      <div className={styles['']} style={{width, height}}>
        {showHeader && (
          <div className="flex justify-between items-center border-b pb-2">
            <h3 className="text-lg font-semibold">{title}</h3>
            {showCloseButton && (
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-800">
                <X size={20} />
              </button>
            )}
          </div>
        )}
        <div className="mt-4">{children}</div>
        {onConfirm && (
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded-md">
              Confirm
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

const getPositionClass = (position: string) => {
  switch (position) {
    case 'top':
      return 'top-10';
    case 'bottom':
      return 'bottom-10';
    case 'left':
      return 'left-10';
    case 'right':
      return 'right-10';
    default:
      return 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2';
  }
};

export default React.memo(Modal);
