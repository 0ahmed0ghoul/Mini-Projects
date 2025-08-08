
import { useState } from 'react';

interface StartupPageProps {
  onUserSelect: () => void;
}

const StartupPage = ({ onUserSelect }: StartupPageProps) => {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  const handleUserClick = (username: string) => {
    setSelectedUser(username);
  };

  const handleUserDoubleClick = () => {
    onUserSelect();
  };

  const handleEnterKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && selectedUser) {
      onUserSelect();
    }
  };

  return (
    <div className="startup-page" onKeyDown={handleEnterKey} tabIndex={0}>
      <div className="startup-background">
        <div className="startup-content">
          <div className="welcome-text">
            <h1>Welcome to Windows</h1>
            <p>To begin, click your user name</p>
          </div>
          
          <div className="user-accounts">
            <div 
              className={`user-account ${selectedUser === 'User' ? 'selected' : ''}`}
              onClick={() => handleUserClick('User')}
              onDoubleClick={handleUserDoubleClick}
            >
              <div className="user-icon">
                <div className="user-avatar-large">👤</div>
              </div>
              <div className="user-name">User</div>
            </div>
          </div>

          <div className="startup-footer">
            <div className="turn-off-computer">
              <span>Turn off computer</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartupPage;
