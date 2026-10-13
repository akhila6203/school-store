
import { useEffect, useState } from "react";
import {
  X,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

export default function SizeChartModal({
  open,
  onClose,
  image,
  title = "Size Chart",
}) {
  const [fullscreen, setFullscreen] = useState(false);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    if (!open) {
      setFullscreen(false);
      setZoom(1);
      return;
    }

    const handleEscape = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 p-3 sm:p-6"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`flex flex-col overflow-hidden bg-white shadow-2xl ${
          fullscreen
            ? "h-full w-full rounded-lg"
            : "max-h-[90dvh] w-full max-w-[760px] rounded-2xl"
        }`}
      >
        <header className="flex shrink-0 items-center justify-between border-b border-slate-200 px-4 py-3">
          <h2 className="text-lg font-extrabold text-slate-900">
            {title}
          </h2>

          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Zoom out"
              onClick={() => setZoom((z) => Math.max(1, z - 0.25))}
              className="rounded-lg p-2 hover:bg-slate-100"
            >
              <ZoomOut size={19} />
            </button>

            <button
              type="button"
              aria-label="Zoom in"
              onClick={() => setZoom((z) => Math.min(3, z + 0.25))}
              className="rounded-lg p-2 hover:bg-slate-100"
            >
              <ZoomIn size={19} />
            </button>

            <button
              type="button"
              aria-label={fullscreen ? "Exit fullscreen" : "Fullscreen"}
              onClick={() => setFullscreen((v) => !v)}
              className="rounded-lg p-2 hover:bg-slate-100"
            >
              {fullscreen ? (
                <Minimize2 size={19} />
              ) : (
                <Maximize2 size={19} />
              )}
            </button>

            <button
              type="button"
              aria-label="Close size chart"
              onClick={onClose}
              className="rounded-lg p-2 hover:bg-red-50 hover:text-red-600"
            >
              <X size={21} />
            </button>
          </div>
        </header>

        <div className="flex min-h-0 flex-1 items-center justify-center overflow-auto bg-[#F8FAFC] p-4 sm:p-6">
          {image ? (
            <img
              src={image}
              alt={title}
              className="max-h-full max-w-full object-contain transition-transform"
              style={{
                transform: `scale(${zoom})`,
                transformOrigin: "center center",
              }}
            />
          ) : (
            <p className="text-center text-slate-500">
              Size chart is not available for this product.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
