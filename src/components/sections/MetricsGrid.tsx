export default function MetricsGrid() {
  return (
    <div className="flex flex-col items-center md:items-end gap-12 md:gap-[4.5rem] text-center md:text-right mt-0 md:mt-auto mb-16">
      <div className="group cursor-default">
        <h3 className="text-4xl md:text-[2.75rem] font-display font-semibold text-white/90 mb-2 leading-none">500+</h3>
        <p className="text-xs font-medium opacity-80 leading-[1.4] max-w-[120px] ml-auto text-white/70 tracking-wide">
          weddings<br />officiated
        </p>
      </div>

      <div className="group cursor-default">
        <h3 className="text-4xl md:text-[2.75rem] font-display font-semibold text-white/90 mb-2 leading-none">15+</h3>
        <p className="text-xs font-medium opacity-80 leading-[1.4] max-w-[120px] ml-auto text-white/70 tracking-wide">
          years of<br />experience
        </p>
      </div>

      <div className="group cursor-default">
        <h3 className="text-4xl md:text-[2.75rem] font-display font-semibold text-white/90 mb-2 leading-none">1</h3>
        <p className="text-xs font-medium opacity-80 leading-[1.4] max-w-[120px] ml-auto text-white/70 tracking-wide">
          unforgettable<br />ceremony
        </p>
      </div>
    </div>
  );
}
