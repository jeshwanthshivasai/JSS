import { useEffect } from 'react';
import { unlockAudio } from '../lib/audio';

export default function HeroScene() {

    // Browsers block audio. Unlock it on the first interaction anywhere in the Hero.
    useEffect(() => {
        const handleFirstInteraction = () => {
            unlockAudio();
            window.removeEventListener('click', handleFirstInteraction);
            window.removeEventListener('touchstart', handleFirstInteraction);
        };

        window.addEventListener('click', handleFirstInteraction);
        window.addEventListener('touchstart', handleFirstInteraction);

        return () => {
            window.removeEventListener('click', handleFirstInteraction);
            window.removeEventListener('touchstart', handleFirstInteraction);
        };
    }, []);

    return (
        <section id="hero" className="relative w-full h-screen overflow-hidden bg-background" data-cursor-text="EXPLORE">

            {/* Conversational Typography sitting BEHIND the 3D Canvas */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-0 pointer-events-none opacity-80 select-none px-4">
                <h1 className="text-4xl md:text-7xl lg:text-9xl font-black text-foreground uppercase tracking-tighter text-center">
                    Hey, I'm<br /><span className="text-primary">Jeshwanth.</span>
                </h1>
                <p className="font-sketch text-xl md:text-3xl text-secondary mt-6 max-w-2xl text-center leading-relaxed">
                    I used to design buildings. Now I design <span className="text-foreground font-sans font-bold italic">impactful digital products</span>. Welcome to my creative engine.
                </p>
            </div>


            {/* Bottom Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none">
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-foreground/50">Scroll</span>
                <div className="w-[1px] h-12 bg-foreground/30 overflow-hidden">
                    <div className="w-full h-full bg-primary animate-[translateY_2s_ease-in-out_infinite]" style={{ transformOrigin: 'top' }}></div>
                </div>
            </div>
        </section>
    );
}
