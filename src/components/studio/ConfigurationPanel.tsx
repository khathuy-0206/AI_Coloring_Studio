"use client";

import React, { useState, useMemo } from "react";
import {
  ColoringConfig,
  ColoringStyle,
  BasePalette,
  MoodType,
  LightingType,
  ColorModeType,
  EffectSettings,
} from "@/types";
import { NAMED_PALETTES } from "@/data/creative-content";
import {
  BASE_PALETTE_SWATCHES,
  parseVietnameseInstructions,
  previewGoldenRatioSummary,
} from "@/lib/smart-coloring";
import {
  ColoringPromptBuilder,
  DEFAULT_EFFECT_SETTINGS,
} from "@/lib/prompt-builder";
import {
  Sparkles,
  Sun,
  Palette,
  PenTool,
  Check,
  Wand2,
  CheckCircle2,
  Info,
  Layers,
  Eye,
  Cpu,
  Sliders,
  RotateCcw,
} from "lucide-react";

interface ConfigurationPanelProps {
  config: ColoringConfig;
  onChange: (newConfig: ColoringConfig) => void;
  selectedNamedPaletteId?: string;
  onSelectNamedPalette: (paletteId: string) => void;
}

export function ConfigurationPanel({
  config,
  onChange,
  selectedNamedPaletteId,
  onSelectNamedPalette,
}: ConfigurationPanelProps) {
  const [activeTab, setActiveTab] = useState<
    "style" | "effects" | "palette" | "atmosphere" | "custom"
  >("style");
  const [paletteCategoryFilter, setPaletteCategoryFilter] =
    useState<string>("Tất cả");

  const paletteFilterCategories = [
    "Tất cả",
    "Pastel",
    "Cute",
    "Cozy",
    "Retro",
    "Cyberpunk",
    "Cinematic",
    "Boho",
    "Luxury",
    "Peaceful",
    "Magical",
    "Vibrant",
  ];

  // 4 Preset Phương Pháp Tô Màu Chuyên Sâu Theo Từng Bước (Step-by-Step Marker & Texture Rendering Styles)
  const markerTextureStyles: {
    id: ColoringStyle;
    label: string;
    subtitleVi: string;
    icon: string;
    desc: string;
    directives: string[];
  }[] = [
    {
      id: "Frosty Stippling",
      label: "Frosty Stippling",
      subtitleVi: "Chấm hạt mịn",
      icon: "❄️",
      desc: "Tạo hiệu ứng kết cấu hạt xốp, chuyển màu mượt bằng các đốm li ti",
      directives: [
        "Multi-layer Shading",
        "Texture Dots / Stippling",
        "White Gel Pen Highlights",
      ],
    },
    {
      id: "Cozy Marker & Fur",
      label: "Cozy Marker & Fur",
      subtitleVi: "Bút dạ lông & Đổ bóng khối",
      icon: "🐾",
      desc: "Tạo mảng sáng tối rõ rệt, vân sọc, đánh bóng 3D",
      directives: [
        "Multi-layer Shading",
        "Texture Dots / Stippling",
        "White Gel Pen Highlights",
      ],
    },
    {
      id: "Water/Flowing Gradient",
      label: "Water/Flowing Gradient",
      subtitleVi: "Dòng chảy uốn lượn",
      icon: "🌊",
      desc: "Dành cho nước, mây với các đường nét chuyển động mượt mà",
      directives: [
        "Multi-layer Shading",
        "Texture Dots / Stippling",
        "White Gel Pen Highlights",
      ],
    },
    {
      id: "Botanical Layered",
      label: "Botanical Layered",
      subtitleVi: "Hoa lá chi tiết",
      icon: "🌿",
      desc: "Tạo gân lá, gân cánh hoa tỉ mỉ bằng màu đậm và điểm nhấn sáng",
      directives: [
        "Multi-layer Shading",
        "Texture Dots / Stippling",
        "White Gel Pen Highlights",
      ],
    },
  ];

  const styles: {
    id: ColoringStyle;
    label: string;
    icon: string;
    desc: string;
  }[] = [
    {
      id: "Cute",
      label: "Dễ Thương",
      icon: "🧸",
      desc: "Ngọt ngào, tròn trịa & đáng mến",
    },
    {
      id: "Kawaii",
      label: "Kawaii",
      icon: "🌸",
      desc: "Ngọt ngào phong cách Nhật Bản",
    },
    {
      id: "Pastel",
      label: "Pastel",
      icon: "🍡",
      desc: "Mịn màng, êm dịu & thanh thoát",
    },
    {
      id: "Cozy",
      label: "Ấm Cúng",
      icon: "☕",
      desc: "Bình yên, ấm áp chuẩn hygge",
    },
    {
      id: "Anime",
      label: "Anime",
      icon: "✨",
      desc: "Sắc nét, chuyển bóng mượt mà",
    },
    {
      id: "Watercolor",
      label: "Màu Nước",
      icon: "🎨",
      desc: "Loang màu hữu cơ nghệ thuật",
    },
    {
      id: "Vintage",
      label: "Cổ Điển",
      icon: "📜",
      desc: "Hoài niệm màu giấy tranh truyện",
    },
    {
      id: "Fantasy",
      label: "Huyền Ảo",
      icon: "🔮",
      desc: "Lấp lánh ánh sáng phép thuật",
    },
    {
      id: "Custom",
      label: "Tùy Chọn",
      icon: "🪄",
      desc: "Theo mô tả riêng của bạn",
    },
  ];

  const basePalettes: { id: BasePalette; label: string }[] = [
    { id: "Pastel", label: "Pastel Pha" },
    { id: "Pink", label: "Hồng Phấn" },
    { id: "Purple", label: "Tím Mộng Mơ" },
    { id: "Blue", label: "Xanh Da Trời" },
    { id: "Green", label: "Matcha Dịu" },
    { id: "Warm", label: "Nắng Hổ Phách" },
    { id: "Neutral", label: "Mộc Mạc Oat" },
    { id: "Retro", label: "Retro Vintage" },
    { id: "Cyberpunk", label: "Cyberpunk Neon" },
    { id: "Cinematic", label: "Cinematic Moody" },
    { id: "Boho", label: "Boho Earthy" },
    { id: "Luxury", label: "Luxury Royal" },
    { id: "Custom", label: "Tự Chọn" },
  ];

  const moods: { id: MoodType; label: string; effectDesc: string }[] = [
    {
      id: "Peaceful",
      label: "Yên Bình",
      effectDesc: "Phủ lớp sương mai êm dịu, cân bằng độ sáng nhẹ nhàng thư thái",
    },
    {
      id: "Cute",
      label: "Dễ Thương",
      effectDesc: "Tăng sắc hồng đào kẹo ngọt và điểm nhấn má hồng tươi tắn",
    },
    {
      id: "Cozy",
      label: "Ấm Áp",
      effectDesc: "Chuyển nhiệt độ màu sang tông mật ong ấm cúng, bóng đổ dịu",
    },
    {
      id: "Dreamy",
      label: "Mộng Mơ",
      effectDesc: "Hòa trộn hào quang tím hồng - lam sương bồng bềnh khắp tranh",
    },
    {
      id: "Magical",
      label: "Phép Thuật",
      effectDesc: "Chuyển sắc đa chiều huyền ảo kèm các đốm sáng phép thuật lấp lánh",
    },
    {
      id: "Vibrant",
      label: "Tươi Tắn",
      effectDesc: "Tăng +35% độ bão hòa và độ tương phản rực rỡ tràn đầy sức sống",
    },
    {
      id: "Nostalgic",
      label: "Hoài Niệm",
      effectDesc: "Phủ tông màu phim cổ điển (Retro/Sepia ấm) và chất liệu giấy xưa",
    },
  ];

  const lightings: { id: LightingType; label: string; effectDesc: string }[] = [
    {
      id: "Daylight",
      label: "Ban Ngày Tự Nhiên",
      effectDesc: "Nắng ban mai chiếu từ đỉnh đầu, vùng tối đổ bóng tím lam dịu",
    },
    {
      id: "Soft light",
      label: "Ánh Sáng Dịu",
      effectDesc: "Ánh sáng khuếch tán mềm mại, chuyển khối cầu 3D mượt mà",
    },
    {
      id: "Sunset",
      label: "Hoàng Hôn",
      effectDesc: "Nắng chiều cam đào chiếu xiên kết hợp bóng đổ tím chiều tà sâu",
    },
    {
      id: "Golden hour",
      label: "Giờ Vàng Hổ Phách",
      effectDesc: "Luồng nắng mật ong rực rỡ chiếu xiên, bóng đổ chàm tím bổ túc",
    },
    {
      id: "Warm indoor",
      label: "Đèn Ấm Trong Nhà",
      effectDesc: "Ánh đèn vàng cam ấm tỏa từ tâm tranh, bóng đổ tím nâu ấm cúng",
    },
    {
      id: "Night",
      label: "Đêm Tĩnh Lặng",
      effectDesc: "Viền sáng lam ngọc đêm khuya, bóng đổ xanh đêm thẳm (Midnight Blue)",
    },
    {
      id: "Moonlight",
      label: "Ánh Trăng Huyền Ảo",
      effectDesc: "Ánh trăng bạc xanh lam chiếu từ trên cao, bóng đổ chàm tím đêm trăng",
    },
  ];

  const colorModes: { id: ColorModeType; label: string; desc: string }[] = [
    {
      id: "ai_harmony",
      label: "AI Tự Phối (60-30-10)",
      desc: "Phối chuẩn Golden Ratio: 60% Chủ đạo, 30% Bổ túc kép, 10% Tương phản",
    },
    {
      id: "strict_palette",
      label: "Bám Sát Bảng Màu",
      desc: "Tuân thủ chặt chẽ các sắc thái trong bảng màu theo phân bổ 60-30-10",
    },
    {
      id: "dominant_accent",
      label: "Ưu Tiên Màu Chủ Đạo",
      desc: "Tập trung mạnh vào tông chủ đạo kèm 10% điểm nhấn bổ túc rực rỡ",
    },
    {
      id: "artistic_contrast",
      label: "Tương Phản Nghệ Thuật",
      desc: "Đối lập màu Bổ túc (180°) & Tam giác màu (120°) giữa chủ thể và nền",
    },
  ];

  // Các Mẫu Gợi Ý Tiếng Việt (Prompt Templates) phân chia rõ theo từng vùng (Tóc, Da, Mắt, Trang phục, Hoa lá, Nền)
  const vietnamesePromptTemplates = [
    {
      title: "🧚 Chân Dung & Tiên Nữ",
      tag: "Tóc • Da • Mắt • Váy • Nền",
      prompt:
        "Tô tóc màu vàng óng, da trắng hồng tự nhiên, mắt màu xanh ngọc, môi màu hồng đào, váy màu tím oải hương, cánh tiên màu xanh da trời, giữ nền sáng dịu",
    },
    {
      title: "🌸 Khu Vườn Hoa & Bướm",
      tag: "Hoa • Nhụy • Lá • Bướm • Nền",
      prompt:
        "Hoa màu hồng phấn và cam đào, tâm hoa màu vàng kem, lá cây màu xanh matcha và xanh ngọc, cánh bướm màu tím khoai môn, giữ nền trắng kem sáng",
    },
    {
      title: "☕ Góc Quán Nhỏ Ấm Cúng",
      tag: "Tóc • Áo • Vật dụng • Nền",
      prompt:
        "Tô tóc màu nâu hạt dẻ, da hồng hào, áo màu kem bơ, mũ màu đỏ rượu, lá cây màu xanh rêu, nền màu vàng kem ấm áp",
    },
    {
      title: "🐰 Thú Cưng Kawaii Ngọt Ngào",
      tag: "Thân • Mắt • Nơ • Hoa • Nền",
      prompt:
        "Thân màu trắng kem, má màu hồng phấn, mắt màu tím, áo nơ màu đỏ san hô, hoa màu vàng bơ, lá màu xanh bạc hà, giữ nền sáng",
    },
  ];

  const regionQuickTags = [
    { region: "Tóc", text: "tóc màu nâu hạt dẻ" },
    { region: "Tóc", text: "tóc màu vàng óng" },
    { region: "Da", text: "da trắng hồng tự nhiên" },
    { region: "Mắt", text: "mắt màu xanh ngọc" },
    { region: "Môi", text: "môi màu hồng đào" },
    { region: "Trang phục", text: "váy màu tím pastel" },
    { region: "Hoa & Lá", text: "hoa màu hồng phấn, lá màu xanh matcha" },
    { region: "Nền", text: "giữ nền sáng dịu" },
  ];

  // Ô màu đang được chọn để chỉnh sửa nhanh trong bộ Tự Chọn Màu
  const [activeColorSlot, setActiveColorSlot] = useState<number>(0);

  // 20 hạt màu nghệ thuật chọn nhanh (1 chạm để gán vào ô màu đang chọn)
  const quickColorSwatches: { hex: string; name: string }[] = [
    { hex: "#FF85A1", name: "Hồng Anh Đào" },
    { hex: "#FDE2E4", name: "Hồng Phấn" },
    { hex: "#E63946", name: "Đỏ Dâu Tây" },
    { hex: "#FF9F68", name: "Cam Đào" },
    { hex: "#FFD166", name: "Vàng Mật Ong" },
    { hex: "#FFF1C5", name: "Vàng Kem Bơ" },
    { hex: "#88C999", name: "Xanh Matcha" },
    { hex: "#B8E0D2", name: "Xanh Bạc Hà" },
    { hex: "#2EC4B6", name: "Xanh Ngọc Bích" },
    { hex: "#4EA8DE", name: "Xanh Da Trời" },
    { hex: "#A2D2FF", name: "Xanh Mây Sớm" },
    { hex: "#3A506B", name: "Xanh Đêm" },
    { hex: "#9B72CF", name: "Tím Khoai Môn" },
    { hex: "#DFCCF1", name: "Tím Oải Hương" },
    { hex: "#C77DFF", name: "Tím Thạch Anh" },
    { hex: "#6D4C41", name: "Nâu Hạt Dẻ" },
    { hex: "#D4A373", name: "Nâu Caramel" },
    { hex: "#E6CCB2", name: "Kem Hạnh Nhân" },
    { hex: "#FFE5D9", name: "Cam Sữa" },
    { hex: "#FFFDF9", name: "Trắng Ngà" },
  ];

  const activeNamedPalette = useMemo(
    () => NAMED_PALETTES.find((p) => p.id === selectedNamedPaletteId),
    [selectedNamedPaletteId]
  );

  // Danh sách các màu đang hoạt động (ưu tiên bảng màu tự chọn của người dùng nếu đã chỉnh sửa)
  const activeEditableColors = useMemo(() => {
    if (!selectedNamedPaletteId && config.customPaletteColors && config.customPaletteColors.length > 0) {
      return config.customPaletteColors;
    }
    if (activeNamedPalette?.colors && activeNamedPalette.colors.length > 0) {
      return activeNamedPalette.colors;
    }
    if (config.customPaletteColors && config.customPaletteColors.length > 0) {
      return config.customPaletteColors;
    }
    return BASE_PALETTE_SWATCHES[config.palette] || BASE_PALETTE_SWATCHES.Pastel;
  }, [selectedNamedPaletteId, activeNamedPalette, config.customPaletteColors, config.palette]);

  // Cập nhật 1 ô màu trong bảng màu tự chọn
  const handleUpdateCustomColor = (slotIndex: number, newHex: string) => {
    const nextColors = [...activeEditableColors];
    nextColors[slotIndex] = newHex.toUpperCase();
    onSelectNamedPalette("");
    onChange({
      ...config,
      palette: "Custom",
      namedPaletteId: undefined,
      customPaletteColors: nextColors,
    });
  };

  // Thêm 1 ô màu mới (tối đa 6 màu)
  const handleAddCustomColor = () => {
    if (activeEditableColors.length >= 6) return;
    const fallbackNewColors = ["#FF85A1", "#9B72CF", "#88C999", "#FFD166", "#4EA8DE", "#FF9F68"];
    const nextHex = fallbackNewColors[activeEditableColors.length % fallbackNewColors.length];
    const nextColors = [...activeEditableColors, nextHex];
    setActiveColorSlot(nextColors.length - 1);
    onSelectNamedPalette("");
    onChange({
      ...config,
      palette: "Custom",
      namedPaletteId: undefined,
      customPaletteColors: nextColors,
    });
  };

  // Xóa 1 ô màu (giữ tối thiểu 2 màu)
  const handleRemoveCustomColor = (slotIndex: number) => {
    if (activeEditableColors.length <= 2) return;
    const nextColors = activeEditableColors.filter((_, idx) => idx !== slotIndex);
    setActiveColorSlot(Math.max(0, Math.min(activeColorSlot, nextColors.length - 1)));
    onSelectNamedPalette("");
    onChange({
      ...config,
      palette: "Custom",
      namedPaletteId: undefined,
      customPaletteColors: nextColors,
    });
  };

  // Tự động phối 4 màu còn lại theo Vòng tròn màu (Bổ túc kép & Tam giác màu) dựa trên Màu #1 người dùng chọn
  const handleAutoHarmonizeFromLeadColor = () => {
    const leadHex = activeEditableColors[0] || "#FF85A1";
    const harmony = previewGoldenRatioSummary({
      paletteColors: [leadHex],
      basePalette: "Custom",
      style: config.style,
      mood: config.mood,
      lighting: config.lighting,
      colorMode: "artistic_contrast",
    });
    const harmonizedList = [
      leadHex,
      harmony.dominant60[1] || harmony.dominant60[0],
      harmony.secondary30[0],
      harmony.secondary30[1] || harmony.secondary30[0],
      harmony.accent10[0],
    ];
    onSelectNamedPalette("");
    onChange({
      ...config,
      palette: "Custom",
      namedPaletteId: undefined,
      customPaletteColors: harmonizedList,
    });
  };

  // Tính toán thời gian thực Hệ thống Golden Ratio 60-30-10 + Sắc độ Da + Vùng Sáng/Tối Bổ Túc
  const goldenPreview = useMemo(() => {
    return previewGoldenRatioSummary({
      paletteColors: activeEditableColors,
      basePalette: config.palette,
      style: config.style,
      mood: config.mood,
      lighting: config.lighting,
      colorMode: config.colorMode,
      customGoldenRatio: config.customGoldenRatio,
    });
  }, [
    activeEditableColors,
    config.palette,
    config.style,
    config.mood,
    config.lighting,
    config.colorMode,
    config.customGoldenRatio,
  ]);

  // Hàm thay đổi thanh trượt Tỷ lệ % Golden Ratio và tự động cân bằng tổng 100%
  const handleGoldenRatioSliderChange = (
    targetGroup: "dominant" | "secondary" | "accent",
    newValue: number
  ) => {
    const current = goldenPreview.ratios || {
      dominant: 60,
      secondary: 30,
      accent: 10,
    };
    const clamped = Math.max(5, Math.min(85, Math.round(newValue)));
    const remaining = Math.max(10, 100 - clamped);

    let nextRatios = { ...current };
    if (targetGroup === "dominant") {
      const otherSum = Math.max(1, current.secondary + current.accent);
      const sec = Math.max(
        5,
        Math.round((current.secondary / otherSum) * remaining)
      );
      const acc = Math.max(5, 100 - clamped - sec);
      nextRatios = { dominant: 100 - sec - acc, secondary: sec, accent: acc };
    } else if (targetGroup === "secondary") {
      const otherSum = Math.max(1, current.dominant + current.accent);
      const dom = Math.max(
        10,
        Math.round((current.dominant / otherSum) * remaining)
      );
      const acc = Math.max(5, 100 - clamped - dom);
      nextRatios = { dominant: dom, secondary: 100 - dom - acc, accent: acc };
    } else {
      const otherSum = Math.max(1, current.dominant + current.secondary);
      const dom = Math.max(
        10,
        Math.round((current.dominant / otherSum) * remaining)
      );
      const sec = Math.max(5, 100 - clamped - dom);
      nextRatios = { dominant: dom, secondary: sec, accent: 100 - dom - sec };
    }

    onChange({
      ...config,
      customGoldenRatio: {
        ...(config.customGoldenRatio || {}),
        enabled: true,
        ratios: nextRatios,
      },
    });
  };

  // Hàm thay đổi màu sắc trực tiếp cho từng ô màu trong nhóm Golden Ratio (60%, 30%, 10%, Sắc da)
  const handleGoldenGroupColorChange = (
    group: "dominantColors" | "secondaryColors" | "accentColors" | "skinToneHex",
    index: number,
    newHex: string
  ) => {
    const cleanHex = newHex.toUpperCase();
    const currentRatios = goldenPreview.ratios || {
      dominant: 60,
      secondary: 30,
      accent: 10,
    };

    if (group === "skinToneHex") {
      onChange({
        ...config,
        customGoldenRatio: {
          ...(config.customGoldenRatio || {}),
          enabled: true,
          ratios: currentRatios,
          skinToneHex: cleanHex,
        },
      });
      return;
    }

    const baseList =
      group === "dominantColors"
        ? [...goldenPreview.dominant60]
        : group === "secondaryColors"
        ? [...goldenPreview.secondary30]
        : [...goldenPreview.accent10];

    baseList[index] = cleanHex;

    onChange({
      ...config,
      customGoldenRatio: {
        ...(config.customGoldenRatio || {}),
        enabled: true,
        ratios: currentRatios,
        [group]: baseList,
      },
    });
  };

  // Đồng bộ đối tượng trạng thái effect_settings = { shadow_depth: 70, stippling_density: 40, white_highlights: 80, texture_lines: true }
  const effect_settings: EffectSettings = useMemo(
    () => ({
      shadow_depth:
        config.effectSettings?.shadow_depth ??
        DEFAULT_EFFECT_SETTINGS.shadow_depth,
      stippling_density:
        config.effectSettings?.stippling_density ??
        DEFAULT_EFFECT_SETTINGS.stippling_density,
      white_highlights:
        config.effectSettings?.white_highlights ??
        DEFAULT_EFFECT_SETTINGS.white_highlights,
      texture_lines:
        config.effectSettings?.texture_lines ??
        DEFAULT_EFFECT_SETTINGS.texture_lines,
    }),
    [config.effectSettings]
  );

  const handleUpdateEffectSettings = (patch: Partial<EffectSettings>) => {
    const nextEffects: EffectSettings = {
      ...effect_settings,
      ...patch,
    };
    onChange({
      ...config,
      effectSettings: nextEffects,
    });
  };

  const handleResetEffectSettings = () => {
    onChange({
      ...config,
      effectSettings: { ...DEFAULT_EFFECT_SETTINGS },
    });
  };

  // Chỉ dẫn Prompt ẩn (Prompt directives) tự động sinh theo thời gian thực khi người dùng kéo thanh trượt Hiệu ứng
  const liveEffectPromptDirectives = useMemo(
    () => ColoringPromptBuilder.getEffectSettingsDirectives(effect_settings),
    [effect_settings]
  );

  // Tự động tạo danh sách Từ khóa kỹ thuật (Style / Lighting / Golden Ratio / Effects) cho Prompt AI
  const autoTechKeywords = useMemo(() => {
    return ColoringPromptBuilder.getTechnicalKeywordsSummary({
      style: config.style,
      customStyle: config.customStyle,
      palette: config.palette,
      namedPaletteName: activeNamedPalette?.name,
      paletteColors: activeEditableColors,
      mood: config.mood,
      lighting: config.lighting,
      colorMode: config.colorMode,
      customInstruction: config.customInstruction,
      customGoldenRatio: config.customGoldenRatio,
      effectSettings: effect_settings,
    });
  }, [activeNamedPalette, activeEditableColors, config, effect_settings]);

  // Phân tích thời gian thực câu hướng dẫn tiếng Việt của người dùng
  const parsedVnPreview = useMemo(
    () => parseVietnameseInstructions(config.customInstruction),
    [config.customInstruction]
  );

  const activeMoodObj = moods.find((m) => m.id === config.mood) || moods[0];
  const activeLightingObj =
    lightings.find((l) => l.id === config.lighting) || lightings[1];
  const activeColorModeObj =
    colorModes.find((cm) => cm.id === config.colorMode) || colorModes[0];

  // Cụm điều khiển "Tùy chỉnh Hiệu ứng (Effects)" - Dùng chung cho cả Tab 1 và Tab Hiệu Ứng
  const renderEffectsControlSection = () => (
    <div className="p-3.5 rounded-2xl bg-gradient-to-br from-indigo-50/70 via-white to-emerald-50/50 border border-indigo-200/80 space-y-3 shadow-xs">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-1.5">
          <Sliders className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
          <span className="text-xs font-bold text-studio-900">
            Tùy chỉnh Hiệu ứng (Effects)
          </span>
          <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 border border-indigo-200">
            Marker FX
          </span>
        </div>

        <button
          type="button"
          onClick={handleResetEffectSettings}
          title="Đặt lại thông số hiệu ứng mặc định (70% - 40% - 80% - Bật vân)"
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white hover:bg-studio-100 text-studio-600 border border-studio-200 text-[10px] font-semibold transition-colors cursor-pointer"
        >
          <RotateCcw className="w-2.5 h-2.5" />
          <span>Mặc định (70/40/80)</span>
        </button>
      </div>

      <p className="text-[10px] text-studio-600 leading-snug">
        Chủ động kéo thanh trượt hoặc bật/tắt các hiệu ứng tô màu bút Marker chuyên sâu. Hệ thống tự động đồng bộ vào <code className="px-1 py-0.5 rounded bg-white border border-studio-200 font-mono text-[9px] text-indigo-700">effect_settings</code> và tiêm chỉ dẫn tương ứng vào Prompt AI &amp; bộ máy tô màu.
      </p>

      {/* 3 Thanh trượt (Sliders) & 1 Nút Bật/Tắt (Toggle) */}
      <div className="space-y-3 bg-white/95 p-3 rounded-2xl border border-studio-100">
        {/* 1. Thanh trượt: Độ đậm bóng đổ (Shadow Depth / Contrast) */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[11px]">
            <label
              htmlFor="slider-shadow-depth"
              className="font-bold text-studio-800 flex items-center gap-1.5"
            >
              <span>🌑 Độ đậm bóng đổ (Shadow Depth / Contrast)</span>
            </label>
            <span className="font-mono font-bold text-xs px-2 py-0.5 rounded-lg bg-studio-100 text-studio-900">
              {effect_settings.shadow_depth}%
            </span>
          </div>
          <input
            id="slider-shadow-depth"
            type="range"
            min={0}
            max={100}
            step={1}
            value={effect_settings.shadow_depth}
            onChange={(e) =>
              handleUpdateEffectSettings({
                shadow_depth: Number(e.target.value),
              })
            }
            className="w-full accent-indigo-700 cursor-pointer h-1.5 bg-studio-200 rounded-lg"
          />
          <div className="flex justify-between text-[9px] text-studio-400 font-medium">
            <span>0% (Nhẹ nhàng, phẳng dịu)</span>
            <span>50% (Cân bằng)</span>
            <span>100% (Khối 3D sắc nét, bóng sâu)</span>
          </div>
        </div>

        {/* 2. Thanh trượt: Mật độ hạt chấm texture (Stippling Density) */}
        <div className="space-y-1 pt-2 border-t border-studio-100">
          <div className="flex items-center justify-between text-[11px]">
            <label
              htmlFor="slider-stippling-density"
              className="font-bold text-studio-800 flex items-center gap-1.5"
            >
              <span>❄️ Mật độ hạt chấm texture (Stippling Density)</span>
            </label>
            <span className="font-mono font-bold text-xs px-2 py-0.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200">
              {effect_settings.stippling_density}%
            </span>
          </div>
          <input
            id="slider-stippling-density"
            type="range"
            min={0}
            max={100}
            step={1}
            value={effect_settings.stippling_density}
            onChange={(e) =>
              handleUpdateEffectSettings({
                stippling_density: Number(e.target.value),
              })
            }
            className="w-full accent-emerald-600 cursor-pointer h-1.5 bg-studio-200 rounded-lg"
          />
          <div className="flex justify-between text-[9px] text-studio-400 font-medium">
            <span>0% (Không chấm hạt)</span>
            <span>40% (Hạt mịn tự nhiên)</span>
            <span>100% (Chấm hạt xốp dày)</span>
          </div>
        </div>

        {/* 3. Thanh trượt: Độ lấp lánh / Ánh sáng trắng (White Gel Highlights) */}
        <div className="space-y-1 pt-2 border-t border-studio-100">
          <div className="flex items-center justify-between text-[11px]">
            <label
              htmlFor="slider-white-highlights"
              className="font-bold text-studio-800 flex items-center gap-1.5"
            >
              <span>✨ Độ lấp lánh / Ánh sáng trắng (White Gel Highlights)</span>
            </label>
            <span className="font-mono font-bold text-xs px-2 py-0.5 rounded-lg bg-amber-50 text-amber-800 border border-amber-200">
              {effect_settings.white_highlights}%
            </span>
          </div>
          <input
            id="slider-white-highlights"
            type="range"
            min={0}
            max={100}
            step={1}
            value={effect_settings.white_highlights}
            onChange={(e) =>
              handleUpdateEffectSettings({
                white_highlights: Number(e.target.value),
              })
            }
            className="w-full accent-amber-500 cursor-pointer h-1.5 bg-studio-200 rounded-lg"
          />
          <div className="flex justify-between text-[9px] text-studio-400 font-medium">
            <span>0% (Tắt ánh sáng trắng)</span>
            <span>50% (Viền sáng nhẹ)</span>
            <span>100% (Bút Gel trắng &amp; sao lấp lánh rực rỡ)</span>
          </div>
        </div>

        {/* 4. Nút bật/tắt (Toggle): Vân nổi chi tiết (Texture Lines / Fur / Veins) */}
        <div className="pt-2 border-t border-studio-100 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <span className="text-[11px] font-bold text-studio-800 block">
              🌿 Vân nổi chi tiết (Texture Lines / Fur / Veins)
            </span>
            <span className="text-[10px] text-studio-500 block leading-snug">
              Bật hoặc tắt các đường vân cọ, sọc lông thú, gợn sóng và gân lá tỉ mỉ
            </span>
          </div>

          <button
            type="button"
            role="switch"
            aria-checked={effect_settings.texture_lines}
            onClick={() =>
              handleUpdateEffectSettings({
                texture_lines: !effect_settings.texture_lines,
              })
            }
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              effect_settings.texture_lines
                ? "bg-emerald-600"
                : "bg-studio-300"
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                effect_settings.texture_lines
                  ? "translate-x-5"
                  : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Hiển thị biến trạng thái đồng bộ (State Sync) & Câu lệnh ẩn gửi cho AI (Live Prompt Directives) - Đã ẩn khỏi giao diện nhưng vẫn hoạt động ngầm */}
      <div className="hidden p-2.5 rounded-xl bg-studio-900 text-white space-y-1.5 text-[10px]">
        <div className="flex items-center justify-between gap-2">
          <span className="font-bold text-emerald-300 flex items-center gap-1">
            <Cpu className="w-3 h-3" />
            Đồng bộ trạng thái (State Sync) &amp; AI Prompt Directives:
          </span>
          <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-white/10 text-amber-200">
            Live Sync
          </span>
        </div>
        <div className="font-mono text-[9px] text-studio-200 bg-black/30 px-2 py-1 rounded-lg overflow-x-auto whitespace-nowrap">
          {`effect_settings = { shadow_depth: ${effect_settings.shadow_depth}, stippling_density: ${effect_settings.stippling_density}, white_highlights: ${effect_settings.white_highlights}, texture_lines: ${effect_settings.texture_lines} }`}
        </div>
        <p className="text-[9px] text-studio-300 font-mono leading-relaxed line-clamp-3">
          <strong className="text-indigo-300">Prompt Injected:</strong>{" "}
          {liveEffectPromptDirectives}
        </p>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-3xl p-5 shadow-soft border border-studio-100 space-y-5">
      {/* Thanh điều hướng tab cấu hình */}
      <div className="flex items-center gap-1.5 p-1 bg-studio-50 rounded-2xl overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab("style")}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === "style"
              ? "bg-white text-studio-900 shadow-sm"
              : "text-studio-500 hover:text-studio-800"
          }`}
        >
          1. Phong Cách
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("effects")}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1 ${
            activeTab === "effects"
              ? "bg-indigo-600 text-white shadow-sm"
              : "text-indigo-700 bg-indigo-50/70 hover:bg-indigo-100/80"
          }`}
        >
          <Sliders className="w-3 h-3" />
          <span>Tùy chỉnh Hiệu ứng</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("palette")}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === "palette"
              ? "bg-white text-studio-900 shadow-sm"
              : "text-studio-500 hover:text-studio-800"
          }`}
        >
          2. Bảng Màu
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("atmosphere")}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === "atmosphere"
              ? "bg-white text-studio-900 shadow-sm"
              : "text-studio-500 hover:text-studio-800"
          }`}
        >
          3. Không Khí
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("custom")}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === "custom"
              ? "bg-white text-studio-900 shadow-sm"
              : "text-studio-500 hover:text-studio-800"
          }`}
        >
          4. Hướng Dẫn
        </button>
      </div>

      {/* TAB RIÊNG: BẢNG ĐIỀU KHIỂN TÙY CHỈNH HIỆU ỨNG TÔ MÀU NGHỆ THUẬT (EFFECTS CONTROL PANEL) */}
      {activeTab === "effects" && (
        <div className="space-y-4">{renderEffectsControlSection()}</div>
      )}

      {/* MỤC 1: PHONG CÁCH NGHỆ THUẬT & KỸ THUẬT MARKER CHUYÊN SÂU */}
      {activeTab === "style" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-studio-800 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-studio-500" />
              Phong Cách Tô Màu
            </label>
            <span className="text-[11px] font-semibold text-studio-500">
              Đang chọn:{" "}
              <strong className="text-studio-900">{config.style}</strong>
            </span>
          </div>

          {/* Nhóm 1: 4 Phương pháp tô màu chuyên sâu theo từng bước (Step-by-Step Marker & Texture Rendering Styles) */}
          <div className="p-3 rounded-2xl bg-studio-50/90 border border-studio-200/80 space-y-2.5">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] font-bold text-studio-900 flex items-center gap-1.5">
                <PenTool className="w-3.5 h-3.5 text-emerald-600" />
                Kỹ Thuật Marker &amp; Kết Cấu Chuyên Sâu (Step-by-Step Styles)
              </span>
              <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                3D Shading + Gel Pen
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {markerTextureStyles.map((item) => {
                const isSelected = config.style === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onChange({ ...config, style: item.id })}
                    className={`p-2.5 rounded-2xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
                      isSelected
                        ? "border-emerald-700 bg-emerald-50/80 ring-2 ring-emerald-500/35 shadow-sm"
                        : "border-studio-200/80 bg-white hover:border-emerald-300 hover:bg-emerald-50/20"
                    }`}
                  >
                    <div className="w-full">
                      <div className="flex items-center justify-between w-full mb-1">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <span className="text-base shrink-0">{item.icon}</span>
                          <span className="text-xs font-bold text-studio-900 truncate">
                            {item.label}
                          </span>
                        </div>
                        {isSelected && (
                          <span className="w-4 h-4 rounded-full bg-emerald-700 text-white flex items-center justify-center text-[10px] shrink-0">
                            ✓
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] font-semibold text-emerald-800 block leading-tight">
                        {item.subtitleVi}
                      </span>
                      <span className="text-[10px] text-studio-500 block mt-1 leading-snug">
                        {item.desc}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1 mt-2 pt-1.5 border-t border-studio-100">
                      {item.directives.map((dir) => (
                        <span
                          key={dir}
                          className="text-[8px] font-mono font-semibold px-1.5 py-0.5 rounded bg-studio-100 text-studio-700"
                        >
                          {dir}
                        </span>
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bảng Điều Khiển Tùy Chỉnh Hiệu Ứng (Effects Control Panel) hiển thị trực tiếp ngay dưới Kỹ Thuật Marker */}
          {renderEffectsControlSection()}

          {/* Nhóm 2: Phong cách chủ đề cơ bản */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-studio-700 block">
              Phong Cách Chủ Đề Cơ Bản
            </span>
            <div className="grid grid-cols-3 gap-2">
              {styles.map((item) => {
                const isSelected = config.style === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onChange({ ...config, style: item.id })}
                    className={`p-2.5 rounded-2xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
                      isSelected
                        ? "border-studio-700 bg-pastel-pink/30 ring-2 ring-studio-400/40 shadow-sm"
                        : "border-studio-100 bg-white hover:border-studio-200 hover:bg-studio-50/50"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className="text-base">{item.icon}</span>
                      {isSelected && (
                        <span className="w-4 h-4 rounded-full bg-studio-800 text-white flex items-center justify-center text-[10px]">
                          ✓
                        </span>
                      )}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-studio-900 block leading-tight">
                        {item.label}
                      </span>
                      <span className="text-[10px] text-studio-400 block mt-0.5 leading-tight line-clamp-1">
                        {item.desc}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {config.style === "Custom" && (
            <div className="pt-2">
              <input
                type="text"
                placeholder="Mô tả phong cách mong muốn (ví dụ: Tranh cổ tích Anh thế kỷ 19, màu sắc vaporwave)..."
                value={config.customStyle || ""}
                onChange={(e) =>
                  onChange({ ...config, customStyle: e.target.value })
                }
                className="w-full px-3 py-2 text-xs rounded-xl border border-studio-200 focus:outline-none focus:ring-2 focus:ring-studio-400 bg-white"
              />
            </div>
          )}
        </div>
      )}

      {/* MỤC 2: BẢNG MÀU SẮC & THUẬT TOÁN GOLDEN RATIO TƯƠNG TÁC (60 - 30 - 10) */}
      {activeTab === "palette" && (
        <div className="space-y-4">
          {/* Khung Tương tác Quy tắc Golden Ratio (60-30-10) & Vòng tròn màu nghệ thuật */}
          <div className="p-3.5 rounded-2xl bg-studio-50/90 border border-studio-200/80 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] font-bold text-studio-900 flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-studio-700" />
                Tỷ Lệ Vàng ({goldenPreview.ratios.dominant}% - {goldenPreview.ratios.secondary}% - {goldenPreview.ratios.accent}%) &amp; Nhóm Màu
              </span>
              {config.customGoldenRatio?.enabled ? (
                <button
                  type="button"
                  onClick={() =>
                    onChange({
                      ...config,
                      customGoldenRatio: undefined,
                    })
                  }
                  className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100 transition-colors"
                >
                  Đặt lại 60-30-10
                </button>
              ) : (
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white border border-studio-200 text-studio-700 truncate max-w-[190px]">
                  {goldenPreview.colorWheelRule}
                </span>
              )}
            </div>

            {/* Thanh tỷ lệ trực quan động */}
            <div className="h-4 w-full rounded-full overflow-hidden flex border border-black/10 shadow-xs">
              <div
                className="h-full flex items-center justify-center text-[9px] font-bold text-studio-900/90 transition-all duration-150"
                style={{
                  width: `${goldenPreview.ratios.dominant}%`,
                  background: `linear-gradient(90deg, ${goldenPreview.dominant60[0]}, ${goldenPreview.dominant60[1] || goldenPreview.dominant60[0]})`,
                }}
                title={`${goldenPreview.ratios.dominant}% Màu Chủ Đạo`}
              >
                {goldenPreview.ratios.dominant}%
              </div>
              <div
                className="h-full flex items-center justify-center text-[9px] font-bold text-studio-900/90 border-l border-white/50 transition-all duration-150"
                style={{
                  width: `${goldenPreview.ratios.secondary}%`,
                  background: `linear-gradient(90deg, ${goldenPreview.secondary30[0]}, ${goldenPreview.secondary30[1] || goldenPreview.secondary30[0]})`,
                }}
                title={`${goldenPreview.ratios.secondary}% Màu Phụ`}
              >
                {goldenPreview.ratios.secondary}%
              </div>
              <div
                className="h-full flex items-center justify-center text-[9px] font-bold text-studio-900 border-l border-white/50 transition-all duration-150"
                style={{
                  width: `${goldenPreview.ratios.accent}%`,
                  backgroundColor: goldenPreview.accent10[0],
                }}
                title={`${goldenPreview.ratios.accent}% Màu Nhấn`}
              >
                {goldenPreview.ratios.accent}%
              </div>
            </div>

            {/* 1. Thanh trượt tùy chỉnh Tỷ lệ phần trăm động (Dynamic Percentage Sliders) */}
            <div className="p-2.5 rounded-xl bg-white border border-studio-100 space-y-2">
              <div className="flex items-center justify-between text-[10px]">
                <span className="font-bold text-studio-700">
                  🎚️ Kéo thanh trượt để chỉnh Tỷ Lệ Golden Ratio:
                </span>
                <div className="flex items-center gap-1">
                  {[
                    { label: "60-30-10", d: 60, s: 30, a: 10 },
                    { label: "70-20-10", d: 70, s: 20, a: 10 },
                    { label: "50-35-15", d: 50, s: 35, a: 15 },
                  ].map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() =>
                        onChange({
                          ...config,
                          customGoldenRatio: {
                            ...(config.customGoldenRatio || {}),
                            enabled: true,
                            ratios: {
                              dominant: preset.d,
                              secondary: preset.s,
                              accent: preset.a,
                            },
                          },
                        })
                      }
                      className={`px-1.5 py-0.5 rounded text-[9px] font-bold border transition-colors ${
                        goldenPreview.ratios.dominant === preset.d &&
                        goldenPreview.ratios.secondary === preset.s
                          ? "bg-studio-900 text-white border-studio-900"
                          : "bg-studio-50 text-studio-600 border-studio-200 hover:bg-studio-100"
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-[10px]">
                <div className="space-y-0.5">
                  <div className="flex justify-between font-semibold text-studio-700">
                    <span>Chủ đạo</span>
                    <span className="font-mono font-bold text-studio-900">
                      {goldenPreview.ratios.dominant}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min={20}
                    max={80}
                    value={goldenPreview.ratios.dominant}
                    onChange={(e) =>
                      handleGoldenRatioSliderChange(
                        "dominant",
                        Number(e.target.value)
                      )
                    }
                    className="w-full accent-studio-900 cursor-pointer h-1.5"
                  />
                </div>

                <div className="space-y-0.5">
                  <div className="flex justify-between font-semibold text-studio-700">
                    <span>Màu phụ</span>
                    <span className="font-mono font-bold text-studio-900">
                      {goldenPreview.ratios.secondary}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={65}
                    value={goldenPreview.ratios.secondary}
                    onChange={(e) =>
                      handleGoldenRatioSliderChange(
                        "secondary",
                        Number(e.target.value)
                      )
                    }
                    className="w-full accent-studio-700 cursor-pointer h-1.5"
                  />
                </div>

                <div className="space-y-0.5">
                  <div className="flex justify-between font-semibold text-studio-700">
                    <span>Màu nhấn</span>
                    <span className="font-mono font-bold text-studio-900">
                      {goldenPreview.ratios.accent}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min={5}
                    max={45}
                    value={goldenPreview.ratios.accent}
                    onChange={(e) =>
                      handleGoldenRatioSliderChange(
                        "accent",
                        Number(e.target.value)
                      )
                    }
                    className="w-full accent-amber-500 cursor-pointer h-1.5"
                  />
                </div>
              </div>
            </div>

            {/* 2. Chi tiết 4 nhóm: Bấm vào từng ô màu để đổi mã HEX trực tiếp */}
            <div className="grid grid-cols-2 gap-2 text-[10px]">
              <div className="p-2 rounded-xl bg-white border border-studio-100 space-y-1">
                <span className="font-bold text-studio-800 block">
                  {goldenPreview.ratios.dominant}% Chủ Đạo (Bấm để đổi màu)
                </span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {goldenPreview.dominant60.map((hex, i) => (
                    <label
                      key={i}
                      title={`Bấm để đổi màu Chủ đạo #${i + 1} (${hex})`}
                      className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-lg bg-studio-50 border border-studio-200 hover:border-studio-500 cursor-pointer transition-all"
                    >
                      <input
                        type="color"
                        value={/^#[0-9A-Fa-f]{6}$/.test(hex) ? hex : "#FF8FAB"}
                        onChange={(e) =>
                          handleGoldenGroupColorChange(
                            "dominantColors",
                            i,
                            e.target.value
                          )
                        }
                        className="sr-only"
                      />
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/15"
                        style={{ backgroundColor: hex }}
                      />
                      <span className="font-mono text-[9px] text-studio-700">
                        {hex}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="p-2 rounded-xl bg-white border border-studio-100 space-y-1">
                <span className="font-bold text-studio-800 block">
                  {goldenPreview.ratios.secondary}% Màu Phụ (Bấm để đổi màu)
                </span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {goldenPreview.secondary30.map((hex, i) => (
                    <label
                      key={i}
                      title={`Bấm để đổi Màu phụ #${i + 1} (${hex})`}
                      className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-lg bg-studio-50 border border-studio-200 hover:border-studio-500 cursor-pointer transition-all"
                    >
                      <input
                        type="color"
                        value={/^#[0-9A-Fa-f]{6}$/.test(hex) ? hex : "#72EFDD"}
                        onChange={(e) =>
                          handleGoldenGroupColorChange(
                            "secondaryColors",
                            i,
                            e.target.value
                          )
                        }
                        className="sr-only"
                      />
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/15"
                        style={{ backgroundColor: hex }}
                      />
                      <span className="font-mono text-[9px] text-studio-700">
                        {hex}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="p-2 rounded-xl bg-white border border-studio-100 space-y-1">
                <span className="font-bold text-studio-800 block">
                  {goldenPreview.ratios.accent}% Màu Nhấn (Bấm để đổi màu)
                </span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {goldenPreview.accent10.map((hex, i) => (
                    <label
                      key={i}
                      title={`Bấm để đổi Màu nhấn #${i + 1} (${hex})`}
                      className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-lg bg-studio-50 border border-studio-200 hover:border-studio-500 cursor-pointer transition-all"
                    >
                      <input
                        type="color"
                        value={/^#[0-9A-Fa-f]{6}$/.test(hex) ? hex : "#FFD166"}
                        onChange={(e) =>
                          handleGoldenGroupColorChange(
                            "accentColors",
                            i,
                            e.target.value
                          )
                        }
                        className="sr-only"
                      />
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/15"
                        style={{ backgroundColor: hex }}
                      />
                      <span className="font-mono text-[9px] text-studio-700">
                        {hex}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="p-2 rounded-xl bg-white border border-studio-100 space-y-1">
                <span className="font-bold text-studio-800 block">
                  Sắc Độ Da &amp; Undertone
                </span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <label
                    title={`Bấm để đổi Sắc da chính (${goldenPreview.skinTones.base})`}
                    className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-lg bg-studio-50 border border-studio-200 hover:border-studio-500 cursor-pointer transition-all"
                  >
                    <input
                      type="color"
                      value={
                        /^#[0-9A-Fa-f]{6}$/.test(goldenPreview.skinTones.base)
                          ? goldenPreview.skinTones.base
                          : "#FFE5D9"
                      }
                      onChange={(e) =>
                        handleGoldenGroupColorChange(
                          "skinToneHex",
                          0,
                          e.target.value
                        )
                      }
                      className="sr-only"
                    />
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-black/15"
                      style={{ backgroundColor: goldenPreview.skinTones.base }}
                    />
                    <span className="font-mono text-[9px] text-studio-700">
                      {goldenPreview.skinTones.base}
                    </span>
                  </label>
                  <span className="text-[9px] text-studio-500 truncate">
                    Tự nhiên + SSS
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* KHUNG TỰ CHỌN MÀU THEO Ý BẠN (CUSTOM COLOR PICKER TRỰC TIẾP) */}
          <div
            className={`p-3.5 rounded-2xl border transition-all space-y-3 ${
              config.palette === "Custom" && !selectedNamedPaletteId
                ? "bg-pastel-pink/15 border-studio-800 ring-2 ring-studio-400/30"
                : "bg-white border-studio-200/90"
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <span className="text-xs font-bold text-studio-900 flex items-center gap-1.5">
                  🎨 Tự Chọn Màu Theo Ý Bạn
                  {config.palette === "Custom" && !selectedNamedPaletteId && (
                    <span className="px-2 py-0.5 rounded-full bg-studio-900 text-white text-[9px] font-semibold">
                      Đang dùng bảng màu tự chọn
                    </span>
                  )}
                </span>
                <span className="text-[10px] text-studio-500 block mt-0.5">
                  Nhấn vào ô tròn để mở bảng pha màu, nhập mã Hex hoặc bấm chọn hạt màu nhanh bên dưới:
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleAutoHarmonizeFromLeadColor}
                  className="px-2.5 py-1 rounded-xl bg-studio-800 hover:bg-studio-700 text-white text-[10px] font-semibold transition-all flex items-center gap-1 shadow-xs"
                  title="Giữ nguyên Màu #1 bạn chọn và tự động tính 4 màu còn lại theo Vòng tròn màu"
                >
                  <Wand2 className="w-3 h-3" />
                  Tự Phối Từ Màu #1
                </button>
                {activeEditableColors.length < 6 && (
                  <button
                    type="button"
                    onClick={handleAddCustomColor}
                    className="px-2.5 py-1 rounded-xl bg-studio-100 hover:bg-studio-200 text-studio-800 text-[10px] font-bold transition-all"
                  >
                    + Thêm màu
                  </button>
                )}
              </div>
            </div>

            {/* Các ô màu tương tác (Click mở Color Picker + Nhập mã Hex + Xóa) */}
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {activeEditableColors.map((hex, idx) => {
                const isSlotSelected = activeColorSlot === idx;
                const roleLabel =
                  idx <= 1
                    ? "60% Chủ đạo"
                    : idx <= 3
                    ? "30% Màu phụ"
                    : "10% Điểm nhấn";
                return (
                  <div
                    key={idx}
                    onClick={() => setActiveColorSlot(idx)}
                    className={`relative p-2 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                      isSlotSelected
                        ? "border-studio-900 bg-studio-50 ring-2 ring-studio-400/40 shadow-xs"
                        : "border-studio-100 bg-white hover:border-studio-300"
                    }`}
                  >
                    {/* Nút xóa ô màu nếu có > 2 màu */}
                    {activeEditableColors.length > 2 && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveCustomColor(idx);
                        }}
                        className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-white border border-studio-200 text-studio-500 hover:bg-rose-50 hover:text-rose-600 text-[10px] font-bold flex items-center justify-center shadow-xs"
                        title="Xóa ô màu này"
                      >
                        ×
                      </button>
                    )}

                    <span className="text-[9px] font-bold text-studio-500 truncate w-full">
                      #{idx + 1} • {roleLabel}
                    </span>

                    {/* Vòng tròn màu kết nối trực tiếp với <input type="color"> */}
                    <label
                      className="relative w-10 h-10 rounded-2xl border-2 border-white shadow-sm cursor-pointer overflow-hidden block ring-1 ring-black/15 hover:scale-105 transition-transform"
                      style={{ backgroundColor: hex }}
                      title="Nhấn để mở bảng chọn màu tự do"
                    >
                      <input
                        type="color"
                        value={/^#[0-9A-Fa-f]{6}$/.test(hex) ? hex : "#FF85A1"}
                        onChange={(e) => {
                          setActiveColorSlot(idx);
                          handleUpdateCustomColor(idx, e.target.value);
                        }}
                        className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                      />
                    </label>

                    {/* Ô nhập mã Hex trực tiếp */}
                    <input
                      type="text"
                      value={hex}
                      maxLength={7}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val.startsWith("#") && val.length <= 7) {
                          handleUpdateCustomColor(idx, val);
                        } else if (!val.startsWith("#") && val.length <= 6) {
                          handleUpdateCustomColor(idx, `#${val}`);
                        }
                      }}
                      className="w-full px-1 py-0.5 text-[10px] font-mono font-semibold text-center text-studio-800 bg-studio-50 rounded-lg border border-studio-200 focus:outline-none focus:border-studio-700"
                    />
                  </div>
                );
              })}
            </div>

            {/* Bảng Hạt Màu Chọn Nhanh (1 chạm để gán vào Ô đang chọn) */}
            <div className="pt-2 border-t border-studio-100 space-y-1.5">
              <div className="flex items-center justify-between text-[10px]">
                <span className="font-semibold text-studio-600">
                  Chạm nhanh để đổi màu cho{" "}
                  <strong className="text-studio-900">
                    Ô #{activeColorSlot + 1}
                  </strong>
                  :
                </span>
                <span className="text-studio-400">20 sắc độ thông dụng</span>
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                {quickColorSwatches.map((sw, sIdx) => {
                  const isCurrentHex =
                    activeEditableColors[activeColorSlot]?.toUpperCase() ===
                    sw.hex.toUpperCase();
                  return (
                    <button
                      key={sIdx}
                      type="button"
                      onClick={() =>
                        handleUpdateCustomColor(
                          Math.min(activeColorSlot, activeEditableColors.length - 1),
                          sw.hex
                        )
                      }
                      className={`w-5 h-5 rounded-full border transition-transform hover:scale-125 ${
                        isCurrentHex
                          ? "border-studio-900 ring-2 ring-studio-500 scale-110"
                          : "border-black/15"
                      }`}
                      style={{ backgroundColor: sw.hex }}
                      title={`${sw.name} (${sw.hex})`}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-studio-800">
                Bảng Màu Đặc Trưng ({NAMED_PALETTES.length} Bộ Sưu Tập)
              </label>
              {paletteCategoryFilter !== "Tất cả" && (
                <button
                  type="button"
                  onClick={() => setPaletteCategoryFilter("Tất cả")}
                  className="text-[10px] font-bold text-studio-600 hover:text-studio-900 underline"
                >
                  Xem tất cả
                </button>
              )}
            </div>

            {/* Thanh lọc danh mục Bảng Màu (UI Filter Tabs) */}
            <div className="flex flex-wrap gap-1 mb-2.5">
              {paletteFilterCategories.map((cat) => {
                const isActive = paletteCategoryFilter === cat;
                const count =
                  cat === "Tất cả"
                    ? NAMED_PALETTES.length
                    : NAMED_PALETTES.filter((np) => np.styleGroup === cat)
                        .length;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setPaletteCategoryFilter(cat)}
                    className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all flex items-center gap-1 ${
                      isActive
                        ? "bg-studio-800 text-white shadow-xs"
                        : "bg-white text-studio-700 border border-studio-100 hover:bg-studio-50"
                    }`}
                  >
                    <span>{cat}</span>
                    <span
                      className={`text-[9px] px-1 rounded-full ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-studio-100 text-studio-500"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="grid grid-cols-2 gap-2 max-h-80 overflow-y-auto pr-1">
              {NAMED_PALETTES.filter(
                (np) =>
                  paletteCategoryFilter === "Tất cả" ||
                  np.styleGroup === paletteCategoryFilter
              ).map((np) => {
                const isSelected = selectedNamedPaletteId === np.id;
                return (
                  <button
                    key={np.id}
                    type="button"
                    onClick={() => {
                      onSelectNamedPalette(np.id);
                      const validBasePalettes: BasePalette[] = [
                        "Pastel",
                        "Pink",
                        "Purple",
                        "Blue",
                        "Green",
                        "Warm",
                        "Neutral",
                        "Retro",
                        "Cyberpunk",
                        "Cinematic",
                        "Boho",
                        "Luxury",
                        "Custom",
                      ];
                      const nextBasePalette: BasePalette =
                        validBasePalettes.includes(np.styleGroup as BasePalette)
                          ? (np.styleGroup as BasePalette)
                          : "Custom";
                      onChange({
                        ...config,
                        palette: nextBasePalette,
                        namedPaletteId: np.id,
                        customPaletteColors: np.colors,
                      });
                    }}
                    className={`p-2.5 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? "border-studio-800 bg-white ring-2 ring-studio-400/40 shadow-sm"
                        : "border-studio-100 bg-white hover:border-studio-200 hover:bg-studio-50/50"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="text-xs font-bold text-studio-900 truncate">
                        {np.name}
                      </span>
                      {isSelected ? (
                        <Check className="w-3.5 h-3.5 text-studio-800 shrink-0" />
                      ) : (
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-studio-100 text-studio-600 shrink-0">
                          {np.styleGroup}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 mb-1">
                      {np.colors.map((c, idx) => (
                        <span
                          key={idx}
                          className="w-4 h-4 rounded-full border border-black/10 shadow-xs"
                          style={{ backgroundColor: c }}
                          title={c}
                        />
                      ))}
                    </div>
                    {np.tags && np.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {np.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="text-[9px] text-studio-500 bg-studio-50 px-1.5 py-0.5 rounded-md truncate max-w-full"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-studio-800 block mb-2">
              Nhóm Màu Cơ Bản
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {basePalettes.map((bp) => {
                const isSelected =
                  config.palette === bp.id && !selectedNamedPaletteId;
                const swatches =
                  bp.id === "Custom" &&
                  config.customPaletteColors &&
                  config.customPaletteColors.length > 0
                    ? config.customPaletteColors
                    : BASE_PALETTE_SWATCHES[bp.id] || BASE_PALETTE_SWATCHES.Pastel;
                return (
                  <button
                    key={bp.id}
                    type="button"
                    onClick={() => {
                      onSelectNamedPalette("");
                      onChange({
                        ...config,
                        palette: bp.id,
                        namedPaletteId: undefined,
                        customPaletteColors: swatches,
                      });
                    }}
                    className={`p-2 rounded-xl border text-center transition-all flex flex-col items-center gap-1 ${
                      isSelected
                        ? "border-studio-800 font-bold bg-studio-100 ring-2 ring-studio-400/30"
                        : "border-studio-100 bg-white hover:bg-studio-50"
                    }`}
                  >
                    <span className="text-[11px] text-studio-800 block truncate">
                      {bp.label}
                    </span>
                    <div className="flex items-center justify-center gap-0.5">
                      {swatches.slice(0, 4).map((hex, i) => (
                        <span
                          key={i}
                          className="w-2.5 h-2.5 rounded-full border border-black/10"
                          style={{ backgroundColor: hex }}
                        />
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* MỤC 3: KHÔNG KHÍ (MOOD & AMBIENT LIGHTING + COMPLEMENTARY SHADOW SUB-TONES) */}
      {activeTab === "atmosphere" && (
        <div className="space-y-4">
          {/* Tâm trạng */}
          <div>
            <label className="text-xs font-bold text-studio-800 block mb-1.5">
              Tâm Trạng &amp; Cảm Xúc
            </label>
            <div className="flex flex-wrap gap-1.5">
              {moods.map((m) => {
                const isSelected = config.mood === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => onChange({ ...config, mood: m.id })}
                    className={`px-3 py-1 rounded-xl text-xs font-medium transition-all ${
                      isSelected
                        ? "bg-studio-800 text-white font-semibold shadow-xs"
                        : "bg-studio-50 text-studio-600 hover:bg-studio-100 hover:text-studio-900"
                    }`}
                  >
                    {m.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Ánh sáng */}
          <div>
            <label className="text-xs font-bold text-studio-800 block mb-1.5">
              Ánh Sáng &amp; Chiều Sâu 3D
            </label>
            <div className="flex flex-wrap gap-1.5">
              {lightings.map((l) => {
                const isSelected = config.lighting === l.id;
                return (
                  <button
                    key={l.id}
                    type="button"
                    onClick={() => onChange({ ...config, lighting: l.id })}
                    className={`px-3 py-1 rounded-xl text-xs font-medium transition-all ${
                      isSelected
                        ? "bg-studio-800 text-white font-semibold shadow-xs"
                        : "bg-studio-50 text-studio-600 hover:bg-studio-100 hover:text-studio-900"
                    }`}
                  >
                    {l.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Chế độ phối màu */}
          <div>
            <label className="text-xs font-bold text-studio-800 block mb-1.5">
              Chế Độ Phối Màu Nghệ Thuật
            </label>
            <div className="grid grid-cols-2 gap-2">
              {colorModes.map((cm) => {
                const isSelected = config.colorMode === cm.id;
                return (
                  <button
                    key={cm.id}
                    type="button"
                    onClick={() => onChange({ ...config, colorMode: cm.id })}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      isSelected
                        ? "border-studio-700 bg-pastel-pink/25 ring-1 ring-studio-400/30 font-semibold"
                        : "border-studio-100 bg-white hover:bg-studio-50"
                    }`}
                  >
                    <span className="text-xs font-bold text-studio-900 block">
                      {cm.label}
                    </span>
                    <span className="text-[10px] text-studio-500 block mt-0.5 leading-snug">
                      {cm.desc}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Khung Hiển Thị Ánh Sáng Môi Trường & Bóng Đổ Bổ Túc Trầm (Ambient Lighting & Shadow Sub-tones) */}
          <div className="p-3 rounded-2xl bg-studio-50 border border-studio-200/80 space-y-2.5 text-[11px]">
            <div className="font-bold text-studio-900 flex items-center gap-1.5">
              <Sun className="w-3.5 h-3.5 text-studio-700" />
              Ánh Sáng Môi Trường &amp; Bóng Đổ Bổ Túc Trầm (Không Dùng Xám Bẹt)
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="p-2 rounded-xl bg-white border border-studio-100 flex items-center gap-2">
                <span
                  className="w-6 h-6 rounded-xl border border-black/10 shrink-0 shadow-xs"
                  style={{ backgroundColor: goldenPreview.lightingTones.highlightHex }}
                />
                <div className="min-w-0">
                  <span className="text-[10px] font-bold text-studio-800 block truncate">
                    Vùng Sáng (Highlight)
                  </span>
                  <span className="text-[9px] text-studio-500 block truncate">
                    {goldenPreview.lightingTones.highlightLabel} ({goldenPreview.lightingTones.highlightHex})
                  </span>
                </div>
              </div>

              <div className="p-2 rounded-xl bg-white border border-studio-100 flex items-center gap-2">
                <span
                  className="w-6 h-6 rounded-xl border border-black/10 shrink-0 shadow-xs"
                  style={{ backgroundColor: goldenPreview.lightingTones.shadowHex }}
                />
                <div className="min-w-0">
                  <span className="text-[10px] font-bold text-studio-800 block truncate">
                    Vùng Tối (Shadow Bổ Túc)
                  </span>
                  <span className="text-[9px] text-studio-500 block truncate">
                    {goldenPreview.lightingTones.shadowLabel} ({goldenPreview.lightingTones.shadowHex})
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-1 border-t border-studio-200/60 space-y-1 text-[10px] text-studio-600">
              <p>
                • <strong>{activeMoodObj.label}:</strong> {activeMoodObj.effectDesc}
              </p>
              <p>
                • <strong>{activeLightingObj.label}:</strong>{" "}
                {activeLightingObj.effectDesc}
              </p>
              <p>
                • <strong>{activeColorModeObj.label}:</strong>{" "}
                {activeColorModeObj.desc}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* MỤC 4: HƯỚNG DẪN TÔ MÀU RIÊNG & TỰ ĐỘNG HÓA PROMPT KỸ THUẬT */}
      {activeTab === "custom" && (
        <div className="space-y-3.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-studio-800 flex items-center gap-1.5">
              <PenTool className="w-3.5 h-3.5 text-studio-500" />
              Hướng Dẫn Theo Vùng &amp; Tự Động Hóa Prompt
            </label>
            <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-semibold">
              Nhận diện Tiếng Việt
            </span>
          </div>

          {/* 1. Các Mẫu Gợi Ý (Prompt Templates) Tiếng Việt Rõ Ràng Theo Từng Vùng */}
          <div className="p-3 rounded-2xl bg-studio-50 border border-studio-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-studio-800 flex items-center gap-1">
                <Wand2 className="w-3.5 h-3.5 text-studio-600" />
                Mẫu Gợi Ý Tiếng Việt Theo Chủ Đề (Nhấn để áp dụng):
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {vietnamesePromptTemplates.map((tpl, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() =>
                    onChange({
                      ...config,
                      customInstruction: tpl.prompt,
                    })
                  }
                  className="p-2 rounded-xl bg-white hover:bg-pastel-pink/20 border border-studio-100 hover:border-studio-300 text-left transition-all group"
                >
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-[11px] font-bold text-studio-900 group-hover:text-studio-800">
                      {tpl.title}
                    </span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-studio-50 text-studio-500 font-medium">
                      {tpl.tag}
                    </span>
                  </div>
                  <p className="text-[10px] text-studio-500 line-clamp-2 leading-snug">
                    &ldquo;{tpl.prompt}&rdquo;
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Ô nhập mô tả tiếng Việt chi tiết */}
          <div className="space-y-1.5">
            <textarea
              rows={3}
              value={config.customInstruction || ""}
              onChange={(e) =>
                onChange({ ...config, customInstruction: e.target.value })
              }
              placeholder="Mô tả màu sắc từng vùng bằng tiếng Việt (VD: Tô tóc màu vàng óng, da trắng hồng, mắt xanh ngọc, váy tím oải hương, hoa hồng đào, lá xanh matcha, giữ nền sáng)..."
              className="w-full px-3 py-2 text-xs rounded-2xl border border-studio-200 focus:outline-none focus:ring-2 focus:ring-studio-400 bg-white leading-relaxed resize-none"
            />

            {/* Thẻ bấm nhanh theo từng vùng (Tóc, Da, Mắt, Trang phục, Hoa, Nền) */}
            <div className="flex flex-wrap items-center gap-1">
              <span className="text-[10px] font-semibold text-studio-500 mr-1">
                + Thêm nhanh vùng:
              </span>
              {regionQuickTags.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() =>
                    onChange({
                      ...config,
                      customInstruction: config.customInstruction
                        ? `${config.customInstruction}, ${item.text}`
                        : `Tô ${item.text}`,
                    })
                  }
                  className="px-2 py-0.5 rounded-lg bg-studio-50 hover:bg-studio-100 text-[10px] text-studio-700 border border-studio-100 transition-all"
                >
                  <strong>{item.region}:</strong> {item.text}
                </button>
              ))}
              {config.customInstruction && (
                <button
                  type="button"
                  onClick={() =>
                    onChange({
                      ...config,
                      customInstruction: "",
                    })
                  }
                  className="px-2 py-0.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-[10px] text-rose-700 border border-rose-200 font-semibold"
                >
                  Xóa
                </button>
              )}
            </div>
          </div>

          {/* 3. Hiển thị kết quả nhận diện tiếng Việt trực tiếp */}
          {parsedVnPreview.summaryList.length > 0 && (
            <div className="p-2.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-1.5">
              <div className="text-[11px] font-bold text-emerald-800 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Đã nhận diện tự động ({parsedVnPreview.summaryList.length} vùng tô màu):
              </div>
              <div className="flex flex-wrap gap-1.5">
                {parsedVnPreview.summaryList.map((item, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded-lg bg-white text-emerald-800 border border-emerald-200 text-[10px] font-medium"
                  >
                    ✓ {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* 4. Khung Từ Khóa Kỹ Thuật (Style / Lighting / Golden Ratio) tự động gắn vào Prompt ẩn (Đã ẩn khỏi giao diện theo yêu cầu, vẫn hoạt động ngầm) */}
          <div className="hidden p-3 rounded-2xl bg-pastel-lavender/25 border border-studio-200/80 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-studio-800 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-studio-700" />
                Từ Khóa Kỹ Thuật AI Tự Động Bổ Sung Vào Prompt Ẩn:
              </span>
              <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full bg-white text-studio-600 border border-studio-200">
                Auto-Prompt
              </span>
            </div>
            <p className="text-[10px] text-studio-500 leading-snug">
              Khi bạn chọn <strong>Bảng Màu</strong> + <strong>Không Khí</strong>, hệ thống tự động nhúng các chỉ dẫn kỹ thuật sau vào Prompt gửi cho AI:
            </p>
            <div className="flex flex-wrap gap-1 pt-0.5">
              {autoTechKeywords.map((kw, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-lg bg-white/90 border border-studio-200/80 text-[9px] font-mono text-studio-700"
                >
                  {kw}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
