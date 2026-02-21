import { create } from 'zustand'

interface UIState {
    scrollYProgress: number; // 0 to 1
    activeSection: 'hero' | 'engine' | 'sketchbook' | 'climax';
    setScrollYProgress: (progress: number) => void;
    setActiveSection: (section: 'hero' | 'engine' | 'sketchbook' | 'climax') => void;
}

export const useUIStore = create<UIState>((set) => ({
    scrollYProgress: 0,
    activeSection: 'hero',
    setScrollYProgress: (progress) => set({ scrollYProgress: progress }),
    setActiveSection: (section) => set({ activeSection: section }),
}))
