import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

interface HeroProps {
  onExplore: () => void;
}

const Hero: React.FC<HeroProps> = ({ onExplore }) => {
  const images = [
    "/images/blog-1.jpg",
    "/images/blog-2.jpg",
    "/images/blog-3.jpg",
    "/images/blog-4.jpg",
    "/images/blog-6.jpg",
  ];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="relative flex min-h-[600px] h-[90vh] items-center justify-center overflow-hidden">
      {/* Background images with crossfade */}
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out ${
            index === currentImage ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      ))}

      {/* Gradient overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/70 via-black/40 to-black/70" />

      {/* Animated particles/shapes */}
      <div className="pointer-events-none absolute inset-0 z-[2] overflow-hidden">
        <div className="absolute top-20 left-10 h-32 w-32 rounded-full bg-accent/20 blur-3xl animate-float" />
        <div
          className="absolute bottom-32 right-20 h-48 w-48 rounded-full bg-primary/30 blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/4 h-24 w-24 rounded-full bg-secondary/20 blur-2xl animate-float"
          style={{ animationDelay: "4s" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-white/80 backdrop-blur">
          Blog éco-responsable
        </div>

        <h1
          className="animate-fade-in mb-6 text-4xl font-serif font-bold leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
          style={{ animationDelay: "0.2s" }}
        >
          Ensemble pour une
          <span className="block text-accent">planète durable</span>
        </h1>

        <p
          className="animate-fade-in mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-white/90 md:text-xl lg:text-2xl"
          style={{ animationDelay: "0.4s" }}
        >
          Découvrez des articles inspirants sur l&apos;écologie, la durabilité
          et les actions concrètes pour protéger notre environnement.
        </p>

        <div className="animate-fade-in flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            onClick={onExplore}
            className="
              group inline-flex items-center
              rounded-full
              bg-accent
              px-10 py-4
              text-lg font-semibold text-white
              shadow-[0_0_25px_rgba(0,200,120,0.7)]
              backdrop-blur-sm
              transition-all duration-300
              hover:scale-110 hover:bg-accent/90 hover:shadow-[0_0_35px_rgba(0,200,120,0.9)]
            "
          >
            Explorer les articles
            <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-1" />
          </button>
          <span className="text-sm text-white/70">
            Articles sélectionnés chaque semaine pour passer à l&apos;action.
          </span>
        </div>

        {/* Image indicators */}
        <div className="mt-12 flex justify-center gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentImage
                  ? "w-8 bg-accent"
                  : "w-2 bg-primary-foreground/40 hover:bg-primary-foreground/60"
              }`}
              aria-label={`Image ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
