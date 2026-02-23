import { motion } from 'framer-motion';
import { playEngineHover, playClickSnap } from '../../lib/audio';

const engineProjects = [
    { id: 1, title: 'RetNEXT', role: 'Product, Interaction & UX/UI Designer', type: 'B2B SaaS / UI/UX', year: '2025', desc: 'Designed high-fidelity UIs and interactive prototypes across 10+ core workflows for retail operations.' },
    { id: 2, title: 'HOST', role: 'Role-Based Dashboard Design', type: 'Govt Platform / UI/UX', year: '2025', desc: 'Translated policy-level requirements into clear inspection flows used by multiple government roles.' },
    { id: 3, title: 'GenbaAI', role: 'Conversational UI Design', type: 'AI Chatbot / Web App', year: '2025', desc: 'Embedded AI directly into existing workflows across MatNEXT & RefNEXT to improve AI usability.' },
    { id: 4, title: 'RefriGreen', role: 'Lead Visual & Website Designer', type: 'Website / Branding', year: '2025', desc: 'End-to-end visual identity and web design for an MoEFCC & MOE Japan backed initiative.' },
    { id: 5, title: 'FixAI', role: 'Website Design & Delivery', type: 'Website / Posters', year: '2024', desc: 'Delivered the official website for a Harvard iLab incubated startup focusing on early-stage positioning.' },
    { id: 6, title: 'Architectural Thinking', role: 'Architectural & Interior Designer', type: 'System Foundation', year: '2020-2023', desc: 'Site planning, detailed execution drawings, and 3D visualization. The structural foundation for my UX methodology.' },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1] // Premium Apple/Stripe feel
        }
    }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring' as any, stiffness: 100 } }
};

export default function EngineProjects() {
    return (
        <section className="relative z-10 w-full mb-48 pt-24">
            <div className="mb-16">
                <h2 className="text-sm tracking-[0.2em] text-primary uppercase mb-4 font-bold">Phase 01</h2>
                <h3 className="text-6xl md:text-7xl font-black tracking-tighter text-foreground uppercase">
                    The Engine
                </h3>
                <p className="mt-6 text-foreground/70 text-xl font-medium max-w-2xl">
                    Rigid systems, scalable architecture, and pixel-perfect execution.
                </p>
            </div>

            <div className="relative w-full pb-32">
                {engineProjects.map((project, index) => (
                    <motion.div
                        key={project.id}
                        variants={itemVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ margin: "-150px" }}
                        onMouseEnter={playEngineHover}
                        onClick={playClickSnap}
                        className="sticky top-24 mb-12 w-full max-w-5xl mx-auto cursor-pointer"
                        style={{
                            zIndex: index + 10,
                            top: `${index * 2 + 10}vh` // Stagger the sticky positioning automatically
                        }}
                    >
                        {/* The Minimalist Card */}
                        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0a] w-full aspect-[16/9] md:aspect-[21/9] flex flex-col justify-end p-10 md:p-16 hover:bg-[#111] transition-colors duration-500 shadow-2xl group">

                            {/* Clean Mockup Placeholder Graphic */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%] w-[80%] h-[120%] bg-[#1a1a1a] rounded-xl border border-white/5 transform rotate-1 group-hover:rotate-0 group-hover:-translate-y-[45%] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-center">
                                <span className="font-bold text-xl uppercase tracking-widest text-foreground/30">Mockup Placeholder</span>
                            </div>

                            {/* Authentic Content Strategy overlay */}
                            <div className="relative z-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                                <div className="flex justify-between items-end w-full mb-6">
                                    <span className="text-xs md:text-sm font-bold text-background uppercase tracking-[0.2em] bg-primary px-4 py-1.5 rounded-full inline-block">{project.type}</span>
                                    <span className="text-foreground/50 font-medium text-xl">{project.year}</span>
                                </div>

                                <h4 className="text-5xl md:text-7xl lg:text-8xl font-black mt-2 text-foreground leading-[0.9] uppercase tracking-tighter">{project.title}</h4>

                                <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-end mt-10 border-t border-white/10 pt-6">
                                    <p className="font-medium text-lg md:text-xl text-foreground/80 max-w-lg leading-relaxed">{project.desc}</p>
                                    <span className="text-foreground border border-white/20 rounded-full px-5 py-2 font-semibold text-sm tracking-wide">{project.role}</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section >
    );
}
