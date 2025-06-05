import { Users, Code, Lightbulb } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12">
            <div className="colorful-bar">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              About GDG Bandung
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Google Developer Group (GDG) Bandung is a local community of
              developers who are interested in Google's developer technology
              including Android, Web, Cloud, Machine Learning, Flutter and more.
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              We organize events ranging from small meetups to large-scale
              conferences like DevFest to create spaces for developers to learn,
              connect, and grow together. Our community welcomes developers of
              all levels, from beginners to experts.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-gdg-blue mb-2">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="font-bold mb-1">Inclusive Community</h3>
                <p className="text-sm text-gray-600">
                  Open to developers of all experience levels
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-gdg-red mb-2">
                  <Lightbulb className="h-6 w-6" />
                </div>
                <h3 className="font-bold mb-1">Knowledge Sharing</h3>
                <p className="text-sm text-gray-600">
                  Learn from experts and share your knowledge
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-gdg-yellow mb-2">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="font-bold mb-1">Networking</h3>
                <p className="text-sm text-gray-600">
                  Connect with fellow developers and professionals
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-gdg-green mb-2">
                  <Code className="h-6 w-6" />
                </div>
                <h3 className="font-bold mb-1">Hands-on Learning</h3>
                <p className="text-sm text-gray-600">
                  Participate in workshops and codelabs
                </p>
              </div>
            </div>
          </div>

          <div className="md:w-1/2 grid grid-cols-2 gap-4">
            <img
              src="/about-1.webp"
              alt="Sandhika Galih giving a talk at GDG Bandung event"
              className="rounded-lg shadow-md h-48 object-cover"
              fetchPriority="low"
              loading="lazy"
            />
            <img
              src="/about-2.webp"
              alt="Hadian Rahmat giving a talk at GDG Bandung event"
              className="rounded-lg shadow-md h-48 object-cover"
              fetchPriority="low"
              loading="lazy"
            />
            <img
              src="/about-3.webp"
              alt="Danang Juffry giving a talk at GDG Bandung event"
              className="rounded-lg shadow-md h-48 object-cover"
              fetchPriority="low"
              loading="lazy"
            />
            <img
              src="/about-4.webp"
              alt="Participants at GDG Bandung event"
              className="rounded-lg shadow-md h-48 object-cover"
              fetchPriority="low"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
