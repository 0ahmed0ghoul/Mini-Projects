
import { useState } from 'react';
import { Power } from 'lucide-react';

interface StartMenuProps {
  isOpen: boolean;
  onClose: () => void;
  icons: Array<{
    id: string;
    label: string;
    icon: string;
    component: React.ComponentType;
  }>;
  onIconOpen: (id: string, title: string, component: React.ComponentType) => void;
}

const StartMenu = ({ isOpen, onClose, icons, onIconOpen }: StartMenuProps) => {
  if (!isOpen) return null;

  const handleIconClick = (icon: any) => {
    onIconOpen(icon.id, icon.label, icon.component);
    onClose();
  };

  const handleShutdown = () => {
    window.close();
  };

  return (
    <>
      <div className="start-menu-overlay" onClick={onClose} />
      <div className="start-menu">
        <div className="start-menu-header">
          <div className="user-info">
            <div className="user-avatar">👤</div>
            <span className="username">User</span>
          </div>
        </div>
        <div className="start-menu-content">
          <div className="start-menu-section">
            <div className="section-title">Programs</div>
            <div className="start-menu-items">
              {icons.map(icon => (
                <div
                  key={icon.id}
                  className="start-menu-item"
                  onClick={() => handleIconClick(icon)}
                >
                  <span className="start-item-icon">{icon.icon}</span>
                  <span className="start-item-label">{icon.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="start-menu-footer">
          <div className="start-menu-item shutdown-button" onClick={handleShutdown}>
            <Power className="shutdown-icon" size={16} />
            <span>Shut Down</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default StartMenu;
