import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, ImagePlus, Camera, Trash2, ChevronLeft, ChevronRight, X, Maximize2 } from "lucide-react";

// Toggle this OFF before deployment to hide upload UI.
const SHOW_UPLOAD = (process.env.REACT_APP_ENABLE_IMAGE_UPLOAD || "true") === "true";
const STORAGE_KEY = "rcp_product_images_v2";
const MAX_IMAGES = 8;

const readStore = () => {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"); } catch { return {}; }
};
const writeStore = (data) => localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

export default function ProductImages({ productId, productName, className = "aspect-[4/5]" }) {
  const [images, setImages] = useState([]); // array of dataURLs
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  useEffect(() => {
    const store = readStore();
    const list = Array.isArray(store[productId]) ? store[productId] : [];
    setImages(list);
    setIndex(0);
  }, [productId]);

  const persist = (list) => {
    const store = readStore();
    if (list.length === 0) delete store[productId];
    else store[productId] = list;
    writeStore(store);
  };

  const onUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    const remaining = MAX_IMAGES - images.length;
    const accepted = files.slice(0, remaining);
    let pending = accepted.length;
    const next = [...images];
    accepted.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        next.push(reader.result);
        pending -= 1;
        if (pending === 0) {
          setImages(next);
          persist(next);
          setIndex(next.length - accepted.length);
        }
      };
      reader.readAsDataURL(file);
    });
    e.target.value = "";
  };

  const removeAt = (i) => {
    const next = images.filter((_, idx) => idx !== i);
    setImages(next);
    persist(next);
    if (index >= next.length) setIndex(Math.max(0, next.length - 1));
  };

  const prev = () => setIndex((i) => (images.length ? (i - 1 + images.length) % images.length : 0));
  const next = () => setIndex((i) => (images.length ? (i + 1) % images.length : 0));

  if (images.length === 0) {
    return (
      <div className={`relative ${className} rounded-2xl overflow-hidden bg-gradient-to-br from-[#F5F7FA] to-[#B0B7C3]/30 border-2 border-dashed border-[#B0B7C3] flex flex-col items-center justify-center p-6 text-center`}>
        <ImagePlus className="w-10 h-10 text-[#072B61]/40" />
        <div className="mt-3 font-display font-bold text-[#072B61] text-sm">{productName}</div>
        <div className="text-[10px] uppercase tracking-[0.2em] text-[#475569] mt-1">Image placeholder</div>
        {SHOW_UPLOAD && (
          <label className="mt-4 inline-flex items-center gap-2 bg-[#072B61] text-white px-4 py-2 rounded-full text-xs font-bold cursor-pointer hover:bg-[#051E47] transition-colors" data-testid={`upload-product-image-${productId}`}>
            <Upload className="w-3.5 h-3.5" /> Upload Product Images
            <input type="file" accept="image/*" multiple className="hidden" onChange={onUpload} />
          </label>
        )}
      </div>
    );
  }

  return (
    <div>
      <div className={`relative ${className} rounded-2xl overflow-hidden bg-[#F5F7FA] group`}>
        <AnimatePresence mode="wait">
          <motion.img
            key={images[index]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            src={images[index]}
            alt={`${productName} ${index + 1}`}
            className="absolute inset-0 w-full h-full object-cover cursor-pointer"
            onClick={() => setLightbox(true)}
          />
        </AnimatePresence>

        {/* Lightbox button */}
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
                <button key={i} onClick={() => setIndex(i)} className={`w-2 h-2 rounded-full transition-all ${i === index ? "bg-white w-6" : "bg-white/50"}`} aria-label={`Slide ${i + 1}`} />
              ))}
            </div>
          </>
        )}

        {SHOW_UPLOAD && (
          <button onClick={() => removeAt(index)} className="absolute bottom-3 right-3 w-9 h-9 bg-red-500/95 hover:bg-red-600 text-white rounded-full flex items-center justify-center" aria-label="Remove" data-testid={`img-remove-${productId}`}>
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Thumbnails */}
      <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1">
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            data-testid={`img-thumb-${productId}-${i}`}
            className={`w-16 h-16 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all ${
              i === index ? "border-[#072B61]" : "border-transparent opacity-60 hover:opacity-100"
            }`}
          >
            <img src={src} alt={`Thumb ${i + 1}`} className="w-full h-full object-cover" />
          </button>
        ))}
        {SHOW_UPLOAD && images.length < MAX_IMAGES && (
          <label className="w-16 h-16 rounded-lg border-2 border-dashed border-[#B0B7C3] flex-shrink-0 flex items-center justify-center text-[#072B61] cursor-pointer hover:bg-[#F5F7FA] transition-colors" data-testid={`upload-add-${productId}`}>
            <Camera className="w-5 h-5" />
            <input type="file" accept="image/*" multiple className="hidden" onChange={onUpload} />
          </label>
        )}
      </div>

      {/* Lightbox */}
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
