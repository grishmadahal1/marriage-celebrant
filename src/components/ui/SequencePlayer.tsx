import { useEffect, useRef, useState } from "react";

interface SequencePlayerProps {
  frameCount?: number;
  framePath?: (index: number) => string;
  fps?: number;
  className?: string; // allow external tailwind sizing
}

export default function SequencePlayer({
  frameCount = 31,
  framePath = (index) => `/frames/frames/ezgif-frame-${index.toString().padStart(3, "0")}.jpg`,
  fps = 30,
  className = "w-full h-full",
}: SequencePlayerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Track current frame for rendering lock rigidly without causing re-renders
  const frameIndexRef = useRef(0);
  const requestRef = useRef<number>();
  const lastDrawTimeRef = useRef<number>(0);

  // Phase 1: Heavy Preloading Layer
  useEffect(() => {
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = new Array(frameCount);

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      const srcStr = framePath(i + 1);
      
      img.src = srcStr;
      
      img.onload = () => {
        loadedCount++;
        if (loadedCount === frameCount) {
          setImages(loadedImages);
          setIsLoaded(true);
        }
      };

      img.onerror = () => {
        console.warn(`Could not load explicitly linked scroll frame: ${srcStr}`);
        loadedCount++;
        if (loadedCount === frameCount) {
          // Commit whatever managed to load gracefully so the whole site isn't permanently blocked
          setImages(loadedImages); 
          setIsLoaded(true);
        }
      };

      loadedImages[i] = img;
    }

    return () => {
      // Memory wiping in case of rapid unmounting
      loadedImages.forEach(img => {
        if (img) img.src = "";
      });
    };
  }, [frameCount, framePath]);

  // Phase 2: High Performance Request Animation Frame Autoplay Loop
  useEffect(() => {
    // Await preload barrier
    if (!isLoaded || images.length === 0 || !canvasRef.current) return;

    // Handle high DPI crisp drawing explicitly on mount
    const handleResize = () => {
      if (!canvasRef.current) return;
      const dpr = window.devicePixelRatio || 1;
      const rect = canvasRef.current.getBoundingClientRect();
      canvasRef.current.width = rect.width * dpr;
      canvasRef.current.height = rect.height * dpr;
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Render logic loop constrained purely by hardware requested FPS
    const draw = (timestamp: number) => {
      // Milliseconds elapsed logic per frame exactly mapping standard video specs
      if (timestamp - lastDrawTimeRef.current >= 1000 / fps) {
        lastDrawTimeRef.current = timestamp;
        
        // Safety filter corrupted natural dimensions
        const validImages = images.filter(img => img.naturalWidth > 0);
        if (validImages.length > 0) {
          paintCanvas(validImages[frameIndexRef.current]);
          frameIndexRef.current = (frameIndexRef.current + 1) % validImages.length;
        }
      }
      
      requestRef.current = requestAnimationFrame(draw);
    };

    // Kickstart
    requestRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isLoaded, images, fps]);

  // Pure canvas painting
  const paintCanvas = (img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Opt out of alpha layer calculations for extreme painting speed
    const ctx = canvas.getContext("2d", { alpha: false }); 
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    
    // Reset transform baseline cleanly
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Wipe previous frame fully with the site's identical atmospheric color string
    // This perfectly masks exact matching frame boundaries!
    ctx.fillStyle = "#B8A898"; 
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Calculate specific aspect ratio scaling to 'contain' the sequence (No awkward cropping)
    const hRatio = rect.width / img.width;
    const vRatio = rect.height / img.height;
    const ratio = Math.min(hRatio, vRatio);

    const targetWidth = img.width * ratio;
    const targetHeight = img.height * ratio;
    // Exactly center it horizontally and vertically inside the canvas boundary block
    const centerShiftX = (rect.width - targetWidth) / 2;
    const centerShiftY = (rect.height - targetHeight) / 2;

    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      centerShiftX,
      centerShiftY,
      targetWidth,
      targetHeight
    );
  };

  return (
    <div className={`relative flex items-center justify-center overflow-hidden ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 flex flex-col gap-3 items-center justify-center text-black/60 font-sans text-xs uppercase z-10">
          Loading Frames
        </div>
      )}
      {isLoaded && images.filter(img => img.naturalWidth > 0).length === 0 && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/5 text-[#1A1A1A]/60 text-sm z-20">
          Sequence Unreachable in Browser
          <span className="font-mono mt-1 opacity-70 text-xs px-2 break-all">{framePath(1)}</span>
          <img src={framePath(1)} alt="test" className="w-16 h-16 mt-4 object-cover border border-black/10 rounded-lg shadow" />
        </div>
      )}
      <canvas ref={canvasRef} className="w-full h-full pointer-events-none drop-shadow-2xl z-10" />
    </div>
  );
}
