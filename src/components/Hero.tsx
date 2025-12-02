import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

interface HeroProps {
    onExplore: () => void;
}

const Hero: React.FC<HeroProps> = ({ onExplore }) => {
    const images = [
        '/images/blog-1.jpg',
        '/images/blog-2.jpg',
        '/images/blog-3.jpg',
        '/images/blog-4.jpg',
        '/images/blog-6.jpg',
    ];


    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
            {/* Background images with crossfade */}
            {images.map((image, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out ${
                        index === currentImage ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{
                        backgroundImage: `url(${image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
            ))}

            {/* Gradient overlay */}
            <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/60 via-black/30 to-black/60" />


            {/* Animated particles/shapes */}
            <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-32 h-32 bg-accent/20 rounded-full blur-3xl animate-float" />
                <div className="absolute bottom-32 right-20 w-48 h-48 bg-primary/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
                <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-secondary/20 rounded-full blur-2xl animate-float" style={{ animationDelay: '4s' }} />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">

                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 leading-tight text-white animate-fade-in" style={{ animationDelay: '0.2s' }}>
                    Ensemble pour une
                    <span className="block text-white">planète durable</span>
                </h1>

                <p className="text-lg md:text-xl lg:text-2xl mb-10 text-white/90 leading-relaxed max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.4s' }}>
                    Découvrez des articles inspirants sur l'écologie, la durabilité et les actions concrètes pour protéger notre environnement.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in">
                    <button
                        onClick={onExplore}
                        className="
                          group inline-flex items-center
                          px-10 py-5
                          bg-accent
                          text-white text-xl font-semibold
                          rounded-full
                          hover:bg-accent/90
                          transition-all duration-300
                          hover:scale-110
                          shadow-[0_0_25px_rgba(0,200,120,0.7)]
                          hover:shadow-[0_0_35px_rgba(0,200,120,0.9)]
                          backdrop-blur-sm
                        "
                    >
                        Explorer les articles
                        <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-1" />
                    </button>
                </div>


                {/* Image indicators */}
                <div className="flex justify-center gap-2 mt-12">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentImage(index)}
                            className={`h-2 rounded-full transition-all duration-300 ${
                                index === currentImage
                                    ? 'w-8 bg-accent'
                                    : 'w-2 bg-primary-foreground/40 hover:bg-primary-foreground/60'
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
