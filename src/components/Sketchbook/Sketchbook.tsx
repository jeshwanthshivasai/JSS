import { motion } from 'framer-motion';
import { RoughBox } from './RoughBox';
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
                    <RoughBox strokeColor="#fbc31b" fillColor="#fbc31b" className="h-[400px] cursor-pointer">
                        <h4 className="text-5xl font-black uppercase text-background">Level 7 Local Guide</h4>
                        <p className="mt-4 text-background font-bold text-lg">Connecting local businesses and highlighting architectural nuances across India.</p>
                        <div className="mt-8 w-full h-48 bg-background border-4 border-foreground flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-700 mix-blend-multiply">
                            <span className="font-bold uppercase tracking-widest text-foreground">Map Imagery Placeholder</span>
                        </div>
                    </RoughBox>
                </motion.div>

                {/* Gaming Stats */}
                <motion.div variants={itemVariants} className="w-full flex flex-col gap-4">
                    <RoughBox strokeColor="#000" fillColor="#fff" className="" onMouseEnter={playSketchbookHover}>
                        <div className="flex justify-between items-center px-4">
                            <div>
                                <h4 className="text-3xl font-black uppercase">Epic Games</h4>
                                <p className="font-bold text-accent-crimson uppercase tracking-wider mt-1">AAA Explorer</p>
                            </div>
                            <div className="text-right">
                                <span className="text-5xl font-black text-foreground">2.4k</span>
                                <span className="font-bold text-foreground block uppercase">Hours</span>
                            </div>
                        </div>
                    </RoughBox>
                    <RoughBox strokeColor="#000" fillColor="#fff" className="" onMouseEnter={playSketchbookHover}>
                        <div className="flex justify-between items-center px-4">
                            <div>
                                <h4 className="text-3xl font-black uppercase">Steam</h4>
                                <p className="font-bold text-accent-teal uppercase tracking-wider mt-1">Library Architect</p>
                            </div>
                            <div className="text-right">
                                <span className="text-5xl font-black text-foreground">180+</span>
                                <span className="font-bold text-foreground block uppercase">Titles</span>
                            </div>
                        </div>
                    </RoughBox>
                </motion.div>

            </motion.div>
        </section>
    );
}
