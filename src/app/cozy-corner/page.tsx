"use client";

import React, { useState, useEffect } from "react";
import {
  Coffee,
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  CloudRain,
  Waves,
  Flame,
  Wind,
  Heart,
  Headphones,
  Music,
  Guitar,
  Bell,
  Droplets,
  PenTool,
  Moon,
  FlameKindling,
  Brain,
  Radio,
  Sliders,
  X,
  Layers,
} from "lucide-react";
import {
  ambientSound,
  SoundId,
  SoundCategoryId,
} from "@/lib/audio-synth";

interface SoundOptionItem {
  id: SoundId;
  category: SoundCategoryId;
  label: string;
  desc: string;
  badgeText?: string;
  icon: React.ComponentType<{ className?: string }>;
  accentBg: string;
  accentText: string;
}

const SOUND_CATEGORIES: Array<{
  id: SoundCategoryId;
  label: string;
  shortLabel: string;
  icon: React.ComponentType<{ className?: string }>;
}> = [
  {
    id: "nature",
    label: "Tự Nhiên (White Noise)",
    shortLabel: "Tự Nhiên",
    icon: CloudRain,
  },
  {
    id: "chill",
    label: "Nhạc Chill / Không Lời",
    shortLabel: "Nhạc Chill",
    icon: Headphones,
  },
  {
    id: "asmr",
    label: "Không Gian / ASMR",
    shortLabel: "Không Gian / ASMR",
    icon: Coffee,
  },
  {
    id: "binaural",
    label: "Sóng Tần Số (Binaural)",
    shortLabel: "Sóng Tần Số",
    icon: Brain,
  },
];

const SOUND_OPTIONS: SoundOptionItem[] = [
  // 1. Tự Nhiên (White Noise)
  {
    id: "rain",
    category: "nature",
    label: "Mưa Rơi Êm Dịu",
    desc: "Tiếng mưa tí tách gõ bên khung cửa kính",
    icon: CloudRain,
    accentBg: "bg-sky-50 border-sky-200",
    accentText: "text-sky-700",
  },
  {
    id: "ocean",
    category: "nature",
    label: "Sóng Biển Vỗ Về",
    desc: "Sóng biển nhịp nhàng ngoài bờ cát sớm",
    icon: Waves,
    accentBg: "bg-cyan-50 border-cyan-200",
    accentText: "text-cyan-700",
  },
  {
    id: "fire",
    category: "nature",
    label: "Lò Sưởi Ấm Áp",
    desc: "Tiếng củi tí tách ấm nồng gian phòng",
    icon: Flame,
    accentBg: "bg-amber-50 border-amber-200",
    accentText: "text-amber-700",
  },
  {
    id: "stream",
    category: "nature",
    label: "Suối Rừng Róc Rách",
    desc: "Dòng suối trong veo chảy qua kẽ đá",
    icon: Droplets,
    accentBg: "bg-emerald-50 border-emerald-200",
    accentText: "text-emerald-700",
  },
  {
    id: "wind",
    category: "nature",
    label: "Tiếng Gió Thảo Nguyên",
    desc: "Làn gió mát lành rì rào qua tán lá",
    icon: Wind,
    accentBg: "bg-teal-50 border-teal-200",
    accentText: "text-teal-700",
  },
  {
    id: "wind_chimes",
    category: "nature",
    label: "Chuông Gió Thanh Tao",
    desc: "Tiếng chuông gió ngân vang trong trẻo ngoài hiên",
    icon: Bell,
    accentBg: "bg-indigo-50 border-indigo-200",
    accentText: "text-indigo-700",
  },

  // 2. Nhạc Chill / Không Lời
  {
    id: "lofi_beats",
    category: "chill",
    label: "Lofi Beats",
    desc: "Nhịp trống Lofi êm ái cùng hợp âm Rhodes ấm áp",
    badgeText: "Chill Hop",
    icon: Headphones,
    accentBg: "bg-violet-50 border-violet-200",
    accentText: "text-violet-700",
  },
  {
    id: "gentle_piano",
    category: "chill",
    label: "Piano Êm Dịu",
    desc: "Giai điệu dương cầm không lời du dương, sâu lắng",
    badgeText: "Solo Piano",
    icon: Music,
    accentBg: "bg-rose-50 border-rose-200",
    accentText: "text-rose-700",
  },
  {
    id: "acoustic_guitar",
    category: "chill",
    label: "Acoustic Guitar",
    desc: "Tiếng đàn guitar mộc mạc bên tách trà chiều",
    badgeText: "Acoustic",
    icon: Guitar,
    accentBg: "bg-amber-50 border-amber-200",
    accentText: "text-amber-700",
  },
  {
    id: "music_box",
    category: "chill",
    label: "Nhạc Thiền / Music Box",
    desc: "Hộp nhạc pha lê lấp lánh giúp tĩnh tâm sáng tạo",
    badgeText: "Zen Box",
    icon: Sparkles,
    accentBg: "bg-fuchsia-50 border-fuchsia-200",
    accentText: "text-fuchsia-700",
  },

  // 3. Không Gian / ASMR
  {
    id: "cozy_cafe",
    category: "asmr",
    label: "Quán Cà Phê Ấm Cúng",
    desc: "Không gian quán nhỏ dịu êm cùng tiếng tách sứ nhẹ",
    badgeText: "Cafe Ambience",
    icon: Coffee,
    accentBg: "bg-orange-50 border-orange-200",
    accentText: "text-orange-700",
  },
  {
    id: "pencil_paper",
    category: "asmr",
    label: "Tiếng Tô Bút Trên Giấy",
    desc: "Âm thanh ASMR sột soạt của bút màu trên giấy vẽ",
    badgeText: "ASMR Art",
    icon: PenTool,
    accentBg: "bg-pink-50 border-pink-200",
    accentText: "text-pink-700",
  },
  {
    id: "autumn_night",
    category: "asmr",
    label: "Tiếng Đêm Mùa Thu",
    desc: "Đêm thu tĩnh lặng với tiếng dế ngân và lá xào xạc",
    badgeText: "Night ASMR",
    icon: Moon,
    accentBg: "bg-indigo-50 border-indigo-200",
    accentText: "text-indigo-700",
  },
  {
    id: "scented_candle",
    category: "asmr",
    label: "Đốt Nến Thơm",
    desc: "Tiếng bấc nến gỗ cháy lách tách dịu nhẹ, thư giãn",
    badgeText: "Wood Wick",
    icon: FlameKindling,
    accentBg: "bg-amber-50 border-amber-200",
    accentText: "text-amber-700",
  },

  // 4. Sóng Tần Số (Binaural)
  {
    id: "alpha_waves",
    category: "binaural",
    label: "Sóng Alpha Tập Trung Sáng Tạo",
    desc: "Sóng não Alpha (10Hz) kích thích dòng chảy nghệ thuật",
    badgeText: "10Hz Alpha",
    icon: Brain,
    accentBg: "bg-purple-50 border-purple-200",
    accentText: "text-purple-700",
  },
  {
    id: "healing_432hz",
    category: "binaural",
    label: "Tần Số 432Hz Chữa Lành",
    desc: "Âm hưởng cộng hưởng tự nhiên 432Hz giải tỏa căng thẳng",
    badgeText: "432Hz Pure",
    icon: Radio,
    accentBg: "bg-emerald-50 border-emerald-200",
    accentText: "text-emerald-700",
  },
];

const MIX_PRESETS: Array<{
  label: string;
  layers: Array<{ id: SoundId; volume: number }>;
}> = [
  {
    label: "🎧 Lofi Beats + Mưa Rơi",
    layers: [
      { id: "lofi_beats", volume: 0.45 },
      { id: "rain", volume: 0.28 },
    ],
  },
  {
    label: "🎹 Piano + Lò Sưởi",
    layers: [
      { id: "gentle_piano", volume: 0.45 },
      { id: "fire", volume: 0.25 },
    ],
  },
  {
    label: "☕ Quán Cà Phê + Guitar",
    layers: [
      { id: "acoustic_guitar", volume: 0.42 },
      { id: "cozy_cafe", volume: 0.3 },
    ],
  },
  {
    label: "🧠 Sóng Alpha + Suối Rừng",
    layers: [
      { id: "alpha_waves", volume: 0.32 },
      { id: "stream", volume: 0.28 },
    ],
  },
];

/**
 * Hiệu ứng sóng nhạc phát động (Animated Audio Visualizer Waves)
 */
function AudioVisualizerWaves({ active }: { active: boolean }) {
  return (
    <div
      className="inline-flex items-end gap-0.5 h-3.5 px-1.5 py-0.5 rounded-full bg-studio-900/10"
      title={active ? "Đang phát âm thanh" : "Đã chọn"}
    >
      <span
        className={`w-0.5 rounded-full bg-studio-900 transition-all ${
          active ? "h-3 animate-pulse" : "h-1"
        }`}
        style={{ animationDuration: "550ms" }}
      />
      <span
        className={`w-0.5 rounded-full bg-studio-900 transition-all ${
          active ? "h-2 animate-bounce" : "h-1.5"
        }`}
        style={{ animationDuration: "700ms" }}
      />
      <span
        className={`w-0.5 rounded-full bg-studio-900 transition-all ${
          active ? "h-3.5 animate-pulse" : "h-1"
        }`}
        style={{ animationDuration: "480ms" }}
      />
      <span
        className={`w-0.5 rounded-full bg-studio-900 transition-all ${
          active ? "h-2.5 animate-bounce" : "h-1"
        }`}
        style={{ animationDuration: "620ms" }}
      />
    </div>
  );
}

export default function CozyCornerPage() {
  const [activeCategory, setActiveCategory] =
    useState<SoundCategoryId>("nature");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMixerMode, setIsMixerMode] = useState(true);

  // Hỗ trợ phát song song tối đa 2 lớp âm thanh (Audio Mixer) với âm lượng độc lập
  const [activeLayers, setActiveLayers] = useState<
    Array<{ id: SoundId; volume: number }>
  >([
    { id: "rain", volume: 0.35 },
    { id: "lofi_beats", volume: 0.45 },
  ]);

  // Trạng thái đồng hồ đếm giờ
  const [timerMinutes, setTimerMinutes] = useState(25);
  const [secondsRemaining, setSecondsRemaining] = useState(25 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining((prev) => prev - 1);
      }, 1000);
    } else if (secondsRemaining === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, secondsRemaining]);

  // Dọn dẹp bộ phát âm thanh khi rời trang
  useEffect(() => {
    return () => {
      ambientSound.stopAll();
    };
  }, []);

  const syncEngineWithLayers = (
    nextLayers: Array<{ id: SoundId; volume: number }>,
    playingState: boolean
  ) => {
    if (!playingState || nextLayers.length === 0) {
      ambientSound.stopAll();
      return;
    }

    const currentIds = new Set(nextLayers.map((l) => l.id));
    for (const active of ambientSound.getActiveTracks()) {
      if (!currentIds.has(active.id)) {
        ambientSound.stopTrack(active.id);
      }
    }

    for (const layer of nextLayers) {
      if (!ambientSound.isTrackPlaying(layer.id)) {
        ambientSound.playTrack(layer.id, layer.volume);
      } else {
        ambientSound.setTrackVolume(layer.id, layer.volume);
      }
    }
  };

  const handleSoundSelect = (soundId: SoundId) => {
    const existingIdx = activeLayers.findIndex((l) => l.id === soundId);
    let nextLayers: Array<{ id: SoundId; volume: number }>;

    if (!isMixerMode) {
      // Chế độ Đơn Lớp: chỉ phát 1 âm thanh duy nhất
      const currentVol = activeLayers[0]?.volume ?? 0.35;
      nextLayers = [{ id: soundId, volume: currentVol }];
      setActiveLayers(nextLayers);
      setIsPlaying(true);
      syncEngineWithLayers(nextLayers, true);
      return;
    }

    // Chế độ Trộn Âm Thanh (Audio Mixer - tối đa 2 lớp song song)
    if (existingIdx !== -1) {
      // Nếu đang phát và người dùng bấm lại vào thẻ đang chọn:
      // Nếu có 2 lớp thì tắt bớt lớp đó; nếu chỉ còn 1 lớp thì bật phát nếu đang tắt
      if (activeLayers.length > 1 && isPlaying) {
        nextLayers = activeLayers.filter((l) => l.id !== soundId);
        setActiveLayers(nextLayers);
        syncEngineWithLayers(nextLayers, isPlaying);
      } else {
        const nextPlay = !isPlaying;
        setIsPlaying(nextPlay);
        syncEngineWithLayers(activeLayers, nextPlay);
      }
      return;
    }

    if (activeLayers.length < 2) {
      nextLayers = [...activeLayers, { id: soundId, volume: 0.38 }];
    } else {
      // Nếu đã đủ 2 lớp, thay thế lớp thứ 2 để giữ lại lớp nền đầu tiên (hoặc ưu tiên giữ 1 nhạc + 1 tiếng nền)
      nextLayers = [activeLayers[0], { id: soundId, volume: 0.38 }];
    }

    setActiveLayers(nextLayers);
    setIsPlaying(true);
    syncEngineWithLayers(nextLayers, true);
  };

  const toggleSound = () => {
    if (isPlaying) {
      ambientSound.stopAll();
      setIsPlaying(false);
    } else {
      const layersToPlay =
        activeLayers.length > 0
          ? activeLayers
          : [{ id: "rain" as SoundId, volume: 0.35 }];
      setActiveLayers(layersToPlay);
      setIsPlaying(true);
      syncEngineWithLayers(layersToPlay, true);
    }
  };

  const handleLayerVolumeChange = (soundId: SoundId, newVol: number) => {
    const nextLayers = activeLayers.map((layer) =>
      layer.id === soundId ? { ...layer, volume: newVol } : layer
    );
    setActiveLayers(nextLayers);
    if (isPlaying) {
      ambientSound.setTrackVolume(soundId, newVol);
    }
  };

  const handleRemoveLayer = (soundId: SoundId) => {
    const nextLayers = activeLayers.filter((l) => l.id !== soundId);
    setActiveLayers(nextLayers);
    ambientSound.stopTrack(soundId);
    if (nextLayers.length === 0) {
      setIsPlaying(false);
    }
  };

  const handleApplyMixPreset = (
    presetLayers: Array<{ id: SoundId; volume: number }>
  ) => {
    setIsMixerMode(true);
    setActiveLayers(presetLayers);
    setIsPlaying(true);
    syncEngineWithLayers(presetLayers, true);
  };

  const handleResetTimer = (minutes: number) => {
    setTimerMinutes(minutes);
    setSecondsRemaining(minutes * 60);
    setIsTimerRunning(false);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const filteredSoundOptions = SOUND_OPTIONS.filter(
    (s) => s.category === activeCategory
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Khung tiêu đề */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pastel-mint/80 text-studio-900 text-xs font-semibold">
          <Coffee className="w-3.5 h-3.5 text-studio-700" />
          Góc Nhỏ Thư Thái &amp; Bình Yên
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-studio-900">
          Thả Lỏng, Lắng Nghe &amp; Tô Màu
        </h1>
        <p className="text-sm text-studio-500">
          Đắm chìm trong thế giới âm thanh tự nhiên, nhạc Lofi/Piano không lời, ASMR và sóng tần số chữa lành. Tự do kết hợp 2 lớp âm thanh yêu thích cho phiên tô màu của bạn.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Thẻ 1: Trình phát âm thanh & Nhạc nền đa năng (Ambient Sound & Music Player) */}
        <div className="lg:col-span-7 bg-white rounded-4xl p-6 sm:p-8 border border-studio-100 shadow-soft space-y-5">
          {/* Header Trình phát */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-studio-900 flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-studio-700" />
                Trình Phát Âm Thanh &amp; Nhạc Nền
              </h2>
              <p className="text-[11px] text-studio-400 mt-0.5">
                Chọn từng thanh âm hoặc bật song song 2 lớp (Nhạc Chill + Tiếng Tự Nhiên)
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  const nextMode = !isMixerMode;
                  setIsMixerMode(nextMode);
                  if (!nextMode && activeLayers.length > 1) {
                    const single = [activeLayers[0]];
                    setActiveLayers(single);
                    syncEngineWithLayers(single, isPlaying);
                  }
                }}
                className={`px-3 py-2 rounded-2xl text-[11px] font-bold transition-all flex items-center gap-1.5 border ${
                  isMixerMode
                    ? "bg-violet-50 text-violet-800 border-violet-200"
                    : "bg-studio-50 text-studio-600 border-studio-200 hover:bg-studio-100"
                }`}
                title="Bật/tắt chế độ trộn 2 lớp âm thanh cùng lúc"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>{isMixerMode ? "Trộn 2 Lớp: BẬT" : "Đơn Lớp"}</span>
              </button>

              <button
                type="button"
                onClick={toggleSound}
                className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  isPlaying
                    ? "bg-rose-50 text-rose-700 border border-rose-200"
                    : "bg-studio-900 text-white hover:bg-studio-800"
                }`}
              >
                {isPlaying ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5" />
                    <span>Tắt Âm Thanh</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Bật Âm Thanh</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* 1. THANH CHỌN DANH MỤC AMBIENT (CATEGORY TABS) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1.5 rounded-2xl bg-studio-50 border border-studio-100">
            {SOUND_CATEGORIES.map((cat) => {
              const CatIcon = cat.icon;
              const isTabActive = activeCategory === cat.id;
              const activeInCatCount = activeLayers.filter((l) => {
                const info = SOUND_OPTIONS.find((s) => s.id === l.id);
                return info?.category === cat.id;
              }).length;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-2.5 py-2 rounded-xl text-[11px] font-bold transition-all flex items-center justify-center gap-1.5 ${
                    isTabActive
                      ? "bg-studio-900 text-white shadow-xs"
                      : "text-studio-600 hover:text-studio-900 hover:bg-white/70"
                  }`}
                >
                  <CatIcon className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{cat.shortLabel}</span>
                  {activeInCatCount > 0 && (
                    <span
                      className={`w-4 h-4 rounded-full text-[9px] flex items-center justify-center font-black ${
                        isTabActive
                          ? "bg-pastel-mint text-studio-900"
                          : "bg-studio-900 text-white"
                      }`}
                    >
                      {activeInCatCount}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Nhãn danh mục hiện tại */}
          <div className="flex items-center justify-between text-[11px] text-studio-500 px-1">
            <span className="font-semibold text-studio-700">
              Danh mục:{" "}
              {SOUND_CATEGORIES.find((c) => c.id === activeCategory)?.label}
            </span>
            <span>
              {isMixerMode
                ? `Đang chọn ${activeLayers.length}/2 lớp âm thanh`
                : "Chế độ phát 1 âm thanh"}
            </span>
          </div>

          {/* 3. DANH SÁCH THẺ ÂM THANH & HIỆU ỨNG SÓNG NHẠC PHÁT ĐỘNG (VISUALIZER WAVES) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filteredSoundOptions.map((s) => {
              const Icon = s.icon;
              const layerIndex = activeLayers.findIndex((l) => l.id === s.id);
              const isSelected = layerIndex !== -1;
              const isCurrentlyAudible = isSelected && isPlaying;

              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => handleSoundSelect(s.id)}
                  className={`p-4 rounded-3xl border text-left transition-all flex flex-col justify-between relative overflow-hidden group ${
                    isSelected
                      ? "border-studio-800 bg-pastel-mint/35 ring-2 ring-studio-400/25 shadow-xs"
                      : "border-studio-100 bg-studio-50/50 hover:bg-white hover:border-studio-200"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2.5">
                    <div
                      className={`w-9 h-9 rounded-2xl border flex items-center justify-center transition-transform group-hover:scale-105 ${
                        isSelected
                          ? "bg-studio-900 text-white border-studio-900"
                          : `${s.accentBg} ${s.accentText}`
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>

                    <div className="flex items-center gap-1.5">
                      {s.badgeText && !isSelected && (
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-white/90 text-studio-500 border border-studio-100">
                          {s.badgeText}
                        </span>
                      )}
                      {isSelected && (
                        <>
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-studio-900 text-white">
                            {isMixerMode ? `Lớp ${layerIndex + 1}` : "Đang chọn"}
                          </span>
                          <AudioVisualizerWaves active={isCurrentlyAudible} />
                        </>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-studio-900 flex items-center gap-1.5">
                      <span>{s.label}</span>
                    </h3>
                    <p className="text-[10px] text-studio-500 mt-0.5 line-clamp-1">
                      {s.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Gợi ý phối 2 lớp âm thanh nhanh */}
          <div className="space-y-2 pt-2 border-t border-studio-100">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-studio-600 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                Gợi Ý Phối 2 Lớp Âm Thanh (Quick Mix)
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {MIX_PRESETS.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => handleApplyMixPreset(preset.layers)}
                  className="px-2.5 py-1.5 rounded-xl text-[10px] font-semibold bg-studio-50 hover:bg-pastel-mint/40 text-studio-700 border border-studio-100 hover:border-studio-300 transition-all"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* 2. BỘ TRỘN ÂM THANH & THANH TRƯỢT ÂM LƯỢNG ĐỘC LẬP CHO TỪNG LỚP (AUDIO MIXER) */}
          <div className="space-y-3 pt-3 border-t border-studio-100">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-studio-800 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-studio-600" />
                Bộ Trộn Âm Lượng Từng Lớp (Audio Mixer)
              </span>
              <span className="text-[10px] font-semibold text-studio-400">
                {isPlaying ? "Đang phát trực tiếp" : "Nhấn 'Bật Âm Thanh' để nghe"}
              </span>
            </div>

            {activeLayers.length === 0 ? (
              <p className="text-xs text-studio-400 italic py-2">
                Chưa chọn lớp âm thanh nào. Hãy bấm vào các thẻ âm thanh phía trên để thêm vào bộ trộn.
              </p>
            ) : (
              <div className="space-y-2.5">
                {activeLayers.map((layer, idx) => {
                  const meta = SOUND_OPTIONS.find((s) => s.id === layer.id);
                  if (!meta) return null;
                  const LayerIcon = meta.icon;

                  return (
                    <div
                      key={layer.id}
                      className="p-3 rounded-2xl bg-studio-50/80 border border-studio-100 space-y-2"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="px-2 py-0.5 rounded-lg bg-studio-900 text-white text-[9px] font-black shrink-0">
                            Lớp {idx + 1}
                          </span>
                          <LayerIcon className="w-3.5 h-3.5 text-studio-700 shrink-0" />
                          <span className="text-xs font-bold text-studio-900 truncate">
                            {meta.label}
                          </span>
                          <AudioVisualizerWaves active={isPlaying} />
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-xs font-extrabold text-studio-700 tabular-nums">
                            {Math.round(layer.volume * 100)}%
                          </span>
                          {activeLayers.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveLayer(layer.id)}
                              className="p-1 rounded-lg text-studio-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                              title="Gỡ lớp âm thanh này"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>

                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.02"
                        value={layer.volume}
                        onChange={(e) =>
                          handleLayerVolumeChange(
                            layer.id,
                            parseFloat(e.target.value)
                          )
                        }
                        className="w-full h-1.5 bg-studio-200 rounded-lg appearance-none cursor-pointer accent-studio-900"
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Thẻ 2: Đồng hồ đếm giờ tập trung */}
        <div className="lg:col-span-5 bg-white rounded-4xl p-6 sm:p-8 border border-studio-100 shadow-soft space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-studio-900 flex items-center gap-2">
                <Coffee className="w-4 h-4 text-studio-600" />
                Đồng Hồ Phiên Tô Màu
              </h2>
              <span className="text-[10px] font-semibold text-studio-500 bg-studio-50 px-2.5 py-1 rounded-full">
                Phương Pháp Pomodoro
              </span>
            </div>

            {/* Màn hình hiển thị giờ */}
            <div className="text-center py-8 bg-studio-50/70 rounded-3xl border border-studio-100">
              <span className="text-5xl sm:text-6xl font-black font-mono tracking-tight text-studio-900">
                {formatTime(secondsRemaining)}
              </span>
              <p className="text-xs text-studio-400 mt-2 font-medium">
                {isTimerRunning
                  ? "Phiên tô màu tĩnh tâm đang diễn ra..."
                  : "Đang tạm dừng"}
              </p>
            </div>

            {/* Các mốc thời gian gợi ý */}
            <div className="flex items-center justify-center gap-2">
              {[15, 25, 30, 45].map((mins) => (
                <button
                  key={mins}
                  type="button"
                  onClick={() => handleResetTimer(mins)}
                  className={`px-3.5 py-1.5 rounded-2xl text-xs font-semibold transition-all ${
                    timerMinutes === mins && !isTimerRunning
                      ? "bg-studio-900 text-white shadow-xs"
                      : "bg-studio-100 text-studio-700 hover:bg-studio-200"
                  }`}
                >
                  {mins} Phút
                </button>
              ))}
            </div>
          </div>

          {/* Các nút điều khiển đồng hồ */}
          <div className="flex items-center gap-3 pt-4 border-t border-studio-100">
            <button
              type="button"
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className="flex-1 py-3 rounded-2xl bg-studio-900 text-white font-bold text-xs shadow-soft hover:bg-studio-800 transition-all flex items-center justify-center gap-2"
            >
              {isTimerRunning ? (
                <>
                  <Pause className="w-4 h-4" />
                  <span>Tạm Dừng</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  <span>Bắt Đầu Phiên Tô Màu</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => handleResetTimer(timerMinutes)}
              className="p-3 rounded-2xl bg-studio-100 hover:bg-studio-200 text-studio-700 transition-all"
              title="Đặt lại đồng hồ"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Lời nhắn nhủ tích cực */}
      <div className="bg-gradient-to-r from-pastel-pink/40 via-pastel-peach/30 to-pastel-butter/30 rounded-4xl p-6 sm:p-8 border border-white text-center space-y-2">
        <Heart className="w-6 h-6 text-rose-400 fill-rose-400 mx-auto" />
        <h3 className="text-base font-bold text-studio-900">
          Thông Điệp Yêu Thương
        </h3>
        <p className="text-xs sm:text-sm text-studio-600 max-w-md mx-auto italic">
          Không có nét vẽ nào là sai sót trong nghệ thuật — chỉ có những cách biểu đạt độc đáo của chính tâm hồn bạn tại khoảnh khắc này. Hãy tận hưởng từng nét cọ.
        </p>
      </div>
    </div>
  );
}
