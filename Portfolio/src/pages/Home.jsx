import Section from '../components/Section';

export default function Home() {
  return (
    <Section id="home" className="flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome to My Portfolio</h1>
        <p className="text-xl">I'm a passionate developer</p>
      </div>
    </Section>
  );
}