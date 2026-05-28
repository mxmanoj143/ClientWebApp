import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Maximize2, ImageOff } from "lucide-react";
import { getProductImages } from "@/data/productImages";

// Production read-only image gallery.
// Loads bundled images from /assets/products/ (no upload, no localStorage).
export default function ProductImage({ productId, productName, className = "aspect-[4/5]" }) {
  const [images, setImages] = useState([]);
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  useEffect(() => {
    setImages(getProductImages(productId));
    setIndex(0);
  }, [productId]);

  const prev = () => setIndex((i) => (images.length ? (i - 1 + images.length) % images.length : 0));
  const next = () => setIndex((i) => (images.length ? (i + 1) % images.length : 0));

  // Empty state — should rarely occur once all products have images mapped.
  if (images.length === 0) {
    return (
      <div className={`relative ${className} rounded-2xl overflow-hidden bg-[#F5F7FA] border border-[#B0B7C3] flex flex-col items-center justify-center p-6 text-center`}>
        <ImageOff className="w-10 h-10 text-[#072B61]/40" />
        <div className="mt-3 font-display font-bold text-[#072B61] text-sm">{productName}</div>
        <div className="text-[10px] uppercase tracking-[0.2em] text-[#475569] mt-1">Image coming soon</div>
      </div>
    );
  }

  return (
    <div>
      <div className={`relative ${className} rounded-2xl overflow-hidden bg-[#F5F7FA] group`}>
        <AnimatePresence mode="wait">
          <motion.img
            key={images[index]}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            src={images[index]}
            alt={`${productName} ${index + 1}`}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover cursor-pointer"
            onClick={() => setLightbox(true)}
          />
        </AnimatePresence>

        <button onClick={() => setLightbox(true)} className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur rounded-full flex items-center justify-center hover:bg-white" aria-label="Expand">
          <Maximize2 className="w-4 h-4 text-[#072B61]" />
        </button>

        {images.length > 1 && (
          <>
            <button onClick={prev} className="absolute top-1/2 -translate-y-1/2 left-3 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center hover:bg-white shadow" aria-label="Previous" data-testid={`img-prev-${productId}`}>
              <ChevronLeft className="w-5 h-5 text-[#072B61]" />
            </button>
            <button onClick={next} className="absolute top-1/2 -translate-y-1/2 right-3 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center hover:bg-white shadow" aria-label="Next" data-testid={`img-next-${productId}`}>
              <ChevronRight className="w-5 h-5 text-[#072B61]" />
            </button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.map((_, i) => (
                <button key={i} onClick={() => setIndex(i)} className={`h-2 rounded-full transition-all ${i === index ? "bg-white w-6" : "bg-white/50 w-2"}`} aria-label={`Image ${i + 1}`} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1" data-testid={`thumbs-${productId}`}>
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              data-testid={`img-thumb-${productId}-${i}`}
              className={`w-16 h-16 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all ${
                i === index ? "border-[#072B61]" : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <img src={src} alt={`Thumb ${i + 1}`} loading="lazy" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setLightbox(false)}
            className="fixed inset-0 z-[60] bg-[#072B61]/95 backdrop-blur-md flex items-center justify-center p-6"
            data-testid={`lightbox-${productId}`}
          >
            <button onClick={() => setLightbox(false)} className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white" aria-label="Close">
              <X className="w-5 h-5" />
            </button>
            {images.length > 1 && (
              <>
                <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute top-1/2 -translate-y-1/2 left-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white"><ChevronLeft className="w-6 h-6" /></button>
                <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute top-1/2 -translate-y-1/2 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white"><ChevronRight className="w-6 h-6" /></button>
              </>
            )}
            <motion.img
              key={images[index]}
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              src={images[index]} alt={productName}
              onClick={(e) => e.stopPropagation()}
              className="max-w-[92vw] max-h-[82vh] rounded-2xl object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
