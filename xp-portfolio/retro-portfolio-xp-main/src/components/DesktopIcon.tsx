
import { useState, useRef } from 'react';
import Draggable from 'react-draggable';
import type { IconPosition } from './WindowsDesktop';

interface DesktopIconProps {
  id: string;
  label: string;
  icon: string;
  position: IconPosition;
  onDrag: (id: string, position: IconPosition) => void;
  onOpen: () => void;
  onSelect: (id: string) => void;
  isSelected: boolean;
  gridSize: number;
}

const DesktopIcon = ({ id, label, icon, position, onDrag, onOpen, onSelect, isSelected, gridSize }: DesktopIconProps) => {
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const nodeRef = useRef(null);

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setContextMenuPosition({ x: e.clientX, y: e.clientY });
    setShowContextMenu(true);
    onSelect(id);
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onOpen();
  };

  const handleDragStart = () => {
    setIsDragging(true);
    onSelect(id);
  };

  const handleDrag = (_e: any, data: any) => {
    // Visual feedback during drag - don't snap until stop
  };

  const handleDragStop = (_e: any, data: any) => {
    setIsDragging(false);
    onDrag(id, { x: data.x, y: data.y });
  };

  const handleContextMenuClose = () => {
    setShowContextMenu(false);
  };

  const handleOpen = () => {
    onOpen();
    handleContextMenuClose();
  };

  const handleSingleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(id);
    if (showContextMenu) {
      handleContextMenuClose();
    }
  };

  // Close context menu when clicking elsewhere
  const handleOutsideClick = () => {
    if (showContextMenu) {
      handleContextMenuClose();
    }
  };

  return (
    <>
      <Draggable
        nodeRef={nodeRef}
        position={position}
        onStart={handleDragStart}
        onDrag={handleDrag}
        onStop={handleDragStop}
        handle=".icon-handle"
        grid={[1, 1]} // Allow smooth dragging, snapping happens on stop
      >
        <div
          ref={nodeRef}
          className={`desktop-icon ${isSelected ? 'selected' : ''} ${isDragging ? 'dragging' : ''}`}
          onContextMenu={handleRightClick}
          onDoubleClick={handleDoubleClick}
          onClick={handleSingleClick}
          style={{
            left: position.x,
            top: position.y
          }}
        >
          <div className="icon-handle">
            <div className="icon-image">{icon}</div>
            <div className="icon-label">{label}</div>
          </div>
        </div>
      </Draggable>

      {/* Context Menu */}
      {showContextMenu && (
        <>
          <div className="context-menu-overlay" onClick={handleOutsideClick} />
          <div 
            className="context-menu"
            style={{ 
              left: contextMenuPosition.x, 
              top: contextMenuPosition.y 
            }}
          >
            <div className="context-menu-item" onClick={handleOpen}>
              Open
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default DesktopIcon;
