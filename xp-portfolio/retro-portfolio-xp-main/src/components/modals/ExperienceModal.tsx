
const ExperienceModal = () => {
  const experiences = [
    {
      company: "Tech Innovations Inc.",
      position: "Senior Full Stack Developer",
      period: "2021 - Present",
      description: "Lead development of client-facing applications using React and Node.js. Mentor junior developers and architect scalable solutions."
    },
    {
      company: "Digital Solutions Ltd.",
      position: "Full Stack Developer",
      period: "2019 - 2021",
      description: "Developed and maintained web applications using Vue.js and Python. Collaborated with cross-functional teams to deliver high-quality products."
    },
    {
      company: "StartupXYZ",
      position: "Frontend Developer",
      period: "2018 - 2019",
      description: "Built responsive user interfaces and implemented modern JavaScript frameworks. Worked closely with UX designers to create intuitive user experiences."
    }
  ];

  return (
    <div className="modal-content">
      <h2>Work Experience</h2>
      <div className="experience-timeline">
        {experiences.map((exp, index) => (
          <div key={index} className="experience-item">
            <div className="experience-marker"></div>
            <div className="experience-content">
              <h3>{exp.position}</h3>
              <h4>{exp.company}</h4>
              <span className="period">{exp.period}</span>
              <p>{exp.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceModal;
