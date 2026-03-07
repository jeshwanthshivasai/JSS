import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '../store/uiStore';

export default function LoadingScreen() {
    const { isLoaded, setIsLoaded } = useUIStore();
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Handle global scroll locking
        if (!isLoaded) {
            document.body.style.overflow = 'hidden';
            window.scrollTo(0, 0); // Force to top
        } else {
            // Re-enable smooth scrolling if using Lenis, or default body overflow
            document.body.style.overflow = 'auto';
        }
    }, [isLoaded]);

    useEffect(() => {
        // Enforce a premium, deliberate loading sequence (minimum of ~2.5 seconds)
        const duration = 2500;
        const interval = 20; // 50 times per second
        const step = 100 / (duration / interval);

        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(() => setIsLoaded(true), 400); // Small pause at 100% before unlocking
                    return 100;
                }

                // Add a slight ease-out feel to the counter so it hangs at 99 longer
                const remaining = 100 - prev;
                return prev + Math.max(step * (remaining / 100), 0.5);
            });
        }, interval);

        return () => clearInterval(timer);
    }, [setIsLoaded]);

    return (
        <AnimatePresence>
            {!isLoaded && (
                <motion.div
                    key="loader"
                    initial={{ y: 0 }}
                    exit={{
                        y: '-100%',
                        transition: {
                            duration: 1.2,
                            ease: [0.76, 0, 0.24, 1], // Custom Awwwards-style cubic bezier ease (very snappy but smooth)
                        }
                    }}
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background touch-none pointer-events-auto"
                >
                    {/* The typography block */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                        <motion.h1
                            className="text-[10vw] md:text-[8vw] font-black text-foreground uppercase tracking-tighter leading-none mix-blend-difference"
                        >
                            JESHWANTH
                        </motion.h1>
                        <motion.div
                            className="mt-4 overflow-hidden"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                        >
                            <p className="text-sm md:text-base font-bold tracking-[0.3em] uppercase text-primary">
                                System Initialization
                            </p>
                        </motion.div>
                    </div>

                    {/* The exact progress percentage */}
                    <div className="absolute bottom-10 right-10 flex items-end overflow-hidden">
                        <motion.span
                            className="text-7xl md:text-9xl font-black text-foreground leading-[0.8] tracking-tighter"
                        >
                            {Math.floor(progress)}
                        </motion.span>
                        <span className="text-xl md:text-3xl font-bold text-primary mb-2 md:mb-4 ml-1">%</span>
                    </div>

                    {/* Progress Bar Line */}
                    <div className="absolute bottom-0 left-0 h-1 md:h-2 bg-primary w-full origin-left"
                        style={{ transform: `scaleX(${progress / 100})` }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
