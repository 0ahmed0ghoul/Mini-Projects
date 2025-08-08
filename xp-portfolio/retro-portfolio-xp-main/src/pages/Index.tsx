
import { useState } from 'react';
import WindowsDesktop from '../components/WindowsDesktop';
import StartupPage from '../components/StartupPage';

const Index = () => {
  const [showDesktop, setShowDesktop] = useState(false);

  const handleUserSelect = () => {
    setShowDesktop(true);
  };

  if (!showDesktop) {
    return <StartupPage onUserSelect={handleUserSelect} />;
  }

  return <WindowsDesktop />;
};

export default Index;
