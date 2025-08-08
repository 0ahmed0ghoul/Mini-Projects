
const SkillsModal = () => {
  const skillCategories = [
    {
      category: "Frontend",
      skills: ["React", "Vue.js", "TypeScript", "HTML5", "CSS3", "Tailwind CSS"]
    },
    {
      category: "Backend",
      skills: ["Node.js", "Python", "Express", "FastAPI", "REST APIs", "GraphQL"]
    },
    {
      category: "Database",
      skills: ["PostgreSQL", "MongoDB", "Redis", "MySQL"]
    },
    {
      category: "Tools & Others",
      skills: ["Git", "Docker", "AWS", "Jest", "Webpack", "Linux"]
    }
  ];

  return (
    <div className="modal-content">
      <h2>Technical Skills</h2>
      <div className="skills-grid">
        {skillCategories.map((category, index) => (
          <div key={index} className="skill-category">
            <h3>{category.category}</h3>
            <div className="skills-list">
              {category.skills.map((skill, skillIndex) => (
                <span key={skillIndex} className="skill-item">{skill}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="proficiency-note">
        <p><strong>Note:</strong> Proficiency levels range from intermediate to advanced across these technologies.</p>
      </div>
    </div>
  );
};

export default SkillsModal;
