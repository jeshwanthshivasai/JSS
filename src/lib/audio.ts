// Advanced Real-Time Web Audio API Synthesizer
// Following "Start Muted" and programmatic generation guidelines.

class AwwwardsSynthesizer {
    private ctx: AudioContext | null = null;
    private isUnlocked = false;

    private init() {
        if (!this.ctx && typeof window !== 'undefined') {
            this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
    }

    // Mandatory user interaction unlock
    public unlock() {
        this.init();
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume().then(() => {
                this.isUnlocked = true;
            });
        } else {
            this.isUnlocked = true;
        }
    }

    // Very brief, high-frequency tick for generic hover
    playHoverTick() {
        if (!this.isUnlocked || !this.ctx) return;
        const t = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle'; // Swapped sine for triangle for slightly more harmonic grit
        osc.frequency.setValueAtTime(800, t); // Lowered from 1200 for a darker tick
        osc.frequency.exponentialRampToValueAtTime(200, t + 0.05);

        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(0.08, t + 0.01); // Slightly louder
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(t);
        osc.stop(t + 0.05);
    }

    // Sharp, cassette-style snap for clicks
    playClickSnap() {
        if (!this.isUnlocked || !this.ctx) return;
        const bufferSize = this.ctx.sampleRate * 0.1; // 100ms of noise
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }

        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'highpass';
        filter.frequency.value = 1000;

        const gain = this.ctx.createGain();
        const t = this.ctx.currentTime;

        gain.gain.setValueAtTime(0.2, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        noise.start(t);
    }

    // Warm, analogue pad chord for Engine Projects
    playEngineHover() {
        if (!this.isUnlocked || !this.ctx) return;
        const t = this.ctx.currentTime;
        const freqs = [220, 261.63, 329.63, 392.00]; // A minor 7

        freqs.forEach(freq => {
            const osc = this.ctx!.createOscillator();
            const gain = this.ctx!.createGain();
            const filter = this.ctx!.createBiquadFilter();

            osc.type = 'sawtooth';
            // Detune slightly for an analog, imperfect warmth
            osc.detune.value = (Math.random() - 0.5) * 10;
            osc.frequency.value = freq;

            filter.type = 'lowpass';
            // Open the filter slightly wider initially for more "bite"
            filter.frequency.setValueAtTime(4000, t);
            filter.frequency.exponentialRampToValueAtTime(200, t + 0.4); // Slower, deeper decay

            gain.gain.setValueAtTime(0, t);
            gain.gain.linearRampToValueAtTime(0.05, t + 0.08); // Slightly warmer attack
            gain.gain.exponentialRampToValueAtTime(0.001, t + 0.6);

            osc.connect(filter);
            filter.connect(gain);
            // Add a subtle waveshaper distortion curve for genuine grit (optional, but keeping it clean here via high gain -> lowpass)
            gain.connect(this.ctx!.destination);

            osc.start(t);
            osc.stop(t + 0.6);
        });
    }

    // Acoustic transient (flute breath/tabla tap simulator) for Sketchbook
    playSketchbookHover() {
        if (!this.isUnlocked || !this.ctx) return;
        const t = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        // Simulating a hollow woodblock/tabla strike
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(400, t);
        osc.frequency.exponentialRampToValueAtTime(100, t + 0.1);

        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(0.1, t + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(t);
        osc.stop(t + 0.15);
    }

    // High-fidelity sine note for the CEG Sequencer
    playNote(freq: number) {
        if (!this.isUnlocked || !this.ctx) return;
        const t = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t);

        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(0.15, t + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.5);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(t);
        osc.stop(t + 0.5);
    }

    // --- AKAI MPK MINI AUDIO ENGINE ---

    // 8 Specialized Drum Sounds for the MPC Pads
    playDrumPad(index: number) {
        if (!this.isUnlocked || !this.ctx) return;
        const t = this.ctx.currentTime;
        const gain = this.ctx.createGain();
        gain.connect(this.ctx.destination);

        switch(index) {
            case 0: // Deep Sub Kick
            case 4:
                const kick = this.ctx.createOscillator();
                kick.frequency.setValueAtTime(150, t);
                kick.frequency.exponentialRampToValueAtTime(0.01, t + 0.5);
                gain.gain.setValueAtTime(0.4, t);
                gain.gain.exponentialRampToValueAtTime(0.01, t + 0.5);
                kick.connect(gain);
                kick.start(t);
                kick.stop(t + 0.5);
                break;
            case 1: // Snare Snap
            case 5:
                const snare = this.ctx.createOscillator();
                snare.type = 'triangle';
                snare.frequency.setValueAtTime(220, t);
                gain.gain.setValueAtTime(0.2, t);
                gain.gain.exponentialRampToValueAtTime(0.01, t + 0.1);
                snare.connect(gain);
                snare.start(t);
                snare.stop(t + 0.1);
                // Add noise for texture
                const noise = this.ctx.createBufferSource();
                const buf = this.ctx.createBuffer(1, this.ctx.sampleRate * 0.1, this.ctx.sampleRate);
                const data = buf.getChannelData(0);
                for(let i=0; i<data.length; i++) data[i] = Math.random() * 2 - 1;
                noise.buffer = buf;
                const noiseGain = this.ctx.createGain();
                noiseGain.gain.setValueAtTime(0.1, t);
                noiseGain.gain.exponentialRampToValueAtTime(0.01, t + 0.1);
                noise.connect(noiseGain);
                noiseGain.connect(this.ctx.destination);
                noise.start(t);
                break;
            case 2: // Hi-Hat Click
            case 6:
                const hat = this.ctx.createOscillator();
                hat.type = 'square';
                hat.frequency.setValueAtTime(12000, t);
                gain.gain.setValueAtTime(0.05, t);
                gain.gain.exponentialRampToValueAtTime(0.01, t + 0.05);
                hat.connect(gain);
                hat.start(t);
                hat.stop(t + 0.05);
                break;
            default: // Percussion/Wood
                const wood = this.ctx.createOscillator();
                wood.type = 'sine';
                wood.frequency.setValueAtTime(600 + (index * 100), t);
                gain.gain.setValueAtTime(0.1, t);
                gain.gain.exponentialRampToValueAtTime(0.01, t + 0.1);
                wood.connect(gain);
                wood.start(t);
                wood.stop(t + 0.1);
        }
    }

    // 25 Semi-weighted Key Interactivity
    playMidiKey(index: number) {
        if (!this.isUnlocked || !this.ctx) return;
        const t = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        // C3 to C5 range (roughly)
        const baseFreq = 261.63; // C4
        const ratio = Math.pow(2, (index - 12) / 12); // Shift C4 center
        
        osc.frequency.setValueAtTime(baseFreq * ratio, t);
        osc.type = 'sawtooth';

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(2000, t);
        filter.frequency.exponentialRampToValueAtTime(200, t + 0.4);

        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(0.08, t + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.6);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(t);
        osc.stop(t + 0.6);
    }
}


const synth = new AwwwardsSynthesizer();

export const unlockAudio = () => synth.unlock();
export const playHoverTick = () => synth.playHoverTick();
export const playClickSnap = () => synth.playClickSnap();
export const playEngineHover = () => synth.playEngineHover();
export const playSketchbookHover = () => synth.playSketchbookHover();
export const playNote = (freq: number) => synth.playNote(freq);
export const playDrumPad = (i: number) => synth.playDrumPad(i);
export const playMidiKey = (i: number) => synth.playMidiKey(i);
