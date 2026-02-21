import { useRef, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface MagneticProps {
    children: ReactNode;
    strength?: number;
}

export default function Magnetic({ children, strength = 40 }: MagneticProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        if (!ref.current) return;

        // Magnetic pull requires desktop only to avoid touch issues
        if (window.matchMedia('(max-width: 768px)').matches) return;

        const node = ref.current;

        const handleMouse = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { height, width, left, top } = node.getBoundingClientRect();

            const middleX = clientX - (left + width / 2);
            const middleY = clientY - (top + height / 2);

            // Max pull is limited by 'strength'
            const x = (middleX / width) * strength;
            const y = (middleY / height) * strength;

            setPosition({ x, y });
        };

        const reset = () => {
            setPosition({ x: 0, y: 0 });
        };

        node.addEventListener('mousemove', handleMouse);
        node.addEventListener('mouseleave', reset);

        return () => {
            node.removeEventListener('mousemove', handleMouse);
            node.removeEventListener('mouseleave', reset);
        };
    }, [strength]);

    return (
        <motion.div
            ref={ref}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
            className="inline-block"
        >
            {children}
        </motion.div>
    );
}
