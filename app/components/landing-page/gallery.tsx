import { Camera } from "lucide-react";
import { useEffect, useState } from "react";
import { Card } from "~/components/ui/card";
import { GALLERY_DATA } from "~/data/gallery";

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const goToNext = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % GALLERY_DATA.length);
    }
  };

  const goToPrevious = () => {
    if (selectedImage !== null) {
      setSelectedImage(
        selectedImage === 0 ? GALLERY_DATA.length - 1 : selectedImage - 1
      );
    }
  };

  // Close modal on escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedImage(null);
      } else if (event.key === "ArrowRight") {
        goToNext();
      } else if (event.key === "ArrowLeft") {
        goToPrevious();
      }
    };

    if (selectedImage !== null) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [selectedImage]);

  return (
    <section id="gallery" className="py-16 bg-gray-50">
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
            Community Gallery
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore moments from our vibrant community events, workshops, and
            meetups. See the energy and passion that drives our developer
            community in Bandung.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {GALLERY_DATA.map((item, index) => (
            <Card
              key={index}
              className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all cursor-pointer py-0"
              onClick={() => setSelectedImage(index)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  fetchPriority="low"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                  <Camera className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Image Modal */}
        {selectedImage !== null && (
          <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-full w-full h-full max-h-full flex items-center justify-center">
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70 transition-all"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Previous Button */}
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-3 hover:bg-opacity-70 transition-all"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              {/* Next Button */}
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-3 hover:bg-opacity-70 transition-all"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>

              {/* Image */}
              <img
                src={GALLERY_DATA[selectedImage].hdImage}
                alt={GALLERY_DATA[selectedImage].name}
                className="max-w-full max-h-full object-contain rounded-lg"
                fetchPriority="low"
                loading="lazy"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
