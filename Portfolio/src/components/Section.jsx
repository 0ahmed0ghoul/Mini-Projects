export default function Section({ id, children, className = '' }) {
    return (
      <section 
        id={id} 
        className={`min-h-screen py-20 px-4 md:px-8 ${className}`}
      >
        {children}
      </section>
    );
  }