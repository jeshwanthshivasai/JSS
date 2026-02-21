import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
    const [isHovering, setIsHovering] = useState(false);
    const [hoverText, setHoverText] = useState('');

    // Use motion values for raw mouse coordinates
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Apply spring physics for "simulated weight/gravity" per Advanced Interactions Skill
    const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    useEffect(() => {
        // Only run on desktop
        if (window.matchMedia('(max-width: 768px)').matches) return;

        const moveCursor = (e: MouseEvent) => {
            // Offset by half the cursor size (standard size is 24px)
            mouseX.set(e.clientX - 12);
            mouseY.set(e.clientY - 12);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Look for data-cursor attributes
            const cursorTarget = target.closest('[data-cursor]');

            if (cursorTarget) {
                setIsHovering(true);
                const text = cursorTarget.getAttribute('data-cursor-text');
                if (text) setHoverText(text);
                else setHoverText('');
            } else {
                // Fallback for standard links/buttons
                if (target.closest('a') || target.closest('button')) {
                    setIsHovering(true);
                    setHoverText('');
                } else {
                    setIsHovering(false);
                    setHoverText('');
                }
            }
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, [mouseX, mouseY]);

    return (
        <motion.div
            className="fixed top-0 left-0 w-6 h-6 rounded-full bg-white pointer-events-none z-[100] flex items-center justify-center overflow-hidden mix-blend-difference"
            style={{
                x: cursorX,
                y: cursorY,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
                scale: isHovering ? (hoverText ? 4 : 2) : 1,
                opacity: 1
            }}
            transition={{ type: 'spring', ...springConfig }}
        >
            {hoverText && (
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-[6px] font-black uppercase tracking-widest text-black"
                    style={{ mixBlendMode: 'normal' }} // The text needs to be visible against the inverted circle
                >
                    {hoverText}
                </motion.span>
            )}
        </motion.div>
    );
}
