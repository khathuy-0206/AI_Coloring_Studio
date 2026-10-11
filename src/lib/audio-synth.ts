/**
 * Bộ Tổng Hợp Âm Thanh Đa Lớp (Multi-Layer Web Audio API Soundscape & Music Engine)
 * Hỗ trợ 4 danh mục:
 *  1. Tự Nhiên (White Noise): Mưa, Sóng biển, Lò sưởi, Suối rừng, Tiếng gió, Chuông gió
 *  2. Nhạc Chill / Không Lời: Lofi Beats, Piano êm dịu, Acoustic Guitar, Nhạc Thiền / Music Box
 *  3. Không Gian / ASMR: Quán cà phê ấm cúng, Tiếng tô bút trên giấy, Tiếng đêm mùa thu, Đốt nến thơm
 *  4. Sóng Tần Số (Binaural): Sóng Alpha tập trung sáng tạo (10Hz), Tần số 432Hz chữa lành
 * Hỗ trợ phát song song nhiều lớp âm thanh (Audio Mixer) với thanh trượt âm lượng độc lập cho từng lớp!
 */

export type SoundId =
  // 1. Tự Nhiên (White Noise)
  | "rain"
  | "ocean"
  | "fire"
  | "stream"
  | "wind"
  | "wind_chimes"
  // 2. Nhạc Chill / Không Lời
  | "lofi_beats"
  | "gentle_piano"
  | "acoustic_guitar"
  | "music_box"
  // 3. Không Gian / ASMR
  | "cozy_cafe"
  | "pencil_paper"
  | "autumn_night"
  | "scented_candle"
  // 4. Sóng Tần Số (Binaural)
  | "alpha_waves"
  | "healing_432hz";

export type SoundCategoryId = "nature" | "chill" | "asmr" | "binaural";

interface ActiveTrackInstance {
  id: SoundId;
  volume: number;
  masterGain: GainNode;
  sources: Array<AudioScheduledSourceNode>;
  nodes: Array<AudioNode>;
  intervals: Array<ReturnType<typeof setInterval>>;
}

class AmbientSoundEngine {
  private ctx: AudioContext | null = null;
  private tracks: Map<SoundId, ActiveTrackInstance> = new Map();

  private initContext(): AudioContext | null {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
    return this.ctx;
  }

  private createNoiseBuffer(
    ctx: AudioContext,
    mode: "pink" | "brown" | "white" = "pink",
    seconds = 5
  ): AudioBuffer {
    const bufferSize = ctx.sampleRate * seconds;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = buffer.getChannelData(0);

    if (mode === "white") {
      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * 0.5;
      }
    } else if (mode === "brown") {
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        lastOut = (lastOut + 0.02 * white) / 1.02;
        output[i] = lastOut * 3.2;
      }
    } else {
      // Pink-ish warm noise
      let b0 = 0,
        b1 = 0,
        b2 = 0,
        b3 = 0,
        b4 = 0,
        b5 = 0,
        b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.08;
        b6 = white * 0.115926;
      }
    }
    return buffer;
  }

  /**
   * Phát một lớp âm thanh cụ thể (dùng trong chế độ trộn đa lớp Audio Mixer)
   */
  public playTrack(type: SoundId, volume = 0.35) {
    this.stopTrack(type);
    const ctx = this.initContext();
    if (!ctx) return;

    const masterGain = ctx.createGain();
    const clampedVol = Math.max(0, Math.min(1, volume));
    masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
    masterGain.gain.exponentialRampToValueAtTime(
      Math.max(0.001, clampedVol),
      ctx.currentTime + 0.25
    );
    masterGain.connect(ctx.destination);

    const instance: ActiveTrackInstance = {
      id: type,
      volume: clampedVol,
      masterGain,
      sources: [],
      nodes: [masterGain],
      intervals: [],
    };

    this.buildSoundGraph(ctx, type, instance);
    this.tracks.set(type, instance);
  }

  /**
   * Tương thích ngược: phát duy nhất 1 âm thanh (tắt các lớp khác)
   */
  public play(type: SoundId, volume = 0.3) {
    this.stopAll();
    this.playTrack(type, volume);
  }

  private buildSoundGraph(
    ctx: AudioContext,
    type: SoundId,
    inst: ActiveTrackInstance
  ) {
    const startLoopingNoise = (
      mode: "pink" | "brown" | "white",
      filterType: BiquadFilterType,
      freq: number,
      q = 1.0,
      gainVal = 1.0
    ) => {
      const src = ctx.createBufferSource();
      src.buffer = this.createNoiseBuffer(ctx, mode, 5);
      src.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = filterType;
      filter.frequency.setValueAtTime(freq, ctx.currentTime);
      filter.Q.setValueAtTime(q, ctx.currentTime);

      const subGain = ctx.createGain();
      subGain.gain.setValueAtTime(gainVal, ctx.currentTime);

      src.connect(filter);
      filter.connect(subGain);
      subGain.connect(inst.masterGain);
      src.start();

      inst.sources.push(src);
      inst.nodes.push(filter, subGain);
      return { src, filter, subGain };
    };

    const triggerNote = (
      freq: number,
      duration: number,
      wave: OscillatorType = "sine",
      peakGain = 0.18,
      attack = 0.04,
      filterCutoff = 1800
    ) => {
      if (!this.ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      osc.type = wave;
      osc2.type = "sine";
      osc.frequency.setValueAtTime(freq, now);
      osc2.frequency.setValueAtTime(freq * 2, now);

      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(filterCutoff, now);

      const env = ctx.createGain();
      env.gain.setValueAtTime(0.0001, now);
      env.gain.linearRampToValueAtTime(peakGain, now + attack);
      env.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      const overtoneGain = ctx.createGain();
      overtoneGain.gain.setValueAtTime(peakGain * 0.22, now);

      osc.connect(filter);
      osc2.connect(overtoneGain);
      overtoneGain.connect(filter);
      filter.connect(env);
      env.connect(inst.masterGain);

      osc.start(now);
      osc2.start(now);
      osc.stop(now + duration + 0.05);
      osc2.stop(now + duration + 0.05);
    };

    switch (type) {
      // ==================== 1. TỰ NHIÊN (WHITE NOISE) ====================
      case "rain": {
        startLoopingNoise("pink", "lowpass", 920, 0.8, 0.85);
        startLoopingNoise("white", "bandpass", 2600, 1.4, 0.14);
        break;
      }

      case "ocean": {
        const { filter } = startLoopingNoise("brown", "lowpass", 380, 1.1, 0.95);
        const lfo = ctx.createOscillator();
        lfo.frequency.setValueAtTime(0.12, ctx.currentTime);
        const lfoGain = ctx.createGain();
        lfoGain.gain.setValueAtTime(280, ctx.currentTime);
        lfo.connect(lfoGain);
        lfoGain.connect(filter.frequency);
        lfo.start();
        inst.sources.push(lfo);
        inst.nodes.push(lfoGain);
        break;
      }

      case "fire": {
        startLoopingNoise("brown", "bandpass", 420, 1.4, 0.8);
        const crackleTimer = setInterval(() => {
          if (Math.random() > 0.35) {
            triggerNote(
              1400 + Math.random() * 1800,
              0.04 + Math.random() * 0.04,
              "triangle",
              0.06 + Math.random() * 0.06,
              0.004,
              3200
            );
          }
        }, 220);
        inst.intervals.push(crackleTimer);
        break;
      }

      case "stream": {
        const { filter } = startLoopingNoise("pink", "bandpass", 1150, 1.8, 0.75);
        const lfo = ctx.createOscillator();
        lfo.frequency.setValueAtTime(0.45, ctx.currentTime);
        const lfoGain = ctx.createGain();
        lfoGain.gain.setValueAtTime(320, ctx.currentTime);
        lfo.connect(lfoGain);
        lfoGain.connect(filter.frequency);
        lfo.start();
        inst.sources.push(lfo);
        inst.nodes.push(lfoGain);
        break;
      }

      case "wind": {
        const { filter } = startLoopingNoise("pink", "bandpass", 520, 3.2, 0.85);
        const lfo = ctx.createOscillator();
        lfo.frequency.setValueAtTime(0.08, ctx.currentTime);
        const lfoGain = ctx.createGain();
        lfoGain.gain.setValueAtTime(340, ctx.currentTime);
        lfo.connect(lfoGain);
        lfoGain.connect(filter.frequency);
        lfo.start();
        inst.sources.push(lfo);
        inst.nodes.push(lfoGain);
        break;
      }

      case "wind_chimes": {
        startLoopingNoise("pink", "bandpass", 480, 2.5, 0.25);
        const chimeNotes = [523.25, 587.33, 659.25, 783.99, 880.0, 1046.5, 1174.66];
        const playChime = () => {
          const note = chimeNotes[Math.floor(Math.random() * chimeNotes.length)];
          triggerNote(note, 2.4, "sine", 0.16, 0.015, 4200);
          if (Math.random() > 0.55) {
            setTimeout(() => {
              const second =
                chimeNotes[Math.floor(Math.random() * chimeNotes.length)];
              triggerNote(second, 2.1, "sine", 0.12, 0.015, 4200);
            }, 260);
          }
        };
        playChime();
        const timer = setInterval(playChime, 1800);
        inst.intervals.push(timer);
        break;
      }

      // ==================== 2. NHẠC CHILL / KHÔNG LỜI ====================
      case "lofi_beats": {
        // Lớp vinyl ấm nhẹ
        startLoopingNoise("pink", "bandpass", 1100, 1.2, 0.08);
        // Tiến trình hợp âm Lofi Rhodes ấm áp: Fmaj7 -> Em7 -> Dm7 -> Cmaj7
        const chords = [
          [174.61, 220.0, 261.63, 329.63], // Fmaj7
          [164.81, 196.0, 246.94, 293.66], // Em7
          [146.83, 174.61, 220.0, 261.63], // Dm7
          [130.81, 164.81, 196.0, 246.94], // Cmaj7
        ];
        let step = 0;
        const playLofiBar = () => {
          const chord = chords[step % chords.length];
          chord.forEach((f, idx) => {
            setTimeout(() => {
              triggerNote(f, 2.6, "triangle", 0.09, 0.08, 950);
            }, idx * 75);
          });
          // Nhịp trống Lofi trầm ấm (Soft Kick + Rim)
          triggerNote(62, 0.22, "sine", 0.22, 0.01, 180);
          setTimeout(() => {
            triggerNote(95, 0.12, "triangle", 0.08, 0.01, 420);
          }, 700);
          setTimeout(() => {
            triggerNote(60, 0.2, "sine", 0.18, 0.01, 170);
          }, 1400);
          setTimeout(() => {
            triggerNote(95, 0.12, "triangle", 0.08, 0.01, 420);
          }, 2100);
          step++;
        };
        playLofiBar();
        const timer = setInterval(playLofiBar, 2800);
        inst.intervals.push(timer);
        break;
      }

      case "gentle_piano": {
        const melody = [
          [261.63, 329.63, 392.0, 493.88],
          [220.0, 261.63, 329.63, 392.0],
          [174.61, 220.0, 261.63, 349.23],
          [196.0, 246.94, 293.66, 392.0],
        ];
        let bar = 0;
        const playPianoPhrase = () => {
          const notes = melody[bar % melody.length];
          notes.forEach((freq, idx) => {
            setTimeout(() => {
              triggerNote(freq, 2.2, "triangle", 0.14, 0.03, 1450);
            }, idx * 520);
          });
          bar++;
        };
        playPianoPhrase();
        const timer = setInterval(playPianoPhrase, 2400);
        inst.intervals.push(timer);
        break;
      }

      case "acoustic_guitar": {
        const patterns = [
          [196.0, 246.94, 293.66, 392.0, 293.66, 246.94], // G
          [164.81, 246.94, 329.63, 392.0, 329.63, 246.94], // Em
          [261.63, 329.63, 392.0, 523.25, 392.0, 329.63], // C
          [146.83, 220.0, 293.66, 369.99, 293.66, 220.0], // D
        ];
        let pIdx = 0;
        const playGuitarBar = () => {
          const seq = patterns[pIdx % patterns.length];
          seq.forEach((freq, i) => {
            setTimeout(() => {
              triggerNote(freq, 1.35, "sawtooth", 0.085, 0.012, 1150);
            }, i * 360);
          });
          pIdx++;
        };
        playGuitarBar();
        const timer = setInterval(playGuitarBar, 2250);
        inst.intervals.push(timer);
        break;
      }

      case "music_box": {
        const scale = [523.25, 587.33, 659.25, 783.99, 880.0, 1046.5];
        let noteIdx = 0;
        const pattern = [0, 2, 4, 5, 4, 2, 1, 3, 2, 0];
        const playBoxTick = () => {
          const freq = scale[pattern[noteIdx % pattern.length]];
          triggerNote(freq, 1.7, "sine", 0.15, 0.008, 3600);
          noteIdx++;
        };
        playBoxTick();
        const timer = setInterval(playBoxTick, 620);
        inst.intervals.push(timer);
        break;
      }

      // ==================== 3. KHÔNG GIAN / ASMR ====================
      case "cozy_cafe": {
        // Âm thanh không gian quán ấm áp + tiếng ly tách nhẹ nhàng
        startLoopingNoise("brown", "bandpass", 360, 0.9, 0.55);
        startLoopingNoise("pink", "bandpass", 950, 1.6, 0.22);
        const cafeTimer = setInterval(() => {
          if (Math.random() > 0.45) {
            // Tiếng chạm tách sứ dịu nhẹ
            triggerNote(
              1850 + Math.random() * 600,
              0.12,
              "sine",
              0.045,
              0.005,
              2800
            );
          }
        }, 2400);
        inst.intervals.push(cafeTimer);
        break;
      }

      case "pencil_paper": {
        // Tiếng tô bút màu sột soạt nhịp nhàng trên giấy mỹ thuật (ASMR Sketching)
        const { filter, subGain } = startLoopingNoise(
          "pink",
          "bandpass",
          1650,
          2.2,
          0.35
        );
        const strokeLfo = ctx.createOscillator();
        strokeLfo.frequency.setValueAtTime(1.8, ctx.currentTime); // Nhịp đưa cọ/bút chì
        const strokeGain = ctx.createGain();
        strokeGain.gain.setValueAtTime(550, ctx.currentTime);
        strokeLfo.connect(strokeGain);
        strokeGain.connect(filter.frequency);
        strokeLfo.start();

        const ampLfo = ctx.createOscillator();
        ampLfo.frequency.setValueAtTime(0.9, ctx.currentTime);
        const ampGain = ctx.createGain();
        ampGain.gain.setValueAtTime(0.22, ctx.currentTime);
        ampLfo.connect(ampGain);
        ampGain.connect(subGain.gain);
        ampLfo.start();

        inst.sources.push(strokeLfo, ampLfo);
        inst.nodes.push(strokeGain, ampGain);
        break;
      }

      case "autumn_night": {
        startLoopingNoise("brown", "lowpass", 420, 1.2, 0.45);
        const cricketTimer = setInterval(() => {
          triggerNote(3950, 0.09, "sine", 0.04, 0.01, 4500);
          setTimeout(() => {
            triggerNote(3980, 0.09, "sine", 0.035, 0.01, 4500);
          }, 130);
        }, 1100);
        inst.intervals.push(cricketTimer);
        break;
      }

      case "scented_candle": {
        startLoopingNoise("brown", "lowpass", 310, 1.0, 0.55);
        const wickTimer = setInterval(() => {
          triggerNote(
            2100 + Math.random() * 1100,
            0.03,
            "triangle",
            0.045,
            0.003,
            3400
          );
        }, 310);
        inst.intervals.push(wickTimer);
        break;
      }

      // ==================== 4. SÓNG TẦN SỐ (BINAURAL) ====================
      case "alpha_waves": {
        // Sóng não Alpha 10Hz (200Hz Trái + 210Hz Phải) giúp tập trung sáng tạo
        const oscL = ctx.createOscillator();
        const oscR = ctx.createOscillator();
        oscL.type = "sine";
        oscR.type = "sine";
        oscL.frequency.setValueAtTime(200, ctx.currentTime);
        oscR.frequency.setValueAtTime(210, ctx.currentTime);

        const merger = ctx.createChannelMerger(2);
        const subGain = ctx.createGain();
        subGain.gain.setValueAtTime(0.28, ctx.currentTime);

        oscL.connect(merger, 0, 0);
        oscR.connect(merger, 0, 1);
        merger.connect(subGain);
        subGain.connect(inst.masterGain);

        oscL.start();
        oscR.start();
        inst.sources.push(oscL, oscR);
        inst.nodes.push(merger, subGain);

        // Lớp đệm không gian êm dịu
        startLoopingNoise("pink", "lowpass", 340, 1.0, 0.18);
        break;
      }

      case "healing_432hz": {
        // Tần số 432Hz chữa lành + Họa âm 216Hz & 648Hz
        const freqs = [216, 432, 648];
        freqs.forEach((f, idx) => {
          const osc = ctx.createOscillator();
          osc.type = "sine";
          osc.frequency.setValueAtTime(f, ctx.currentTime);
          const g = ctx.createGain();
          g.gain.setValueAtTime(idx === 1 ? 0.18 : 0.08, ctx.currentTime);
          osc.connect(g);
          g.connect(inst.masterGain);
          osc.start();
          inst.sources.push(osc);
          inst.nodes.push(g);
        });
        break;
      }
    }
  }

  public setTrackVolume(type: SoundId, vol: number) {
    const inst = this.tracks.get(type);
    if (inst && this.ctx) {
      const clamped = Math.max(0, Math.min(1, vol));
      inst.volume = clamped;
      inst.masterGain.gain.setTargetAtTime(
        clamped,
        this.ctx.currentTime,
        0.06
      );
    }
  }

  public setVolume(vol: number) {
    const clamped = Math.max(0, Math.min(1, vol));
    for (const [id] of Array.from(this.tracks.entries())) {
      this.setTrackVolume(id, clamped);
    }
  }

  public stopTrack(type: SoundId) {
    const inst = this.tracks.get(type);
    if (!inst) return;

    for (const timer of inst.intervals) {
      clearInterval(timer);
    }
    for (const src of inst.sources) {
      try {
        src.stop();
        src.disconnect();
      } catch {}
    }
    for (const node of inst.nodes) {
      try {
        node.disconnect();
      } catch {}
    }
    this.tracks.delete(type);
  }

  public stopAll() {
    for (const id of Array.from(this.tracks.keys())) {
      this.stopTrack(id);
    }
  }

  public stop() {
    this.stopAll();
  }

  public isTrackPlaying(type: SoundId): boolean {
    return this.tracks.has(type);
  }

  public isPlaying(): boolean {
    return this.tracks.size > 0;
  }

  public getActiveTracks(): Array<{ id: SoundId; volume: number }> {
    return Array.from(this.tracks.values()).map((t) => ({
      id: t.id,
      volume: t.volume,
    }));
  }
}

export const ambientSound = new AmbientSoundEngine();
