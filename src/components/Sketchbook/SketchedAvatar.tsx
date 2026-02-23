export default function SketchedAvatar() {
    return (
        <div className="relative w-full max-w-sm mx-auto aspect-square filter drop-shadow-2xl">
            <img
                src="/Jesse_Logo_BG.png"
                alt="Jeswanth Avatar"
                className="w-full h-full object-contain"
                // Applying the "Squigglevision / Boiling" effect from the SKILL.md
                style={{ filter: 'url(#squiggle)' }}
            />
            {/* Hidden SVG to define the displacement filter */}
            <svg width="0" height="0" className="hidden">
                <defs>
                    <filter id="squiggle">
                        <feTurbulence baseFrequency="0.04" numOctaves="3" result="noise" seed="0">
                            <animate attributeName="seed" values="0;1;2;3;4" dur="0.4s" repeatCount="indefinite" />
                        </feTurbulence>
                        <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" xChannelSelector="R" yChannelSelector="G" />
                    </filter>
                </defs>
            </svg>
        </div>
    );
}
