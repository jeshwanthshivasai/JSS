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
                <h2 className="text-sm tracking-[0.4em] text-accent-teal/50 uppercase mb-2 font-mono font-bold">/02</h2>
                <h3 className="text-5xl md:text-6xl font-black tracking-tighter text-foreground uppercase border-l-4 border-accent-teal pl-6 py-2">
                    About & Sketchbook
                </h3>
                <p className="mt-6 text-foreground/50 text-xl font-medium max-w-2xl leading-relaxed">
                    The architectural foundation and analog roots of my creative process.
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
                            I'm an Architect by profession and a Designer at heart. Rooted in architecture and guided by curiosity about human behavior, I design digital experiences that balance structure with empathy.
                        </p>
                        <p className="mt-4 text-foreground/50 text-lg leading-relaxed">
                            I’m driven by understanding how people think, feel, and interact - shaping products that feel clear, thoughtful, and quietly make life a little easier. ✨
                        </p>
                    </div>
                </motion.div>

                {/* Experience Feed */}
                <motion.div variants={itemVariants} className="w-full mt-12 bg-white/5 rounded-3xl p-10 md:p-14 border border-white/10">
                    <h4 className="text-4xl md:text-5xl font-black uppercase text-foreground mb-12">The Journey</h4>
                    <div className="space-y-12">
                        {[
                            { title: "Designer/Developer", company: "GenbaNEXT", year: "2025 - Present", desc: "Crafting enterprise-grade digital solutions where beliving in skill and determination matters most." },
                            { title: "Freelancer Architect & Visual Storyteller", year: "2023 - 2024", desc: "Finding the nexus between architectural structure and visual documentary." },
                            { title: "Junior Architect", year: "2021 - 2023", desc: "Bridging physical spaces with multiple firms across a diverse project spectrum." },
                            { title: "Internship", company: "Liquid Space Studio", year: "2020 - 2021", desc: "Foundational exposure to experimental design thinking." }
                        ].map((exp, i) => (
                            <div key={i} className="relative pl-8 border-l-2 border-primary/20 hover:border-primary transition-colors duration-300">
                                <div className="absolute -left-[9px] top-0 w-4 h-4 bg-primary rounded-full shadow-[0_0_15px_rgba(252,232,131,0.5)]" />
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
                                    <h5 className="text-xl md:text-2xl font-black uppercase text-primary">{exp.title}</h5>
                                    <span className="font-mono text-sm text-foreground/40">{exp.year}</span>
                                </div>
                                {exp.company && <p className="text-foreground/60 font-bold uppercase tracking-widest text-xs mb-2">{exp.company}</p>}
                                <p className="text-foreground/50 leading-relaxed font-medium">{exp.desc}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>


            </motion.div>
        </section>
    );
}
