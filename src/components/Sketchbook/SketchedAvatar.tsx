import { useEffect, useRef } from 'react';
import rough from 'roughjs/bundled/rough.cjs';

export default function SketchedAvatar() {
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (!svgRef.current) return;

        const rc = rough.svg(svgRef.current);
        const svgNode = svgRef.current;

        // Clear any previous rough drawings to prevent duplication on HMR
        while (svgNode.lastChild) {
            if (svgNode.lastChild.nodeName !== 'defs' && svgNode.lastChild.nodeName !== 'filter') {
                svgNode.removeChild(svgNode.lastChild);
            } else {
                break; // Keep defs/filters if they are at the top
            }
        }

        // 1. Draw the Background Hexagon (Yellow)
        const bgPath = "M 250 10 L 450 100 L 490 300 L 350 490 L 150 490 L 10 300 L 50 100 Z";
        svgNode.appendChild(rc.path(bgPath, {
            fill: '#fce883',
            fillStyle: 'solid',
            roughness: 1.5,
            stroke: 'none'
        }));

        // 2. Draw the Hat
        svgNode.appendChild(rc.path("M120 180 L380 150 C380 150 360 100 300 100 L170 110 Z", { stroke: '#000', strokeWidth: 4, roughness: 1 }));
        svgNode.appendChild(rc.path("M100 200 C150 180 300 150 400 160", { stroke: '#000', strokeWidth: 4, roughness: 1.2 }));

        // 3. Face Outline
        svgNode.appendChild(rc.path("M150 250 C120 350 150 450 250 460 C350 450 360 300 380 200", { stroke: '#000', strokeWidth: 4, roughness: 1 }));

        // 4. Glasses
        svgNode.appendChild(rc.path("M140 230 C 130 250 180 260 200 220 L 210 210 M 230 220 C 240 250 300 240 310 200", { stroke: '#000', strokeWidth: 4, roughness: 0.5 }));
        svgNode.appendChild(rc.path("M150 210 L190 200 L200 230 L140 240 Z", { stroke: '#000', strokeWidth: 4, roughness: 0.5 }));
        svgNode.appendChild(rc.path("M240 200 L290 190 L310 220 L240 230 Z", { stroke: '#000', strokeWidth: 4, roughness: 0.5 }));

        // Eyes
        svgNode.appendChild(rc.path("M155 225 C165 220 175 225 185 220", { stroke: '#000', strokeWidth: 4, roughness: 0.5 }));
        svgNode.appendChild(rc.path("M255 210 C265 205 275 210 285 205", { stroke: '#000', strokeWidth: 4, roughness: 0.5 }));

        // 5. Nose & Mustache
        svgNode.appendChild(rc.path("M210 250 L190 280 C210 290 230 280 240 270", { stroke: '#000', strokeWidth: 4, roughness: 1 }));
        svgNode.appendChild(rc.path("M150 315 C180 300 210 320 230 300 C240 305 260 300 280 305", { stroke: '#000', strokeWidth: 4, roughness: 1 }));
        svgNode.appendChild(rc.path("M215 340 L 215 350 M225 340 L 225 350", { stroke: '#000', strokeWidth: 4, roughness: 1 })); // Beard dots
        svgNode.appendChild(rc.path("M160 325 C190 340 220 320 250 310", { stroke: '#000', strokeWidth: 4, roughness: 1 }));

        // 6. Ear & Grip
        svgNode.appendChild(rc.path("M340 200 C360 210 370 240 360 260 C340 270 330 230 340 200", { stroke: '#000', strokeWidth: 4, roughness: 1 }));
        svgNode.appendChild(rc.path("M330 215 L320 240 M325 245 C340 260 360 300 330 320", { stroke: '#000', strokeWidth: 4, roughness: 1 }));

        // 7. Red Pencil
        svgNode.appendChild(rc.path("M260 255 L380 200", { stroke: '#e63946', strokeWidth: 8, roughness: 1 })); // Red shaft
        svgNode.appendChild(rc.path("M260 255 L250 260 L262 250 Z", { fill: '#fff', fillStyle: 'solid', stroke: '#000', strokeWidth: 2, roughness: 0.5 })); // Tip
        svgNode.appendChild(rc.path("M261 254 L255 257 Z", { fill: '#000', fillStyle: 'solid', stroke: 'none' })); // Lead

    }, []);

    return (
        <div className="relative w-full max-w-sm mx-auto aspect-square filter drop-shadow-2xl">
            <svg
                ref={svgRef}
                viewBox="0 0 500 500"
                className="w-full h-full"
                // Applying the "Squigglevision / Boiling" effect from the SKILL.md
                style={{ filter: 'url(#squiggle)' }}
            >
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
