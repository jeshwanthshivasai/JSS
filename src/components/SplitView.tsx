import { useScroll, motion, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Sketchbook from './Sketchbook/Sketchbook';

export default function SplitView() {
    const containerRef = useRef<HTMLDivElement>(null);

    // Track scroll of the right panel
    const { scrollYProgress } = useScroll({
        container: containerRef,
    });

    // Use scroll progress to "Match Cut" the text on the left.
    // When scroll hits certain thresholds, we swap the Vox highlighted word.
    const activeWord = useTransform(scrollYProgress,
        [0, 0.4, 0.8],
        ["EXPLORER", "CREATOR", "MUSICIAN"]
    );

    const activeDetail = useTransform(scrollYProgress,
        [0, 0.4, 0.8],
        [
            "Analog photography, environmental volunteering & off-grid trekking.",
            "Level 7 Google Local Guide highlighting architectural nuances.",
            "Sonic storytelling via acoustic flutes, sitars, and human beatboxing."
        ]
    );

    return (
        <div className="flex flex-col md:flex-row w-full h-screen overflow-hidden">

            {/* LEFT: Fixed Context Engine (Vox Style) */}
            <div className="w-full md:w-[45%] h-auto md:h-screen bg-foreground text-background shrink-0 flex flex-col justify-between p-8 md:p-16 relative z-10">

                {/* Navigation / Header */}
                <header className="flex justify-between items-center w-full uppercase text-xs font-bold tracking-[0.2em] opacity-50">
                    <span>Jeshwanth Shiva Sai</span>
                    <span>© 2026</span>
                </header>

                {/* The Match-Cut Big Typography */}
                <div className="flex flex-col mt-auto mb-auto md:mt-32">
                    <h1 className="text-6xl md:text-8xl lg:text-[140px] leading-[0.85] tracking-tighter uppercase break-words">
                        <span className="block opacity-40">I AM A</span>
                        <motion.span className="vox-highlight block text-primary mt-2">{activeWord}</motion.span>
                    </h1>
                    <motion.p className="text-xl md:text-3xl font-sketch italic mt-8 max-w-sm ml-1 text-primary">
                        {activeDetail}
                    </motion.p>
                </div>

                {/* Scroll Indicator */}
                <div className="flex items-center gap-4 uppercase font-bold text-xs tracking-widest mt-auto opacity-40">
                    <span className="w-8 h-[2px] bg-background block"></span> SCROLL TO EXPLORE
                </div>
            </div>

            {/* RIGHT: Scrollable Content Feed */}
            <div
                ref={containerRef}
                className="w-full md:w-[55%] h-screen overflow-y-auto overflow-x-hidden relative bg-background border-l-4 border-foreground"
            >
                <div className="pt-24 pb-64 px-4 md:px-12">
                    <Sketchbook />
                </div>
            </div>

        </div>
    );
}
