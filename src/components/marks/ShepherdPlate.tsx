import { PawMark } from "./PawMark";

/**
 * Illustrated plate for the hero: brass linework, cornered frame,
 * plate number, paw print at centre. Fully inline SVG so it scales cleanly
 * and inherits theme colours.
 */
export function ShepherdPlate({ className = "" }: { className?: string }) {
  return (
    <div className={`plate ${className}`}>
      <div className="plate-frame">
        <span className="plate-corner plate-corner-tl" aria-hidden />
        <span className="plate-corner plate-corner-tr" aria-hidden />
        <span className="plate-corner plate-corner-bl" aria-hidden />
        <span className="plate-corner plate-corner-br" aria-hidden />

        <div className="plate-inner">
          <div className="plate-glyph text-brass">
            <PawMark variant="outline" strokeWidth={1.4} />
          </div>

          <div className="plate-meta">
            <span>Pl. I</span>
            <span className="tracking-[0.3em]">CANIS · LUPUS · FAMILIARIS</span>
            <span>MMV</span>
          </div>
        </div>
      </div>
    </div>
  );
}
