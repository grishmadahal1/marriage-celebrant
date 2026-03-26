export default function VideoBackground() {
  return (
    <div className="absolute inset-0 -z-20 overflow-hidden">
      <video 
        autoPlay 
        loop 
        muted 
        playsInline
        className="w-full h-full object-cover opacity-40"
      >
        <source src="https://storage.googleapis.com/cortex-media-production/67e38287-1111-477c-87b3-847254f15049/input_file_0.mp4" type="video/mp4" />
      </video>
      {/* Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-[#B8A898]/60" />
    </div>
  );
}
