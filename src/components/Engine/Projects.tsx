import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playEngineHover, playClickSnap } from '../../lib/audio';

const CATEGORIES = [
    "All",
    "SaaS App Design",
    "Retail SaaS App Design",
    "Branding & Website Design",
    "Website & Banner Design",
    "SaaS App Website Design",
    "Poster Design",
    "Feature Addition"
];

const engineProjects = [
    { id: 'saas-dashboard', title: 'SaaS Dashboard', role: 'UI/UX Designer', type: 'SaaS App Design', year: '2025', desc: 'A mobile friendly and responsive SaaS Dashboard to conduct surveys and look quickly at the statistics collected from the surveys.' },
    { id: 'retail-saas-app', title: 'Retail SaaS App', role: 'Product/IxD Designer', type: 'Retail SaaS App Design', year: '2025', desc: 'A mobile friendly and responsive SaaS App to track A->Z in a convenience stores in the USA.' },
    { id: 'brand-identity', title: 'Brand Identity', role: 'Visual Strategist', type: 'Branding & Website Design', year: '2024', desc: 'Handcrafted Ikkath clothing brand project initiated by an IAS Officer to uplift HIV Positive Women.' },
    { id: 'brand-collab', title: 'Collaborative Branding', role: 'Creative Director', type: 'Website & Banner Design', year: '2024', desc: 'Design for a project backed by the Govt. of India (MoEFCC) and the Govt. of Japan (MOE Japan).' },
    { id: 'saas-app-website', title: 'SaaS Branding', role: 'SaaS Product Designer', type: 'SaaS App Website Design', year: '2024', desc: 'Mobile friendly website for a child SaaS application with premium interfaces and animations.' },
    { id: 'poster-design', title: 'Poster Design', role: 'Graphic Designer', type: 'Poster Design', year: '2023', desc: 'A Poster designed for an IAS Officer for an event as LBSNAA.' },
    { id: 'feature-addition', title: 'AI Integration', role: 'AI Integration Lead', type: 'Feature Addition', year: '2025', desc: 'Integrated in-house AI Chatbot to existing SaaS application screens.' },
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
    const [selectedCategory, setSelectedCategory] = useState("All");

    const filteredProjects = selectedCategory === "All"
        ? engineProjects
        : engineProjects.filter(p => p.type === selectedCategory);

    return (
        <section className="relative z-10 w-full mb-48 pt-24 px-4 md:px-0">
            <div className="mb-16">
                <h2 className="text-sm tracking-[0.4em] text-primary/50 uppercase mb-4 font-mono font-bold">/01</h2>
                <h3 className="text-6xl md:text-8xl font-black tracking-tighter text-foreground uppercase border-l-4 border-primary pl-6 py-2">
                    Selected Works
                </h3>
                <p className="mt-8 text-foreground/50 text-xl font-medium max-w-2xl leading-relaxed">
                    A collection of digital products, SaaS interfaces, and immersive web experiences defined by technical rigor and architectural foundatons.
                </p>
            </div>

            {/* Category Filter - Sticky & Premium */}
            <div className="sticky top-2 z-50 mb-16 flex flex-wrap gap-2 justify-start md:justify-center p-2 bg-black/40 backdrop-blur-xl border border-white/5 rounded-full px-4 overflow-x-auto no-scrollbar shadow-2xl">
                {CATEGORIES.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => {
                            setSelectedCategory(cat);
                            playClickSnap();
                        }}
                        className={`text-[10px] md:text-xs uppercase tracking-widest px-4 py-2 rounded-full transition-all duration-300 font-bold whitespace-nowrap ${selectedCategory === cat
                            ? 'bg-primary text-background shadow-[0_0_20px_rgba(252,232,131,0.3)]'
                            : 'text-foreground/40 hover:text-foreground hover:bg-white/5'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="relative w-full pb-32 min-h-[50vh]">
                <AnimatePresence mode="popLayout">
                    {filteredProjects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9, y: 50 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: -50 }}
                            transition={{
                                type: 'spring',
                                damping: 20,
                                stiffness: 100,
                                delay: index * 0.05
                            }}
                            onMouseEnter={playEngineHover}
                            onClick={playClickSnap}
                            className="sticky top-24 mb-12 w-full max-w-5xl mx-auto cursor-pointer"
                            style={{
                                zIndex: index + 10,
                                top: `${index * 2 + 15}vh`
                            }}
                        >
                            {/* The Minimalist Card */}
                            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-950 w-full aspect-[16/9] md:aspect-[21/9] flex flex-col justify-end p-10 md:p-20 hover:bg-zinc-900 transition-all duration-500 group">

                                {/* Hover Glow */}
                                <div className="absolute top-0 left-0 w-full h-full bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                                {/* Clean Mockup Placeholder Graphic */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%] w-[80%] h-[120%] bg-white/2 rounded-xl border border-white/5 transform rotate-2 group-hover:rotate-0 group-hover:-translate-y-[45%] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-center overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent" />
                                    <span className="font-bold text-xs md:text-sm uppercase tracking-[0.3em] text-foreground/10 animate-pulse">Scanning Visual Asset...</span>
                                </div>

                                {/* Content Overlay */}
                                <div className="relative z-10">
                                    <div className="flex justify-between items-end w-full mb-6">
                                        <span className="text-[10px] md:text-xs font-black text-background uppercase tracking-[0.2em] bg-primary px-4 py-1.5 rounded-sm inline-block shadow-lg">{project.type}</span>
                                        <span className="text-foreground/30 font-mono text-lg">{project.year}</span>
                                    </div>

                                    <h4 className="text-6xl md:text-8xl lg:text-9xl font-black mt-2 text-foreground leading-[0.8] uppercase tracking-tighter group-hover:text-primary transition-colors duration-500">{project.title}</h4>

                                    <div className="flex flex-col md:flex-row gap-8 justify-between items-start md:items-end mt-12 border-t border-white/5 pt-10">
                                        <p className="font-medium text-lg md:text-xl text-foreground/60 max-w-xl leading-relaxed italic pr-4">"{project.desc}"</p>
                                        <span className="text-foreground/40 border border-white/10 rounded-full px-6 py-2 font-bold text-[10px] uppercase tracking-widest whitespace-nowrap group-hover:border-primary group-hover:text-primary transition-colors duration-500">{project.role}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </section >
    );
}
