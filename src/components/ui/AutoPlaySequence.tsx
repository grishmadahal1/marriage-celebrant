import { useEffect, useRef, useState, useMemo } from "react";
import { useImagePreloader } from "../../hooks/useImagePreloader";

interface Props {
  folder?: string;
  frameCount?: number;
  blend?: boolean;
}

export default function AutoPlaySequence({
  folder = "/frames/frames/ezgif-1e071d9951ba528d-jpg",
  frameCount = 31,
  blend = false
}: Props) {
  const frames = useMemo(() => Array.from({ length: frameCount }).map((_, i) =>
    `${folder}/ezgif-frame-${(i + 1).toString().padStart(3, "0")}.jpg`
  ), [folder, frameCount]);

  const { loadedPct, isComplete, images } = useImagePreloader(frames);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>();
  const lastDrawTimeRef = useRef<number>(0);
  const frameIndexRef = useRef(0);
  const directionRef = useRef<1 | -1>(1); // Ping-pong tracker
  
  // State lock ensuring the canvas doesn't visually pop until the first frame loads into the paint engine
  const [hasFirstFrame, setHasFirstFrame] = useState(false);

  useEffect(() => {
    if (!isComplete || images.length === 0 || !canvasRef.current) return;
    
    // Safety fallback filtering corrupted chunks identically to previous iteration
    const validImages = images.filter(img => img.naturalWidth > 0);
    if (validImages.length === 0) return;

    const canvas = canvasRef.current;
    
    const handleResize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = window.devicePixelRatio || 2; 
      const rect = parent.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);

    const paintCanvas = (img: HTMLImageElement) => {
      const ctx = canvas.getContext("2d", { alpha: false });
      if (!ctx) return;

      const dpr = window.devicePixelRatio || 2;
      const rect = canvas.parentElement!.getBoundingClientRect();
      
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Deep white #FFFFFF explicitly forces "mix-blend-multiply" at the parent level to perfectly delete this background mapping, isolating the black sequence figurine layout perfectly!
      ctx.fillStyle = "#4a4a4a";
      ctx.fillRect(0, 0, rect.width, rect.height);

      // Mobile first Object `cover` implementation strictly mapped directly in 2D hardware context
      // Automatically crops arbitrary 16:9 sidebars/watermarks out of frame!
      // Automatically mapping to native boundary layer tracking seamlessly against the taupe background matching
      const hRatio = rect.width / img.width;
      const vRatio = rect.height / img.height;
      const ratio = Math.max(hRatio, vRatio);

      const targetWidth = img.width * ratio;
      const targetHeight = img.height * ratio;
      const centerShiftX = (rect.width - targetWidth) / 2;
      const centerShiftY = (rect.height - targetHeight) / 2;

      ctx.drawImage(img, 0, 0, img.width, img.height, centerShiftX, centerShiftY, targetWidth, targetHeight);
    };

    // Paint extremely first frame instantly
    paintCanvas(validImages[0]);
    setHasFirstFrame(true);

    // Extremely slow stylized motion. Lowering FPS creates a beautiful stop-motion editorial look!
    const fps = 10;
    const draw = (timestamp: number) => {
      if (timestamp - lastDrawTimeRef.current >= 1000 / fps) {
        lastDrawTimeRef.current = timestamp;
        
        paintCanvas(validImages[frameIndexRef.current]);
        
        // Push frame index natively
        frameIndexRef.current += directionRef.current;

        // Ping-pong bound clamping entirely eliminates snap "pauses" by reversing the sequence organically
        if (frameIndexRef.current >= validImages.length) {
            frameIndexRef.current = validImages.length - 2;
            directionRef.current = -1;
        } else if (frameIndexRef.current < 0) {
            frameIndexRef.current = 1;
            directionRef.current = 1;
        }
      }

      // Endlessly loops by calling rAF natively continuously
      requestRef.current = requestAnimationFrame(draw);
    };

    requestRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isComplete, images]);

  return (
    <div className="relative w-full h-full overflow-hidden flex items-center justify-center"
      style={blend ? {
        maskImage: 'radial-gradient(ellipse 65% 65% at center, black 30%, transparent 70%)',
        WebkitMaskImage: 'radial-gradient(ellipse 65% 65% at center, black 30%, transparent 70%)',
      } : undefined}
    >
      {/* Opacity fade mapping explicitly requested avoiding visual canvas pop natively without motion value hacks! */}
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-[1500ms] ease-out z-0 ${hasFirstFrame ? 'opacity-100' : 'opacity-0'}`}
      />
      {/* Feathered edges to blend image into background */}
      <div className="absolute inset-[-2px] z-10 pointer-events-none"
        style={{
          boxShadow: 'inset 0 0 100px 80px #4a4a4a, inset 0 0 40px 20px #4a4a4a',
        }}
      />

      {!isComplete && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center">
          <div className="w-12 h-[2px] bg-white/10 overflow-hidden relative drop-shadow border border-white/10 rounded-full">
            <div 
              className="absolute top-0 left-0 h-full bg-[#C5A059] transition-all duration-300 ease-out"
              style={{ width: `${loadedPct}%` }}
            />
          </div>
          <span className="mt-4 text-[10px] tracking-[0.3em] font-sans text-white/50 uppercase">
            Loading Sequence {loadedPct}%
          </span>
        </div>
      )}
    </div>
  );
}
