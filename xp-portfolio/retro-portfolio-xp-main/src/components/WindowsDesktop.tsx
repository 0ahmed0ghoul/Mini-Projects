import { useState, useEffect } from 'react';
import Taskbar from './Taskbar';
import DesktopIcon from './DesktopIcon';
import ModalWindow from './ModalWindow';
import StartMenu from './StartMenu';
import AboutModal from './modals/AboutModal';
import ProjectsModal from './modals/ProjectsModal';
import ExperienceModal from './modals/ExperienceModal';
import SkillsModal from './modals/SkillsModal';
import ContactModal from './modals/ContactModal';

export interface IconPosition {
  x: number;
  y: number;
}

export interface OpenModal {
  id: string;
  title: string;
  component: React.ComponentType;
  position: { x: number; y: number };
}

const WindowsDesktop = () => {
  const [showIcons, setShowIcons] = useState(false);

  // Grid settings
  const GRID_SIZE = 80; // Size of each grid cell
  const ICON_MARGIN = 20; // Margin from edges

  // Calculate grid positions
  const getGridPosition = (gridX: number, gridY: number) => ({
    x: ICON_MARGIN + (gridX * GRID_SIZE),
    y: ICON_MARGIN + (gridY * GRID_SIZE)
  });

  // Snap position to nearest grid
  const snapToGrid = (x: number, y: number) => {
    const gridX = Math.round((x - ICON_MARGIN) / GRID_SIZE);
    const gridY = Math.round((y - ICON_MARGIN) / GRID_SIZE);
    return getGridPosition(Math.max(0, gridX), Math.max(0, gridY));
  };

  const [iconPositions, setIconPositions] = useState<Record<string, IconPosition>>({
    'about-me': getGridPosition(0, 0),
    'projects': getGridPosition(0, 1),
    'experience': getGridPosition(0, 2),
    'skills': getGridPosition(0, 3),
    'contact': getGridPosition(0, 4),
  });

  const [openModals, setOpenModals] = useState<OpenModal[]>([]);
  const [activeModalId, setActiveModalId] = useState<string | null>(null);
  const [selectedIconId, setSelectedIconId] = useState<string | null>(null);
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIcons(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const icons = [
    { id: 'about-me', label: 'About Me', icon: '👤', component: AboutModal },
    { id: 'projects', label: 'Projects', icon: '📁', component: ProjectsModal },
    { id: 'experience', label: 'Experience', icon: '💼', component: ExperienceModal },
    { id: 'skills', label: 'Skills', icon: '🛠️', component: SkillsModal },
    { id: 'contact', label: 'Contact', icon: '📧', component: ContactModal },
  ];

  const handleIconDrag = (id: string, position: IconPosition) => {
    const snappedPosition = snapToGrid(position.x, position.y);
    
    // Check if another icon is already at this position
    const occupiedIconId = Object.entries(iconPositions).find(([iconId, iconPos]) => 
      iconId !== id && iconPos.x === snappedPosition.x && iconPos.y === snappedPosition.y
    )?.[0];

    if (occupiedIconId) {
      // Swap positions
      const currentPosition = iconPositions[id];
      setIconPositions(prev => ({
        ...prev,
        [id]: snappedPosition,
        [occupiedIconId]: currentPosition
      }));
    } else {
      // Normal position update
      setIconPositions(prev => ({
        ...prev,
        [id]: snappedPosition
      }));
    }
  };

  const handleIconSelect = (id: string) => {
    setSelectedIconId(id);
  };

  const handleDesktopClick = () => {
    setSelectedIconId(null);
  };

  const handleStartMenuToggle = () => {
    setIsStartMenuOpen(!isStartMenuOpen);
  };

  const handleStartMenuClose = () => {
    setIsStartMenuOpen(false);
  };

  const handleIconOpen = (id: string, title: string, component: React.ComponentType) => {
    const existingModal = openModals.find(modal => modal.id === id);
    if (existingModal) {
      setActiveModalId(id);
      return;
    }

    const newModal: OpenModal = {
      id,
      title,
      component,
      position: { x: 100 + openModals.length * 30, y: 100 + openModals.length * 30 }
    };

    setOpenModals(prev => [...prev, newModal]);
    setActiveModalId(id);
  };

  const handleModalClose = (id: string) => {
    setOpenModals(prev => prev.filter(modal => modal.id !== id));
    if (activeModalId === id) {
      const remainingModals = openModals.filter(modal => modal.id !== id);
      setActiveModalId(remainingModals.length > 0 ? remainingModals[remainingModals.length - 1].id : null);
    }
  };

  const handleModalFocus = (id: string) => {
    setActiveModalId(id);
  };

  return (
    <div className="windows-desktop" onClick={handleDesktopClick}>
      {/* Desktop Icons */}
      {showIcons && icons.map(icon => (
        <DesktopIcon
          key={icon.id}
          id={icon.id}
          label={icon.label}
          icon={icon.icon}
          position={iconPositions[icon.id]}
          onDrag={handleIconDrag}
          onOpen={() => handleIconOpen(icon.id, icon.label, icon.component)}
          onSelect={handleIconSelect}
          isSelected={selectedIconId === icon.id}
          gridSize={GRID_SIZE}
        />
      ))}

      {/* Modal Windows */}
      {openModals.map(modal => (
        <ModalWindow
          key={modal.id}
          id={modal.id}
          title={modal.title}
          position={modal.position}
          isActive={activeModalId === modal.id}
          onClose={() => handleModalClose(modal.id)}
          onFocus={() => handleModalFocus(modal.id)}
        >
          <modal.component />
        </ModalWindow>
      ))}

      {/* Start Menu */}
      <StartMenu
        isOpen={isStartMenuOpen}
        onClose={handleStartMenuClose}
        icons={icons}
        onIconOpen={handleIconOpen}
      />

      {/* Taskbar */}
      <Taskbar 
        openModals={openModals} 
        activeModalId={activeModalId} 
        onModalClick={handleModalFocus}
        onStartClick={handleStartMenuToggle}
        isStartMenuOpen={isStartMenuOpen}
      />
    </div>
  );
};

export default WindowsDesktop;
