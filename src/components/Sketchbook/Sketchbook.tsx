import { motion } from 'framer-motion';
import SketchedAvatar from './SketchedAvatar';
import { playSketchbookHover } from '../../lib/audio';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, rotate: -2 },
    visible: { opacity: 1, scale: 1, rotate: 0, transition: { type: 'spring' as any, stiffness: 80 } }
};

export default function Sketchbook() {
    return (
        <section className="relative z-10 w-full mb-32">
            <div className="mb-12">
                <h2 className="text-sm tracking-[0.2em] text-accent-teal uppercase mb-2 font-bold">Phase 02</h2>
                <h3 className="text-5xl font-black tracking-tighter text-foreground uppercase">
                    The Sketchbook
                </h3>
                <p className="mt-4 text-accent-teal text-xl font-sketch">
                    Organic passions, analog mediums, and unfiltered creativity.
                </p>
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="flex flex-col gap-8"
            >
                {/* The Sketched Avatar Showcase */}
                <motion.div variants={itemVariants} className="w-full flex flex-col md:flex-row items-center gap-8 mb-12">
                    <div className="w-full md:w-1/2" onMouseEnter={playSketchbookHover}>
                        <SketchedAvatar />
                    </div>
                    <div className="w-full md:w-1/2">
                        <h4 className="text-4xl md:text-5xl font-black uppercase text-foreground">The Architect's Pivot</h4>
                        <p className="mt-4 text-foreground/80 font-bold text-lg md:text-xl leading-relaxed">
                            I spent years designing physical structures. Now, I use those exact same principles—balance, flow, and extreme attention to detail—to build digital products. I still sketch everything by hand first.
                        </p>
                    </div>
                </motion.div>

                {/* Google Local Guide - Big Featured Block */}
                <motion.div variants={itemVariants} className="w-full group" onMouseEnter={playSketchbookHover}>
                    <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0a] p-10 md:p-14 hover:bg-[#111] transition-colors duration-500 h-full flex flex-col cursor-pointer shadow-2xl">
                        <h4 className="text-4xl md:text-5xl font-black uppercase text-foreground">Level 7 Local Guide</h4>
                        <p className="mt-4 text-foreground/80 font-bold text-lg max-w-2xl">Connecting local businesses and highlighting architectural nuances across India.</p>
                        <div className="mt-10 w-full h-56 bg-[#1a1a1a] rounded-xl border border-white/5 flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-700">
                            <span className="font-bold uppercase tracking-widest text-foreground/30">Map Imagery Placeholder</span>
                        </div>
                    </div>
                </motion.div>

                {/* Gaming Stats */}
                <motion.div variants={itemVariants} className="w-full flex flex-col gap-6">
                    <div className="rounded-3xl border border-white/10 bg-[#0a0a0a] p-8 md:p-10 hover:bg-[#111] transition-colors duration-500 shadow-xl cursor-pointer" onMouseEnter={playSketchbookHover}>
                        <div className="flex justify-between items-center sm:px-4">
                            <div>
                                <h4 className="text-2xl md:text-3xl font-black uppercase text-foreground">Epic Games</h4>
                                <p className="font-bold text-foreground/50 uppercase tracking-widest mt-2 text-sm">AAA Explorer</p>
                            </div>
                            <div className="text-right">
                                <span className="text-4xl md:text-5xl font-black text-foreground">2.4k</span>
                                <span className="font-bold text-foreground/50 block uppercase text-sm mt-1 tracking-widest">Hours</span>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-3xl border border-white/10 bg-[#0a0a0a] p-8 md:p-10 hover:bg-[#111] transition-colors duration-500 shadow-xl cursor-pointer" onMouseEnter={playSketchbookHover}>
                        <div className="flex justify-between items-center sm:px-4">
                            <div>
                                <h4 className="text-2xl md:text-3xl font-black uppercase text-foreground">Steam</h4>
                                <p className="font-bold text-foreground/50 uppercase tracking-widest mt-2 text-sm">Library Architect</p>
                            </div>
                            <div className="text-right">
                                <span className="text-4xl md:text-5xl font-black text-foreground">180+</span>
                                <span className="font-bold text-foreground/50 block uppercase text-sm mt-1 tracking-widest">Titles</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

            </motion.div>
        </section>
    );
}
