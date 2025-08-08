
import { useState, useRef } from 'react';
import Draggable from 'react-draggable';
import { X, Minus, Square } from 'lucide-react';

interface ModalWindowProps {
  id: string;
  title: string;
  position: { x: number; y: number };
  isActive: boolean;
  onClose: () => void;
  onFocus: () => void;
  children: React.ReactNode;
}

const ModalWindow = ({ id, title, position, isActive, onClose, onFocus, children }: ModalWindowProps) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const nodeRef = useRef(null);

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <Draggable
      nodeRef={nodeRef}
      handle=".window-title-bar"
      defaultPosition={position}
    >
      <div
        ref={nodeRef}
        className={`modal-window ${isActive ? 'active' : ''} ${isMinimized ? 'minimized' : ''}`}
        onClick={onFocus}
        style={{ zIndex: isActive ? 1000 : 999 }}
      >
        <div className="window-title-bar">
          <span className="window-title">{title}</span>
          <div className="window-controls">
            <button className="window-control minimize" onClick={handleMinimize}>
              <Minus size={12} />
            </button>
            <button className="window-control maximize">
              <Square size={12} />
            </button>
            <button className="window-control close" onClick={onClose}>
              <X size={12} />
            </button>
          </div>
        </div>
        {!isMinimized && (
          <div className="window-content">
            {children}
          </div>
        )}
      </div>
    </Draggable>
  );
};

export default ModalWindow;
