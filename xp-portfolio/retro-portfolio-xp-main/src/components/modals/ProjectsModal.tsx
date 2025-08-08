
const ProjectsModal = () => {
  const projects = [
    {
      name: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with React, Node.js, and PostgreSQL",
      tech: ["React", "Node.js", "PostgreSQL", "Stripe"],
      status: "Completed"
    },
    {
      name: "Task Management App",
      description: "Collaborative task management tool with real-time updates",
      tech: ["Vue.js", "Socket.io", "MongoDB"],
      status: "In Progress"
    },
    {
      name: "Weather Dashboard",
      description: "Real-time weather monitoring dashboard with data visualization",
      tech: ["React", "D3.js", "Express", "Weather API"],
      status: "Completed"
    }
  ];

  return (
    <div className="modal-content">
      <h2>My Projects</h2>
      <div className="projects-list">
        {projects.map((project, index) => (
          <div key={index} className="project-card">
            <div className="project-header">
              <h3>{project.name}</h3>
              <span className={`status ${project.status.toLowerCase().replace(' ', '-')}`}>
                {project.status}
              </span>
            </div>
            <p className="project-description">{project.description}</p>
            <div className="tech-stack">
              {project.tech.map((tech, techIndex) => (
                <span key={techIndex} className="tech-tag">{tech}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsModal;
