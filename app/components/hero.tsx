import handleHashNavigation from "~/helper/handleHashNavigation";

export default function Hero() {
  return (
    <section id="home" className="relative py-16 md:py-28 overflow-hidden">
      {/* Abstract shape decorations */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gdg-blue opacity-10 rounded-full translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#FBBC04] opacity-10 rounded-full -translate-x-1/3 translate-y-1/3"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <div className="colorful-bar">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Google Developer Group{" "}
              <span className="text-gdg-blue">Bandung</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-xl leading-relaxed">
              Connect with developers, learn new technologies, and grow together
              in Bandung's vibrant tech community.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="/#events"
                className="bg-gdg-blue hover:bg-blue-600 text-white rounded-full px-6 py-3 font-medium transition mb-4 inline-block"
                onClick={(e) => {
                  e.preventDefault();
                  handleHashNavigation("/#events");
                }}
              >
                Upcoming Events
              </a>
            </div>
          </div>

          <div className="md:w-1/2">
            <div className="relative rounded-lg shadow-xl overflow-hidden">
              <img
                src="/hero-banner.webp"
                alt="Devfest Bandung"
                className="w-full object-cover h-80 md:h-96"
                fetchPriority="high"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-gdg-blue to-gdg-yellow mix-blend-multiply"></div>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 bg-white p-8 rounded-xl shadow-md">
          <div className="text-center flex flex-col items-center">
            <img src="/favicon.svg" alt="Members" className="h-16 -m-3.5" />
            <p className="text-3xl font-bold text-gdg-blue">4059</p>
            <p className="text-gray-600">Community Members</p>
          </div>
          <div className="text-center flex flex-col items-center">
            <img
              src="/social-media/youtube.svg"
              alt="Members"
              className="h-8 m-0.5"
            />
            <p className="text-3xl font-bold text-gdg-red">504</p>
            <p className="text-gray-600">YouTube Subscribers</p>
          </div>
          <div className="text-center flex flex-col items-center">
            <img
              src="/social-media/linkedin.svg"
              alt="Members"
              className="h-8 m-0.5"
            />
            <p className="text-3xl font-bold text-gdg-yellow">1349</p>
            <p className="text-gray-600">LinkedIn Followers</p>
          </div>
          <div className="text-center flex flex-col items-center">
            <img
              src="/social-media/instagram.svg"
              alt="Members"
              className="h-8 m-0.5"
            />
            <p className="text-3xl font-bold text-gdg-green">7100</p>
            <p className="text-gray-600">Instagram Followers</p>
          </div>
        </div>
      </div>
    </section>
  );
}
