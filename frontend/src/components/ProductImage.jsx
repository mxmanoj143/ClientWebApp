import { useState, useEffect } from "react";
import { Upload, ImagePlus, Camera } from "lucide-react";

// Toggle this OFF before deployment to hide upload UI.
const SHOW_UPLOAD = (process.env.REACT_APP_ENABLE_IMAGE_UPLOAD || "true") === "true";

const STORAGE_KEY = "rcp_product_images_v1";
const readStore = () => {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"); } catch { return {}; }
};
const writeStore = (data) => localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

export default function ProductImage({ productId, productName, className = "aspect-[4/3]", roundedClass = "rounded-2xl" }) {
  const [src, setSrc] = useState(null);

  useEffect(() => {
    const store = readStore();
    if (store[productId]) setSrc(store[productId]);
  }, [productId]);

  const onUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result;
      setSrc(dataUrl);
      const store = readStore();
      store[productId] = dataUrl;
      writeStore(store);
    };
    reader.readAsDataURL(file);
  };

  if (src) {
    return (
      <div className={`relative ${className} ${roundedClass} overflow-hidden bg-[#F5F7FA] group`}>
        <img src={src} alt={productName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        {SHOW_UPLOAD && (
          <label className="absolute top-3 right-3 flex items-center gap-1.5 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-[10px] uppercase tracking-[0.18em] font-bold text-[#072B61] cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity" data-testid={`upload-replace-${productId}`}>
            <Camera className="w-3 h-3" /> Replace
            <input type="file" accept="image/*" className="hidden" onChange={onUpload} />
          </label>
        )}
      </div>
    );
  }

  return (
    <div className={`relative ${className} ${roundedClass} overflow-hidden bg-gradient-to-br from-[#F5F7FA] to-[#B0B7C3]/30 border-2 border-dashed border-[#B0B7C3] flex flex-col items-center justify-center p-6 text-center`}>
      <ImagePlus className="w-10 h-10 text-[#072B61]/40" />
      <div className="mt-3 font-display font-bold text-[#072B61] text-sm">{productName}</div>
      <div className="text-[10px] uppercase tracking-[0.2em] text-[#475569] mt-1">Image placeholder</div>
      {SHOW_UPLOAD && (
        <label className="mt-4 inline-flex items-center gap-2 bg-[#072B61] text-white px-4 py-2 rounded-full text-xs font-bold cursor-pointer hover:bg-[#051E47] transition-colors" data-testid={`upload-product-image-${productId}`}>
          <Upload className="w-3.5 h-3.5" /> Upload Product Image
          <input type="file" accept="image/*" className="hidden" onChange={onUpload} />
        </label>
      )}
    </div>
  );
}
