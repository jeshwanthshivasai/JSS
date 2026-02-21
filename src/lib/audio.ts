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
}

const synth = new AwwwardsSynthesizer();

export const unlockAudio = () => synth.unlock();
export const playHoverTick = () => synth.playHoverTick();
export const playClickSnap = () => synth.playClickSnap();
export const playEngineHover = () => synth.playEngineHover();
export const playSketchbookHover = () => synth.playSketchbookHover();
