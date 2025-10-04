import { Card, CardContent } from "~/components/ui/card";
import { PARTNER_DATA, WHY_PARTNER } from "~/data/partner";
import { Button } from "../ui/button";

export default function Partnership() {
  return (
    <section id="partnership" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center">
            <div className="colorful-bar justify-center">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our Sponsors & Partners
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Thanks to the amazing organizations that support and collaborate
            with GDG Bandung
          </p>
        </div>

        {/* Community Sponsors */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-8 text-center">
            Community Partners
          </h3>
          <ul className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {PARTNER_DATA.map((partner, index) => (
              <li key={index}>
                {partner.url ? (
                  <a
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Card className="bg-white shadow-sm border-0 hover:shadow-md transition">
                      <CardContent className="flex flex-col items-center justify-center p-6">
                        <img
                          src={partner.imageUrl}
                          alt="partner logo"
                          className="h-16 object-contain"
                          fetchPriority="low"
                          loading="lazy"
                        />
                      </CardContent>
                    </Card>
                  </a>
                ) : (
                  <Card className="bg-white shadow-sm border-0 hover:shadow-md transition">
                    <CardContent className="flex flex-col items-center justify-center p-6">
                      <img
                        src={partner.imageUrl}
                        alt="partner logo"
                        className="h-16 object-contain"
                        fetchPriority="low"
                        loading="lazy"
                      />
                    </CardContent>
                  </Card>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Why Partnership */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-4 text-center">
            Why Partnership with GDG Bandung?
          </h3>
          <p className="text-gray-600 max-w-3xl mx-auto text-center mb-8">
            We believe that collaboration is the key to a dynamic and
            sustainable technology ecosystem. By becoming a partner or sponsor
            of GDG Bandung, you're not just investing in technological
            advancement; you're also gaining a suite of exclusive benefits:
          </p>
          {/* Main Benefits Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {WHY_PARTNER.map((item, index) => (
              <Card
                key={index}
                className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow"
              >
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">{item.icon}</div>
                  <h4 className="text-lg font-semibold mb-2 text-gray-900">
                    {item.title}
                  </h4>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div
          id="contact"
          className="mt-16 bg-white rounded-xl p-8 shadow-sm text-center max-w-3xl mx-auto"
        >
          <h3 className="text-xl font-bold mb-3">Ready to Partner With Us?</h3>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            Join our community of partners and sponsors who are making a
            difference in Indonesia's tech ecosystem. Let's discuss how we can
            work together to create meaningful impact.
          </p>
          <a
            href="https://gdgbandung.com/sponsorship"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block cursor-pointer"
          >
            <Button className="bg-gdg-blue hover:bg-blue-600 text-white rounded-full px-8 py-6 font-medium text-lg cursor-pointer">
              Contact Us
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
