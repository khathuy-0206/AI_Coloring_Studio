import {
  ColoringStyle,
  BasePalette,
  MoodType,
  LightingType,
  ColorModeType,
  CustomGoldenRatioConfig,
  EffectSettings,
} from "@/types";
import { previewGoldenRatioSummary } from "./smart-coloring";

export const DEFAULT_EFFECT_SETTINGS: EffectSettings = {
  shadow_depth: 70,
  stippling_density: 40,
  white_highlights: 80,
  texture_lines: true,
};

export interface PromptBuilderInput {
  style: ColoringStyle;
  customStyle?: string;
  palette: BasePalette;
  namedPaletteName?: string;
  paletteColors?: string[];
  mood: MoodType;
  lighting: LightingType;
  colorMode: ColorModeType;
  customInstruction?: string;
  userRegionColors?: Record<number, string>;
  userObjectColors?: Record<string, string>;
  customGoldenRatio?: CustomGoldenRatioConfig;
  effectSettings?: EffectSettings;
  relabeledObjectsList?: string[];
}

export class ColoringPromptBuilder {
  /**
   * Builds the strict, high-fidelity prompt for AI Image generation / editing.
   * Enforces:
   * I. Universal Closed-Path Segmentation & Object Detection (Zero Color Bleed)
   * II. Interactive Golden Ratio (60-30-10 or Custom % Ratios + Group HEX Customization)
   * III. Strict 3-Tier Override Priority Matrix:
   *     1. Priority #1 (Highest - Region-Level Override `region_colors` - Chỉ vùng / Đa vùng)
   *     2. Priority #2 (Object-Level Override `object_colors` - Cả đối tượng & Re-Labeling)
   *     3. Priority #3 (Golden Ratio 60-30-10 & Context-Aware Palette Rules)
   */
  public static buildPrompt(input: PromptBuilderInput): string {
    const styleDescription = this.getStyleDescription(
      input.style,
      input.customStyle
    );
    const paletteDescription = this.getPaletteDescription(
      input.palette,
      input.namedPaletteName,
      input.paletteColors
    );
    const moodDescription = this.getMoodDescription(input.mood);
    const lightingDescription = this.getLightingDescription(input.lighting);
    const modeDescription = this.getColorModeDescription(input.colorMode);
    const techKeywords = this.getTechnicalKeywordsSummary(input);
    const effectDirectives = this.getEffectSettingsDirectives(
      input.effectSettings
    );

    const golden = previewGoldenRatioSummary({
      paletteColors: input.paletteColors,
      basePalette: input.palette,
      style: input.style,
      mood: input.mood,
      lighting: input.lighting,
      colorMode: input.colorMode,
      customGoldenRatio: input.customGoldenRatio,
    });

    const hasUserRegionColors =
      input.userRegionColors && Object.keys(input.userRegionColors).length > 0;
    const userRegionColorsJson = hasUserRegionColors
      ? JSON.stringify(input.userRegionColors)
      : "{}";

    const hasUserObjectColors =
      input.userObjectColors && Object.keys(input.userObjectColors).length > 0;
    const userObjectColorsJson = hasUserObjectColors
      ? JSON.stringify(input.userObjectColors)
      : "{}";

    const formattedRelabeledList =
      input.relabeledObjectsList && input.relabeledObjectsList.length > 0
        ? `[${input.relabeledObjectsList.join(", ")}]`
        : hasUserObjectColors
        ? `[${Object.entries(input.userObjectColors!)
            .map(([k, v]) => `${k}: ${v}`)
            .join(", ")}]`
        : "[]";

    const domPct = golden.ratios.dominant;
    const secPct = golden.ratios.secondary;
    const accPct = golden.ratios.accent;

    const customGoldenRatioJson = JSON.stringify({
      ratios: `${domPct}% - ${secPct}% - ${accPct}%`,
      dominantColors: golden.dominant60,
      secondaryColors: golden.secondary30,
      accentColors: golden.accent10,
      skinToneHex: golden.skinTones.base,
    });

    const promptSegments: string[] = [
      "TASK: Professional Alcohol-Marker (Coco Wyo / Ohuhu style) colorization of an existing black-and-white line-art illustration using the Hard-Mask & Closed-Path Flood-Fill Rendering Pipeline.",
      "HARD-MASK & FLOOD-FILL RENDERING PIPELINE (CƠ CHẾ KHÓA BIÊN & TÔ VÙNG KHÉP KÍN): (1) LAYER ISOLATION (Tách biệt Lớp Line-Art): Tách lớp nét vẽ mực đen gốc thành lớp mặt nạ độc lập (Alpha Channel / Multiply Mask) nằm trên cùng, tuyệt đối không làm mờ hay tô đè lên đường nét gốc; (2) CLOSED-PATH CONTOUR FLOOD-FILL (Nhận diện Vùng Khép Kín): Nhận diện các vùng contour khép kín giữa các đường nét đen và đổ màu (Flood-Fill) chính xác vào từng contour thuộc về đối tượng (Zero Color Bleeding); (3) BOUNDARY BLEED PREVENTION (Chống Chồng Lấn Ranh Giới): Kiểm tra biên nét (Edge Detection) giữa các đối tượng đứng sát nhau (như tuyết và tường, hòm thư và nhân vật, nhân vật và nền) để ngăn màu sắc thấm qua ranh giới sang đối tượng kế bên.",
      ...(hasUserObjectColors ||
      (input.relabeledObjectsList && input.relabeledObjectsList.length > 0)
        ? [
            `GHI ĐÈ TÊN ĐỐI TƯỢNG (STRICT RE-LABELING RULE): Người dùng đã hiệu chỉnh lại danh sách nhận diện đối tượng thành: ${formattedRelabeledList}. AI bắt buộc phải định vị đối tượng theo mô tả chi tiết mới này và phủ chính xác mã màu được gán, không được dùng kết quả nhận diện tự động ban đầu.`,
          ]
        : []),
      `MODULE III - OVERRIDE PRIORITY MATRIX (MA TRẬN THỨ TỰ ƯU TIÊN GHI ĐÈ MÀU SẮC):`,
      `1. ƯU TIÊN 1 - CAO NHẤT (CHỈ VÙNG / ĐA VÙNG - region_colors = ${userRegionColorsJson}): Nếu người dùng đã chỉ định đổi màu cho các vùng ID cụ thể (chọn đơn vùng hoặc chọn đa vùng đồng loạt), màu của "Chỉ vùng" này GHI ĐÈ TUYỆT ĐỐI lên toàn bộ đối tượng chứa nó.`,
      `2. ƯU TIÊN 2 (CẢ ĐỐI TƯỢNG - object_colors = ${userObjectColorsJson}): Với các vùng không nằm trong region_colors, áp dụng màu tùy chỉnh của "Cả đối tượng"${
        input.customInstruction?.trim()
          ? ` và chỉ dẫn "${input.customInstruction.trim()}"`
          : ""
      }.`,
      `3. ƯU TIÊN 3 (GOLDEN RATIO ${domPct}%-${secPct}%-${accPct}% & PALETTE RULES - ${paletteDescription}): Các vùng còn lại được tô tự động theo hệ thống Golden Ratio (custom_golden_ratio = ${customGoldenRatioJson}): Nhóm ${domPct}% Chủ đạo (${golden.dominant60.join(", ")}); Nhóm ${secPct}% Phụ (${golden.secondary30.join(", ")}); Nhóm ${accPct}% Nhấn (${golden.accent10.join(", ")}) và sắc da ${golden.skinTones.base}.`,
      `ATMOSPHERE & LIGHTING (${input.mood} / ${input.lighting} / ${modeDescription} / ${styleDescription}): ${moodDescription}. ${lightingDescription}. Highlights: ${golden.lightingTones.highlightHex} (${golden.lightingTones.highlightLabel}). Clean marker shadows: ${golden.lightingTones.shadowHex} (${golden.lightingTones.shadowLabel}).`,
      `STEP-BY-STEP MARKER & TEXTURE RENDERING DIRECTIVES (KỸ THUẬT TÔ MÀU CHUYÊN SÂU THEO TỪNG BƯỚC): ${this.getStepByStepMarkerDirectives(input.style)} (1) MULTI-LAYER SHADING (Đổ bóng nhiều lớp): Tự động tạo lớp bóng tối sâu (Darker tone shadows & multi-layer alcohol marker shading) cho các nếp gấp, vùng giao cắt hoặc vùng khuất sáng để tạo khối 3D rõ nét; (2) WHITE GEL PEN HIGHLIGHTS (Đánh sáng bằng bút Gel trắng): Tự động thêm các đốm sáng hình ngôi sao (starburst sparkles), chấm sáng đôi hoặc vệt sáng trắng (White gel pen highlights) tại các điểm giao nhau, viền đón sáng và đỉnh khối 3D giúp bức tranh sống động, rực rỡ; (3) TEXTURE DOTS / STIPPLING (Kết cấu chấm hạt & Vân bút Marker): Phủ lớp hạt texture nhẹ nhàng (stippling dots, micro-fur strokes, flowing wave lines, hoặc botanical leaf veins tùy theo phong cách "${input.style}") lên bề mặt vật thể giống hệt kỹ thuật tô màu bút marker thủ công trên giấy.`,
      `ADVANCED EFFECT CUSTOMIZATION DIRECTIVES (THÔNG SỐ TÙY CHỈNH HIỆU ỨNG NGƯỜI DÙNG): ${effectDirectives}`,
      `MAGIC TWILIGHT & GLOW RENDERING ENGINE (ÁNH SÁNG ĐÊM HUYỀN BÍ & ĐỔ BÓNG ĐA SẮC NGHỆ THUẬT): (1) MONOCHROMATIC DEPTH & AMBIENT LIGHTING OVERLAY (Phối màu có chiều sâu & Ánh sáng môi trường đồng bộ): Phủ lớp ánh sáng môi trường đồng bộ theo tâm trạng (${input.mood} / ${input.lighting}) để mọi vật thể hòa chung vào một không gian thống nhất; (2) GLOW & BUBBLE HIGHLIGHT FX (Hiệu ứng phát sáng & Bọt nước/Ánh sao): Các chi tiết bong bóng, bọt nước, đèn, cửa sổ, ánh sao có tâm sáng trắng/vàng nhạt ở giữa, viền phản quang đa sắc và quầng sáng mờ (soft radial aura) hồng/tím/vàng tỏa ra xung quanh kèm Rim Highlight trên bề mặt đón sáng; (3) MULTI-TONE SHADING & SMOOTH GRADIENTS (Đổ bóng đa sắc & Chuyển màu Ohuhu Marker): Mỗi vùng được blend chuyển sắc mượt mà từ vùng đón sáng -> màu trung gian -> màu phụ liền kề -> vùng tối kèm bóng đổ 3D mềm mại (Soft Ambient Occlusion) tạo khối nổi bật.`,
      `TECHNICAL ART DIRECTION KEYWORDS: ${techKeywords.join(", ")}.`,
    ];

    return promptSegments.join(" ");
  }

  /**
   * Generates explicit AI prompt directives from the user's Effect Customization Panel sliders & toggles:
   * effect_settings = { shadow_depth, stippling_density, white_highlights, texture_lines }
   */
  public static getEffectSettingsDirectives(
    effectSettings?: EffectSettings
  ): string {
    const eff = effectSettings || DEFAULT_EFFECT_SETTINGS;
    const shadowDepth = Math.max(0, Math.min(100, eff.shadow_depth ?? 70));
    const stipplingDensity = Math.max(
      0,
      Math.min(100, eff.stippling_density ?? 40)
    );
    const whiteHighlights = Math.max(
      0,
      Math.min(100, eff.white_highlights ?? 80)
    );
    const textureLines = eff.texture_lines ?? true;

    const shadowDirective =
      shadowDepth >= 65
        ? `Apply deep contrast shading and darker marker sub-tones (shadow_depth=${shadowDepth}%): multi-layer alcohol marker crease shadows and crisp 3D volumetric contrast.`
        : shadowDepth <= 25
        ? `Apply soft, gentle low-contrast shading with delicate pastel sub-tones (shadow_depth=${shadowDepth}%).`
        : `Apply balanced medium-depth alcohol marker shading and smooth 3D transitions (shadow_depth=${shadowDepth}%).`;

    const stipplingDirective =
      stipplingDensity <= 0
        ? `Disable stippling texture dots (stippling_density=0%): keep marker washes completely smooth.`
        : stipplingDensity >= 65
        ? `Apply dense, rich pointillist marker stippling texture dots across shadow and mid-tone transitions (stippling_density=${stipplingDensity}%).`
        : `Apply subtle handcrafted marker stippling texture dots for organic paper grain (stippling_density=${stipplingDensity}%).`;

    const highlightDirective =
      whiteHighlights <= 0
        ? `Disable white gel pen highlights (white_highlights=0%).`
        : whiteHighlights >= 65
        ? `Add prominent sparkling white gel pen highlights on top edges and intersection points, including 4-point star sparkles and glossy rim dashes (white_highlights=${whiteHighlights}%).`
        : `Add delicate white gel pen specular accents on focal top edges (white_highlights=${whiteHighlights}%).`;

    const textureLinesDirective = textureLines
      ? `Enable detailed surface texture lines (texture_lines=true): render fine fur tufts, flowing wave ribbons, or botanical leaf/petal veins.`
      : `Disable detailed surface texture lines (texture_lines=false): omit fur stripes, wave lines, and leaf veins for a clean smooth finish.`;

    return `effect_settings = ${JSON.stringify({
      shadow_depth: shadowDepth,
      stippling_density: stipplingDensity,
      white_highlights: whiteHighlights,
      texture_lines: textureLines,
    })} -> (1) ${shadowDirective} (2) ${stipplingDirective} (3) ${highlightDirective} (4) ${textureLinesDirective}`;
  }

  /**
   * Returns specialized Step-by-Step Marker & Texture rendering directives for the selected style.
   */
  public static getStepByStepMarkerDirectives(style: ColoringStyle): string {
    switch (style) {
      case "Frosty Stippling":
        return "[PRESET: Frosty Stippling / Chấm hạt mịn] Apply Step 1 Base flat marker wash -> Step 2 Multi-layer darker tone shading in recesses -> Step 3 Dense-to-sparse fine Texture Dots / Stippling for porous frosty/foam/snowy tactile transitions -> Step 4 Crisp White Gel Pen Highlights (star sparkles & micro-dots on top peaks).";
      case "Cozy Marker & Fur":
        return "[PRESET: Cozy Marker & Fur / Bút dạ lông & Đổ bóng khối] Apply Step 1 Warm marker underpainting -> Step 2 Bold 3D Multi-layer Shading with distinct light/dark volumetric blocks -> Step 3 Directional short fur tufts, striped marker strokes & tactile Texture Dots / Stippling -> Step 4 Glossy White Gel Pen Highlights along rim edges, eyes & contours.";
      case "Water/Flowing Gradient":
        return "[PRESET: Water/Flowing Gradient / Dòng chảy uốn lượn] Apply Step 1 Smooth aquatic/sky gradient base -> Step 2 Multi-layer Shading along wave troughs and cloud undersides -> Step 3 Flowing S-curve wave lines, current ribbons & mist Texture Dots / Stippling -> Step 4 Shimmering White Gel Pen Highlights on water crests, ripples & droplets.";
      case "Botanical Layered":
        return "[PRESET: Botanical Layered / Hoa lá chi tiết] Apply Step 1 Organic botanical base wash -> Step 2 Multi-layer Shading from petal/leaf base outward -> Step 3 Fine dark-toned leaf veins, petal striations & pollen Texture Dots / Stippling -> Step 4 Dewy White Gel Pen Highlights on leaf tips, vein intersections & flower edges.";
      default:
        return "[STANDARD MARKER & TEXTURE PIPELINE] Combine smooth alcohol-marker base layers with Multi-layer Shading in folds, subtle Texture Dots / Stippling for handcrafted paper feel, and crisp White Gel Pen Highlights on focal peaks.";
    }
  }

  /**
   * Automatically generates technical Style, Lighting, Golden Ratio, and Shadow Sub-tone keywords
   * based on the user's selected Style + Palette + Mood + Lighting + ColorMode.
   * Displayed in Tab 4 ("4. Hướng Dẫn") and embedded into the AI hidden prompt.
   */
  public static getTechnicalKeywordsSummary(input: PromptBuilderInput): string[] {
    const golden = previewGoldenRatioSummary({
      paletteColors: input.paletteColors,
      basePalette: input.palette,
      style: input.style,
      mood: input.mood,
      lighting: input.lighting,
      colorMode: input.colorMode,
      customGoldenRatio: input.customGoldenRatio,
    });

    const styleKwMap: Record<ColoringStyle, string[]> = {
      "Frosty Stippling": [
        "Frosty Stippling / Chấm hạt mịn",
        "porous pointillist stipple dot gradient",
        "Multi-layer Shading in recesses",
        "White Gel Pen Highlights & star sparkles",
        "Texture Dots / Stippling handcrafted marker grain",
      ],
      "Cozy Marker & Fur": [
        "Cozy Marker & Fur / Bút dạ lông & Đổ bóng khối",
        "directional fur tuft & stripe strokes",
        "bold 3D Multi-layer Shading blocks",
        "White Gel Pen Highlights on rims & peaks",
        "Texture Dots / Stippling plush felt finish",
      ],
      "Water/Flowing Gradient": [
        "Water/Flowing Gradient / Dòng chảy uốn lượn",
        "smooth S-curve flowing wave & cloud ribbons",
        "aquatic Multi-layer Shading depth",
        "White Gel Pen Highlights on wave crests & droplets",
        "Texture Dots / Stippling mist spray",
      ],
      "Botanical Layered": [
        "Botanical Layered / Hoa lá chi tiết",
        "fine dark-toned leaf veins & petal striations",
        "botanical Multi-layer Shading from stem to tip",
        "White Gel Pen Highlights on dewy edges",
        "Texture Dots / Stippling pollen details",
      ],
      Cute: ["soft rounded 3D volume", "storybook gouache finish", "rosy blush"],
      Kawaii: ["glossy kawaii cel-soft shading", "candy pastel bounce light", "sparkle eye highlights"],
      Pastel: ["velvety milky pastel gradient", "low-contrast airy diffusion", "creamy paper grain"],
      Cozy: ["warm hygge ambient occlusion", "soft felt & wool tactile shading", "hearthside glow"],
      Anime: ["crisp anime cel-shading", "subsurface scattering terminator", "luminous specular rim light"],
      Vintage: ["nostalgic editorial wash", "warm antique parchment undertone", "engraved shadow depth"],
      Fantasy: ["bioluminescent magical rim light", "iridescent fairy glow", "ethereal volumetric haze"],
      Watercolor: ["organic cold-press watercolor bloom", "pigment edge pooling", "translucent glazing layers"],
      Custom: [input.customStyle?.trim() || "bespoke artistic illustration shading"],
    };

    const moodKwMap: Record<MoodType, string[]> = {
      Cute: ["sweet peach-pink warmth", "cheerful luminance"],
      Cozy: ["snug amber color temperature", "comforting soft shadows"],
      Warm: ["golden honey radiance", "sun-baked warmth"],
      Dreamy: ["soft-focus lavender mist", "ethereal floating atmosphere"],
      Magical: ["enchanted chroma shift", "floating light particles"],
      Peaceful: ["serene morning mist balance", "tranquil tonal harmony"],
      Vibrant: ["+35% rich chroma vibrancy", "high dynamic contrast"],
      Nostalgic: ["vintage film color grading", "sepia-rose memory warmth"],
    };

    const lightingKwMap: Record<LightingType, string[]> = {
      Daylight: [`zenithal sun highlight (${golden.lightingTones.highlightHex})`, `cool violet-blue complementary shadow (${golden.lightingTones.shadowHex})`],
      "Soft light": [`diffused studio key light (${golden.lightingTones.highlightHex})`, `velvety complementary occlusion (${golden.lightingTones.shadowHex})`],
      Sunset: [`diagonal warm peach-gold rim light (${golden.lightingTones.highlightHex})`, `deep twilight plum cast shadow (${golden.lightingTones.shadowHex})`],
      "Golden hour": [`raking amber-gold sunbeams (${golden.lightingTones.highlightHex})`, `rich indigo-violet complementary shadow (${golden.lightingTones.shadowHex})`],
      "Warm indoor": [`radial cozy tungsten lamp glow (${golden.lightingTones.highlightHex})`, `deep warm aubergine shadow (${golden.lightingTones.shadowHex})`],
      Night: [`nocturnal pink-violet magic glow (${golden.lightingTones.highlightHex})`, `midnight abyssal blue-indigo shadow (${golden.lightingTones.shadowHex})`],
      Moonlight: [`overhead silvery-violet moonbeam rim (${golden.lightingTones.highlightHex})`, `mystic night-indigo complementary shadow (${golden.lightingTones.shadowHex})`],
    };

    return [
      `Golden Ratio ${golden.ratios.dominant}-${golden.ratios.secondary}-${golden.ratios.accent} (${golden.colorWheelRule})`,
      ...(styleKwMap[input.style] || []),
      ...(moodKwMap[input.mood] || []),
      ...(lightingKwMap[input.lighting] || []),
      "Multi-layer Shading (darker tone fold shadows)",
      "White Gel Pen Highlights (starburst & rim speculars)",
      "Texture Dots / Stippling (handcrafted marker grain)",
      "Ohuhu multi-tone gradient blending",
      "iridescent bubble & starlight radial glow aura",
      "closed-path zero bleed",
    ];
  }

  private static getStyleDescription(
    style: ColoringStyle,
    customStyle?: string
  ): string {
    switch (style) {
      case "Frosty Stippling":
        return "Frosty Stippling / Chấm hạt mịn: porous stipple-dot texture transitions, multi-layer darker tone shadow depth in folds, and crisp white gel pen sparkle highlights";
      case "Cozy Marker & Fur":
        return "Cozy Marker & Fur / Bút dạ lông & Đổ bóng khối: distinct 3D light-and-shadow volumetric blocks, directional short fur/stripe marker strokes, multi-layer crease shading, and glossy white gel pen highlights";
      case "Water/Flowing Gradient":
        return "Water/Flowing Gradient / Dòng chảy uốn lượn: smooth S-curve flowing wave and cloud currents, multi-layer depth shading, and shimmering white gel pen ripple highlights";
      case "Botanical Layered":
        return "Botanical Layered / Hoa lá chi tiết: intricate dark-toned leaf veins and petal striations, multi-layer botanical shading, stippled pollen centers, and dewy white gel pen edge highlights";
      case "Cute":
        return "Cute, charming storybook coloring, rounded 3D soft volume, friendly and adorable aesthetic";
      case "Kawaii":
        return "Japanese kawaii aesthetic, pastel candy tones, blushing cheeks, ultra-sweet and cheerful vibe";
      case "Pastel":
        return "Soft milky pastel palette, muted cream undertones, gentle low-saturation tones, dreamy look";
      case "Cozy":
        return "Warm hygge cozy vibe, soothing earthy and warm tones, comforting interior feel";
      case "Anime":
        return "Modern high-quality anime cel-shading, subsurface scattering skin, vibrant crisp shadows, expressive color gradients";
      case "Vintage":
        return "Vintage retro storybook palette, nostalgic faded paper warmth, classic storybook tones";
      case "Fantasy":
        return "Whimsical fantasy glow, luminous magical accents, subtle iridescent highlights";
      case "Watercolor":
        return "Gentle watercolor wash texture, delicate pigment bleed inside outlines, organic soft blending";
      case "Custom":
        return customStyle?.trim() || "Artistic stylized custom coloring";
      default:
        return "Harmonious artistic coloring";
    }
  }

  private static getPaletteDescription(
    palette: BasePalette,
    namedPaletteName?: string,
    colors?: string[]
  ): string {
    const colorHexList =
      colors && colors.length > 0 ? ` (tones: ${colors.join(", ")})` : "";
    const nameExtra = namedPaletteName ? ` inspired by '${namedPaletteName}'` : "";

    switch (palette) {
      case "Pink":
        return `Soft romantic pinks, cherry blossom rose, baby blush, and peach accents${colorHexList}${nameExtra}`;
      case "Purple":
        return `Dreamy lavender, soft lilac, muted violet, and amethyst pastel hues${colorHexList}${nameExtra}`;
      case "Blue":
        return `Tranquil ocean blue, baby blue, powder cyan, and gentle sky tints${colorHexList}${nameExtra}`;
      case "Green":
        return `Refreshing sage green, mint, soft matcha, and lush botanical tones${colorHexList}${nameExtra}`;
      case "Warm":
        return `Honey butter, warm peach, soft terracotta, and cozy golden hues${colorHexList}${nameExtra}`;
      case "Cool":
        return `Tranquil cool tones, baby cyan, mint frost, seafoam, and misty sky tints${colorHexList}${nameExtra}`;
      case "Vintage":
        return `Nostalgic retro tones, warm terracotta, sepia cream, muted moss, and antique parchment${colorHexList}${nameExtra}`;
      case "Pastel":
        return `Multi-tone soothing pastel rainbow, milky mint, blush, buttercup, and lavender${colorHexList}${nameExtra}`;
      case "Neutral":
        return `Muted warm grays, oat milk, soft taupe, beige, and creamy ivory${colorHexList}${nameExtra}`;
      case "Custom":
        return colors && colors.length > 0
          ? `Custom color theme utilizing ${colors.join(", ")}`
          : "Artistic custom balanced color palette";
      default:
        return "Balanced pastel aesthetic colors";
    }
  }

  private static getMoodDescription(mood: MoodType): string {
    switch (mood) {
      case "Cute":
        return "Delightful, cheerful, heartwarming and lovable with rosy peach-blush warmth";
      case "Cozy":
        return "Warm, peaceful, snug, restful and relaxing with honey-amber undertones";
      case "Warm":
        return "Cozy, glowing, comforting, hearth-like warm atmosphere";
      case "Dreamy":
        return "Ethereal, whimsical, floating, soft-focus lavender-rose fantasy feeling";
      case "Magical":
        return "Enchanted, sparkling, mysterious and radiant with luminous chroma shifts";
      case "Peaceful":
        return "Calm, serene, tranquil, meditative and quiet with soft morning mist balance";
      case "Vibrant":
        return "Lively, energetic, joyful with vivid visual pop and +35% chroma saturation";
      case "Nostalgic":
        return "Sentimental, retro warmth, timeless sepia-parchment memory ambiance";
      default:
        return "Peaceful and charming";
    }
  }

  private static getLightingDescription(lighting: LightingType): string {
    switch (lighting) {
      case "Daylight":
        return "Clear natural morning sunlight from above, crisp warm highlights and cool violet-blue complementary shadows";
      case "Soft light":
        return "Diffused gentle ambient light, smooth spherical volume gradients, soft complementary ambient occlusion";
      case "Sunset":
        return "Warm orange-gold diagonal rim light, romantic dusk twilight glow with deep plum-violet cast shadows";
      case "Golden hour":
        return "Rich amber-gold raking sunbeams, sun-kissed highlights, and deep indigo-violet complementary shadows";
      case "Warm indoor":
        return "Cozy warm lamp lighting radiating from center, gentle candlelight glow, deep warm plum-brown shadows";
      case "Night":
        return "Nocturnal ambiance with cool cyan-silver key light and deep midnight indigo shadows";
      case "Moonlight":
        return "Cool silver-blue moonlight highlights from above with tranquil mystic indigo-violet nighttime shadows";
      default:
        return "Balanced soft natural light with complementary shadows";
    }
  }

  private static getColorModeDescription(mode: ColorModeType): string {
    switch (mode) {
      case "ai_harmony":
        return "Golden Ratio 60-30-10 Color Wheel harmony (60% Dominant Palette, 30% Split-Complementary/Triadic Secondary, 10% Complementary Focal Accent + Natural Calibrated Skin)";
      case "strict_palette":
        return "Strictly lock all primary and secondary regions to the chosen palette while preserving 60-30-10 tonal hierarchy";
      case "dominant_accent":
        return "Strong 70% focus on the lead dominant hue balanced by 20% secondary tones and 10% vibrant complementary accents";
      case "artistic_contrast":
        return "High-contrast Complementary & Split-Complementary interplay between foreground characters and background environment";
      default:
        return "Balanced Golden Ratio 60-30-10 harmonious color mode";
    }
  }
}
