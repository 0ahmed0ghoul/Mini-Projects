
const AboutModal = () => {
  return (
    <div className="modal-content">
      <div className="profile-section">
        <div className="profile-image">
          <div className="avatar-placeholder">👨‍💻</div>
        </div>
        <div className="profile-info">
          <h2>John Doe</h2>
          <p className="title">Full Stack Developer</p>
        </div>
      </div>
      
      <div className="bio-section">
        <h3>About Me</h3>
        <p>
          Passionate full-stack developer with 5+ years of experience creating 
          innovative web applications. I love turning complex problems into 
          simple, beautiful solutions. When I'm not coding, you can find me 
          exploring new technologies or contributing to open-source projects.
        </p>
        
        <div className="details">
          <div className="detail-item">
            <strong>Location:</strong> San Francisco, CA
          </div>
          <div className="detail-item">
            <strong>Email:</strong> john.doe@example.com
          </div>
          <div className="detail-item">
            <strong>Years Experience:</strong> 5+
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutModal;
