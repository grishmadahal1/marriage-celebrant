import { useEffect, useRef, useState } from "react";

export function useImagePreloader(paths: string[]) {
  const [loadedPct, setLoadedPct] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    let loaded = 0;
    const imgs = new Array(paths.length);
    
    paths.forEach((path, i) => {
      const img = new Image();
      img.src = path;
      const handleLoad = () => {
        loaded++;
        setLoadedPct(Math.round((loaded / paths.length) * 100));
        if (loaded === paths.length) {
          imagesRef.current = imgs;
          setIsComplete(true);
        }
      };
      
      img.onload = handleLoad;
      img.onerror = () => {
        console.warn(`Failed to cache sequence frame: ${path}`);
        handleLoad();
      };
      imgs[i] = img;
    });

  }, [paths]);

  return { loadedPct, isComplete: isComplete || loadedPct === 100, images: imagesRef.current };
}
