"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Brain, Pencil, Music, Camera, X, ChevronLeft, ChevronRight } from "lucide-react";
import { hobbies } from "@/lib/data";
import { useState, useEffect } from "react";

const iconMap: Record<string, any> = {
  Brain,
  Pencil,
  Music,
  Camera,
};

export default function Hobbies() {
  const [selectedGallery, setSelectedGallery] = useState<typeof hobbies[0] | null>(null);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Load images when gallery is opened
  useEffect(() => {
    if (selectedGallery && selectedGallery.hasGallery) {
      loadGalleryImages(selectedGallery.galleryFolder || "");
    }
  }, [selectedGallery]);

  const loadGalleryImages = async (folder: string) => {
    try {
      // Try to load images from the folder
      // Since we can't dynamically read directory in the browser,
      // we'll try common image extensions and numbers
      const images: string[] = [];
      const extensions = ['jpg', 'jpeg', 'png', 'webp'];

      // Try loading up to 20 images with common naming patterns
      for (let i = 1; i <= 20; i++) {
        for (const ext of extensions) {
          const imagePath = `${folder}/image${i}.${ext}`;
          const altPath = `${folder}/${i}.${ext}`;

          // We'll add both patterns and let the browser handle 404s
          if (i <= 10) { // Only try first 10 to avoid too many requests
            images.push(imagePath);
            images.push(altPath);
          }
        }
      }

      // Also try some common patterns
      const commonPatterns = ['sketch', 'sky', 'photo', 'pic', 'img'];
      for (const pattern of commonPatterns) {
        for (let i = 1; i <= 5; i++) {
          for (const ext of extensions) {
            images.push(`${folder}/${pattern}${i}.${ext}`);
            images.push(`${folder}/${pattern}_${i}.${ext}`);
          }
        }
      }

      setGalleryImages(images);
    } catch (error) {
      console.error("Error loading gallery images:", error);
      setGalleryImages([]);
    }
  };

  const handleOpenGallery = (hobby: typeof hobbies[0]) => {
    if (hobby.hasGallery) {
      setSelectedGallery(hobby);
      setCurrentImageIndex(0);
    }
  };

  const handleCloseGallery = () => {
    setSelectedGallery(null);
    setGalleryImages([]);
    setCurrentImageIndex(0);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  return (
    <section id="hobbies" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-4">
            Interests & <span className="text-gradient">Hobbies</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-600 to-neon-cyan mx-auto mb-8" />
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            Beyond coding and research, here's what drives my curiosity
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {hobbies.map((hobby, index) => {
            const Icon = iconMap[hobby.icon] || Brain;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <HobbyCard
                  hobby={hobby}
                  Icon={Icon}
                  index={index}
                  onClick={() => handleOpenGallery(hobby)}
                />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Gallery Modal */}
      <AnimatePresence>
        {selectedGallery && (
          <GalleryModal
            hobby={selectedGallery}
            images={galleryImages}
            currentIndex={currentImageIndex}
            onClose={handleCloseGallery}
            onNext={handleNextImage}
            onPrev={handlePrevImage}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function HobbyCard({
  hobby,
  Icon,
  index,
  onClick,
}: {
  hobby: typeof hobbies[0];
  Icon: any;
  index: number;
  onClick: () => void;
}) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{
        y: -10,
        rotateY: 5,
        rotateX: 5,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`glass-effect p-6 rounded-xl hover:bg-gray-800/40 transition-all duration-300 group relative overflow-hidden ${
        hobby.hasGallery ? 'cursor-pointer' : 'cursor-default'
      }`}
      style={{
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600/0 to-neon-cyan/0 group-hover:from-primary-600/10 group-hover:to-neon-cyan/10 transition-all duration-300 rounded-xl" />

      {/* Content */}
      <div className="relative z-10">
        {/* Icon */}
        <motion.div
          className="w-16 h-16 bg-primary-600/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary-600/30 transition-colors"
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6 }}
        >
          <Icon className="w-8 h-8 text-primary-400 group-hover:text-neon-cyan transition-colors" />
        </motion.div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary-400 transition-colors">
          {hobby.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-400 leading-relaxed">
          {hobby.description}
        </p>

        {/* Decorative element */}
        <motion.div
          className="absolute -bottom-2 -right-2 w-24 h-24 bg-primary-600/10 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: index * 0.2,
          }}
        />
      </div>

      {/* Animated border */}
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `linear-gradient(135deg, transparent 0%, rgba(168, 85, 247, 0.1) 50%, transparent 100%)`,
        }}
      />

      {/* Click indicator for galleries */}
      {hobby.hasGallery && (
        <div className="absolute top-4 right-4 bg-primary-600/80 text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          Click to view
        </div>
      )}
    </motion.div>
  );
}

function GalleryModal({
  hobby,
  images,
  currentIndex,
  onClose,
  onNext,
  onPrev,
}: {
  hobby: typeof hobbies[0];
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  const [validImages, setValidImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Filter out images that don't exist
    const checkImages = async () => {
      const valid: string[] = [];
      for (const img of images) {
        try {
          const response = await fetch(img, { method: 'HEAD' });
          if (response.ok) {
            valid.push(img);
          }
        } catch {
          // Image doesn't exist, skip it
        }
      }
      setValidImages(valid);
      setLoading(false);
    };

    checkImages();
  }, [images]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-3 bg-gray-800/80 hover:bg-gray-700 rounded-full transition-colors z-50"
      >
        <X className="w-6 h-6 text-white" />
      </button>

      {/* Modal Content */}
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-6xl w-full mx-4"
      >
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-white mb-2">{hobby.title}</h2>
          <p className="text-gray-400">{hobby.description}</p>
        </div>

        {loading ? (
          <div className="glass-effect p-20 rounded-xl text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-500 mx-auto mb-4"></div>
            <p className="text-gray-400">Loading gallery...</p>
          </div>
        ) : validImages.length === 0 ? (
          <div className="glass-effect p-20 rounded-xl text-center">
            <Camera className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <p className="text-gray-400 text-lg mb-2">No images found</p>
            <p className="text-sm text-gray-500">
              Add your images to <code className="bg-gray-800 px-2 py-1 rounded">{hobby.galleryFolder}</code>
            </p>
            <p className="text-xs text-gray-600 mt-2">
              Supported patterns: image1.jpg, 1.jpg, sketch1.png, sky1.jpg, etc.
            </p>
          </div>
        ) : (
          <>
            {/* Image Display */}
            <div className="relative glass-effect p-4 rounded-xl mb-4">
              <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden">
                <img
                  src={validImages[currentIndex]}
                  alt={`${hobby.title} ${currentIndex + 1}`}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>

              {/* Navigation Arrows */}
              {validImages.length > 1 && (
                <>
                  <button
                    onClick={onPrev}
                    className="absolute left-2 top-1/2 -translate-y-1/2 p-3 bg-gray-800/80 hover:bg-gray-700 rounded-full transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6 text-white" />
                  </button>
                  <button
                    onClick={onNext}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-gray-800/80 hover:bg-gray-700 rounded-full transition-colors"
                  >
                    <ChevronRight className="w-6 h-6 text-white" />
                  </button>
                </>
              )}

              {/* Image Counter */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-gray-800/80 px-4 py-2 rounded-full">
                <span className="text-white text-sm">
                  {currentIndex + 1} / {validImages.length}
                </span>
              </div>
            </div>

            {/* Thumbnail Strip */}
            {validImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {validImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => onNext()}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      idx === currentIndex
                        ? 'border-primary-500 scale-110'
                        : 'border-gray-700 hover:border-gray-500'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </motion.div>
    </motion.div>
  );
}
