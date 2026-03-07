import { create } from 'zustand'

interface UIState {
    isLoaded: boolean;
    scrollYProgress: number; // 0 to 1
    activeSection: 'hero' | 'engine' | 'sketchbook' | 'climax';
    setIsLoaded: (loaded: boolean) => void;
    setScrollYProgress: (progress: number) => void;
    setActiveSection: (section: 'hero' | 'engine' | 'sketchbook' | 'climax') => void;
}

export const useUIStore = create<UIState>((set) => ({
    isLoaded: false,
    scrollYProgress: 0,
    activeSection: 'hero',
    setIsLoaded: (loaded) => set({ isLoaded: loaded }),
    setScrollYProgress: (progress) => set({ scrollYProgress: progress }),
    setActiveSection: (section) => set({ activeSection: section }),
}))
