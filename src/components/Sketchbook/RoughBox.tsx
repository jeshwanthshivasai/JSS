import { useEffect, useRef } from 'react';
import rough from 'roughjs';

interface Props {
    children: React.ReactNode;
    className?: string;
    strokeColor?: string;
    fillColor?: string;
    onMouseEnter?: () => void;
}

export const RoughBox = ({
    children,
    className = '',
    strokeColor = '#fbc31b', // Kodak Gold default
    fillColor = 'transparent',
    onMouseEnter
}: Props) => {
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (!svgRef.current) return;

        // Clear previous renders (crucial for React strict mode / re-renders)
        while (svgRef.current.firstChild) {
            svgRef.current.removeChild(svgRef.current.firstChild);
        }

        const rc = rough.svg(svgRef.current);
        const width = svgRef.current.clientWidth;
        const height = svgRef.current.clientHeight;

        // Draw the sketchy rectangle
        const node = rc.rectangle(2, 2, width - 4, height - 4, {
            stroke: strokeColor,
            strokeWidth: 2,
            roughness: 2,
            bowing: 1.5,
            fill: fillColor !== 'transparent' ? fillColor : undefined,
            fillStyle: 'hachure',
        });

        svgRef.current.appendChild(node);
    }, [strokeColor, fillColor]); // Re-draw on resize would be ideal, but keeping it simple for now

    return (
        <div
            className={`relative ${className}`}
            onMouseEnter={onMouseEnter}
        >
            <svg ref={svgRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />
            <div className="relative z-10 w-full h-full p-4 md:p-6">
                {children}
            </div>
        </div>
    );
};
