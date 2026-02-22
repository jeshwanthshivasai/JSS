import React, { useState } from 'react';

// Room definitions based on the floor plan
const rooms = [
    {
        id: 'bedroom-02',
        label: 'BEDROOM 02',
        sub: '(Resume)',
        d: 'M 150 150 L 500 150 L 500 350 L 150 350 Z',
        center: { x: 325, y: 250 },
        content: "Resume Content Goes Here"
    },
    {
        id: 'kitchen',
        label: 'KITCHEN',
        sub: '(Creative Work)',
        d: 'M 500 100 L 880 100 L 880 350 L 500 350 Z',
        center: { x: 690, y: 225 },
        content: "Creative Work Portfolio Goes Here"
    },
    {
        id: 'bathroom',
        label: 'BATHROOM',
        sub: '(Contact)',
        d: 'M 80 350 L 250 350 L 250 500 L 80 500 Z',
        center: { x: 165, y: 425 },
        content: "Contact Details: hello@jeshwanth.com"
    },
    {
        id: 'bedroom-01',
        label: 'BEDROOM 01',
        sub: '(Personal Work)',
        d: 'M 100 500 L 350 500 L 350 680 L 100 680 Z',
        center: { x: 225, y: 590 },
        content: "Personal Projects Go Here"
    },
    {
        id: 'living',
        label: 'LIVING ROOM',
        sub: '(About & Experience)',
        d: 'M 250 350 L 880 350 L 880 680 L 350 680 L 350 500 L 250 500 Z',
        center: { x: 615, y: 515 },
        content: "About Me and Professional Experience"
    }
];

const doors = [
    { erase: [250, 350, 300, 350], line: [250, 350, 250, 300], arc: 'M 250 300 A 50 50 0 0 1 300 350' },
    { erase: [700, 350, 750, 350], line: [750, 350, 750, 300], arc: 'M 750 300 A 50 50 0 0 0 700 350' },
    { erase: [250, 400, 250, 450], line: [250, 450, 300, 450], arc: 'M 300 450 A 50 50 0 0 0 250 400' },
    { erase: [250, 500, 300, 500], line: [250, 500, 250, 550], arc: 'M 250 550 A 50 50 0 0 0 300 500' },
    { erase: [700, 680, 750, 680], line: [750, 680, 750, 630], arc: 'M 750 630 A 50 50 0 0 0 700 680' }
];

export default function BlueprintNav() {
    const [activeRoom, setActiveRoom] = useState<string | null>(null);

    return (
        <div className="w-full h-full relative font-sans text-white overflow-hidden bg-[#1b5094]">

            {/* Texture Overlay */}
            <div
                className="absolute inset-0 pointer-events-none opacity-20"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                }}
            />

            <div className="w-full h-full flex">
                {/* Main Blueprint Area */}
                <div className="flex-grow h-full relative p-8">
                    <svg
                        viewBox="0 0 1000 800"
                        className="w-full h-full select-none max-h-screen"
                        preserveAspectRatio="xMidYMid meet"
                    >
                        <defs>
                            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="0.5" />
                            </pattern>
                            <pattern id="grid-large" width="100" height="100" patternUnits="userSpaceOnUse">
                                <rect width="100" height="100" fill="url(#grid)" />
                                <path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                            </pattern>
                            <pattern id="hatch" width="8" height="8" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
                                <line x1="0" y1="0" x2="0" y2="8" stroke="white" strokeWidth="1.5" />
                            </pattern>
                        </defs>

                        {/* Background Grid */}
                        <rect width="100%" height="100%" fill="url(#grid-large)" />

                        {/* Scale Marker & Margins */}
                        <g stroke="rgba(255,255,255,0.4)" strokeWidth="1" className="text-[10px] font-mono fill-white">
                            <rect x="40" y="40" width="920" height="720" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
                            {/* North Arrow */}
                            <g transform="translate(60, 60)">
                                <circle cx="20" cy="20" r="15" fill="none" stroke="white" />
                                <path d="M 20 5 L 25 20 L 15 20 Z" fill="white" />
                                <text x="20" y="45" textAnchor="middle" className="text-[10px]">N</text>
                            </g>
                        </g>

                        {/* Base Wall Outlines */}
                        <g stroke="white" strokeWidth="12" fill="none" strokeLinejoin="miter">
                            {rooms.map(r => <path key={`base-${r.id}`} d={r.d} />)}
                        </g>

                        {/* Wall Inner Mask */}
                        <g stroke="#1b5094" strokeWidth="10" fill="none" strokeLinejoin="miter">
                            {rooms.map(r => <path key={`mask-${r.id}`} d={r.d} />)}
                        </g>

                        {/* Hatched Fill Layer */}
                        <g stroke="url(#hatch)" strokeWidth="10" fill="none" strokeLinejoin="miter">
                            {rooms.map(r => <path key={`hatch-${r.id}`} d={r.d} />)}
                        </g>

                        {/* Door Masks */}
                        <g stroke="#1b5094" strokeWidth="14" strokeLinecap="butt">
                            {doors.map((d, i) => (
                                <line key={`erase-${i}`} x1={d.erase[0]} y1={d.erase[1]} x2={d.erase[2]} y2={d.erase[3]} />
                            ))}
                        </g>

                        {/* Door Swings */}
                        <g stroke="white" strokeWidth="2" fill="none">
                            {doors.map((d, i) => (
                                <g key={`door-${i}`}>
                                    <line x1={d.line[0]} y1={d.line[1]} x2={d.line[2]} y2={d.line[3]} />
                                    <path d={d.arc} strokeDasharray="3,3" />
                                </g>
                            ))}
                        </g>

                        {/* Labels */}
                        <g className="fill-white font-bold tracking-[0.2em] text-[14px]">
                            {rooms.map(r => (
                                <text key={`label-${r.id}`} x={r.center.x} y={r.center.y} textAnchor="middle">
                                    {r.label}
                                    <tspan x={r.center.x} y={r.center.y + 16} className="text-[10px] tracking-normal opacity-80 font-normal">
                                        {r.sub}
                                    </tspan>
                                </text>
                            ))}
                        </g>

                        {/* Interactive Areas */}
                        <g>
                            {rooms.map(r => (
                                <g
                                    key={`overlay-${r.id}`}
                                    className="cursor-pointer outline-none"
                                    onClick={() => setActiveRoom(r.id)}
                                >
                                    <path
                                        d={r.d}
                                        className={`transition-all duration-300 transform origin-center ${activeRoom === r.id ? 'fill-white/30' : 'fill-transparent hover:fill-blue-300/20'
                                            }`}
                                        style={{ transformBox: "fill-box" }}
                                    />
                                </g>
                            ))}
                        </g>
                    </svg>
                </div>

                {/* Right Side Title Block */}
                <div className="w-64 h-full border-l-2 border-white/50 bg-[#1b5094] flex flex-col font-mono text-xs uppercase relative z-20 shrink-0">

                    {/* Revisions Section - Grows to take empty space */}
                    <div className="flex-grow border-b-2 border-white/50 p-4 flex flex-col">
                        <h3 className="font-bold border-b border-white/30 pb-2 mb-2 tracking-widest">Revisions</h3>
                        <div className="flex justify-between text-[10px] opacity-70 mb-1">
                            <span>No.</span>
                            <span>Description</span>
                            <span>Date</span>
                        </div>
                        <div className="flex justify-between text-[10px] mt-2 pb-2 border-b border-white/10">
                            <span>01</span>
                            <span>Initial Draft</span>
                            <span>02.21.26</span>
                        </div>
                    </div>

                    {/* Practice/Personal Info */}
                    <div className="border-b-2 border-white/50 p-4 min-h-[120px] flex flex-col justify-center">
                        <h2 className="text-xl font-bold tracking-widest leading-tight">JESHWANTH<br />SHIVASAI</h2>
                        <p className="mt-2 opacity-80 text-[10px]">Product Designer & UI Engineer</p>
                        <p className="opacity-80 text-[10px]">Bangalore, India</p>
                        <p className="mt-2 opacity-80 text-[10px]">hello@example.com</p>
                    </div>

                    {/* Project Details */}
                    <div className="border-b-2 border-white/50 p-4">
                        <p className="opacity-60 text-[9px] mb-1">Project</p>
                        <h3 className="font-bold">Portfolio 2026</h3>
                        <p className="mt-1 opacity-80">Interactive Web Experience</p>
                    </div>

                    {/* Drawing Title */}
                    <div className="border-b-2 border-white/50 p-4">
                        <p className="opacity-60 text-[9px] mb-1">Drawing Title</p>
                        <h1 className="text-2xl font-bold tracking-widest">FLOOR PLAN</h1>
                    </div>

                    {/* Meta Grid */}
                    <div className="grid grid-cols-2 border-b-2 border-white/50">
                        <div className="p-3 border-r border-white/50">
                            <p className="opacity-60 text-[9px] mb-1">Drawn By</p>
                            <p className="font-bold">JS</p>
                        </div>
                        <div className="p-3">
                            <p className="opacity-60 text-[9px] mb-1">Checked By</p>
                            <p className="font-bold">USER</p>
                        </div>
                        <div className="p-3 border-t border-r border-white/50">
                            <p className="opacity-60 text-[9px] mb-1">Date</p>
                            <p className="font-bold">Feb 2026</p>
                        </div>
                        <div className="p-3 border-t border-white/50">
                            <p className="opacity-60 text-[9px] mb-1">Scale @ A1</p>
                            <p className="font-bold">1:50</p>
                        </div>
                    </div>

                    {/* Sheet Number */}
                    <div className="p-6 flex items-end justify-between">
                        <span className="opacity-60 text-[10px]">Sheet No.</span>
                        <span className="text-4xl font-bold">A-01</span>
                    </div>

                </div>
            </div>

            {/* Content Overlay Modal */}
            {activeRoom && (
                <div className="absolute inset-0 bg-[#1b5094]/80 backdrop-blur-sm z-50 flex items-center justify-center p-8">
                    <div className="bg-[#efefef] text-[#1b5094] w-full max-w-4xl h-[80vh] flex flex-col border-4 border-[#1b5094] shadow-2xl relative">
                        <div className="flex justify-between items-center border-b-4 border-[#1b5094] p-6">
                            <h2 className="text-3xl font-mono font-bold uppercase tracking-widest">
                                {rooms.find(r => r.id === activeRoom)?.label}
                            </h2>
                            <button
                                onClick={() => setActiveRoom(null)}
                                className="text-[#1b5094] hover:bg-[#1b5094] hover:text-[#efefef] p-2 border-2 border-[#1b5094] transition-colors font-bold uppercase text-sm"
                            >
                                [X] Close View
                            </button>
                        </div>
                        <div className="p-8 flex-grow overflow-y-auto font-mono text-lg">
                            {rooms.find(r => r.id === activeRoom)?.content}
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
