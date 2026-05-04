"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Brain, Pencil, Music, Camera, X, ChevronLeft, ChevronRight, Images } from "lucide-react";
import { hobbies } from "@/lib/data";
import { useState } from "react";

const iconMap: Record<string, any> = { Brain, Pencil, Music, Camera };

export default function Hobbies() {
  const [selectedGallery, setSelectedGallery] = useState<typeof hobbies[0] | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleOpenGallery = (hobby: typeof hobbies[0]) => {
    if (hobby.hasGallery && hobby.images?.length > 0) {
      setSelectedGallery(hobby);
      setCurrentImageIndex(0);
    }
  };

  const handleClose = () => { setSelectedGallery(null); setCurrentImageIndex(0); };
  const handleNext = () => {
    if (selectedGallery) setCurrentImageIndex((p) => (p + 1) % selectedGallery.images.length);
  };
  const handlePrev = () => {
    if (selectedGallery) setCurrentImageIndex((p) => (p - 1 + selectedGallery.images.length) % selectedGallery.images.length);
  };

  return (
    <section id="hobbies" className="py-20 px-4 sm:px-6 lg:px-8 section-alt">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="tag-mono text-indigo/70 uppercase tracking-widest mb-2">Beyond Code</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-ink">
            Interests & <span className="text-gradient">Hobbies</span>
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-indigo to-science mx-auto mt-4" />
          <p className="text-ink/50 mt-4 text-sm">Beyond research and code, here's what keeps me curious</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {hobbies.map((hobby, index) => {
            const Icon = iconMap[hobby.icon] || Brain;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <HobbyCard hobby={hobby} Icon={Icon} onClick={() => handleOpenGallery(hobby)} />
              </motion.div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {selectedGallery && (
          <GalleryModal
            hobby={selectedGallery}
            images={selectedGallery.images}
            currentIndex={currentImageIndex}
            onClose={handleClose}
            onNext={handleNext}
            onPrev={handlePrev}
            onJump={setCurrentImageIndex}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function HobbyCard({ hobby, Icon, onClick }: { hobby: typeof hobbies[0]; Icon: any; onClick: () => void }) {
  const isGallery = hobby.hasGallery && hobby.images?.length > 0;

  return (
    <motion.div
      onClick={onClick}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className={`paper-card p-5 rounded-xl flex flex-col gap-4 relative overflow-hidden transition-shadow duration-300 ${
        isGallery ? "cursor-pointer hover:shadow-lg hover:shadow-amber/10 hover:border-amber/30" : "cursor-default"
      }`}
    >
      {/* Gallery "tap to open" — always visible ribbon */}
      {isGallery && (
        <div className="absolute top-0 right-0">
          <div className="bg-amber text-white text-xs font-bold tag-mono px-3 py-1 rounded-bl-xl flex items-center gap-1.5 shadow-sm">
            <Images className="w-3 h-3" />
            {hobby.images.length} photos
          </div>
        </div>
      )}

      {/* Icon */}
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
        isGallery ? "bg-amber-pale" : "bg-indigo-pale"
      }`}>
        <Icon className={`w-6 h-6 ${isGallery ? "text-amber-dark" : "text-indigo"}`} />
      </div>

      <div className="flex-1">
        <h3 className="font-bold text-ink text-base mb-1.5">{hobby.title}</h3>
        <p className="text-ink/55 text-sm leading-relaxed">{hobby.description}</p>
      </div>

      {/* CTA — always visible for galleries */}
      {isGallery ? (
        <div className="flex items-center gap-1.5 text-amber-dark text-xs font-semibold tag-mono mt-1">
          <Camera className="w-3.5 h-3.5" />
          Tap to view gallery →
        </div>
      ) : (
        <div className="h-5" />
      )}
    </motion.div>
  );
}

function GalleryModal({ hobby, images, currentIndex, onClose, onNext, onPrev, onJump }: {
  hobby: typeof hobbies[0]; images: string[]; currentIndex: number;
  onClose: () => void; onNext: () => void; onPrev: () => void; onJump: (i: number) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 backdrop-blur-sm p-4"
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2.5 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-50"
      >
        <X className="w-5 h-5 text-white" />
      </button>

      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="max-w-4xl w-full"
      >
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold text-white">{hobby.title}</h2>
          <p className="text-white/50 text-sm mt-1">{currentIndex + 1} / {images.length}</p>
        </div>

        <div className="relative paper-card rounded-xl overflow-hidden mb-3">
          <div className="relative aspect-video bg-parchment-dark">
            <img
              src={images[currentIndex]}
              alt={`${hobby.title} ${currentIndex + 1}`}
              className="w-full h-full object-contain"
            />
          </div>

          {images.length > 1 && (
            <>
              <button
                onClick={onPrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 bg-ink/60 hover:bg-ink/80 rounded-full transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>
              <button
                onClick={onNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 bg-ink/60 hover:bg-ink/80 rounded-full transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
            </>
          )}
        </div>

        {/* Thumbnail strip */}
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1 justify-center">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => onJump(idx)}
                className={`flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                  idx === currentIndex ? "border-amber scale-110" : "border-white/20 hover:border-white/50"
                }`}
              >
                <img src={img} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
