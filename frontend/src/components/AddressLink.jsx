import { ExternalLink } from "lucide-react";
import { COMPANY } from "@/data/site";

// Clickable address that opens Google Maps in a new tab.
export default function AddressLink({ className = "", showIcon = true, children }) {
  return (
    <a
      href={COMPANY.mapsLink}
      target="_blank"
      rel="noopener noreferrer"
      data-testid="address-link"
      className={`inline-flex items-center gap-1.5 hover:underline transition-colors group cursor-pointer ${className}`}
      title="Open in Google Maps"
    >
      <span>{children || COMPANY.address}</span>
      {showIcon && <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100 flex-shrink-0" />}
    </a>
  );
}
