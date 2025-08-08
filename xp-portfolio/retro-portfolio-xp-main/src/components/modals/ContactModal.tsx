
const ContactModal = () => {
  const contactMethods = [
    {
      method: "Email",
      value: "john.doe@example.com",
      icon: "📧"
    },
    {
      method: "LinkedIn",
      value: "linkedin.com/in/johndoe",
      icon: "💼"
    },
    {
      method: "GitHub",
      value: "github.com/johndoe",
      icon: "🐙"
    },
    {
      method: "Twitter",
      value: "@johndoe_dev",
      icon: "🐦"
    }
  ];

  return (
    <div className="modal-content">
      <h2>Get In Touch</h2>
      
      <div className="contact-intro">
        <p>
          I'm always interested in hearing about new opportunities and connecting 
          with fellow developers. Feel free to reach out through any of the channels below!
        </p>
      </div>

      <div className="contact-methods">
        {contactMethods.map((contact, index) => (
          <div key={index} className="contact-item">
            <span className="contact-icon">{contact.icon}</span>
            <div className="contact-details">
              <strong>{contact.method}</strong>
              <span className="contact-value">{contact.value}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="contact-form">
        <h3>Quick Message</h3>
        <form className="xp-form">
          <div className="form-group">
            <label>Name:</label>
            <input type="text" className="xp-input" />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input type="email" className="xp-input" />
          </div>
          <div className="form-group">
            <label>Message:</label>
            <textarea className="xp-textarea" rows={4}></textarea>
          </div>
          <button type="submit" className="xp-button">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default ContactModal;
