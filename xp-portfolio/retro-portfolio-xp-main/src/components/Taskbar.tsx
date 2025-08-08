
import type { OpenModal } from './WindowsDesktop';

interface TaskbarProps {
  openModals: OpenModal[];
  activeModalId: string | null;
  onModalClick: (id: string) => void;
  onStartClick: () => void;
  isStartMenuOpen: boolean;
}

const Taskbar = ({ openModals, activeModalId, onModalClick, onStartClick, isStartMenuOpen }: TaskbarProps) => {
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const handleStartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onStartClick();
  };

  return (
    <div className="taskbar">
      <div className="taskbar-left">
        <div 
          className={`start-button ${isStartMenuOpen ? 'active' : ''}`}
          onClick={handleStartClick}
        >
          <div className="start-icon">🪟</div>
          <span>start</span>
        </div>
        <div className="taskbar-items">
          {openModals.map(modal => (
            <div
              key={modal.id}
              className={`taskbar-item ${activeModalId === modal.id ? 'active' : ''}`}
              onClick={() => onModalClick(modal.id)}
            >
              {modal.title}
            </div>
          ))}
        </div>
      </div>
      <div className="taskbar-right">
        <div className="system-tray">
          <span className="time">{currentTime}</span>
        </div>
      </div>
    </div>
  );
};

export default Taskbar;
