/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Ambient Acoustic Piano Synthesizer playing the iconic "Kuch Kuch Hota Hai" melody.
 * Built with professional physical string modeling and delay feedback for warm nostalgic resonance.
 */

const NOTE_FREQS: Record<string, number> = {
  'G4': 392.00, 'A4': 440.00, 'F4': 349.23, 'E4': 329.63, 'D4': 293.66, 'C4': 261.63, 'B3': 246.94,
  'G3': 196.00, 'A3': 220.00, 'F3': 174.61, 'E3': 164.81, 'D3': 146.83, 'C3': 130.81, 'B2': 123.47,
  'A2': 110.00, 'G2': 98.00,  'F2': 87.31,  'E2': 82.41,  'D2': 73.42,  'C2': 65.41,  'B1': 61.74,
  'A1': 55.00
};

class AmbientSynthesizer {
  private ctx: AudioContext | null = null;
  private isRunning: boolean = false;
  private timerId: any = null;
  private masterGain: GainNode | null = null;
  private delayNode: DelayNode | null = null;
  private feedbackNode: GainNode | null = null;
  private currentVol: number = 0.25;
  private nextStartTime: number = 0;

  init() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx();
    } catch (e) {
      console.warn("Web Audio API not supported in this browser environment", e);
    }
  }

  play() {
    this.init();
    if (!this.ctx) return;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (this.isRunning) return;
    this.isRunning = true;

    // Create Master Gain with smooth volume entry ramp
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
    this.masterGain.gain.linearRampToValueAtTime(this.currentVol, this.ctx.currentTime + 1.5);

    // Create feedback delay line for spacious acoustic reverb effect
    this.delayNode = this.ctx.createDelay();
    this.delayNode.delayTime.setValueAtTime(0.38, this.ctx.currentTime);

    this.feedbackNode = this.ctx.createGain();
    this.feedbackNode.gain.setValueAtTime(0.35, this.ctx.currentTime); // feedback volume

    // Connect delay feedback loop: Delay -> Feedback -> Delay
    this.delayNode.connect(this.feedbackNode);
    this.feedbackNode.connect(this.delayNode);

    // Connect nodes: Master -> Destination, Master -> Delay -> Destination
    this.masterGain.connect(this.ctx.destination);
    this.masterGain.connect(this.delayNode);
    this.delayNode.connect(this.ctx.destination);

    // 76 BPM - A beautiful, heartfelt slow-romantic tempo
    const bpm = 76;
    const beatDuration = 60 / bpm; // ~0.789 seconds per beat

    // Melody and gentle accompaniment layout for "Kuch Kuch Hota Hai"
    const melody = [
      // Bar 1 ("Tum paas aaye...")
      { beat: 0, pitch: 'G4', duration: 1 },
      { beat: 0, pitch: 'C3', duration: 4, isChord: true },
      { beat: 0, pitch: 'E3', duration: 4, isChord: true },
      { beat: 0, pitch: 'G3', duration: 4, isChord: true },
      
      { beat: 1, pitch: 'A4', duration: 1 },
      { beat: 2, pitch: 'G4', duration: 1 },
      { beat: 3, pitch: 'E4', duration: 2 },
      
      // Bar 2 ("...yun muskuraye")
      { beat: 5, pitch: 'G4', duration: 1 },
      { beat: 5, pitch: 'C3', duration: 4, isChord: true },
      { beat: 5, pitch: 'E3', duration: 4, isChord: true },
      { beat: 5, pitch: 'G3', duration: 4, isChord: true },
      
      { beat: 6, pitch: 'A4', duration: 1 },
      { beat: 7, pitch: 'G4', duration: 1 },
      { beat: 8, pitch: 'E4', duration: 2 },
      
      // Bar 3 ("Tumne na jaane kya...")
      { beat: 10, pitch: 'G4', duration: 1 },
      { beat: 10, pitch: 'F3', duration: 4, isChord: true },
      { beat: 10, pitch: 'A3', duration: 4, isChord: true },
      { beat: 10, pitch: 'C4', duration: 4, isChord: true },
      
      { beat: 11, pitch: 'A4', duration: 1 },
      { beat: 12, pitch: 'G4', duration: 1 },
      { beat: 13, pitch: 'F4', duration: 1 },
      { beat: 14, pitch: 'E4', duration: 1 },
      
      // Bar 4 ("...sapne dikhaye")
      { beat: 15, pitch: 'D4', duration: 1 },
      { beat: 15, pitch: 'G2', duration: 3, isChord: true },
      { beat: 15, pitch: 'B3', duration: 3, isChord: true },
      { beat: 15, pitch: 'D4', duration: 3, isChord: true },
      
      { beat: 16, pitch: 'E4', duration: 1 },
      { beat: 17, pitch: 'F4', duration: 2 },
      
      // Bar 5 ("Ab to mera dil...")
      { beat: 19, pitch: 'F4', duration: 1 },
      { beat: 19, pitch: 'A2', duration: 4, isChord: true },
      { beat: 19, pitch: 'C3', duration: 4, isChord: true },
      { beat: 19, pitch: 'E3', duration: 4, isChord: true },
      
      { beat: 20, pitch: 'G4', duration: 1 },
      { beat: 21, pitch: 'F4', duration: 1 },
      { beat: 22, pitch: 'E4', duration: 1 },
      { beat: 23, pitch: 'D4', duration: 1 },
      
      // Bar 6 ("...jaage na sota hai")
      { beat: 24, pitch: 'C4', duration: 1 },
      { beat: 24, pitch: 'G2', duration: 3, isChord: true },
      { beat: 24, pitch: 'B3', duration: 3, isChord: true },
      { beat: 24, pitch: 'D4', duration: 3, isChord: true },
      
      { beat: 25, pitch: 'D4', duration: 1 },
      { beat: 26, pitch: 'E4', duration: 2 },
      
      // Bar 7 ("Kya karoon haye...")
      { beat: 28, pitch: 'D4', duration: 1 },
      { beat: 28, pitch: 'F2', duration: 4, isChord: true },
      { beat: 28, pitch: 'A3', duration: 4, isChord: true },
      { beat: 28, pitch: 'C4', duration: 4, isChord: true },
      
      { beat: 29, pitch: 'E4', duration: 1 },
      { beat: 30, pitch: 'F4', duration: 1 },
      { beat: 31, pitch: 'E4', duration: 1 },
      { beat: 32, pitch: 'D4', duration: 2 },
      
      // Bar 8 ("...kuch kuch hota hai")
      { beat: 34, pitch: 'C4', duration: 1 },
      { beat: 34, pitch: 'G2', duration: 2, isChord: true },
      { beat: 34, pitch: 'B3', duration: 2, isChord: true },
      
      { beat: 35, pitch: 'D4', duration: 1 },
      
      { beat: 36, pitch: 'B3', duration: 1 },
      { beat: 36, pitch: 'C3', duration: 4, isChord: true },
      { beat: 36, pitch: 'E3', duration: 4, isChord: true },
      { beat: 36, pitch: 'G3', duration: 4, isChord: true },
      
      { beat: 37, pitch: 'C4', duration: 3 }
    ];

    const totalBeats = 40;
    const loopDuration = totalBeats * beatDuration;
    this.nextStartTime = this.ctx.currentTime + 0.1;

    const playLoop = () => {
      if (!this.isRunning || !this.ctx || !this.masterGain) return;

      const loopStartTime = this.nextStartTime;

      melody.forEach(note => {
        const noteTime = loopStartTime + (note.beat * beatDuration);
        const freq = NOTE_FREQS[note.pitch];
        if (!freq) return;

        const volume = note.isChord ? 0.012 : 0.045; // softer harmony chord keys
        const duration = note.isChord ? note.duration * beatDuration * 1.5 : note.duration * beatDuration;

        this.playPianoNote(freq, noteTime, duration, volume);
      });

      this.nextStartTime = loopStartTime + loopDuration;

      // Schedule next iteration slightly before this one finishes to blend smoothly
      this.timerId = setTimeout(playLoop, (loopDuration - 0.1) * 1000);
    };

    playLoop();
  }

  private playPianoNote(freq: number, startTime: number, duration: number, volume: number) {
    if (!this.ctx || !this.masterGain) return;

    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    // 1. Fundamental frequency (Sine wave for sweet, pure wooden tone body)
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, startTime);

    // 2. Overtones (Triangle wave for subtle physical hammer strike resonance)
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2, startTime); // first overtone

    const overtoneGain = this.ctx.createGain();
    overtoneGain.gain.setValueAtTime(0.12, startTime);

    // 3. Hammer Strike Transient (high-frequency clean click for realistic wood strike)
    const hammer = this.ctx.createOscillator();
    const hammerGain = this.ctx.createGain();
    hammer.type = 'sine';
    hammer.frequency.setValueAtTime(1400 + freq, startTime);
    hammerGain.gain.setValueAtTime(0.08, startTime);
    hammerGain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.02);

    hammer.connect(noteGain);

    // Decay Envelope: fast transient build up and smooth exponential acoustic fade
    noteGain.gain.setValueAtTime(0, startTime);
    noteGain.gain.linearRampToValueAtTime(volume, startTime + 0.006);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    // Dampen higher frequencies over time to match realistic string damping
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1200, startTime);
    filter.frequency.exponentialRampToValueAtTime(250, startTime + duration);

    // Connections
    osc1.connect(noteGain);
    osc2.connect(overtoneGain);
    overtoneGain.connect(noteGain);

    noteGain.connect(filter);
    filter.connect(this.masterGain);

    // Trigger Playback
    osc1.start(startTime);
    osc2.start(startTime);
    hammer.start(startTime);

    osc1.stop(startTime + duration + 0.1);
    osc2.stop(startTime + duration + 0.1);
    hammer.stop(startTime + 0.1);
  }

  stop() {
    this.isRunning = false;
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
    if (this.masterGain && this.ctx) {
      try {
        const now = this.ctx.currentTime;
        this.masterGain.gain.cancelScheduledValues(now);
        this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
        this.masterGain.gain.linearRampToValueAtTime(0.0001, now + 1.2);
        setTimeout(() => {
          if (!this.isRunning && this.masterGain) {
            this.masterGain.disconnect();
            this.masterGain = null;
          }
        }, 1300);
      } catch (e) {
        console.error(e);
      }
    }
  }

  setVolume(vol: number) {
    this.currentVol = vol;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(vol, this.ctx.currentTime, 0.3);
    }
  }

  getIsRunning() {
    return this.isRunning;
  }
}

export const romanticSynth = new AmbientSynthesizer();
export default romanticSynth;
