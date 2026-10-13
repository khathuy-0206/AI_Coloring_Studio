/**
 * Dynamic Golden Ratio (60-30-10) Multi-Color Palette Engine & Semantic Line-Art Coloring
 * ---------------------------------------------------------------------------------------
 * 1. LIÊN KẾT ĐỘNG 100% (DYNAMIC BINDING):
 *    - Đọc trực tiếp mảng mã màu HEX từ Bảng màu người dùng đang chọn trên giao diện
 *      (Bảng màu đặc trưng, Nhóm màu cơ bản hoặc Bảng màu tự chọn).
 *    - Bảo toàn đặc tính sắc độ (Hue), độ bão hòa (Saturation) và độ sáng (Lightness) đa dạng
 *      của từng bảng màu (từ Pastel dịu, Thu ấm, Đêm huyền ảo đến Đa sắc rực rỡ).
 *
 * 2. PHÂN BỔ MÀU LINH HOẠT THEO TỶ LỆ VÀNG (60 - 30 - 10):
 *    - 60% (Màu chủ đạo - dominant60): Lấy trực tiếp các sắc độ chính đầu bảng màu người dùng chọn.
 *    - 30% (Màu phụ - secondary30): Lấy trực tiếp các màu đi kèm (companion colors) trong bảng màu đó để hỗ trợ chi tiết, hậu cảnh, cây cối, vật liệu.
 *    - 10% (Màu nhấn - accent10): Tự động tính toán màu tương phản động (Dynamic Complementary / Triadic / Split-Complementary)
 *      dựa trên chính bảng màu hiện tại, tuyệt đối không dùng cố định một màu tĩnh.
 *
 * 3. TÍCH HỢP CHẾ ĐỘ ĐA SẮC (MULTI-COLOR PALETTES) & NHẬN DIỆN VÙNG NGỮ NGHĨA:
 *    - Hỗ trợ các bảng màu đa sắc thái (Multi-hue / Multi-saturation), giúp mỗi lần đổi bảng màu
 *      hay phong cách sẽ tạo ra một phổ màu hoàn toàn mới mẻ trên toàn bộ bức tranh.
 *    - Giữ nguyên ranh giới đường nét (Zero Bleed), đồng nhất màu các cánh hoa trên cùng 1 bông hoa.
 */

import {
  ColoringStyle,
  BasePalette,
  MoodType,
  LightingType,
  ColorModeType,
  CustomGoldenRatioConfig,
  EffectSettings,
} from "@/types";

export interface DetectedObjectColorMapping {
  id: string;
  labelVi: string;
  keywordsVi: string[];
  category:
    | "main_character"
    | "secondary_character"
    | "nature_plant"
    | "object_item"
    | "background_wall_sky"
    | "background_floor_ground";
  box_2d: [number, number, number, number]; // [ymin, xmin, ymax, xmax] chuẩn 0..1000
  primaryHex: string;
  secondaryHex?: string;
  isUserOverride: boolean;
  matchedUserPhrase?: string;
}

export interface AISceneAnalysis {
  sceneSummaryVi: string;
  backgroundWallOrSkyHex: string;
  backgroundFloorOrGroundHex: string;
  objects: DetectedObjectColorMapping[];
}

export interface SmartColorOptions {
  paletteColors?: string[];
  basePalette?: BasePalette | string;
  style?: ColoringStyle | string;
  mood?: MoodType | string;
  lighting?: LightingType | string;
  colorMode?: ColorModeType | string;
  customInstruction?: string;
  aiSceneAnalysis?: AISceneAnalysis;
  /** Ưu tiên 1 (Cao nhất - region_colors): Màu của "Chỉ vùng" cụ thể (hoặc nhóm đa vùng). Ghi đè tuyệt đối lên đối tượng chứa nó. */
  userRegionColors?: Record<number, string>;
  /** Ưu tiên 2 (object_colors): Màu tùy chỉnh của "Cả đối tượng" theo tên đối tượng. */
  userObjectColors?: Record<string, string>;
  /** Ưu tiên 2 (object_colors): Bản đồ các vùng thuộc đối tượng đã tùy chỉnh màu "Cả đối tượng" (xếp sau userRegionColors). */
  userObjectRegionColors?: Record<number, string>;
  customGoldenRatio?: CustomGoldenRatioConfig;
  effectSettings?: EffectSettings;
  maxDimension?: number;
}

export interface InteractiveRegionMeta {
  id: number;
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
  cx: number; // 0..1
  cy: number; // 0..1
  size: number;
  role: string;
  roleLabelVi: string;
  colorHex: string;
  objectId?: string;
  objectLabelVi?: string;
  isRegionOverride?: boolean;
  isObjectOverride?: boolean;
}

export interface InteractiveSegmentationMap {
  width: number;
  height: number;
  labels: Int32Array;
  regions: InteractiveRegionMeta[];
}

export interface GoldenRatioPaletteSummary {
  ratios: {
    dominant: number;
    secondary: number;
    accent: number;
  };
  dominant60: string[]; // Nhóm Chủ đạo (mặc định 60%)
  secondary30: string[]; // Nhóm Màu phụ (mặc định 30%)
  accent10: string[]; // Nhóm Màu nhấn (mặc định 10%)
  skinTones: {
    base: string;
    undertone: string;
    shadowSubtone: string;
  };
  lightingTones: {
    highlightHex: string;
    highlightLabel: string;
    shadowHex: string;
    shadowLabel: string;
  };
  colorWheelRule: string;
  parsedVietnameseRules: string[];
}

export interface DetectedObjectBadgeItem {
  id: string;
  labelVi: string;
  primaryHex: string;
  isUserOverride: boolean;
}

export interface SmartColorResult {
  imageUrl: string;
  regionsDetected: number;
  width: number;
  height: number;
  interactiveMap?: InteractiveSegmentationMap;
  appliedSummary?: {
    goldenRatios?: {
      dominant: number;
      secondary: number;
      accent: number;
    };
    dominantColors: string[];
    auxiliaryColors: string[];
    accentColors: string[];
    skinToneHex: string;
    highlightToneHex: string;
    shadowSubtoneHex: string;
    colorWheelRule: string;
    parsedVietnameseRules: string[];
    detectedObjectsSummary?: string[];
    detectedObjects?: DetectedObjectBadgeItem[];
  };
}

interface RGB {
  r: number;
  g: number;
  b: number;
}

interface HSL {
  h: number; // 0..360
  s: number; // 0..1
  l: number; // 0..1
}

export type SemanticRole =
  | "outer_margin"
  | "main_character"
  | "secondary_character"
  | "object_item"
  | "floor_ground"
  | "sky"
  | "sun"
  | "sun_ray"
  | "cloud"
  | "bird"
  | "mountain"
  | "grass_ground"
  | "tree_canopy"
  | "tree_trunk"
  | "flower_center"
  | "flower_petal"
  | "flowers"
  | "leaves"
  | "background"
  | "skin"
  | "eye_white"
  | "eye_iris"
  | "lips"
  | "hair"
  | "wings"
  | "clothing"
  | "accent"
  | "general";

// ================= BẢNG MÀU CƠ BẢN MẶC ĐỊNH THEO NHÓM (ĐA SẮC & ĐẶC TRƯNG) =================
export const BASE_PALETTE_SWATCHES: Record<string, string[]> = {
  Pastel: ["#FF8FAB", "#B892FF", "#72EFDD", "#FFD166", "#A2D2FF"],
  Pink: ["#FF6B8B", "#FFA6C1", "#FFE5D9", "#C77DFF", "#FFD166"],
  Purple: ["#9D4EDD", "#C77DFF", "#E8D7F1", "#72EFDD", "#FF8FAB"],
  Blue: ["#4EA8DE", "#90E0EF", "#80ED99", "#CAF0F8", "#FFB703"],
  Green: ["#52B788", "#95D5B2", "#D8F3DC", "#FFD166", "#FF8FAB"],
  Warm: ["#E29578", "#F4A261", "#E9C46A", "#83C5BE", "#FFDDD2"],
  Cool: ["#48CAE4", "#90E0EF", "#B892FF", "#64DFDF", "#EDF6F9"],
  Vintage: ["#E07A5F", "#81B29A", "#F2CC8F", "#3D405B", "#F4F1DE"],
  Neutral: ["#D4A373", "#E6CCB2", "#DDBEA9", "#A3B18A", "#FAEDCD"],
  Retro: ["#D95D39", "#F0A202", "#4F6D5A", "#9E2A2B", "#F4F1DE"],
  Cyberpunk: ["#FF007F", "#00F5D4", "#7209B7", "#4CC9F0", "#1A103C"],
  Cinematic: ["#800F2F", "#457B9D", "#2B2D42", "#A8DADC", "#D4A373"],
  Boho: ["#CB6D51", "#606C38", "#84A98C", "#DDA15E", "#FEFAE0"],
  Luxury: ["#D4AF37", "#9B111E", "#007F5F", "#3C096C", "#F8F3E6"],
  Custom: ["#FF6B8B", "#FFD166", "#70D6FF", "#80ED99", "#B892FF"],
};

// ================= TIỆN ÍCH CHUYỂN ĐỔI MÀU SẮC (HSL / RGB) =================
function clampByte(n: number): number {
  return Math.min(255, Math.max(0, Math.round(n)));
}

export function hexToRgb(hex: string): RGB {
  let clean = hex.replace("#", "").trim();
  if (clean.length === 3) {
    clean = clean
      .split("")
      .map((c) => c + c)
      .join("");
  }
  const num = parseInt(clean, 16);
  if (isNaN(num)) {
    return { r: 255, g: 143, b: 171 };
  }
  return {
    r: (num >> 16) & 0xff,
    g: (num >> 8) & 0xff,
    b: num & 0xff,
  };
}

export function rgbToHex(rgb: RGB): string {
  const toHex = (v: number) =>
    clampByte(v).toString(16).padStart(2, "0").toUpperCase();
  return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`;
}

function rgbToHsl(rgb: RGB): HSL {
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h *= 60;
  }
  return { h, s, l };
}

function hslToRgb(hsl: HSL): RGB {
  let h = ((hsl.h % 360) + 360) % 360;
  const s = Math.max(0, Math.min(1, hsl.s));
  const l = Math.max(0, Math.min(1, hsl.l));

  if (s === 0) {
    const v = clampByte(l * 255);
    return { r: v, g: v, b: v };
  }

  h /= 360;
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;

  const hue2rgb = (t: number) => {
    let tt = t;
    if (tt < 0) tt += 1;
    if (tt > 1) tt -= 1;
    if (tt < 1 / 6) return p + (q - p) * 6 * tt;
    if (tt < 1 / 2) return q;
    if (tt < 2 / 3) return p + (q - p) * (2 / 3 - tt) * 6;
    return p;
  };

  return {
    r: clampByte(hue2rgb(h + 1 / 3) * 255),
    g: clampByte(hue2rgb(h) * 255),
    b: clampByte(hue2rgb(h - 1 / 3) * 255),
  };
}

function mixRgb(a: RGB, b: RGB, weightB: number): RGB {
  const wb = Math.max(0, Math.min(1, weightB));
  const wa = 1 - wb;
  return {
    r: clampByte(a.r * wa + b.r * wb),
    g: clampByte(a.g * wa + b.g * wb),
    b: clampByte(a.b * wa + b.b * wb),
  };
}

function getLuminance(rgb: RGB): number {
  return 0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b;
}

export function rotateHue(rgb: RGB, degrees: number): RGB {
  const hsl = rgbToHsl(rgb);
  return hslToRgb({
    h: (hsl.h + degrees + 360) % 360,
    s: hsl.s,
    l: hsl.l,
  });
}

/**
 * Điều chỉnh nhẹ màu theo Phong cách & Tâm trạng nhưng BẢO TOÀN ĐẶC TÍNH GỐC của mã HEX trong bảng màu
 * (Không ép cứng độ sáng/bão hòa làm mất chất riêng của bảng màu như Mùa Thu Ấm Áp hay Phép Thuật Nửa Đêm).
 */
function styleModulateColor(rgb: RGB, style: string, mood: string): RGB {
  const hsl = rgbToHsl(rgb);
  const styleNorm = style.toLowerCase();
  const moodNorm = mood.toLowerCase();

  let s = hsl.s;
  const l = hsl.l;

  if (moodNorm === "vibrant" || styleNorm.includes("anime") || styleNorm.includes("kawaii")) {
    s = Math.min(0.98, s * 1.12 + 0.02);
  } else if (styleNorm.includes("vintage") || moodNorm === "nostalgic") {
    s = Math.max(0.22, s * 0.92);
  }

  return hslToRgb({ h: hsl.h, s, l });
}

/**
 * Tính toán góc màu tương phản tối ưu (10% Accent Color) dựa trên toàn bộ các màu trong Bảng màu hiện tại:
 * Tìm sắc độ trên Vòng tròn màu (Bổ túc 180°, Bổ túc kép ±150°, Tam giác màu ±120°)
 * có khoảng cách góc xa nhất so với các màu sẵn có để tạo điểm nhấn nổi bật thực sự!
 */
function computeDynamicContrastAccents(
  paletteRgb: RGB[],
  colorMode: string
): { accents: RGB[]; ruleLabel: string } {
  const lead = paletteRgb[0] || { r: 226, g: 149, b: 120 };
  const second = paletteRgb[1 % paletteRgb.length] || lead;
  const leadHsl = rgbToHsl(lead);
  const secondHsl = rgbToHsl(second);

  // Độ bão hòa của màu nhấn luôn cao hơn hoặc tương đương màu chủ đạo để tạo điểm nhấn hút mắt
  const accentSat = Math.max(0.68, Math.min(0.94, leadHsl.s + 0.2));
  // Nếu bảng màu chủ đạo trầm/tối (VD: Phép Thuật Nửa Đêm #2B2D42), màu nhấn sẽ sáng rực (L=0.68).
  // Nếu bảng màu chủ đạo sáng nhẹ (VD: Pastel), màu nhấn sẽ đậm đà rõ nét (L=0.58).
  const avgLum =
    paletteRgb.reduce((acc, c) => acc + getLuminance(c), 0) /
    Math.max(1, paletteRgb.length);
  const accentLight = avgLum < 125 ? 0.7 : avgLum > 215 ? 0.58 : 0.62;

  const modeNorm = colorMode.toLowerCase();

  if (modeNorm === "strict_palette") {
    // Bám sát bảng màu: Điểm nhấn lấy từ màu rực rỡ nhất trong bảng màu + biến thể đậm sắc
    const mostVivid = [...paletteRgb].sort((a, b) => rgbToHsl(b).s - rgbToHsl(a).s)[0] || lead;
    const vividHsl = rgbToHsl(mostVivid);
    const acc1 = hslToRgb({
      h: vividHsl.h,
      s: Math.min(0.92, vividHsl.s + 0.18),
      l: Math.max(0.45, Math.min(0.68, vividHsl.l - 0.12)),
    });
    const acc2 = hslToRgb({
      h: (leadHsl.h + 35) % 360,
      s: accentSat,
      l: accentLight,
    });
    return {
      accents: [acc1, acc2],
      ruleLabel: "Tỷ Lệ 60-30-10 • Đồng Nhất Bảng Màu Đã Chọn",
    };
  }

  if (modeNorm === "dominant_accent") {
    // Tương phản Bổ túc trực tiếp 180° từ màu chủ đạo #1
    const comp180 = hslToRgb({
      h: (leadHsl.h + 180) % 360,
      s: accentSat,
      l: accentLight,
    });
    const split150 = hslToRgb({
      h: (leadHsl.h + 150) % 360,
      s: accentSat * 0.94,
      l: Math.min(0.75, accentLight + 0.06),
    });
    return {
      accents: [comp180, split150],
      ruleLabel: "Tỷ Lệ 60-30-10 • Bổ Túc Tương Phản 180° (Complementary)",
    };
  }

  if (modeNorm === "artistic_contrast") {
    // Tam giác màu (Triadic ±120°) từ màu chủ đạo
    const triad1 = hslToRgb({
      h: (leadHsl.h + 120) % 360,
      s: accentSat,
      l: accentLight,
    });
    const triad2 = hslToRgb({
      h: (leadHsl.h + 240) % 360,
      s: accentSat,
      l: Math.min(0.76, accentLight + 0.06),
    });
    return {
      accents: [triad1, triad2],
      ruleLabel: "Tỷ Lệ 60-30-10 • Tam Giác Màu Nghệ Thuật (Triadic 120°)",
    };
  }

  // Mặc định (ai_harmony): Tìm góc Bổ túc / Bổ túc kép có độ tương phản cao nhất với toàn bộ bảng màu hiện tại
  const existingHues = paletteRgb.map((c) => rgbToHsl(c).h);
  const candidateAngles = [
    (leadHsl.h + 180) % 360, // Complementary 180°
    (leadHsl.h + 150) % 360, // Split-Complementary +150°
    (leadHsl.h + 210) % 360, // Split-Complementary -150°
    (leadHsl.h + 120) % 360, // Triadic +120°
    (secondHsl.h + 180) % 360, // Complementary of Secondary
  ];

  // Chấm điểm từng góc ứng viên theo khoảng cách góc nhỏ nhất tới các màu đã có trong bảng màu
  const scoredAngles = candidateAngles.map((candH) => {
    let minDiff = 360;
    for (const eh of existingHues) {
      const diff = Math.abs(((candH - eh + 540) % 360) - 180);
      if (diff < minDiff) minDiff = diff;
    }
    return { hue: candH, score: minDiff };
  });

  scoredAngles.sort((a, b) => b.score - a.score);

  const bestHue1 = scoredAngles[0].hue;
  const bestHue2 =
    scoredAngles.find(
      (item) => Math.abs(((item.hue - bestHue1 + 540) % 360) - 180) > 28
    )?.hue || (bestHue1 + 60) % 360;

  const accent1 = hslToRgb({
    h: bestHue1,
    s: accentSat,
    l: accentLight,
  });
  const accent2 = hslToRgb({
    h: bestHue2,
    s: Math.max(0.65, accentSat * 0.92),
    l: Math.min(0.78, accentLight + 0.07),
  });

  return {
    accents: [accent1, accent2],
    ruleLabel:
      "Tỷ Lệ 60-30-10 • Liên Kết Động Bảng Màu & Bổ Túc Kép (Split-Complementary)",
  };
}

/**
 * Tính toán cấu hình Ánh sáng & Bóng đổ Bổ túc (Ambient Lighting & Shadow Sub-tones)
 * Thay đổi linh hoạt theo cả Bảng màu chủ đạo + Không khí (Mood & Lighting)
 */
export function computeAtmosphereLightingTones(
  lighting: string = "Soft light",
  mood: string = "Peaceful",
  primaryLead: RGB = { r: 226, g: 149, b: 120 }
): {
  lightDirX: number;
  lightDirY: number;
  highlightTint: RGB;
  highlightLabel: string;
  shadowSubtone: RGB;
  shadowLabel: string;
  ambientContrast: number;
  ambientOverlayTint: RGB;
  glowAuraColor: RGB;
  secondaryGlowAuraColor: RGB;
  ambientHarmonyWeight: number;
  isTwilightOrMagical: boolean;
} {
  const lightNorm = String(lighting).toLowerCase();
  const moodNorm = String(mood).toLowerCase();

  const leadHsl = rgbToHsl(primaryLead);
  // Bóng đổ bổ túc luôn được tính động từ sắc độ của Bảng màu hiện tại (+165° trên vòng tròn màu)
  const dynamicCompShadow = hslToRgb({
    h: (leadHsl.h + 165) % 360,
    s: Math.max(0.48, Math.min(0.78, leadHsl.s + 0.15)),
    l: 0.38,
  });
  // Ánh sáng highlight mặc định pha nhẹ sắc ấm của bảng màu hiện tại
  const dynamicWarmHighlight = mixRgb(
    { r: 255, g: 250, b: 232 },
    hslToRgb({ h: leadHsl.h, s: 0.75, l: 0.88 }),
    0.25
  );

  let lightDirX = 0.55;
  let lightDirY = 0.65;
  let highlightTint: RGB = dynamicWarmHighlight;
  let highlightLabel = "Sáng Dịu Theo Bảng Màu";
  let shadowSubtone: RGB = dynamicCompShadow;
  let shadowLabel = "Bóng Bổ Túc Động";
  let ambientContrast = 1.08;
  let ambientOverlayTint: RGB = mixRgb(primaryLead, dynamicWarmHighlight, 0.45);
  let glowAuraColor: RGB = { r: 255, g: 148, b: 222 };
  let secondaryGlowAuraColor: RGB = { r: 154, g: 140, b: 255 };
  let ambientHarmonyWeight = 0.14;
  let isTwilightOrMagical =
    moodNorm.includes("magical") ||
    moodNorm.includes("dreamy") ||
    moodNorm.includes("huyền bí") ||
    moodNorm.includes("mộng mơ") ||
    lightNorm === "night" ||
    lightNorm === "moonlight";

  if (lightNorm === "daylight") {
    lightDirX = 0.45;
    lightDirY = 0.75;
    highlightTint = mixRgb({ r: 255, g: 253, b: 235 }, dynamicWarmHighlight, 0.35);
    highlightLabel = "Nắng Sớm Ban Mai";
    shadowSubtone = mixRgb({ r: 96, g: 122, b: 198 }, dynamicCompShadow, 0.5);
    shadowLabel = "Lam Tím Bóng Râm";
    ambientContrast = 1.1;
    ambientOverlayTint = { r: 255, g: 245, b: 218 };
    glowAuraColor = { r: 255, g: 175, b: 215 };
    secondaryGlowAuraColor = { r: 138, g: 222, b: 255 };
    ambientHarmonyWeight = 0.12;
  } else if (lightNorm === "sunset") {
    lightDirX = 0.78;
    lightDirY = 0.45;
    highlightTint = { r: 255, g: 196, b: 142 };
    highlightLabel = "Cam Đào Hoàng Hôn";
    shadowSubtone = mixRgb({ r: 132, g: 64, b: 162 }, dynamicCompShadow, 0.35);
    shadowLabel = "Tím Chiều Tà";
    ambientContrast = 1.18;
    ambientOverlayTint = { r: 255, g: 176, b: 136 };
    glowAuraColor = { r: 255, g: 142, b: 204 };
    secondaryGlowAuraColor = { r: 255, g: 216, b: 122 };
    ambientHarmonyWeight = 0.2;
  } else if (lightNorm === "golden hour") {
    lightDirX = 0.74;
    lightDirY = 0.5;
    highlightTint = { r: 255, g: 224, b: 124 };
    highlightLabel = "Vàng Kim Giờ Vàng";
    shadowSubtone = mixRgb({ r: 148, g: 78, b: 146 }, dynamicCompShadow, 0.38);
    shadowLabel = "Tím Hổ Phách";
    ambientContrast = 1.18;
    ambientOverlayTint = { r: 255, g: 214, b: 138 };
    glowAuraColor = { r: 255, g: 168, b: 205 };
    secondaryGlowAuraColor = { r: 255, g: 232, b: 135 };
    ambientHarmonyWeight = 0.18;
  } else if (lightNorm === "warm indoor") {
    lightDirX = 0.4;
    lightDirY = 0.62;
    highlightTint = { r: 255, g: 220, b: 154 };
    highlightLabel = "Ánh Đèn Vàng Ấm";
    shadowSubtone = mixRgb({ r: 142, g: 78, b: 126 }, dynamicCompShadow, 0.42);
    shadowLabel = "Đỏ Rượu Ấm";
    ambientContrast = 1.14;
    ambientOverlayTint = { r: 255, g: 208, b: 158 };
    glowAuraColor = { r: 255, g: 176, b: 196 };
    secondaryGlowAuraColor = { r: 255, g: 226, b: 142 };
    ambientHarmonyWeight = 0.16;
  } else if (lightNorm === "night") {
    lightDirX = 0.28;
    lightDirY = 0.8;
    highlightTint = { r: 255, g: 168, b: 236 };
    highlightLabel = "Hồng Phấn Phát Sáng (Magic Glow)";
    shadowSubtone = mixRgb({ r: 38, g: 52, b: 138 }, dynamicCompShadow, 0.28);
    shadowLabel = "Chàm Tím Đêm Huyền Bí";
    ambientContrast = 1.24;
    ambientOverlayTint = { r: 102, g: 112, b: 228 };
    glowAuraColor = { r: 255, g: 126, b: 218 };
    secondaryGlowAuraColor = { r: 146, g: 136, b: 255 };
    ambientHarmonyWeight = 0.24;
    isTwilightOrMagical = true;
  } else if (lightNorm === "moonlight") {
    lightDirX = 0.22;
    lightDirY = 0.84;
    highlightTint = { r: 224, g: 212, b: 255 };
    highlightLabel = "Ánh Trăng Tím Bạc";
    shadowSubtone = mixRgb({ r: 62, g: 68, b: 164 }, dynamicCompShadow, 0.32);
    shadowLabel = "Chàm Tím Ánh Trăng";
    ambientContrast = 1.2;
    ambientOverlayTint = { r: 122, g: 128, b: 235 };
    glowAuraColor = { r: 255, g: 142, b: 226 };
    secondaryGlowAuraColor = { r: 152, g: 214, b: 255 };
    ambientHarmonyWeight = 0.22;
    isTwilightOrMagical = true;
  }

  if (
    moodNorm.includes("magical") ||
    moodNorm.includes("dreamy") ||
    moodNorm.includes("huyền bí")
  ) {
    highlightTint = mixRgb(highlightTint, { r: 255, g: 164, b: 232 }, 0.45);
    shadowSubtone = mixRgb(shadowSubtone, { r: 64, g: 58, b: 156 }, 0.45);
    ambientOverlayTint = mixRgb(ambientOverlayTint, { r: 128, g: 112, b: 238 }, 0.48);
    glowAuraColor = { r: 255, g: 124, b: 216 };
    secondaryGlowAuraColor = { r: 156, g: 136, b: 255 };
    ambientHarmonyWeight = Math.max(ambientHarmonyWeight, 0.22);
    ambientContrast = Math.max(ambientContrast, 1.2);
    isTwilightOrMagical = true;
  }

  if (moodNorm === "vibrant") {
    ambientContrast *= 1.12;
  }

  return {
    lightDirX,
    lightDirY,
    highlightTint,
    highlightLabel,
    shadowSubtone,
    shadowLabel,
    ambientContrast,
    ambientOverlayTint,
    glowAuraColor,
    secondaryGlowAuraColor,
    ambientHarmonyWeight,
    isTwilightOrMagical,
  };
}

/**
 * THUẬT TOÁN TỶ LỆ VÀNG 60 - 30 - 10 LIÊN KẾT ĐỘNG TRỰC TIẾP VỚI BẢNG MÀU NGƯỜI DÙNG CHỌN:
 * - 60% (dominant60): Lấy các mã màu chính từ Bảng màu đã chọn.
 * - 30% (secondary30): Lấy các mã màu đi kèm trong Bảng màu đó để hỗ trợ chi tiết & cảnh vật.
 * - 10% (accent10): Tự động tính toán màu tương phản dựa trên Bảng màu hiện tại.
 */
export function generateGoldenRatioColorSystem(options: {
  paletteColors?: string[];
  basePalette?: string;
  style?: string;
  mood?: string;
  lighting?: string;
  colorMode?: string;
  customGoldenRatio?: CustomGoldenRatioConfig;
}): {
  ratios: {
    dominant: number;
    secondary: number;
    accent: number;
  };
  fullPalette: RGB[];
  dominant60: RGB[];
  secondary30: RGB[];
  accent10: RGB[];
  backgroundTone: RGB;
  skinSystem: {
    base: RGB;
    undertone: RGB;
    subsurface: RGB;
    shadowSubtone: RGB;
  };
  lightingSystem: ReturnType<typeof computeAtmosphereLightingTones>;
  colorWheelRuleName: string;
} {
  const {
    paletteColors,
    basePalette = "Pastel",
    style = "Pastel",
    mood = "Peaceful",
    lighting = "Soft light",
    colorMode = "ai_harmony",
    customGoldenRatio,
  } = options;

  const rawRatios = customGoldenRatio?.ratios || {
    dominant: 60,
    secondary: 30,
    accent: 10,
  };
  const totalRatio = Math.max(
    1,
    (rawRatios.dominant || 60) +
      (rawRatios.secondary || 30) +
      (rawRatios.accent || 10)
  );
  const ratios = {
    dominant: Math.round(((rawRatios.dominant || 60) / totalRatio) * 100),
    secondary: Math.round(((rawRatios.secondary || 30) / totalRatio) * 100),
    accent: Math.max(
      1,
      100 -
        Math.round(((rawRatios.dominant || 60) / totalRatio) * 100) -
        Math.round(((rawRatios.secondary || 30) / totalRatio) * 100)
    ),
  };

  // 1. Đọc trực tiếp danh sách mã HEX từ Bảng màu người dùng đã chọn trên giao diện
  const rawHexList =
    paletteColors && paletteColors.length > 0
      ? paletteColors
      : BASE_PALETTE_SWATCHES[basePalette] || BASE_PALETTE_SWATCHES.Pastel;

  const fullPalette = rawHexList.map((hex) =>
    styleModulateColor(hexToRgb(hex), String(style), String(mood))
  );

  // Sắp xếp/phân loại thông minh từ chính Bảng màu người dùng chọn:
  // Các màu không quá trắng tinh (Luminance < 244) dùng cho chủ thể và chi tiết; màu sáng nhất dùng hỗ trợ nền
  const nonWhiteColors = fullPalette.filter((c) => getLuminance(c) < 242);
  const workingColors = nonWhiteColors.length >= 2 ? nonWhiteColors : fullPalette;

  // 2. PHÂN BỔ NHÓM MÀU CHỦ ĐẠO (DOMINANT - mặc định 60%):
  let dominant60: RGB[] = [];
  if (
    customGoldenRatio?.dominantColors &&
    customGoldenRatio.dominantColors.length > 0
  ) {
    dominant60 = customGoldenRatio.dominantColors.map(hexToRgb);
  } else {
    dominant60.push(workingColors[0]);
    if (workingColors.length >= 2) {
      dominant60.push(workingColors[1]);
    } else {
      dominant60.push(rotateHue(workingColors[0], 25));
    }
    if (workingColors.length >= 3) {
      dominant60.push(mixRgb(workingColors[0], workingColors[2], 0.35));
    } else {
      dominant60.push(
        mixRgb(workingColors[0], workingColors[1 % workingColors.length], 0.5)
      );
    }
  }

  // 3. PHÂN BỔ NHÓM MÀU PHỤ (SECONDARY - mặc định 30%):
  let secondary30: RGB[] = [];
  if (
    customGoldenRatio?.secondaryColors &&
    customGoldenRatio.secondaryColors.length > 0
  ) {
    secondary30 = customGoldenRatio.secondaryColors.map(hexToRgb);
  } else {
    if (workingColors.length >= 3) {
      for (let i = 2; i < workingColors.length; i++) {
        secondary30.push(workingColors[i]);
      }
    }
    if (fullPalette.length > workingColors.length) {
      const lightCompanion = fullPalette[fullPalette.length - 1];
      secondary30.push(mixRgb(lightCompanion, workingColors[0], 0.18));
    }
    while (secondary30.length < 3) {
      const refColor = workingColors[secondary30.length % workingColors.length];
      const refHsl = rgbToHsl(refColor);
      const angle = secondary30.length === 0 ? 150 : -120;
      secondary30.push(
        hslToRgb({
          h: (refHsl.h + angle + 360) % 360,
          s: Math.max(0.45, refHsl.s * 0.9),
          l: Math.max(0.48, Math.min(0.82, refHsl.l)),
        })
      );
    }
  }

  // 4. PHÂN BỔ NHÓM MÀU NHẤN (DYNAMIC ACCENT - mặc định 10%):
  const computedAccents = computeDynamicContrastAccents(
    workingColors,
    String(colorMode)
  );
  const accent10: RGB[] =
    customGoldenRatio?.accentColors && customGoldenRatio.accentColors.length > 0
      ? customGoldenRatio.accentColors.map(hexToRgb)
      : computedAccents.accents;

  const isCustomRatio =
    ratios.dominant !== 60 || ratios.secondary !== 30 || ratios.accent !== 10;
  const colorWheelRuleName = isCustomRatio
    ? `Tỷ Lệ Tùy Chỉnh ${ratios.dominant}-${ratios.secondary}-${ratios.accent} • Liên Kết Động Golden Ratio`
    : computedAccents.ruleLabel;

  // 5. MÀU NỀN / BẦU TRỜI (BACKGROUND TONE) ĐỒNG BỘ THEO BẢNG MÀU & ÁNH SÁNG:
  const lightestInPalette = [...fullPalette, ...secondary30].sort(
    (a, b) => getLuminance(b) - getLuminance(a)
  )[0];
  const lightNorm = String(lighting).toLowerCase();
  let backgroundTone = mixRgb(
    lightestInPalette,
    secondary30[0],
    getLuminance(lightestInPalette) > 235 ? 0.22 : 0.08
  );

  if (lightNorm === "night" || lightNorm === "moonlight") {
    const darkestInPalette = [...fullPalette].sort(
      (a, b) => getLuminance(a) - getLuminance(b)
    )[0];
    backgroundTone =
      getLuminance(darkestInPalette) < 120
        ? darkestInPalette
        : mixRgb(secondary30[0], { r: 44, g: 58, b: 128 }, 0.68);
  } else if (lightNorm === "sunset") {
    backgroundTone = mixRgb(backgroundTone, { r: 255, g: 204, b: 168 }, 0.42);
  } else if (lightNorm === "golden hour") {
    backgroundTone = mixRgb(backgroundTone, { r: 255, g: 232, b: 168 }, 0.4);
  }

  // 6. SẮC ĐỘ DA & UNDERTONE TỰ ĐỘNG HÀI HÒA VỚI BẢNG MÀU HIỆN TẠI (hoặc lấy từ customGoldenRatio):
  const lead1 = dominant60[0];
  const lead2 = secondary30[0];
  const isWarm = lead1.r >= lead1.b;
  const baseSkinRaw = isWarm
    ? { r: 255, g: 229, b: 212 }
    : { r: 254, g: 232, b: 225 };
  const skinBase: RGB = customGoldenRatio?.skinToneHex
    ? hexToRgb(customGoldenRatio.skinToneHex)
    : mixRgb(baseSkinRaw, lead1, 0.14);
  const skinUndertone: RGB = mixRgb(skinBase, lead2, 0.18);
  const skinSubsurface: RGB = mixRgb({ r: 255, g: 158, b: 162 }, accent10[0], 0.2);
  const skinShadowSubtone: RGB = mixRgb(
    { r: 208, g: 136, b: 142 },
    rotateHue(lead1, 160),
    0.25
  );

  const lightingSystem = computeAtmosphereLightingTones(lighting, mood, lead1);
  if (customGoldenRatio?.highlightToneHex) {
    lightingSystem.highlightTint = hexToRgb(customGoldenRatio.highlightToneHex);
  }
  if (customGoldenRatio?.shadowSubtoneHex) {
    lightingSystem.shadowSubtone = hexToRgb(customGoldenRatio.shadowSubtoneHex);
  }

  return {
    ratios,
    fullPalette,
    dominant60,
    secondary30,
    accent10,
    backgroundTone,
    skinSystem: {
      base: skinBase,
      undertone: skinUndertone,
      subsurface: skinSubsurface,
      shadowSubtone: skinShadowSubtone,
    },
    lightingSystem,
    colorWheelRuleName,
  };
}

export function previewGoldenRatioSummary(options: {
  paletteColors?: string[];
  basePalette?: string;
  style?: string;
  mood?: string;
  lighting?: string;
  colorMode?: string;
  customGoldenRatio?: CustomGoldenRatioConfig;
}): GoldenRatioPaletteSummary {
  const sys = generateGoldenRatioColorSystem(options);
  return {
    ratios: sys.ratios,
    dominant60: sys.dominant60.slice(0, 3).map(rgbToHex),
    secondary30: sys.secondary30.slice(0, 3).map(rgbToHex),
    accent10: sys.accent10.slice(0, 2).map(rgbToHex),
    skinTones: {
      base: rgbToHex(sys.skinSystem.base),
      undertone: rgbToHex(sys.skinSystem.undertone),
      shadowSubtone: rgbToHex(sys.skinSystem.shadowSubtone),
    },
    lightingTones: {
      highlightHex: rgbToHex(sys.lightingSystem.highlightTint),
      highlightLabel: sys.lightingSystem.highlightLabel,
      shadowHex: rgbToHex(sys.lightingSystem.shadowSubtone),
      shadowLabel: sys.lightingSystem.shadowLabel,
    },
    colorWheelRule: sys.colorWheelRuleName,
    parsedVietnameseRules: [],
  };
}

/**
 * Tạo bộ sắc độ Bút Dạ Nghệ Thuật Đa Sắc (Ohuhu Alcohol Marker Multi-Tone & Magic Glow):
 * - Kết hợp chuyển sắc mượt mà từ: Rim Highlight (Phản quang) -> Soft Highlight (Bắt sáng) -> Midtone (Màu gốc)
 *   -> Companion Gradient Tone (Tông chuyển đa sắc liền kề) -> Cell Shadow -> Deep Accent Shadow (Bóng sâu 3D).
 */
function buildCleanMarkerShading(
  base: RGB,
  highlightTint: RGB,
  shadowSubtone: RGB,
  contrastScale: number = 1.0
): {
  rimHighlight: RGB;
  softHighlight: RGB;
  midtone: RGB;
  companionGradientTone: RGB;
  cellShadow: RGB;
  deepAccentShadow: RGB;
} {
  const hsl = rgbToHsl(base);

  // Vùng bắt sáng mượt (Soft Highlight) pha ánh sáng môi trường / phát sáng
  const softHighlight = mixRgb(
    hslToRgb({
      h: (hsl.h - 10 + 360) % 360,
      s: Math.max(0.32, Math.min(0.95, hsl.s * 0.96)),
      l: Math.min(0.96, hsl.l + 0.14 * contrastScale),
    }),
    highlightTint,
    0.34
  );

  // Viền bắt sáng Bút Marker phản quang (Rim Highlight)
  const rimHighlight = mixRgb(softHighlight, { r: 255, g: 253, b: 248 }, 0.62);

  // Tông chuyển đa sắc (Companion Gradient Tone - phong cách Ohuhu Marker Blending 2–3 màu trong 1 vùng)
  const companionHueShift = hsl.h > 170 && hsl.h < 285 ? -26 : 24;
  const companionGradientTone = mixRgb(
    hslToRgb({
      h: (hsl.h + companionHueShift + 360) % 360,
      s: Math.min(0.96, Math.max(0.38, hsl.s + 0.08)),
      l: Math.max(0.24, Math.min(0.84, hsl.l - 0.05 * contrastScale)),
    }),
    highlightTint,
    0.16
  );

  // Bóng đổ Cell-Shading đa sắc: dịch sắc độ HSL sang tông trầm ấm/chàm tím và hòa quyện với shadowSubtone
  const shiftedShadowHsl: HSL = {
    h: (hsl.h + 15 + 360) % 360,
    s: Math.min(0.96, hsl.s + 0.14),
    l: Math.max(0.14, hsl.l - 0.16 * contrastScale),
  };
  const pureMarkerShadow = hslToRgb(shiftedShadowHsl);
  const cellShadow = mixRgb(pureMarkerShadow, shadowSubtone, 0.26);

  const deepAccentShadow = mixRgb(
    hslToRgb({
      h: (hsl.h + 24 + 360) % 360,
      s: Math.min(0.98, hsl.s + 0.18),
      l: Math.max(0.09, hsl.l - 0.24 * contrastScale),
    }),
    shadowSubtone,
    0.36
  );

  return {
    rimHighlight,
    softHighlight,
    midtone: base,
    companionGradientTone,
    cellShadow,
    deepAccentShadow,
  };
}

// ================= TỪ ĐIỂN & BỘ PHÂN TÍCH NGÔN NGỮ TIẾNG VIỆT (MỤC 4 - USER OVERRIDE) =================

export interface VietnameseColorRule {
  roles: SemanticRole[];
  targetKeywords: string[];
  colors: RGB[];
  colorHexes: string[];
  rawText: string;
}

const VIETNAMESE_COLOR_DICTIONARY: { keywords: string[]; hex: string }[] = [
  {
    keywords: [
      "xanh lá cây",
      "xanh lục đậm",
      "xanh lá tươi",
      "xanh lá",
      "xanh lục",
      "xanh cây",
    ],
    hex: "#40C057",
  },
  {
    keywords: ["xanh matcha", "matcha", "xanh cốm", "xanh non", "xanh lá nhạt"],
    hex: "#74C69D",
  },
  {
    keywords: ["xanh rêu", "rêu", "xanh cổ điển", "xanh olive", "xanh trầm"],
    hex: "#52B788",
  },
  {
    keywords: ["xanh ngọc", "ngọc bích", "xanh bạc hà", "bạc hà", "mint"],
    hex: "#64DFDF",
  },
  {
    keywords: [
      "xanh da trời",
      "xanh bầu trời",
      "xanh thiên thanh",
      "xanh dương nhạt",
      "xanh pastel",
    ],
    hex: "#90E0EF",
  },
  {
    keywords: ["xanh biển", "xanh đại dương", "xanh nước biển", "xanh lam"],
    hex: "#48CAE4",
  },
  {
    keywords: ["xanh đêm", "xanh đậm", "xanh navy", "xanh coban", "xanh dương"],
    hex: "#4EA8DE",
  },
  { keywords: ["xanh"], hex: "#4EA8DE" },

  { keywords: ["nâu hạt dẻ", "hạt dẻ", "nâu ấm"], hex: "#B07256" },
  { keywords: ["nâu socola", "nâu đậm", "nâu đất"], hex: "#8D5B4C" },
  {
    keywords: ["nâu vàng", "nâu trà", "nâu nhạt", "nâu sữa", "nâu gỗ", "màu gỗ"],
    hex: "#D4A373",
  },
  { keywords: ["nâu"], hex: "#BC8A5F" },

  {
    keywords: ["vàng óng", "vàng kim", "vàng hoàng kim", "vàng nắng", "vàng tươi"],
    hex: "#FFD166",
  },
  {
    keywords: ["vàng kem", "vàng bơ", "vàng nhạt", "vàng pastel", "vàng chanh"],
    hex: "#FFEE99",
  },
  { keywords: ["vàng cam", "vàng mật ong", "hổ phách"], hex: "#FFB703" },
  { keywords: ["vàng"], hex: "#FFD43B" },

  { keywords: ["hồng đào", "cánh đào", "đào"], hex: "#FF9EAA" },
  {
    keywords: ["hồng phấn", "hồng pastel", "hồng nhạt", "hồng sữa"],
    hex: "#FFB3C6",
  },
  {
    keywords: ["hồng cánh sen", "hồng đậm", "hồng tươi", "hồng dâu"],
    hex: "#FF5D8F",
  },
  { keywords: ["hồng đất", "hồng khô", "hồng trà"], hex: "#E5989B" },
  { keywords: ["hồng"], hex: "#FF8FAB" },

  { keywords: ["đỏ rượu", "đỏ trầm", "đỏ đô", "đỏ thẫm"], hex: "#D90429" },
  { keywords: ["đỏ cam", "san hô", "đỏ san hô"], hex: "#FF6B6B" },
  { keywords: ["đỏ tươi", "đỏ mọng", "đỏ dâu", "đỏ"], hex: "#FF4D6D" },

  { keywords: ["cam đào", "cam pastel", "cam sữa", "cam nhạt"], hex: "#FFCAD4" },
  { keywords: ["cam đất", "cam cháy", "cam trầm"], hex: "#E29578" },
  { keywords: ["cam tươi", "cam"], hex: "#FF9F1C" },

  {
    keywords: ["tím oải hương", "oải hương", "lavender", "tím pastel", "tím nhạt"],
    hex: "#C77DFF",
  },
  {
    keywords: ["tím khoai môn", "tím hồng", "tím mộng mơ", "tím lilac"],
    hex: "#B892FF",
  },
  { keywords: ["tím đậm", "tím than", "tím huyền"], hex: "#9D4EDD" },
  { keywords: ["tím"], hex: "#B57CFF" },

  {
    keywords: ["trắng hồng", "da tự nhiên", "da hồng hào", "hồng hào", "da người"],
    hex: "#FFE5D9",
  },
  { keywords: ["da ngăm", "da bánh mật", "da ấm"], hex: "#E6B89C" },
  { keywords: ["trắng sáng", "trắng tinh", "trắng trong", "trắng"], hex: "#FFFDF9" },
  { keywords: ["kem", "trắng ngà", "màu be", "be", "sữa"], hex: "#FFF3E0" },
  { keywords: ["xám", "bạc", "ghi"], hex: "#CBD5E1" },
  { keywords: ["đen", "huyền"], hex: "#4A5568" },
];

const VIETNAMESE_TARGET_KEYWORDS: { role: SemanticRole; words: string[] }[] = [
  {
    role: "main_character",
    words: [
      "nhân vật chính",
      "chủ thể chính",
      "chim cánh cụt",
      "cánh cụt",
      "khủng long",
      "cá sấu",
      "con cá sấu",
      "chú cá sấu",
      "hà mã",
      "con gấu",
      "chú gấu",
      "gấu",
      "con thỏ",
      "chú thỏ",
      "bạn thỏ",
      "thỏ",
      "con cáo",
      "cáo",
      "con chó",
      "chú cún",
      "bạn cún",
      "chó",
      "cún",
      "con rồng",
      "rồng",
      "nhân vật",
      "chủ thể",
      "cô gái",
      "chàng trai",
      "em bé",
      "người",
    ],
  },
  {
    role: "secondary_character",
    words: [
      "người tuyết",
      "chú chim nhỏ",
      "con chim nhỏ",
      "chim nhỏ",
      "vịt con",
      "con vịt",
      "chú vịt",
      "bạn vịt",
      "vịt",
      "mèo con",
      "con mèo",
      "chú mèo",
      "mèo",
      "sóc",
      "nhím",
      "ếch",
      "cú",
      "thú cưng",
    ],
  },
  {
    role: "object_item",
    words: [
      "hòm thư",
      "thùng thư",
      "bưu điện",
      "phong bì",
      "lá thư",
      "xe cắm trại",
      "xe van",
      "xe hơi",
      "ô tô",
      "xe",
      "lửa trại",
      "đống lửa",
      "ngọn lửa",
      "đèn lồng",
      "đèn bàn",
      "máy pha cà phê",
      "tách cà phê",
      "ly cà phê",
      "bánh kem",
      "gà quay",
      "tủ đồ",
      "tủ locker",
      "tủ sắt",
      "ba lô",
      "cặp sách",
      "hộp quà",
      "quà",
      "mái hiên",
      "cửa sổ",
      "cửa ra vào",
      "cửa",
      "bồn hoa",
      "máy giặt",
      "tủ lạnh",
      "lò vi sóng",
      "tivi",
      "đồng hồ",
      "bảng hiệu",
      "biển hiệu",
      "bảng",
      "bình nước giặt",
      "nước giặt",
      "chai",
      "bình",
      "lọ",
      "hộp",
      "giỏ đồ",
      "giỏ mây",
      "giỏ",
      "khăn xếp",
      "khăn",
      "ghế",
      "bàn",
      "điện thoại",
      "đồ chơi",
      "vật dụng",
      "máy",
    ],
  },
  { role: "hair", words: ["mái tóc", "bím tóc", "lọn tóc", "tóc", "bờm"] },
  {
    role: "skin",
    words: ["khuôn mặt", "gương mặt", "làn da", "da", "mặt", "cổ", "tay"],
  },
  { role: "eye_iris", words: ["đôi mắt", "màu mắt", "con ngươi", "mắt"] },
  { role: "lips", words: ["đôi môi", "son môi", "má hồng", "gò má", "môi"] },
  {
    role: "wings",
    words: ["cánh tiên", "đôi cánh", "cánh bướm", "áo choàng", "cánh"],
  },
  {
    role: "clothing",
    words: [
      "khăn choàng",
      "trang phục",
      "quần áo",
      "váy",
      "áo",
      "đầm",
      "quần",
      "mũ",
      "nón",
      "nơ",
      "lều",
      "giày",
      "dép",
      "ủng",
    ],
  },
  { role: "flower_center", words: ["nhụy hoa", "tâm hoa", "nhụy"] },
  {
    role: "flower_petal",
    words: ["hoa tulip", "bông hoa", "cánh hoa", "vòng hoa", "đóa hoa", "hoa"],
  },
  {
    role: "leaves",
    words: [
      "chậu cây",
      "lá cây",
      "tán lá",
      "nhành lá",
      "thảo mộc",
      "bụi cây",
      "dây leo",
      "vòng nguyệt quế",
      "lá",
      "cành",
    ],
  },
  {
    role: "tree_canopy",
    words: ["cây thông", "tán cây", "cây cối", "rừng", "cây"],
  },
  {
    role: "grass_ground",
    words: ["thảm cỏ", "bãi cỏ", "cỏ"],
  },
  {
    role: "floor_ground",
    words: [
      "lớp tuyết",
      "bãi tuyết",
      "nền tuyết",
      "tuyết phủ",
      "tuyết",
      "sàn nhà",
      "nền nhà",
      "mặt đất",
      "sàn",
      "thảm",
    ],
  },
  {
    role: "mountain",
    words: ["núi đồi", "ngọn núi", "núi", "đồi"],
  },
  {
    role: "sun",
    words: ["ông mặt trời", "mặt trời", "mặt trăng", "trăng", "ánh nắng", "nắng"],
  },
  {
    role: "cloud",
    words: ["đám mây", "mây"],
  },
  {
    role: "sky",
    words: [
      "phông nền",
      "bầu trời",
      "trời đêm",
      "khung cảnh",
      "hậu cảnh",
      "không gian",
      "vách tường",
      "bức tường",
      "tường gạch",
      "tường",
      "nền",
    ],
  },
  {
    role: "accent",
    words: [
      "ngôi sao",
      "trang sức",
      "vương miện",
      "trái tim",
      "quả dâu",
      "quả",
      "chi tiết",
      "chim",
      "bướm",
      "đèn",
    ],
  },
];

export function parseVietnameseInstructions(instruction?: string): {
  rules: VietnameseColorRule[];
  globalModifiers: {
    keepBrightBg: boolean;
    softDesaturated: boolean;
    vibrantBoost: boolean;
    extraColors: RGB[];
  };
  summaryList: string[];
} {
  const rules: VietnameseColorRule[] = [];
  const summaryList: string[] = [];
  const globalModifiers = {
    keepBrightBg: false,
    softDesaturated: false,
    vibrantBoost: false,
    extraColors: [] as RGB[],
  };

  if (!instruction || !instruction.trim()) {
    return { rules, globalModifiers, summaryList };
  }

  const normalized = instruction.toLowerCase().trim();

  if (
    normalized.includes("giữ nền trắng") ||
    normalized.includes("nền trắng sáng") ||
    normalized.includes("giữ nền sáng")
  ) {
    globalModifiers.keepBrightBg = true;
    summaryList.push("Giữ phông nền sáng nhẹ nhàng");
  }
  if (
    normalized.includes("hạn chế các màu quá bão hòa") ||
    normalized.includes("giữ êm dịu") ||
    normalized.includes("dịu nhẹ")
  ) {
    globalModifiers.softDesaturated = true;
    summaryList.push("Chế độ sắc thái êm dịu");
  }
  if (
    normalized.includes("tươi tắn") ||
    normalized.includes("rực rỡ") ||
    normalized.includes("nổi bật")
  ) {
    globalModifiers.vibrantBoost = true;
    summaryList.push("Tăng độ tươi tắn cho sắc màu");
  }

  // Sắp xếp tất cả cụm từ màu theo độ dài giảm dần để "xanh lá cây" luôn được bắt trọn trước "xanh lá" hoặc "xanh"
  const flatColorEntries: { kw: string; hex: string }[] = [];
  for (const entry of VIETNAMESE_COLOR_DICTIONARY) {
    for (const kw of entry.keywords) {
      flatColorEntries.push({ kw, hex: entry.hex });
    }
  }
  flatColorEntries.sort((a, b) => b.kw.length - a.kw.length);

  const clauses = normalized
    .split(/[,.;\n]+/)
    .map((s) => s.trim())
    .filter(Boolean);

  for (const clause of clauses) {
    // BƯỚC A: Trích xuất và gỡ bỏ cụm từ chỉ MÀU SẮC trước tiên
    // (Ngăn chặn triệt để lỗi từ "cây" nằm trong "xanh lá cây" bị nhận nhầm thành đối tượng cái cây!)
    const matchedColors: RGB[] = [];
    const matchedColorHexes: string[] = [];
    const matchedColorNames: string[] = [];
    let targetClause = ` ${clause} `;

    // Hỗ trợ cả mã HEX trực tiếp nếu người dùng gõ #RRGGBB
    const hexMatches = clause.match(/#[0-9a-fA-F]{6}/g);
    if (hexMatches) {
      for (const h of hexMatches) {
        matchedColors.push(hexToRgb(h));
        matchedColorHexes.push(h.toUpperCase());
        matchedColorNames.push(h.toUpperCase());
        targetClause = targetClause.replace(h, " ");
      }
    }

    for (const { kw, hex } of flatColorEntries) {
      if (targetClause.includes(kw)) {
        matchedColors.push(hexToRgb(kw === "xanh" ? "#4EA8DE" : hex));
        matchedColorHexes.push(hex);
        matchedColorNames.push(kw);
        // Xóa cụm màu (và từ "màu" đứng ngay trước nó) khỏi câu để chỉ còn lại tên đối tượng
        targetClause = targetClause
          .replace(new RegExp(`(màu\\s+)?${kw}`, "gi"), " ")
          .replace(/\s+/g, " ");
        break;
      }
    }

    // BƯỚC B: Nhận diện ĐỐI TƯỢNG MỤC TIÊU trên phần câu còn lại (targetClause)
    const matchedRoles: SemanticRole[] = [];
    const matchedTargetKeywords: string[] = [];

    for (const tk of VIETNAMESE_TARGET_KEYWORDS) {
      for (const w of tk.words) {
        const regex = new RegExp(`(^|\\s)${w}(\\s|$)`, "i");
        if (regex.test(targetClause)) {
          if (!matchedRoles.includes(tk.role)) {
            matchedRoles.push(tk.role);
          }
          if (!matchedTargetKeywords.includes(w)) {
            matchedTargetKeywords.push(w);
          }
          break;
        }
      }
    }

    // Nếu người dùng nhập tên một nhân vật/đồ vật bất kỳ chưa có trong từ điển tĩnh (VD: "hà mã", "robot", "xe hơi"...),
    // tự động trích xuất cụm danh từ đối tượng đó để khớp với danh sách đối tượng của Gemini Vision!
    const cleanedNoun = targetClause
      .replace(
        /\b(đổi|tô|chuyển|biến|cho|làm|thành|sang|với|là|màu|sắc|của|con|chú|chiếc|cái|bức|phần|vùng)\b/gi,
        " "
      )
      .replace(/\s+/g, " ")
      .trim();

    if (cleanedNoun && cleanedNoun.length >= 2) {
      if (!matchedTargetKeywords.includes(cleanedNoun)) {
        matchedTargetKeywords.push(cleanedNoun);
      }
      if (matchedRoles.length === 0) {
        matchedRoles.push("main_character");
      }
    }

    if (matchedRoles.length > 0 && matchedColors.length > 0) {
      rules.push({
        roles: matchedRoles,
        targetKeywords: matchedTargetKeywords,
        colors: matchedColors,
        colorHexes: matchedColorHexes,
        rawText: clause,
      });
      summaryList.push(
        `${matchedTargetKeywords[0] || clause} → ${matchedColorNames.join(", ")} (${matchedColorHexes[0]})`
      );
    } else if (matchedColors.length > 0) {
      globalModifiers.extraColors.push(...matchedColors);
    }
  }

  return { rules, globalModifiers, summaryList };
}

// ================= THUẬT TOÁN CHÍNH: LIÊN KẾT ĐỘNG 60-30-10 & NHẬN DIỆN ĐỐI TƯỢNG 3 BƯỚC =================

export async function smartColorLineArt(
  imageSource: string,
  options: SmartColorOptions = {}
): Promise<SmartColorResult> {
  const {
    paletteColors,
    basePalette = "Pastel",
    style = "Pastel",
    mood = "Peaceful",
    lighting = "Soft light",
    colorMode = "ai_harmony",
    customInstruction = "",
    aiSceneAnalysis,
    userObjectColors = {},
    customGoldenRatio,
    maxDimension = 1024,
  } = options;

  // 1. Tải ảnh gốc vào thẻ Image
  const img = new Image();
  img.crossOrigin = "anonymous";

  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = () => reject(new Error("Không thể tải hình ảnh tranh nét."));
    img.src = imageSource;
  });

  // 2. Tính toán kích thước canvas chuẩn hóa
  let w = img.naturalWidth || img.width || 800;
  let h = img.naturalHeight || img.height || 800;

  if (w > maxDimension || h > maxDimension) {
    if (w >= h) {
      h = Math.round((h * maxDimension) / w);
      w = maxDimension;
    } else {
      w = Math.round((w * maxDimension) / h);
      h = maxDimension;
    }
  }

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("Trình duyệt không hỗ trợ Canvas 2D context.");

  ctx.drawImage(img, 0, 0, w, h);
  const srcImageData = ctx.getImageData(0, 0, w, h);
  const srcData = srcImageData.data;

  const totalPixels = w * h;
  const isLine = new Uint8Array(totalPixels);
  const lumMap = new Uint8Array(totalPixels);
  // Lớp mặt nạ Line-Art độc lập (Alpha Channel / Multiply Mask 0..255) nằm trên cùng
  const lineArtAlphaMask = new Uint8Array(totalPixels);

  // 3. TÁCH BIỆT HOÀN TOÀN LỚP LINE-ART (LAYER ISOLATION) & PHÁT HIỆN BIÊN NÉT (SOBEL EDGE DETECTION)
  // Bước 3a: Tính độ sáng gốc (rawLum) cho từng điểm ảnh
  const rawLum = new Uint8Array(totalPixels);
  for (let i = 0; i < totalPixels; i++) {
    const idx = i * 4;
    const r = srcData[idx];
    const g = srcData[idx + 1];
    const b = srcData[idx + 2];
    const a = srcData[idx + 3];
    rawLum[i] = a < 40 ? 255 : Math.round(0.299 * r + 0.587 * g + 0.114 * b);
  }

  // Bước 3b: Quét cửa sổ 5x5 tìm độ tối cực tiểu cục bộ (localMinLum) & Gradient biên Sobel
  // để tách biệt 100% nét mực đen thật của tác giả khỏi các vết mờ/watermark chìm (VD: chữ mờ trên nền trắng)
  for (let y = 0; y < h; y++) {
    const row = y * w;
    const y0 = Math.max(0, y - 2);
    const y1 = Math.min(h - 1, y + 2);
    for (let x = 0; x < w; x++) {
      const idx = row + x;
      const lum = rawLum[idx];

      if (lum >= 224) {
        lumMap[idx] = 255;
        continue;
      }

      let minNeighborLum = lum;
      const x0 = Math.max(0, x - 2);
      const x1 = Math.min(w - 1, x + 2);
      for (let ny = y0; ny <= y1; ny++) {
        const nRow = ny * w;
        for (let nx = x0; nx <= x1; nx++) {
          const nl = rawLum[nRow + nx];
          if (nl < minNeighborLum) minNeighborLum = nl;
        }
      }

      // Nếu vùng lân cận 5x5 không hề có lõi mực đậm (minNeighborLum > 164) và điểm ảnh hiện tại > 175
      // -> Đây là watermark chìm hoặc nhiễu nền giấy, được làm sạch thành trắng tinh (255)
      if (minNeighborLum > 164 && lum > 175) {
        lumMap[idx] = 255;
        continue;
      }

      lumMap[idx] = lum;

      // Xây dựng rào cản biên nét khép kín (Hard Contour Barrier) cho Flood-Fill
      if (lum <= 194 && minNeighborLum <= 164) {
        isLine[idx] = 1;
      }

      // Xây dựng Mặt nạ Line-Art Độc Lập (Top-Layer Alpha / Multiply Mask):
      // - Lõi nét mực đen (lum <= 132): Khóa cứng Alpha = 255 (100% nét mực gốc sắc sảo)
      // - Viền chống răng cưa của nét mực (132 < lum <= 220): Alpha nội suy mượt mà để đặt đè lên lớp màu
      if (lum <= 132) {
        lineArtAlphaMask[idx] = 255;
      } else if (lum <= 220 && minNeighborLum <= 164) {
        const normAlpha = Math.pow((220 - lum) / 88, 1.12);
        lineArtAlphaMask[idx] = clampByte(normAlpha * 255);
      }
    }
  }

  // Bước 3c: Đóng khe hở vi mô 1-2px theo cả 4 phương (Ngang, Dọc, Chéo chính, Chéo phụ)
  // (8-Directional Morphological Gap Closing) để khóa chặt mọi vùng contour khép kín (Zero Color Bleeding)
  const closedLine = new Uint8Array(isLine);
  for (let y = 2; y < h - 2; y++) {
    const row = y * w;
    for (let x = 2; x < w - 2; x++) {
      const idx = row + x;
      if (isLine[idx] === 0) {
        if (
          (isLine[idx - 1] && isLine[idx + 1]) ||
          (isLine[idx - w] && isLine[idx + w]) ||
          (isLine[idx - w - 1] && isLine[idx + w + 1]) ||
          (isLine[idx - w + 1] && isLine[idx + w - 1]) ||
          (isLine[idx - 1] && isLine[idx + 2]) ||
          (isLine[idx - w] && isLine[idx + 2 * w]) ||
          (isLine[idx - w - 1] && isLine[idx + 2 * w + 2]) ||
          (isLine[idx - w + 1] && isLine[idx + 2 * w - 2])
        ) {
          closedLine[idx] = 1;
        }
      }
    }
  }

  // Bước 3d: Trường khoảng cách Chamfer 2 chiều (2D Distance Transform Field) tới ranh giới nét đen
  const distField = new Uint8Array(totalPixels);
  for (let i = 0; i < totalPixels; i++) {
    distField[i] = closedLine[i] ? 0 : 250;
  }
  for (let y = 1; y < h; y++) {
    const row = y * w;
    for (let x = 1; x < w - 1; x++) {
      const idx = row + x;
      let d = distField[idx];
      if (d === 0) continue;
      if (distField[idx - 1] + 3 < d) d = distField[idx - 1] + 3;
      if (distField[idx - w] + 3 < d) d = distField[idx - w] + 3;
      if (distField[idx - w - 1] + 4 < d) d = distField[idx - w - 1] + 4;
      if (distField[idx - w + 1] + 4 < d) d = distField[idx - w + 1] + 4;
      distField[idx] = d;
    }
  }
  for (let y = h - 2; y >= 0; y--) {
    const row = y * w;
    for (let x = w - 2; x >= 1; x--) {
      const idx = row + x;
      let d = distField[idx];
      if (d === 0) continue;
      if (distField[idx + 1] + 3 < d) d = distField[idx + 1] + 3;
      if (distField[idx + w] + 3 < d) d = distField[idx + w] + 3;
      if (distField[idx + w + 1] + 4 < d) d = distField[idx + w + 1] + 4;
      if (distField[idx + w - 1] + 4 < d) d = distField[idx + w - 1] + 4;
      distField[idx] = d;
    }
  }

  // 4. THUẬT TOÁN NHẬN DIỆN VÙNG KHÉP KÍN & FLOOD-FILL (CLOSED-PATH CONTOUR DETECTION)
  const labels = new Int32Array(totalPixels);
  for (let i = 0; i < totalPixels; i++) {
    if (closedLine[i]) {
      labels[i] = -1;
    }
  }

  interface RegionInfo {
    id: number;
    size: number;
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
    sumX: number;
    sumY: number;
    perimeter: number;
    touchesTop: boolean;
    touchesBottom: boolean;
    touchesLeft: boolean;
    touchesRight: boolean;
    touchesBorder: boolean;
    cx: number;
    cy: number;
    bw: number;
    bh: number;
    areaRatio: number;
    compactness: number;
    aspectRatio: number;
    circularity: number;
    role: SemanticRole;
    flowerGroupId: number;
    // Tập điểm mẫu bên trong vùng khép kín (chuẩn hóa 0..1000: yNorm * 10000 + xNorm)
    // giúp kiểm tra chính xác tỷ lệ pixel thực sự nằm trong khung đối tượng (chống lem sang vùng kế bên)
    samplePoints: number[];
  }

  const regions: RegionInfo[] = [];
  const bfsQueue = new Int32Array(totalPixels);
  let currentRegionId = 1;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = y * w + x;
      if (labels[idx] !== 0) continue;

      let head = 0;
      let tail = 0;
      bfsQueue[tail++] = idx;
      labels[idx] = currentRegionId;

      let size = 0;
      let perimeter = 0;
      let minX = x;
      let maxX = x;
      let minY = y;
      let maxY = y;
      let sumX = 0;
      let sumY = 0;
      let touchesTop = false;
      let touchesBottom = false;
      let touchesLeft = false;
      let touchesRight = false;

      while (head < tail) {
        const curr = bfsQueue[head++];
        const cx = curr % w;
        const cy = Math.floor(curr / w);

        size++;
        sumX += cx;
        sumY += cy;
        if (cx < minX) minX = cx;
        if (cx > maxX) maxX = cx;
        if (cy < minY) minY = cy;
        if (cy > maxY) maxY = cy;

        if (cy <= 2) touchesTop = true;
        if (cy >= h - 3) touchesBottom = true;
        if (cx <= 2) touchesLeft = true;
        if (cx >= w - 3) touchesRight = true;

        let isBoundaryPx = false;

        if (cx > 0) {
          const left = curr - 1;
          if (labels[left] === 0) {
            labels[left] = currentRegionId;
            bfsQueue[tail++] = left;
          } else if (labels[left] === -1) {
            isBoundaryPx = true;
          }
        }
        if (cx < w - 1) {
          const right = curr + 1;
          if (labels[right] === 0) {
            labels[right] = currentRegionId;
            bfsQueue[tail++] = right;
          } else if (labels[right] === -1) {
            isBoundaryPx = true;
          }
        }
        if (cy > 0) {
          const up = curr - w;
          if (labels[up] === 0) {
            labels[up] = currentRegionId;
            bfsQueue[tail++] = up;
          } else if (labels[up] === -1) {
            isBoundaryPx = true;
          }
        }
        if (cy < h - 1) {
          const down = curr + w;
          if (labels[down] === 0) {
            labels[down] = currentRegionId;
            bfsQueue[tail++] = down;
          } else if (labels[down] === -1) {
            isBoundaryPx = true;
          }
        }

        if (isBoundaryPx) perimeter++;
      }

      // Trích xuất tối đa 240 điểm mẫu phân bố đều bên trong vùng contour vừa duyệt trong bfsQueue[0..tail-1]
      const samplePoints: number[] = [];
      const sampleStride = Math.max(1, Math.floor(tail / 240));
      for (let sIdx = 0; sIdx < tail; sIdx += sampleStride) {
        const p = bfsQueue[sIdx];
        const px = Math.round(((p % w) / w) * 1000);
        const py = Math.round((Math.floor(p / w) / h) * 1000);
        samplePoints.push(py * 10000 + px);
      }

      const avgX = sumX / Math.max(1, size);
      const avgY = sumY / Math.max(1, size);
      const boxW = Math.max(1, maxX - minX + 1);
      const boxH = Math.max(1, maxY - minY + 1);
      const boxArea = boxW * boxH;
      const circularity =
        perimeter > 0
          ? Math.min(1, (4 * Math.PI * size) / (perimeter * perimeter))
          : 0;

      regions.push({
        id: currentRegionId,
        size,
        minX,
        maxX,
        minY,
        maxY,
        sumX,
        sumY,
        perimeter,
        touchesTop,
        touchesBottom,
        touchesLeft,
        touchesRight,
        touchesBorder: touchesTop || touchesBottom || touchesLeft || touchesRight,
        cx: avgX / w,
        cy: avgY / h,
        bw: boxW / w,
        bh: boxH / h,
        areaRatio: size / totalPixels,
        compactness: size / boxArea,
        aspectRatio: boxW / boxH,
        circularity,
        role: "general",
        flowerGroupId: 0,
        samplePoints,
      });

      currentRegionId++;
    }
  }

  // 4b. Lan truyền nhãn vùng dưới chân viền chống răng cưa (Sub-pixel Anti-aliased Edge Fill)
  // Chỉ lan truyền vào các điểm bán trong suốt (lineArtAlphaMask < 250) để màu sắc lấp khít tới sát lõi nét mực
  // mà KHÔNG BAO GIỜ vượt qua tâm đường nét đen sang vùng bên cạnh!
  const dilatedLabels = new Int32Array(labels);
  for (let pass = 0; pass < 3; pass++) {
    const prevLabels = new Int32Array(dilatedLabels);
    for (let y = 1; y < h - 1; y++) {
      const row = y * w;
      for (let x = 1; x < w - 1; x++) {
        const idx = row + x;
        if (prevLabels[idx] === -1 && lineArtAlphaMask[idx] < 252) {
          const n1 = prevLabels[idx - 1];
          const n2 = prevLabels[idx + 1];
          const n3 = prevLabels[idx - w];
          const n4 = prevLabels[idx + w];
          if (n1 > 0) dilatedLabels[idx] = n1;
          else if (n2 > 0) dilatedLabels[idx] = n2;
          else if (n3 > 0) dilatedLabels[idx] = n3;
          else if (n4 > 0) dilatedLabels[idx] = n4;
          else {
            const d1 = prevLabels[idx - w - 1];
            const d2 = prevLabels[idx - w + 1];
            const d3 = prevLabels[idx + w - 1];
            const d4 = prevLabels[idx + w + 1];
            if (d1 > 0) dilatedLabels[idx] = d1;
            else if (d2 > 0) dilatedLabels[idx] = d2;
            else if (d3 > 0) dilatedLabels[idx] = d3;
            else if (d4 > 0) dilatedLabels[idx] = d4;
          }
        }
      }
    }
  }

  // 4c. Xây dựng Đồ thị Kề cận Vùng (Region Adjacency Graph qua ranh giới nét đen)
  const numRegs = regions.length;
  const adjacency: Set<number>[] = Array.from(
    { length: numRegs + 1 },
    () => new Set<number>()
  );
  const stepScan = 2;
  const maxBridge = Math.max(4, Math.min(11, Math.round(Math.min(w, h) * 0.014)));

  for (let y = maxBridge; y < h - maxBridge; y += stepScan) {
    const row = y * w;
    for (let x = maxBridge; x < w - maxBridge; x += stepScan) {
      const idx = row + x;
      if (closedLine[idx] === 1) {
        const leftReg = labels[idx - maxBridge];
        const rightReg = labels[idx + maxBridge];
        if (leftReg > 0 && rightReg > 0 && leftReg !== rightReg) {
          adjacency[leftReg].add(rightReg);
          adjacency[rightReg].add(leftReg);
        }
        const upReg = labels[idx - maxBridge * w];
        const downReg = labels[idx + maxBridge * w];
        if (upReg > 0 && downReg > 0 && upReg !== downReg) {
          adjacency[upReg].add(downReg);
          adjacency[downReg].add(upReg);
        }
      }
    }
  }

  // ================= 5. BƯỚC 1: PHÂN TÍCH & NHẬN DIỆN ĐỐI TƯỢNG ĐỘNG (DYNAMIC ZERO-SHOT OBJECT DETECTION) =================

  // 5.0. NHẬN DIỆN LỀ GIẤY BÊN NGOÀI KHUNG VIỀN ĐEN CỦA TRANH (OUTER MARGIN ISOLATION)
  // Nhiều trang sách tô màu (như Bưu Điện Mùa Đông, Dọn Phòng Đón Đông, Xe Cắm Trại...) có khung viền đen bao quanh.
  // Tách biệt phần lề giấy trắng ngoài khung viền (`outer_margin`) để không tô lem màu nền ra ngoài lề giấy
  // và giúp định vị chính xác Tường/Bầu trời (cạnh trên khung) & Tuyết/Sàn nhà (cạnh dưới khung) bên trong khung tranh!
  const outerMarginIds = new Set<number>();
  for (const reg of regions) {
    if (!reg.touchesBorder) continue;
    const wrapsOppositeEdges =
      (reg.touchesTop && reg.touchesBottom) ||
      (reg.touchesLeft && reg.touchesRight);
    const wrapsCornerMargin =
      ((reg.touchesTop && (reg.touchesLeft || reg.touchesRight)) ||
        (reg.touchesBottom && (reg.touchesLeft || reg.touchesRight))) &&
      reg.compactness < 0.28;
    const isThinOuterStrip =
      (reg.touchesTop && reg.maxY < h * 0.095) ||
      (reg.touchesBottom && reg.minY > h * 0.905) ||
      (reg.touchesLeft && reg.maxX < w * 0.095) ||
      (reg.touchesRight && reg.minX > w * 0.905);

    if (wrapsOppositeEdges || wrapsCornerMargin || isThinOuterStrip) {
      reg.role = "outer_margin";
      outerMarginIds.add(reg.id);
    }
  }

  // Tính khung biên thực tế của bức tranh bên trong lề giấy (Inner Drawing Frame Bounds)
  let innerMinX = w;
  let innerMaxX = 0;
  let innerMinY = h;
  let innerMaxY = 0;
  for (const reg of regions) {
    if (reg.role === "outer_margin" || reg.areaRatio < 0.0004) continue;
    if (reg.minX < innerMinX) innerMinX = reg.minX;
    if (reg.maxX > innerMaxX) innerMaxX = reg.maxX;
    if (reg.minY < innerMinY) innerMinY = reg.minY;
    if (reg.maxY > innerMaxY) innerMaxY = reg.maxY;
  }
  if (innerMaxX <= innerMinX || innerMaxY <= innerMinY) {
    innerMinX = 0;
    innerMaxX = w;
    innerMinY = 0;
    innerMaxY = h;
  }
  const innerH = Math.max(1, innerMaxY - innerMinY);
  const innerW = Math.max(1, innerMaxX - innerMinX);

  // Các chi tiết chữ nhỏ nằm ngoài khung tranh (VD: chữ tên tác giả ở lề trên/dưới) cũng thuộc outer_margin
  for (const reg of regions) {
    if (reg.role === "outer_margin") continue;
    if (
      reg.maxY <= innerMinY + 4 ||
      reg.minY >= innerMaxY - 4 ||
      reg.maxX <= innerMinX + 4 ||
      reg.minX >= innerMaxX - 4
    ) {
      reg.role = "outer_margin";
      outerMarginIds.add(reg.id);
    }
  }

  // 5.1. Nhận diện BỐI CẢNH / NỀN BÊN TRONG KHUNG TRANH: TƯỜNG PHÒNG, BẦU TRỜI (SKY / WALL) & SÀN NHÀ, TUYẾT, MẶT ĐẤT (FLOOR / GROUND)
  const skyRegionIds = new Set<number>();
  const floorRegionIds = new Set<number>();

  for (const reg of regions) {
    if (reg.role !== "general") continue;
    // Các mảng tường sọc / tường phòng / bầu trời chạm cạnh trên của khung tranh
    if (
      reg.minY <= innerMinY + innerH * 0.055 &&
      reg.cy < 0.58 &&
      reg.areaRatio > 0.0065
    ) {
      reg.role = "sky";
      skyRegionIds.add(reg.id);
      continue;
    }
    // Sàn nhà / Mặt đất / Lớp tuyết phủ trải rộng ở cạnh dưới của khung tranh
    if (
      reg.maxY >= innerMaxY - innerH * 0.055 &&
      reg.cy > 0.62 &&
      (reg.maxX - reg.minX) > innerW * 0.22 &&
      reg.areaRatio > 0.009
    ) {
      reg.role = "floor_ground";
      floorRegionIds.add(reg.id);
    }
  }

  if (skyRegionIds.size === 0) {
    let bestSky: RegionInfo | null = null;
    for (const reg of regions) {
      if (
        reg.role === "general" &&
        reg.minY <= innerMinY + innerH * 0.12 &&
        reg.areaRatio > 0.02 &&
        reg.cy < 0.65
      ) {
        if (!bestSky || reg.size > bestSky.size) bestSky = reg;
      }
    }
    if (bestSky) {
      bestSky.role = "sky";
      skyRegionIds.add(bestSky.id);
    }
  }

  // 5.2. Nhận diện MẶT TRỜI (SUN) & TIA NẮNG (SUN_RAY)
  let detectedSun: RegionInfo | null = null;
  for (const reg of regions) {
    if (reg.role !== "general") continue;
    if (
      reg.cy < 0.42 &&
      reg.areaRatio >= 0.0012 &&
      reg.areaRatio <= 0.035 &&
      reg.compactness >= 0.48 &&
      reg.aspectRatio >= 0.62 &&
      reg.aspectRatio <= 1.55
    ) {
      const sunRadius = Math.max(reg.bw, reg.bh) * 0.5;
      const nearbyRays: RegionInfo[] = [];
      for (const cand of regions) {
        if (cand.id === reg.id || cand.role !== "general") continue;
        if (
          cand.areaRatio >= 0.00008 &&
          cand.areaRatio <= 0.0028 &&
          cand.compactness >= 0.35
        ) {
          const dist = Math.hypot(cand.cx - reg.cx, cand.cy - reg.cy);
          if (dist > sunRadius * 0.95 && dist < sunRadius * 3.1) {
            nearbyRays.push(cand);
          }
        }
      }
      if (nearbyRays.length >= 4) {
        detectedSun = reg;
        reg.role = "sun";
        for (const ray of nearbyRays) {
          ray.role = "sun_ray";
        }
        break;
      }
    }
  }

  // 5.3. Nhận diện CHIM BAY (BIRD) & ĐÁM MÂY (CLOUD)
  for (const reg of regions) {
    if (reg.role !== "general") continue;
    const touchesSky = Array.from(adjacency[reg.id]).some((nid) =>
      skyRegionIds.has(nid)
    );

    if (
      touchesSky &&
      reg.cy < 0.65 &&
      reg.areaRatio >= 0.00006 &&
      reg.areaRatio <= 0.0022 &&
      reg.aspectRatio >= 1.35 &&
      adjacency[reg.id].size <= 3
    ) {
      reg.role = "bird";
      continue;
    }

    if (
      touchesSky &&
      reg.cy < 0.46 &&
      reg.areaRatio >= 0.0035 &&
      reg.areaRatio <= 0.08 &&
      reg.aspectRatio >= 1.25 &&
      reg.minY < h * 0.35 &&
      !reg.touchesTop
    ) {
      reg.role = "cloud";
      continue;
    }
  }

  // 5.4. Nhận diện CÁC BÔNG HOA CHÍNH (FLOWER_CENTER & FLOWER_PETAL ĐỒNG NHẤT MÀU)
  let nextFlowerGroupId = 1;
  for (const reg of regions) {
    if (reg.role !== "general") continue;
    if (
      reg.areaRatio >= 0.0005 &&
      reg.areaRatio <= 0.018 &&
      reg.compactness >= 0.46 &&
      reg.aspectRatio >= 0.58 &&
      reg.aspectRatio <= 1.72
    ) {
      const neighborIds = Array.from(adjacency[reg.id]);
      const petalCandidates = neighborIds
        .map((nid) => regions[nid - 1])
        .filter(
          (nr) =>
            nr &&
            (nr.role === "general" || nr.role === "flower_petal") &&
            !nr.touchesTop &&
            nr.areaRatio >= 0.00035 &&
            nr.areaRatio <= 0.032 &&
            nr.areaRatio <= reg.areaRatio * 6.5 &&
            nr.areaRatio >= reg.areaRatio * 0.18
        );

      if (petalCandidates.length >= 4) {
        const quadrants = new Set<number>();
        for (const p of petalCandidates) {
          const angle = Math.atan2(p.cy - reg.cy, p.cx - reg.cx);
          const q = Math.floor(((angle + Math.PI) / (2 * Math.PI)) * 4) % 4;
          quadrants.add(q);
        }
        if (quadrants.size >= 3) {
          const groupId = nextFlowerGroupId++;
          reg.role = "flower_center";
          reg.flowerGroupId = groupId;
          for (const petal of petalCandidates) {
            petal.role = "flower_petal";
            petal.flowerGroupId = groupId;
          }
        }
      }
    }
  }

  // Mở rộng thêm cánh hoa lớp thứ 2 kề sát cụm hoa đã phát hiện
  for (let pass = 0; pass < 2; pass++) {
    for (const reg of regions) {
      if (reg.role !== "general") continue;
      if (reg.areaRatio < 0.00035 || reg.areaRatio > 0.025 || reg.touchesTop)
        continue;
      const neighborGroups = new Map<number, number>();
      for (const nid of Array.from(adjacency[reg.id])) {
        const nr = regions[nid - 1];
        if (nr && nr.role === "flower_petal" && nr.flowerGroupId > 0) {
          const distToPetal = Math.hypot(reg.cx - nr.cx, reg.cy - nr.cy);
          if (
            distToPetal < 0.14 &&
            reg.areaRatio >= nr.areaRatio * 0.35 &&
            reg.areaRatio <= nr.areaRatio * 2.4 &&
            reg.aspectRatio < 2.4
          ) {
            neighborGroups.set(
              nr.flowerGroupId,
              (neighborGroups.get(nr.flowerGroupId) || 0) + 1
            );
          }
        }
      }
      for (const [gid, count] of Array.from(neighborGroups.entries())) {
        if (count >= 2) {
          reg.role = "flower_petal";
          reg.flowerGroupId = gid;
          break;
        }
      }
    }
  }

  // 5.5. Nhận diện TÁN CÂY (TREE_CANOPY), THÂN CÂY (TREE_TRUNK) & CHẬU CÂY / LÁ CÂY (LEAVES)
  for (const reg of regions) {
    if (reg.role !== "general") continue;
    // Nhận diện thân cây cổ thụ dọc ở rìa trái/phải của tranh (VD: Cây cổ thụ bên trái tranh dã ngoại)
    const isTallSideTreeTrunk =
      (reg.minX < w * 0.24 || reg.maxX > w * 0.76) &&
      reg.minY < h * 0.28 &&
      reg.maxY > h * 0.45 &&
      reg.bh > reg.bw * 1.25 &&
      reg.areaRatio >= 0.008 &&
      reg.areaRatio <= 0.14;
    if (isTallSideTreeTrunk) {
      reg.role = "tree_trunk";
      continue;
    }

    if (
      reg.cy >= 0.2 &&
      reg.cy <= 0.68 &&
      reg.areaRatio >= 0.012 &&
      reg.areaRatio <= 0.14 &&
      !reg.touchesTop
    ) {
      let foundTrunkBelow: RegionInfo | null = null;
      for (const nid of Array.from(adjacency[reg.id])) {
        const nr = regions[nid - 1];
        if (
          nr &&
          nr.role === "general" &&
          nr.cy > reg.cy + 0.08 &&
          nr.bh > nr.bw * 1.35 &&
          nr.areaRatio >= 0.0018 &&
          nr.areaRatio <= 0.035 &&
          Math.abs(nr.cx - reg.cx) < 0.14
        ) {
          foundTrunkBelow = nr;
          break;
        }
      }
      if (foundTrunkBelow) {
        reg.role = "tree_canopy";
        foundTrunkBelow.role = "tree_trunk";
      }
    }
  }

  // Nhận diện cụm lá cây / chậu cây trong phòng (Cluster 3+ phiến lá kề nhau)
  for (const reg of regions) {
    if (reg.role !== "general") continue;
    if (
      reg.areaRatio >= 0.0005 &&
      reg.areaRatio <= 0.009 &&
      reg.cy > 0.45 &&
      reg.cx < 0.32 &&
      reg.compactness >= 0.32 &&
      reg.compactness <= 0.78
    ) {
      const leafNeighbors = Array.from(adjacency[reg.id])
        .map((nid) => regions[nid - 1])
        .filter(
          (nr) =>
            nr &&
            (nr.role === "general" || nr.role === "leaves") &&
            nr.areaRatio >= 0.0004 &&
            nr.areaRatio <= 0.009 &&
            nr.cy > 0.42 &&
            nr.cx < 0.34
        );
      if (leafNeighbors.length >= 2) {
        reg.role = "leaves";
        for (const ln of leafNeighbors) {
          ln.role = "leaves";
        }
      }
    }
  }

  // 5.6. Nhận diện LÁ HOA (LEAVES) & CHI TIẾT NHỎ (ACCENT)
  for (const reg of regions) {
    if (reg.role !== "general") continue;

    if (reg.areaRatio > 0.00005 && reg.areaRatio < 0.0010 && !reg.touchesBorder) {
      reg.role = "accent";
      continue;
    }

    const touchesFlower = Array.from(adjacency[reg.id]).some((nid) => {
      const nr = regions[nid - 1];
      return nr && (nr.role === "flower_petal" || nr.role === "flower_center");
    });

    if (
      touchesFlower &&
      reg.cy > 0.35 &&
      reg.areaRatio >= 0.0004 &&
      reg.areaRatio <= 0.018
    ) {
      reg.role = "leaves";
      continue;
    }
  }

  // 5.7. NHẬN DIỆN CHỦ THỂ CHÍNH / NHÂN VẬT (MAIN_CHARACTER) & NHÂN VẬT PHỤ (SECONDARY_CHARACTER)
  // Quét hình học & cấu trúc bao đóng (Topological Enclosure) trên MỌI BỨC TRANH (không bị chặn bởi số lượng hoa!)
  const tinyFeatureRegions = regions.filter(
    (r) => !r.touchesBorder && r.areaRatio >= 0.000025 && r.areaRatio <= 0.0018
  );

  interface CharacterCandidate {
    region: RegionInfo;
    enclosedTinyCount: number;
    score: number;
  }

  const characterCandidates: CharacterCandidate[] = [];

  for (const reg of regions) {
    if (
      reg.touchesTop ||
      reg.touchesBottom ||
      (reg.role !== "general" && reg.role !== "flower_petal")
    ) {
      continue;
    }
    if (
      reg.cx >= 0.14 &&
      reg.cx <= 0.84 &&
      reg.cy >= 0.25 &&
      reg.cy <= 0.84 &&
      reg.areaRatio >= 0.006 &&
      reg.areaRatio <= 0.22
    ) {
      // Kiểm tra xem vùng này có nằm lọt thỏm bên trong một khung hộp thiết bị lớn hơn không (như lồng máy giặt)
      let enclosedByLargerObject = false;
      for (const outer of regions) {
        if (
          outer.id !== reg.id &&
          !outer.touchesTop &&
          !outer.touchesBottom &&
          outer.areaRatio > reg.areaRatio * 1.4 &&
          outer.areaRatio < 0.25 &&
          reg.minX >= outer.minX - w * 0.02 &&
          reg.maxX <= outer.maxX + w * 0.02 &&
          reg.minY >= outer.minY - h * 0.02 &&
          reg.maxY <= outer.maxY + h * 0.02
        ) {
          enclosedByLargerObject = true;
          break;
        }
      }
      if (enclosedByLargerObject) continue;

      let enclosedTinyCount = 0;
      for (const sr of tinyFeatureRegions) {
        if (
          sr.id !== reg.id &&
          sr.minX >= reg.minX &&
          sr.maxX <= reg.maxX &&
          sr.minY >= reg.minY &&
          sr.maxY <= reg.maxY
        ) {
          enclosedTinyCount++;
        }
      }

      if (enclosedTinyCount >= 2) {
        const focalProximity =
          1 - Math.hypot(reg.cx - 0.42, reg.cy - 0.52) * 1.25;
        const score =
          reg.areaRatio * 180 +
          enclosedTinyCount * 6 +
          reg.compactness * 12 +
          focalProximity * 14;
        characterCandidates.push({
          region: reg,
          enclosedTinyCount,
          score,
        });
      }
    }
  }

  characterCandidates.sort((a, b) => b.score - a.score);

  const mainCharacterRegionIds = new Set<number>();
  const secondaryCharGroupMap = new Map<number, number>(); // regionId -> charIndex (1, 2...)

  if (characterCandidates.length > 0) {
    const mainCore = characterCandidates[0].region;
    mainCore.role = "main_character";
    mainCharacterRegionIds.add(mainCore.id);

    // Gom toàn bộ các bộ phận cơ thể nối liền của Chủ thể chính (tay, chân, bụng, đuôi, mõm...)
    // để Chủ thể chính (VD: Cá sấu) được tô đồng nhất 1 màu chủ đạo xuyên suốt!
    for (const nid of Array.from(adjacency[mainCore.id])) {
      const nr = regions[nid - 1];
      if (!nr) continue;
      const isOtherCharCore = characterCandidates
        .slice(1)
        .some((c) => c.region.id === nr.id);
      if (
        !isOtherCharCore &&
        !nr.touchesTop &&
        !nr.touchesBottom &&
        (nr.role === "general" || nr.role === "flower_petal") &&
        nr.areaRatio >= 0.0014 &&
        nr.areaRatio <= mainCore.areaRatio * 0.85 &&
        nr.minX >= mainCore.minX - w * 0.12 &&
        nr.maxX <= mainCore.maxX + w * 0.14 &&
        nr.minY >= mainCore.minY - h * 0.06 &&
        nr.maxY <= mainCore.maxY + h * 0.28
      ) {
        nr.role = "main_character";
        mainCharacterRegionIds.add(nr.id);
      }
    }
    // Mở rộng 1 bước cho bàn chân / ủng nối tiếp dưới chân nhân vật chính
    for (const bodyId of Array.from(mainCharacterRegionIds)) {
      for (const nid of Array.from(adjacency[bodyId])) {
        const nr = regions[nid - 1];
        if (
          nr &&
          !mainCharacterRegionIds.has(nr.id) &&
          !nr.touchesBorder &&
          nr.role === "general" &&
          nr.areaRatio >= 0.0012 &&
          nr.areaRatio <= 0.015 &&
          nr.minX >= mainCore.minX - w * 0.08 &&
          nr.maxX <= mainCore.maxX + w * 0.12 &&
          nr.minY >= mainCore.minY &&
          nr.maxY <= mainCore.maxY + h * 0.25
        ) {
          nr.role = "main_character";
          mainCharacterRegionIds.add(nr.id);
        }
      }
    }

    // Đánh dấu mắt/môi bên trong Chủ thể chính
    for (const sr of tinyFeatureRegions) {
      if (
        sr.minX >= mainCore.minX &&
        sr.maxX <= mainCore.maxX &&
        sr.minY >= mainCore.minY &&
        sr.maxY <= mainCore.maxY
      ) {
        sr.role = sr.areaRatio < 0.00035 ? "eye_iris" : "accent";
      }
    }

    // Các nhân vật phụ (VD: Vịt con, Mèo ngủ...)
    let secIdx = 1;
    for (let i = 1; i < Math.min(4, characterCandidates.length); i++) {
      const secCore = characterCandidates[i].region;
      if (mainCharacterRegionIds.has(secCore.id)) continue;
      secCore.role = "secondary_character";
      secondaryCharGroupMap.set(secCore.id, secIdx);

      for (const nid of Array.from(adjacency[secCore.id])) {
        const nr = regions[nid - 1];
        if (
          nr &&
          !mainCharacterRegionIds.has(nr.id) &&
          !nr.touchesBorder &&
          nr.role === "general" &&
          nr.areaRatio >= 0.0008 &&
          nr.areaRatio <= secCore.areaRatio * 0.65 &&
          nr.minX >= secCore.minX - w * 0.06 &&
          nr.maxX <= secCore.maxX + w * 0.06 &&
          nr.maxY <= secCore.maxY + h * 0.12
        ) {
          nr.role = "secondary_character";
          secondaryCharGroupMap.set(nr.id, secIdx);
        }
      }
      secIdx++;
    }
  }

  // ================= 6. KHỞI TẠO HỆ THỐNG MÀU LIÊN KẾT ĐỘNG GOLDEN RATIO (60-30-10 HOẶC TỶ LỆ TÙY CHỈNH) =================
  const colorSystem = generateGoldenRatioColorSystem({
    paletteColors,
    basePalette: String(basePalette),
    style: String(style),
    mood: String(mood),
    lighting: String(lighting),
    colorMode: String(colorMode),
    customGoldenRatio,
  });

  let { dominant60 } = colorSystem;
  const {
    ratios,
    fullPalette,
    secondary30,
    accent10,
    backgroundTone,
    skinSystem,
    lightingSystem,
    colorWheelRuleName,
  } = colorSystem;
  const {
    lightDirX,
    lightDirY,
    highlightTint,
    shadowSubtone,
    ambientContrast,
    ambientOverlayTint,
    glowAuraColor,
    secondaryGlowAuraColor,
    ambientHarmonyWeight,
    isTwilightOrMagical,
  } = lightingSystem;

  // Xây dựng bể màu phân bổ theo đúng tỷ lệ phần trăm động (dominant% - secondary% - accent%)
  const domSlots = Math.max(1, Math.round(ratios.dominant / 5));
  const secSlots = Math.max(1, Math.round(ratios.secondary / 5));
  const accSlots = Math.max(1, Math.round(ratios.accent / 5));
  const weightedGoldenPool: RGB[] = [];
  for (let i = 0; i < domSlots; i++) {
    weightedGoldenPool.push(dominant60[i % dominant60.length]);
  }
  for (let i = 0; i < secSlots; i++) {
    weightedGoldenPool.push(secondary30[i % secondary30.length]);
  }
  for (let i = 0; i < accSlots; i++) {
    weightedGoldenPool.push(accent10[i % accent10.length]);
  }

  // Logic màu thực tế (Ưu tiên số 3 - Real-world Logic) cho Cây cối / Chậu cây / Thảm cỏ:
  const paletteBotanicalTones = [
    ...dominant60,
    ...secondary30,
    ...fullPalette,
  ].filter((c) => {
    const hsl = rgbToHsl(c);
    return hsl.h >= 75 && hsl.h <= 195 && hsl.s >= 0.18;
  });
  const effectiveBotanicalPool: RGB[] =
    paletteBotanicalTones.length > 0
      ? paletteBotanicalTones
      : [
          mixRgb(secondary30[0], { r: 82, g: 183, b: 136 }, 0.62),
          mixRgb(
            secondary30[1 % secondary30.length],
            { r: 116, g: 198, b: 157 },
            0.58
          ),
        ];

  // Màu thân cây gỗ ấm tự nhiên (Real-world Tree Trunk Logic)
  const naturalWoodTrunkColor = mixRgb(
    dominant60[0],
    { r: 188, g: 132, b: 92 },
    0.66
  );

  // ================= 7. QUY TẮC ƯU TIÊN 3 CẤP ĐỘ (USER OVERRIDE -> CUSTOM GOLDEN RATIO -> REAL-WORLD LOGIC) =================
  const vnParsed = parseVietnameseInstructions(customInstruction);
  const roleCustomColors = new Map<SemanticRole, RGB[]>();
  for (const rule of vnParsed.rules) {
    for (const r of rule.roles) {
      const existing = roleCustomColors.get(r) || [];
      roleCustomColors.set(r, [...existing, ...rule.colors]);
    }
  }
  if (vnParsed.globalModifiers.extraColors.length > 0) {
    dominant60 = [...vnParsed.globalModifiers.extraColors, ...dominant60];
  }

  // ƯU TIÊN SỐ 1 (User Object Override & Re-Labeling): Áp dụng userObjectColors vào roleCustomColors (nếu khớp từ khóa ngữ nghĩa hoặc mô tả vị trí)
  const normalizedUserObjectColors = new Map<string, string>();
  const rawUserObjectDisplayNames = new Map<string, string>();
  if (userObjectColors && typeof userObjectColors === "object") {
    for (const [rawKey, rawHex] of Object.entries(userObjectColors)) {
      if (!rawKey || !rawHex) continue;
      const cleanKey = rawKey.trim().toLowerCase();
      const cleanHex = rawHex.startsWith("#")
        ? rawHex.trim().toUpperCase()
        : `#${rawHex.trim().toUpperCase()}`;
      normalizedUserObjectColors.set(cleanKey, cleanHex);
      rawUserObjectDisplayNames.set(cleanKey, rawKey.trim());

      const overrideRgb = hexToRgb(cleanHex);
      for (const targetEntry of VIETNAMESE_TARGET_KEYWORDS) {
        if (
          targetEntry.words.some(
            (kw) =>
              cleanKey === kw || cleanKey.includes(kw) || kw.includes(cleanKey)
          )
        ) {
          const existing = roleCustomColors.get(targetEntry.role) || [];
          roleCustomColors.set(targetEntry.role, [overrideRgb, ...existing]);
        }
      }

      // Hỗ trợ nhận diện mở rộng khi người dùng sửa tên thẻ thành mô tả chi tiết (VD: "Thân con cá sấu to ở giữa", "Mắt con cá sấu", "Chiếc dép")
      if (
        /(cá sấu|hà mã|khủng long|thân con|to ở giữa|nhân vật chính|chủ thể chính)/i.test(
          cleanKey
        )
      ) {
        roleCustomColors.set("main_character", [overrideRgb]);
      }
      if (/(mắt|con ngươi)/i.test(cleanKey)) {
        roleCustomColors.set("eye_iris", [overrideRgb]);
      }
    }
  }

  // Hàm nội suy khung tọa độ chuẩn [ymin, xmin, ymax, xmax] cho các đối tượng tiếng Việt phổ biến
  // khi người dùng gán màu trực tiếp (VD: "Hòm thư: #FFD166") mà chưa có sẵn trong aiSceneAnalysis
  const inferFallbackObjectBoxAndCategory = (
    rawLabel: string
  ): {
    category: DetectedObjectColorMapping["category"];
    box_2d: [number, number, number, number];
  } => {
    const d = rawLabel.toLowerCase().trim();
    if (/(bầu trời|trời đêm|vách tường|bức tường|tường gạch|tường|nền trên)/i.test(d)) {
      return { category: "background_wall_sky", box_2d: [60, 75, 580, 925] };
    }
    if (/(lớp tuyết|bãi tuyết|nền tuyết|tuyết phủ|tuyết|sàn nhà|nền nhà|mặt đất|sàn)/i.test(d)) {
      return { category: "background_floor_ground", box_2d: [740, 75, 930, 925] };
    }
    if (/(hòm thư|thùng thư)/i.test(d)) {
      return { category: "object_item", box_2d: [425, 525, 860, 915] };
    }
    if (/(chim cánh cụt|cánh cụt)/i.test(d)) {
      return { category: "main_character", box_2d: [585, 200, 895, 560] };
    }
    if (/(chú chim nhỏ|con chim nhỏ|chim nhỏ)/i.test(d)) {
      return { category: "secondary_character", box_2d: [285, 690, 455, 875] };
    }
    if (/(người tuyết)/i.test(d)) {
      return { category: "secondary_character", box_2d: [235, 815, 410, 915] };
    }
    if (/(xe cắm trại|xe van|xe hơi|ô tô)/i.test(d)) {
      return { category: "object_item", box_2d: [210, 95, 745, 865] };
    }
    if (/(lửa trại|đống lửa|ngọn lửa)/i.test(d)) {
      return { category: "object_item", box_2d: [715, 210, 890, 400] };
    }
    if (/(đèn lồng)/i.test(d)) {
      return { category: "object_item", box_2d: [695, 760, 845, 865] };
    }
    if (/(bảng hiệu|post office|coffee)/i.test(d)) {
      return { category: "object_item", box_2d: [80, 90, 290, 680] };
    }
    if (/(biển open|open)/i.test(d)) {
      return { category: "object_item", box_2d: [280, 390, 455, 548] };
    }
    if (/(bồn hoa|hoa tulip)/i.test(d)) {
      return { category: "nature_plant", box_2d: [535, 90, 785, 295] };
    }
    if (/(hộp quà|quà)/i.test(d)) {
      return { category: "object_item", box_2d: [590, 550, 855, 910] };
    }
    if (/(giỏ đồ|giỏ mây|giỏ)/i.test(d)) {
      return { category: "object_item", box_2d: [430, 110, 715, 355] };
    }
    if (/(tủ đồ|tủ locker|tủ sắt)/i.test(d)) {
      return { category: "object_item", box_2d: [110, 340, 725, 855] };
    }
    if (/(cá sấu|hà mã|khủng long|thân con|to ở giữa|nhân vật chính|chủ thể chính|gấu|cún|thỏ)/i.test(d)) {
      return { category: "main_character", box_2d: [245, 195, 785, 620] };
    }
    if (/(vịt|bạn nhỏ|nhân vật phụ)/i.test(d)) {
      return { category: "secondary_character", box_2d: [450, 140, 865, 520] };
    }
    if (/(mèo)/i.test(d)) {
      return { category: "secondary_character", box_2d: [660, 340, 940, 960] };
    }
    return { category: "object_item", box_2d: [250, 200, 780, 750] };
  };

  // Ánh xạ Tọa độ 2D [ymin, xmin, ymax, xmax] vào các Vùng Khép Kín (Closed Contours) bằng Flood-Fill khóa biên
  const aiRegionColorOverride = new Map<
    number,
    { color: RGB; isUserOverride: boolean; labelVi: string }
  >();
  const detectedObjectsSummary: string[] = [];
  const detectedObjects: DetectedObjectBadgeItem[] = [];

  // Khởi tạo danh sách đối tượng từ aiSceneAnalysis + bổ sung các đối tượng do người dùng chỉ định trực tiếp
  const activeSceneObjects: DetectedObjectColorMapping[] =
    aiSceneAnalysis && Array.isArray(aiSceneAnalysis.objects)
      ? aiSceneAnalysis.objects.map((o) => ({ ...o }))
      : [];

  for (const [overrideKey, overrideHex] of Array.from(
    normalizedUserObjectColors.entries()
  )) {
    const alreadyExists = activeSceneObjects.some((o) => {
      const l = o.labelVi.trim().toLowerCase();
      return (
        l === overrideKey ||
        l.includes(overrideKey) ||
        overrideKey.includes(l) ||
        (o.keywordsVi || []).some((k) => k.toLowerCase() === overrideKey)
      );
    });
    if (!alreadyExists) {
      const displayLabel =
        rawUserObjectDisplayNames.get(overrideKey) ||
        overrideKey.charAt(0).toUpperCase() + overrideKey.slice(1);
      const inferred = inferFallbackObjectBoxAndCategory(displayLabel);
      activeSceneObjects.push({
        id: `user_obj_${activeSceneObjects.length + 1}`,
        labelVi: displayLabel,
        keywordsVi: [overrideKey],
        category: inferred.category,
        box_2d: inferred.box_2d,
        primaryHex: overrideHex,
        isUserOverride: true,
        matchedUserPhrase: `${displayLabel}: ${overrideHex}`,
      });
    }
  }

  for (const rule of vnParsed.rules) {
    if (rule.colors.length === 0 || rule.targetKeywords.length === 0) continue;
    const kw = rule.targetKeywords[0];
    const ruleHex = rule.colorHexes[0] || rgbToHex(rule.colors[0]);
    const alreadyExists = activeSceneObjects.some((o) => {
      const l = o.labelVi.trim().toLowerCase();
      return (
        l.includes(kw) ||
        kw.includes(l) ||
        (o.keywordsVi || []).some((k) => k.toLowerCase().includes(kw))
      );
    });
    if (!alreadyExists) {
      const inferred = inferFallbackObjectBoxAndCategory(kw);
      activeSceneObjects.push({
        id: `vn_rule_obj_${activeSceneObjects.length + 1}`,
        labelVi: kw.charAt(0).toUpperCase() + kw.slice(1),
        keywordsVi: rule.targetKeywords,
        category: inferred.category,
        box_2d: inferred.box_2d,
        primaryHex: ruleHex,
        isUserOverride: true,
        matchedUserPhrase: rule.rawText,
      });
    }
  }

  const objMatchedRegions = new Map<string, RegionInfo[]>();
  const objById = new Map<string, DetectedObjectColorMapping>();
  const regionAssignedObjId = new Map<number, string>();

  if (activeSceneObjects.length > 0) {
    // Đếm các đối tượng chưa bị ghi đè để phân bổ theo đúng tỷ lệ Golden Ratio (Ưu tiên số 2)
    let nonOverriddenIndex = 0;
    const nonOverriddenCount = Math.max(
      1,
      activeSceneObjects.filter(
        (o) =>
          o.category !== "main_character" &&
          o.category !== "nature_plant" &&
          o.category !== "background_wall_sky" &&
          o.category !== "background_floor_ground"
      ).length
    );

    // 7.1. Áp dụng 3 Cấp Độ Ưu Tiên lên từng đối tượng đã nhận diện
    for (const obj of activeSceneObjects) {
      const objLabelNorm = obj.labelVi.trim().toLowerCase();
      const objKeywords = (obj.keywordsVi || []).map((k) =>
        k.trim().toLowerCase()
      );

      let matchedByVnRule = false;
      for (const rule of vnParsed.rules) {
        if (rule.colors.length === 0) continue;
        const ruleHex = rule.colorHexes[0] || rgbToHex(rule.colors[0]);

        const keywordMatched = rule.targetKeywords.some(
          (tk) =>
            objLabelNorm.includes(tk) ||
            tk.includes(objLabelNorm) ||
            objKeywords.some((ok) => ok.includes(tk) || tk.includes(ok))
        );
        const categoryMatched =
          (rule.roles.includes("main_character") &&
            obj.category === "main_character") ||
          (rule.roles.includes("leaves") && obj.category === "nature_plant") ||
          (rule.roles.includes("tree_canopy") &&
            obj.category === "nature_plant");

        if (keywordMatched || categoryMatched) {
          obj.isUserOverride = true;
          obj.primaryHex = ruleHex;
          matchedByVnRule = true;
        }
      }

      // ƯU TIÊN SỐ 1 (User Object Override): Kiểm tra userObjectColors khi người dùng bấm chọn màu riêng cho thẻ đối tượng
      let matchedByDirectTag = false;
      for (const [overrideKey, overrideHex] of Array.from(
        normalizedUserObjectColors.entries()
      )) {
        const isExactOrSubMatch =
          objLabelNorm === overrideKey ||
          obj.id.toLowerCase() === overrideKey ||
          objLabelNorm.includes(overrideKey) ||
          overrideKey.includes(objLabelNorm) ||
          objKeywords.some((ok) => ok === overrideKey);

        if (isExactOrSubMatch) {
          obj.isUserOverride = true;
          obj.primaryHex = overrideHex;
          obj.matchedUserPhrase = `${obj.labelVi}: ${overrideHex}`;
          matchedByDirectTag = true;

          const overrideRgb = hexToRgb(overrideHex);
          if (obj.category === "main_character") {
            roleCustomColors.set("main_character", [overrideRgb]);
          } else if (
            obj.category === "background_wall_sky" ||
            /(bầu trời|tường|nền trên)/i.test(objLabelNorm)
          ) {
            roleCustomColors.set("sky", [overrideRgb]);
            roleCustomColors.set("background", [overrideRgb]);
          } else if (
            obj.category === "background_floor_ground" ||
            /(tuyết|sàn|mặt đất)/i.test(objLabelNorm)
          ) {
            roleCustomColors.set("floor_ground", [overrideRgb]);
          } else if (obj.category === "nature_plant") {
            roleCustomColors.set("leaves", [overrideRgb]);
            roleCustomColors.set("tree_canopy", [overrideRgb]);
          }
        }
      }

      // ƯU TIÊN SỐ 2 (Custom Golden Ratio & Palette Rules) & ƯU TIÊN SỐ 3 (Real-world Logic)
      if (!matchedByDirectTag && !matchedByVnRule && !obj.isUserOverride) {
        if (customGoldenRatio?.enabled) {
          if (obj.category === "main_character") {
            obj.primaryHex = rgbToHex(dominant60[0]);
          } else if (obj.category === "nature_plant") {
            obj.primaryHex = rgbToHex(
              effectiveBotanicalPool[
                nonOverriddenIndex % effectiveBotanicalPool.length
              ]
            );
          } else if (obj.category === "background_wall_sky") {
            obj.primaryHex = rgbToHex(backgroundTone);
          } else if (obj.category === "background_floor_ground") {
            obj.primaryHex = rgbToHex(
              mixRgb(backgroundTone, secondary30[0], 0.35)
            );
          } else {
            const pctPos = ((nonOverriddenIndex + 0.5) / nonOverriddenCount) * 100;
            if (pctPos <= ratios.dominant) {
              obj.primaryHex = rgbToHex(
                dominant60[nonOverriddenIndex % dominant60.length]
              );
            } else if (pctPos <= ratios.dominant + ratios.secondary) {
              obj.primaryHex = rgbToHex(
                secondary30[nonOverriddenIndex % secondary30.length]
              );
            } else {
              obj.primaryHex = rgbToHex(
                accent10[nonOverriddenIndex % accent10.length]
              );
            }
            nonOverriddenIndex++;
          }
        }
      }

      detectedObjectsSummary.push(
        `${obj.labelVi}: ${obj.primaryHex}${obj.isUserOverride ? " (Ưu tiên theo yêu cầu)" : ""}`
      );
      detectedObjects.push({
        id: obj.id,
        labelVi: obj.labelVi,
        primaryHex: obj.primaryHex,
        isUserOverride: Boolean(obj.isUserOverride),
      });
    }

    // 7.2. THUẬT TOÁN ĐỔ MÀU VÙNG KHÉP KÍN & CHỐNG TRÀN BIÊN (CLOSED-CONTOUR FLOOD-FILL & BOUNDARY BLEED PREVENTION)
    // Kiểm tra chính xác tỷ lệ điểm ảnh mẫu (samplePoints) của từng vùng contour khép kín nằm bên trong box_2d:
    // - Vùng contour của Tuyết/Sàn nhà (`floor_ground`), Tường/Bầu trời (`sky`) và Lề ngoài (`outer_margin`)
    //   được bảo vệ bởi biên nét đen, tuyệt đối KHÔNG bị thấm màu của Nhân vật hay Hòm thư đứng sát cạnh!
    const isBgOrGroundObject = (o: DetectedObjectColorMapping): boolean => {
      const l = o.labelVi.toLowerCase();
      return (
        o.category === "background_wall_sky" ||
        o.category === "background_floor_ground" ||
        /(bầu trời|vách tường|bức tường|tường gạch|lớp tuyết|bãi tuyết|nền tuyết|tuyết phủ|sàn nhà|mặt đất)/i.test(
          l
        )
      );
    };

    const foregroundObjects = activeSceneObjects.filter(
      (o) => !isBgOrGroundObject(o)
    );
    const backgroundObjects = activeSceneObjects.filter((o) =>
      isBgOrGroundObject(o)
    );

    for (const o of activeSceneObjects) {
      objById.set(o.id, o);
      objMatchedRegions.set(o.id, []);
    }

    // Hàm đếm tỷ lệ điểm ảnh thực sự (samplePoints) của vùng contour `reg` nằm trong khung `[ymin, xmin, ymax, xmax]`
    const computeContourSampleContainment = (
      reg: RegionInfo,
      ymin: number,
      xmin: number,
      ymax: number,
      xmax: number,
      pad: number = 6
    ): number => {
      const pts = reg.samplePoints;
      if (!pts || pts.length === 0) return 0;
      const bMinY = Math.max(0, ymin - pad);
      const bMaxY = Math.min(1000, ymax + pad);
      const bMinX = Math.max(0, xmin - pad);
      const bMaxX = Math.min(1000, xmax + pad);
      let inside = 0;
      for (let i = 0; i < pts.length; i++) {
        const packed = pts[i];
        const py = Math.floor(packed / 10000);
        const px = packed % 10000;
        if (px >= bMinX && px <= bMaxX && py >= bMinY && py <= bMaxY) {
          inside++;
        }
      }
      return inside / pts.length;
    };

    // BƯỚC 7.2A: Gán các vùng contour khép kín cho các ĐỐI TƯỢNG TIỀN CẢNH (Nhân vật, Hòm thư, Vật dụng, Cây hoa)
    // với khóa biên nghiêm ngặt (Zero Boundary Bleed sang Tuyết/Tường/Nền)
    for (const reg of regions) {
      if (
        reg.role === "outer_margin" ||
        reg.role === "sky" ||
        reg.role === "floor_ground" ||
        reg.role === "eye_iris" ||
        reg.role === "eye_white"
      ) {
        continue;
      }

      const rMinY = (reg.minY / h) * 1000;
      const rMaxY = (reg.maxY / h) * 1000;
      const rMinX = (reg.minX / w) * 1000;
      const rMaxX = (reg.maxX / w) * 1000;
      const rCx = reg.cx * 1000;
      const rCy = reg.cy * 1000;
      const rW = Math.max(1, rMaxX - rMinX);
      const rH = Math.max(1, rMaxY - rMinY);
      const rBoxArea = rW * rH;

      let bestObj: DetectedObjectColorMapping | null = null;
      let bestMatchScore = -Infinity;

      for (const obj of foregroundObjects) {
        if (reg.role === "tree_trunk" && obj.category === "main_character") {
          continue;
        }

        const [ymin, xmin, ymax, xmax] = obj.box_2d;
        const objW = Math.max(12, xmax - xmin);
        const objH = Math.max(12, ymax - ymin);
        const objBoxArea = objW * objH;

        // KHÓA BIÊN CHỐNG TRÀN (BOUNDARY BLEED LOCK):
        // Nếu vùng contour này vươn ra ngoài khung bao của đối tượng quá biên độ cho phép (30 đơn vị / 1000),
        // nghĩa là vùng này thuộc về nền tường, mặt tuyết hoặc vật thể kế bên -> loại bỏ ngay lập tức!
        const overflowLeft = Math.max(0, xmin - rMinX);
        const overflowRight = Math.max(0, rMaxX - xmax);
        const overflowTop = Math.max(0, ymin - rMinY);
        const overflowBottom = Math.max(0, rMaxY - ymax);
        const maxSideOverflow = Math.max(
          overflowLeft,
          overflowRight,
          overflowTop,
          overflowBottom
        );

        if (
          maxSideOverflow > 32 ||
          rBoxArea > objBoxArea * 1.15 ||
          rW > objW * 1.18 + 18 ||
          rH > objH * 1.18 + 18
        ) {
          continue;
        }

        // Tính tỷ lệ điểm ảnh thực tế của vùng contour nằm bên trong khung đối tượng
        const sampleContainment = computeContourSampleContainment(
          reg,
          ymin,
          xmin,
          ymax,
          xmax,
          6
        );

        const centroidIn =
          rCx >= xmin - 6 &&
          rCx <= xmax + 6 &&
          rCy >= ymin - 6 &&
          rCy <= ymax + 6;

        // Yêu cầu tối thiểu 72% điểm ảnh thực tế của vùng contour phải nằm gọn trong khung đối tượng
        // (hoặc >= 66% nếu tâm vùng nằm trọn bên trong và không tràn biên)
        if (
          sampleContainment >= 0.72 ||
          (centroidIn && sampleContainment >= 0.66 && maxSideOverflow <= 18)
        ) {
          const objCx = (xmin + xmax) * 0.5;
          const objCy = (ymin + ymax) * 0.5;
          const normDist =
            Math.hypot(rCx - objCx, rCy - objCy) /
            Math.max(35, Math.hypot(objW, objH) * 0.5);

          // Ưu tiên khung bao vừa khít nhất với vùng contour (giúp Chim nhỏ trên Hòm thư hoặc Biển OPEN trên Cửa
          // không bị nuốt vào màu của Hòm thư hay Cửa lớn phía sau!)
          const tightnessScore = 135000 / Math.max(2200, objBoxArea);
          const overrideBonus =
            obj.isUserOverride && sampleContainment >= 0.76 ? 16 : 0;
          const overflowPenalty = maxSideOverflow * 0.85;

          const score =
            sampleContainment * 55 -
            normDist * 14 +
            tightnessScore +
            overrideBonus -
            overflowPenalty;

          if (score > bestMatchScore) {
            bestMatchScore = score;
            bestObj = obj;
          }
        }
      }

      if (bestObj) {
        objMatchedRegions.get(bestObj.id)!.push(reg);
        regionAssignedObjId.set(reg.id, bestObj.id);
      }
    }

    // Nếu đối tượng là Nhân vật chính (main_character), chỉ hợp nhất các vùng trong mainCharacterRegionIds
    // có >= 75% điểm ảnh thực tế nằm bên trong khung bao của mainAiObj
    const mainAiObj =
      foregroundObjects.find(
        (o) => o.category === "main_character" && o.isUserOverride
      ) || foregroundObjects.find((o) => o.category === "main_character");

    if (mainAiObj && mainCharacterRegionIds.size > 0) {
      const [mYmin, mXmin, mYmax, mXmax] = mainAiObj.box_2d;
      const existingList = objMatchedRegions.get(mainAiObj.id) || [];
      const existingIds = new Set(existingList.map((r) => r.id));
      for (const mId of Array.from(mainCharacterRegionIds)) {
        const mReg = regions[mId - 1];
        if (
          !mReg ||
          existingIds.has(mId) ||
          regionAssignedObjId.has(mId) ||
          mReg.role === "tree_trunk" ||
          mReg.role === "outer_margin" ||
          mReg.role === "sky" ||
          mReg.role === "floor_ground"
        ) {
          continue;
        }
        const sampleInMain = computeContourSampleContainment(
          mReg,
          mYmin,
          mXmin,
          mYmax,
          mXmax,
          10
        );
        if (sampleInMain >= 0.75) {
          existingList.push(mReg);
          existingIds.add(mId);
          regionAssignedObjId.set(mId, mainAiObj.id);
        }
      }
      objMatchedRegions.set(mainAiObj.id, existingList);
    }

    // BƯỚC 7.2B: Gán các chi tiết con nằm LỌT THỎM BÊN TRONG đường bao của đối tượng (Topological Interior Containment)
    // Thay thế hoàn toàn cơ chế lan truyền qua `adjacency` cũ (vốn nhảy qua nét đen làm lem màu sang vùng tuyết/tường kế bên!)
    for (const obj of foregroundObjects) {
      const regList = objMatchedRegions.get(obj.id) || [];
      if (regList.length === 0) continue;

      // Tính khung bao thực tế của các vùng contour đã khớp với đối tượng này
      let envMinX = w;
      let envMaxX = 0;
      let envMinY = h;
      let envMaxY = 0;
      for (const r of regList) {
        if (r.minX < envMinX) envMinX = r.minX;
        if (r.maxX > envMaxX) envMaxX = r.maxX;
        if (r.minY < envMinY) envMinY = r.minY;
        if (r.maxY > envMaxY) envMaxY = r.maxY;
      }

      const [ymin, xmin, ymax, xmax] = obj.box_2d;
      const currentIds = new Set(regList.map((r) => r.id));

      for (const nr of regions) {
        if (
          currentIds.has(nr.id) ||
          regionAssignedObjId.has(nr.id) ||
          nr.role === "outer_margin" ||
          nr.role === "sky" ||
          nr.role === "floor_ground" ||
          nr.role === "tree_trunk" ||
          nr.role === "eye_iris" ||
          nr.role === "eye_white" ||
          nr.areaRatio > 0.022
        ) {
          continue;
        }

        // Chi tiết con bắt buộc phải nằm trọn bên trong đường bao thực tế (Envelope) của đối tượng
        // VÀ có >= 90% điểm ảnh mẫu nằm trong box_2d
        if (
          nr.minX >= envMinX - 2 &&
          nr.maxX <= envMaxX + 2 &&
          nr.minY >= envMinY - 2 &&
          nr.maxY <= envMaxY + 2
        ) {
          const subContainment = computeContourSampleContainment(
            nr,
            ymin,
            xmin,
            ymax,
            xmax,
            2
          );
          if (subContainment >= 0.9) {
            regList.push(nr);
            currentIds.add(nr.id);
            regionAssignedObjId.set(nr.id, obj.id);
          }
        }
      }
    }

    // BƯỚC 7.2C: Gán các vùng contour Bối cảnh / Tuyết / Tường / Sàn nhà (`backgroundObjects`)
    // Chỉ áp dụng lên các vùng chưa thuộc về bất kỳ đối tượng tiền cảnh nào (Bảo vệ tuyệt đối Nhân vật & Vật dụng!)
    for (const bgObj of backgroundObjects) {
      const [ymin, xmin, ymax, xmax] = bgObj.box_2d;
      const bgList = objMatchedRegions.get(bgObj.id) || [];
      const isFloorOrSnow =
        bgObj.category === "background_floor_ground" ||
        /(tuyết|sàn|mặt đất|thảm)/i.test(bgObj.labelVi);

      for (const reg of regions) {
        if (reg.role === "outer_margin" || regionAssignedObjId.has(reg.id)) {
          continue;
        }
        // Không cho phép Tuyết/Sàn nhà tô đè lên Tường/Bầu trời và ngược lại!
        if (isFloorOrSnow && reg.role === "sky") continue;
        if (!isFloorOrSnow && reg.role === "floor_ground") continue;

        const roleDirectMatch =
          (isFloorOrSnow && reg.role === "floor_ground") ||
          (!isFloorOrSnow && reg.role === "sky");
        const sampleInBg = computeContourSampleContainment(
          reg,
          ymin,
          xmin,
          ymax,
          xmax,
          12
        );

        if (roleDirectMatch || (reg.role === "general" && sampleInBg >= 0.78 && reg.areaRatio >= 0.008)) {
          bgList.push(reg);
          regionAssignedObjId.set(reg.id, bgObj.id);
        }
      }
      objMatchedRegions.set(bgObj.id, bgList);
    }

    // 7.2D: Đổ màu ĐỒNG NHẤT (Closed-Contour Flood-Fill) cho toàn bộ vùng contour thuộc từng đối tượng
    for (const [objId, regList] of Array.from(objMatchedRegions.entries())) {
      if (regList.length === 0) continue;
      const obj = objById.get(objId)!;
      const primaryRgb = hexToRgb(obj.primaryHex);
      const subtleDetailRgb = mixRgb(
        primaryRgb,
        obj.secondaryHex ? hexToRgb(obj.secondaryHex) : highlightTint,
        obj.isUserOverride ? 0.08 : 0.16
      );

      const maxRegSize = Math.max(...regList.map((r) => r.size));
      const isTreeObject =
        obj.category === "nature_plant" &&
        (obj.labelVi.toLowerCase().includes("cây") ||
          obj.labelVi.toLowerCase().includes("tree"));

      for (const r of regList) {
        if (isTreeObject && r.role === "tree_trunk" && !obj.isUserOverride) {
          aiRegionColorOverride.set(r.id, {
            color: naturalWoodTrunkColor,
            isUserOverride: false,
            labelVi: obj.labelVi,
          });
          continue;
        }

        const isMainOrBodyPart =
          obj.isUserOverride ||
          r.size >= maxRegSize * 0.04 ||
          mainCharacterRegionIds.has(r.id);

        aiRegionColorOverride.set(r.id, {
          color: isMainOrBodyPart ? primaryRgb : subtleDetailRgb,
          isUserOverride: obj.isUserOverride,
          labelVi: obj.labelVi,
        });
      }
    }
  }

  // ================= 8. BƯỚC 2 & 3: PHÂN BỔ BẢNG MÀU THEO TỶ LỆ GOLDEN RATIO, PHỐI MÀU ĐƠN SẮC CÓ CHIỀU SÂU & NHẬN DIỆN HIỆU ỨNG PHÁT SÁNG (GLOW / BUBBLE FX) =================
  interface AssignedRegionShading {
    rimHighlight: RGB;
    softHighlight: RGB;
    midtone: RGB;
    companionGradientTone: RGB;
    cellShadow: RGB;
    deepAccentShadow: RGB;
    role: SemanticRole;
    isBubble: boolean;
    isGlowEmitter: boolean;
    hasDirectOverride: boolean;
  }

  const regionColorMap = new Map<number, AssignedRegionShading>();
  const paletteFlowerPool = [...dominant60, ...secondary30];

  const flowerGroupColorMap = new Map<number, RGB>();
  for (let gid = 1; gid < nextFlowerGroupId; gid++) {
    const customFlowerColors =
      roleCustomColors.get("flower_petal") || roleCustomColors.get("flowers");
    if (customFlowerColors && customFlowerColors.length > 0) {
      flowerGroupColorMap.set(
        gid,
        customFlowerColors[(gid - 1) % customFlowerColors.length]
      );
    } else {
      flowerGroupColorMap.set(
        gid,
        paletteFlowerPool[(gid - 1) % paletteFlowerPool.length]
      );
    }
  }

  // Màu nền Tường / Bầu trời & Sàn nhà / Tuyết tách biệt rõ ràng, đồng bộ với Ánh sáng môi trường (Ambient Atmosphere)
  const wallOrSkyBaseTone =
    !customGoldenRatio?.enabled && aiSceneAnalysis?.backgroundWallOrSkyHex
      ? mixRgb(
          hexToRgb(aiSceneAnalysis.backgroundWallOrSkyHex),
          backgroundTone,
          0.35
        )
      : backgroundTone;
  const wallOrSkyAltStripeTone = mixRgb(wallOrSkyBaseTone, secondary30[0], 0.14);

  let floorOrGroundBaseTone =
    !customGoldenRatio?.enabled && aiSceneAnalysis?.backgroundFloorOrGroundHex
      ? mixRgb(
          hexToRgb(aiSceneAnalysis.backgroundFloorOrGroundHex),
          secondary30[0],
          0.3
        )
      : mixRgb(backgroundTone, secondary30[1 % secondary30.length], 0.42);

  // Đảm bảo Sàn nhà / Tuyết và Tường / Bầu trời luôn có độ chênh lệch sắc độ rõ ràng qua biên nét đen
  const bgFloorDiff =
    Math.abs(wallOrSkyBaseTone.r - floorOrGroundBaseTone.r) +
    Math.abs(wallOrSkyBaseTone.g - floorOrGroundBaseTone.g) +
    Math.abs(wallOrSkyBaseTone.b - floorOrGroundBaseTone.b);
  if (bgFloorDiff < 28) {
    floorOrGroundBaseTone = mixRgb(
      floorOrGroundBaseTone,
      secondary30[0],
      0.38
    );
  }

  const sortedSkyRegions = Array.from(skyRegionIds)
    .map((id) => regions[id - 1])
    .sort((a, b) => a.cx - b.cx);
  const skyStripeOrderMap = new Map<number, number>();
  sortedSkyRegions.forEach((r, idx) => skyStripeOrderMap.set(r.id, idx));

  const mainCharDefaultColor =
    roleCustomColors.get("main_character")?.[0] || dominant60[0];

  // Danh sách các nguồn phát sáng & bọt bong bóng (Glow & Bubble Emitters) để tạo quầng sáng mờ (Radial Soft Aura)
  interface GlowEmitter {
    regId: number;
    cxPx: number;
    cyPx: number;
    radiusPx: number;
    auraRadiusPx: number;
    auraColor: RGB;
    secondaryAuraColor: RGB;
    intensity: number;
    isBubble: boolean;
  }
  const glowEmitters: GlowEmitter[] = [];

  for (const reg of regions) {
    const role = reg.role;

    // Lề giấy bên ngoài khung tranh luôn giữ màu trắng giấy sạch sẽ (#FFFFFF)
    if (role === "outer_margin") {
      const pureWhite: RGB = { r: 255, g: 255, b: 255 };
      regionColorMap.set(reg.id, {
        rimHighlight: pureWhite,
        softHighlight: pureWhite,
        midtone: pureWhite,
        companionGradientTone: pureWhite,
        cellShadow: pureWhite,
        deepAccentShadow: pureWhite,
        role: "outer_margin",
        isBubble: false,
        isGlowEmitter: false,
        hasDirectOverride: false,
      });
      continue;
    }

    const hash = Math.abs(
      reg.id * 5 +
        Math.floor(reg.cx * 23) * 7 +
        Math.floor(reg.cy * 19) * 11
    );

    let chosenColor: RGB;
    // ƯU TIÊN 1 (Cao nhất - region_colors): Màu của "Chỉ vùng" cụ thể (hoặc nhóm đa vùng Multi-Select)
    const directRegionHex = options.userRegionColors?.[reg.id];
    const hasDirectRegionOverride = Boolean(
      directRegionHex && /^#[0-9A-Fa-f]{6}$/.test(directRegionHex.trim())
    );

    // ƯU TIÊN 2 (object_colors): Màu tùy chỉnh của "Cả đối tượng"
    const objectRegionHex = options.userObjectRegionColors?.[reg.id];
    const hasObjectRegionOverride = Boolean(
      objectRegionHex && /^#[0-9A-Fa-f]{6}$/.test(objectRegionHex.trim())
    );
    const aiMatch = aiRegionColorOverride.get(reg.id);
    const hasObjectLevelOverride =
      hasObjectRegionOverride || Boolean(aiMatch && aiMatch.isUserOverride);

    if (hasDirectRegionOverride && directRegionHex) {
      // ƯU TIÊN 1 (Cao nhất - region_colors): Ghi đè tuyệt đối lên toàn bộ đối tượng chứa vùng này!
      chosenColor = hexToRgb(directRegionHex.trim());
    } else if (hasObjectRegionOverride && objectRegionHex) {
      // ƯU TIÊN 2 (object_colors): Màu tùy chỉnh của "Cả đối tượng" (qua bản đồ vùng của đối tượng)
      chosenColor = hexToRgb(objectRegionHex.trim());
    } else if (aiMatch && aiMatch.isUserOverride) {
      // ƯU TIÊN 2 (object_colors): Màu tùy chỉnh của "Cả đối tượng" (qua thẻ đối tượng AI)
      chosenColor = aiMatch.color;
    } else if (roleCustomColors.has(role)) {
      const customList = roleCustomColors.get(role)!;
      if (role === "main_character") {
        chosenColor = customList[0];
      } else if (role === "flower_petal" && reg.flowerGroupId > 0) {
        chosenColor = flowerGroupColorMap.get(reg.flowerGroupId)!;
      } else {
        chosenColor = customList[hash % customList.length];
      }
    } else if (role === "tree_trunk") {
      chosenColor = naturalWoodTrunkColor;
    } else if (
      aiMatch &&
      role !== "sky" &&
      role !== "floor_ground" &&
      role !== "sun" &&
      role !== "cloud"
    ) {
      chosenColor = aiMatch.color;
    } else {
      switch (role) {
        case "sky":
        case "background": {
          if (vnParsed.globalModifiers.keepBrightBg) {
            chosenColor = { r: 250, g: 252, b: 255 };
          } else {
            const stripeIdx = skyStripeOrderMap.get(reg.id) || 0;
            chosenColor =
              stripeIdx % 2 === 0 ? wallOrSkyBaseTone : wallOrSkyAltStripeTone;
          }
          break;
        }

        case "floor_ground":
          chosenColor = floorOrGroundBaseTone;
          break;

        case "main_character":
          chosenColor = mainCharDefaultColor;
          break;

        case "secondary_character": {
          const secGroup = secondaryCharGroupMap.get(reg.id) || 1;
          chosenColor =
            weightedGoldenPool[
              (secGroup * 3 + hash) % weightedGoldenPool.length
            ];
          break;
        }

        case "cloud":
          chosenColor = mixRgb({ r: 255, g: 254, b: 250 }, dominant60[0], 0.14);
          break;

        case "sun":
          chosenColor = mixRgb(accent10[0], { r: 255, g: 212, b: 68 }, 0.55);
          break;

        case "sun_ray":
          chosenColor = mixRgb(accent10[0], { r: 255, g: 230, b: 110 }, 0.65);
          break;

        case "bird":
        case "accent":
          chosenColor = accent10[hash % accent10.length];
          break;

        case "flower_center":
          chosenColor = accent10[reg.flowerGroupId % accent10.length];
          break;

        case "flower_petal":
        case "flowers":
          if (
            reg.flowerGroupId > 0 &&
            flowerGroupColorMap.has(reg.flowerGroupId)
          ) {
            chosenColor = flowerGroupColorMap.get(reg.flowerGroupId)!;
          } else {
            chosenColor = dominant60[hash % dominant60.length];
          }
          break;

        case "tree_canopy":
        case "leaves":
        case "grass_ground":
          chosenColor =
            effectiveBotanicalPool[hash % effectiveBotanicalPool.length];
          break;

        case "mountain":
          chosenColor = secondary30[hash % secondary30.length];
          break;

        case "skin":
          chosenColor =
            hash % 3 === 0 ? skinSystem.undertone : skinSystem.base;
          break;

        case "eye_white":
          chosenColor = { r: 254, g: 254, b: 252 };
          break;

        case "eye_iris":
          chosenColor = accent10[hash % accent10.length];
          break;

        case "lips":
          chosenColor = mixRgb({ r: 245, g: 128, b: 146 }, accent10[0], 0.35);
          break;

        default: {
          // KIỂM TRA BIÊN KỀ CẬN (BOUNDARY CONTRAST SEPARATION):
          // Khi chọn màu từ weightedGoldenPool cho vùng khép kín chưa định danh,
          // ưu tiên chọn sắc màu khác biệt với các vùng lân cận đang đứng sát bên kia đường nét đen!
          const spatialBucket =
            Math.floor(reg.cx * 4) + Math.floor(reg.cy * 3) * 2;
          const baseIdx = (spatialBucket + reg.id) % weightedGoldenPool.length;
          let candidateColor = weightedGoldenPool[baseIdx];

          if (weightedGoldenPool.length > 1 && adjacency[reg.id].size > 0) {
            const neighborColors: RGB[] = [];
            for (const nid of Array.from(adjacency[reg.id])) {
              const nAssigned = regionColorMap.get(nid);
              if (nAssigned) {
                neighborColors.push(nAssigned.midtone);
              }
            }
            if (neighborColors.length > 0) {
              let bestDist = -1;
              for (let offset = 0; offset < weightedGoldenPool.length; offset++) {
                const cand =
                  weightedGoldenPool[(baseIdx + offset) % weightedGoldenPool.length];
                let minDiffToNeighbor = 999;
                for (const nc of neighborColors) {
                  const d =
                    Math.abs(cand.r - nc.r) +
                    Math.abs(cand.g - nc.g) +
                    Math.abs(cand.b - nc.b);
                  if (d < minDiffToNeighbor) minDiffToNeighbor = d;
                }
                if (minDiffToNeighbor > bestDist) {
                  bestDist = minDiffToNeighbor;
                  candidateColor = cand;
                }
                if (minDiffToNeighbor >= 45) break;
              }
            }
          }
          chosenColor = candidateColor;
          break;
        }
      }
    }

    // 1. KỸ THUẬT PHỐI MÀU ĐƠN SẮC / ĐỒNG BỘ KHÍ QUYỂN CÓ CHIỀU SÂU (MONOCHROMATIC DEPTH & ATMOSPHERE):
    // Đối với các vùng không bị ghi đè thủ công, hòa quyện nhẹ màu vật thể vào dải màu Tâm trạng & Ánh sáng môi trường
    // để toàn bộ bức tranh gắn kết trong một không gian nghệ thuật thống nhất thay vì rời rạc.
    if (!hasDirectRegionOverride && !hasObjectLevelOverride) {
      if (
        role !== "eye_white" &&
        role !== "skin" &&
        role !== "sky" &&
        role !== "background"
      ) {
        chosenColor = mixRgb(
          chosenColor,
          ambientOverlayTint,
          ambientHarmonyWeight * 0.65
        );
      }
      if (vnParsed.globalModifiers.softDesaturated) {
        const hsl = rgbToHsl(chosenColor);
        chosenColor = hslToRgb({ h: hsl.h, s: hsl.s * 0.78, l: hsl.l });
      } else if (vnParsed.globalModifiers.vibrantBoost) {
        const hsl = rgbToHsl(chosenColor);
        chosenColor = hslToRgb({
          h: hsl.h,
          s: Math.min(0.96, hsl.s * 1.25),
          l: hsl.l,
        });
      }
    }

    // 2. NHẬN DIỆN BONG BÓNG XÀ PHÒNG / BỌT NƯỚC & HẠT SÁNG / ĐÈN PHÁT QUANG (GLOW & BUBBLE HIGHLIGHT FX):
    const aiLabelLower = (aiMatch?.labelVi || "").toLowerCase();
    const isLabelBubble =
      /(bong bóng|bọt|xà phòng|bubble|foam|ngọc trai)/i.test(aiLabelLower);
    const isLabelLight =
      /(đèn|lồng đèn|ánh sáng|ngôi sao|ánh sao|lấp lánh|cửa sổ sáng|lamp|lantern|star|sparkle|glow)/i.test(
        aiLabelLower
      );

    // Nhận diện hình học Bong bóng bay lơ lửng (tròn/bầu dục, khép kín, không chạm biên, không phải mắt/nhụy hoa/nhân vật)
    const isGeometricBubble =
      !reg.touchesBorder &&
      role !== "eye_white" &&
      role !== "eye_iris" &&
      role !== "flower_center" &&
      role !== "skin" &&
      role !== "main_character" &&
      role !== "tree_trunk" &&
      reg.circularity >= 0.52 &&
      reg.compactness >= 0.48 &&
      reg.aspectRatio >= 0.66 &&
      reg.aspectRatio <= 1.46 &&
      reg.areaRatio >= 0.00014 &&
      reg.areaRatio <= 0.013 &&
      !mainCharacterRegionIds.has(reg.id);

    const isBubble =
      !hasDirectRegionOverride && (isLabelBubble || isGeometricBubble);

    const isSparkleGeometry =
      !reg.touchesBorder &&
      role === "accent" &&
      reg.areaRatio >= 0.000035 &&
      reg.areaRatio <= 0.00045 &&
      reg.circularity >= 0.36 &&
      reg.cy <= 0.82;

    const isGlowEmitter =
      !hasDirectRegionOverride &&
      (role === "sun" ||
        role === "sun_ray" ||
        isLabelLight ||
        isSparkleGeometry);

    if ((isBubble || isGlowEmitter) && glowEmitters.length < 95) {
      const bw = Math.max(4, reg.maxX - reg.minX);
      const bh = Math.max(4, reg.maxY - reg.minY);
      const radiusPx = Math.max(4, Math.hypot(bw, bh) * 0.38);
      const auraRadiusPx = isBubble
        ? Math.min(Math.max(w, h) * 0.095, Math.max(16, radiusPx * 2.45))
        : Math.min(Math.max(w, h) * 0.12, Math.max(18, radiusPx * 2.85));

      glowEmitters.push({
        regId: reg.id,
        cxPx: Math.round(reg.cx * w),
        cyPx: Math.round(reg.cy * h),
        radiusPx,
        auraRadiusPx,
        auraColor: isBubble
          ? glowAuraColor
          : mixRgb(highlightTint, glowAuraColor, 0.45),
        secondaryAuraColor: secondaryGlowAuraColor,
        intensity: isBubble ? 0.52 : 0.64,
        isBubble,
      });
    }

    const markerShading = buildCleanMarkerShading(
      chosenColor,
      highlightTint,
      shadowSubtone,
      ambientContrast
    );

    regionColorMap.set(reg.id, {
      ...markerShading,
      role,
      isBubble,
      isGlowEmitter,
      hasDirectOverride: hasDirectRegionOverride,
    });
  }

  // Bổ sung các hạt sáng / ánh sao lấp lánh (Starlight / Bokeh Glow Particles) trên nền trời đêm hoặc không gian lớn
  // để tạo hiệu ứng "Đêm Huyền Bí & Phát Sáng" (Magic Twilight & Glow) sống động như tranh mẫu
  const starlightCores: Array<{ x: number; y: number; r: number; color: RGB }> = [];
  if (skyRegionIds.size > 0) {
    const seedCount = isTwilightOrMagical ? 26 : 12;
    for (let s = 0; s < seedCount; s++) {
      const sx = Math.floor(((s * 73 + 19) % 94 + 3) * 0.01 * w);
      const sy = Math.floor(((s * 41 + 11) % 68 + 4) * 0.01 * h);
      const sIdx = sy * w + sx;
      const sRegId = labels[sIdx];
      if (
        sRegId > 0 &&
        skyRegionIds.has(sRegId) &&
        distField[sIdx] >= 42 &&
        !options.userRegionColors?.[sRegId]
      ) {
        const starRadius = isTwilightOrMagical
          ? 2.2 + (s % 3) * 1.1
          : 1.8 + (s % 2) * 0.9;
        const starAuraRadius = starRadius * (isTwilightOrMagical ? 7.5 : 5.5);
        const starAuraColor =
          s % 2 === 0 ? glowAuraColor : secondaryGlowAuraColor;
        starlightCores.push({
          x: sx,
          y: sy,
          r: starRadius,
          color: starAuraColor,
        });
        if (glowEmitters.length < 120) {
          glowEmitters.push({
            regId: sRegId,
            cxPx: sx,
            cyPx: sy,
            radiusPx: starRadius,
            auraRadiusPx: starAuraRadius,
            auraColor: starAuraColor,
            secondaryAuraColor: highlightTint,
            intensity: isTwilightOrMagical ? 0.56 : 0.34,
            isBubble: false,
          });
        }
      }
    }
  }

  // Tiền tính toán Trường Quầng Sáng Mờ 2D (2D Radial Glow Aura Field) trong O(1) cho từng điểm ảnh
  const glowAuraR = new Float32Array(totalPixels);
  const glowAuraG = new Float32Array(totalPixels);
  const glowAuraB = new Float32Array(totalPixels);
  const glowAuraAlpha = new Float32Array(totalPixels);

  for (const em of glowEmitters) {
    const rad = Math.ceil(em.auraRadiusPx);
    const x0 = Math.max(0, Math.floor(em.cxPx - rad));
    const x1 = Math.min(w - 1, Math.ceil(em.cxPx + rad));
    const y0 = Math.max(0, Math.floor(em.cyPx - rad));
    const y1 = Math.min(h - 1, Math.ceil(em.cyPx + rad));
    const invRad = 1 / Math.max(1, em.auraRadiusPx);

    for (let py = y0; py <= y1; py++) {
      const dy = py - em.cyPx;
      const rowOffset = py * w;
      for (let px = x0; px <= x1; px++) {
        const dx = px - em.cxPx;
        const d = Math.hypot(dx, dy);
        if (d >= em.auraRadiusPx) continue;
        const normD = d * invRad;
        // Quầng sáng mờ giảm dần mềm mại theo hàm bậc hai (Smooth Radial Falloff)
        const falloff = Math.pow(1 - normD, 2.1) * em.intensity;
        if (falloff <= 0.005) continue;

        // Phối chuyển sắc cầu vồng / hồng-tím-lam nhẹ quanh quầng bong bóng
        const angleMix = (dx * invRad + dy * invRad + 1.4) * 0.35;
        const clampMix = Math.max(0, Math.min(1, angleMix));
        const auraRgb = em.isBubble
          ? mixRgb(em.auraColor, em.secondaryAuraColor, clampMix)
          : em.auraColor;

        const pIdx = rowOffset + px;
        const prevA = glowAuraAlpha[pIdx];
        const nextA = Math.min(0.78, prevA + falloff * (1 - prevA * 0.65));
        const blendW = falloff / Math.max(0.001, prevA + falloff);

        glowAuraR[pIdx] = glowAuraR[pIdx] * (1 - blendW) + auraRgb.r * blendW;
        glowAuraG[pIdx] = glowAuraG[pIdx] * (1 - blendW) + auraRgb.g * blendW;
        glowAuraB[pIdx] = glowAuraB[pIdx] * (1 - blendW) + auraRgb.b * blendW;
        glowAuraAlpha[pIdx] = nextA;
      }
    }
  }

  // Đánh dấu tâm hạt sáng / ánh sao (Starlight Twinkle Core) trên nền trời
  const starCoreBoost = new Float32Array(totalPixels);
  for (const sc of starlightCores) {
    const cr = Math.ceil(sc.r * 1.8);
    const x0 = Math.max(0, Math.floor(sc.x - cr));
    const x1 = Math.min(w - 1, Math.ceil(sc.x + cr));
    const y0 = Math.max(0, Math.floor(sc.y - cr));
    const y1 = Math.min(h - 1, Math.ceil(sc.y + cr));
    for (let py = y0; py <= y1; py++) {
      const dy = py - sc.y;
      const rowOffset = py * w;
      for (let px = x0; px <= x1; px++) {
        const dx = px - sc.x;
        // Tạo hình ngôi sao 4 cánh lấp lánh nhẹ + tâm tròn sáng rực
        const euclid = Math.hypot(dx, dy);
        const starCross =
          Math.min(Math.abs(dx), Math.abs(dy)) * 1.8 + euclid * 0.45;
        const effDist = Math.min(euclid, starCross);
        if (effDist <= sc.r * 1.6) {
          const coreW = Math.pow(
            Math.max(0, 1 - effDist / (sc.r * 1.6)),
            1.6
          );
          const pIdx = rowOffset + px;
          if (coreW > starCoreBoost[pIdx]) {
            starCoreBoost[pIdx] = coreW;
          }
        }
      }
    }
  }

  // ================= 9. KẾT XUẤT FLOOD-FILL ĐA SẮC (MULTI-TONE GRADIENT & GLOW FX) & ĐẶT MẶT NẠ LINE-ART LÊN TRÊN CÙNG =================
  const colorCanvas = document.createElement("canvas");
  colorCanvas.width = w;
  colorCanvas.height = h;
  const colorCtx = colorCanvas.getContext("2d")!;
  const colorImageData = colorCtx.createImageData(w, h);
  const colorData = colorImageData.data;
  const interactiveLabels = new Int32Array(w * h);

  // Màu mực đen nguyên bản sắc nét cho Lớp Line-Art Độc Lập nằm trên cùng
  const inkCoreR = 18;
  const inkCoreG = 18;
  const inkCoreB = 22;

  // Vector vuông góc với hướng ánh sáng chính để tạo chuyển màu đa sắc 2 chiều (Ohuhu Cross-Axis Multi-Tone Blending)
  const crossDirX = -lightDirY;
  const crossDirY = lightDirX;

  // Cờ nhận diện 4 Phương pháp tô màu chuyên sâu theo từng bước (Step-by-Step Marker & Texture Rendering Styles)
  const activeStyleNorm = (options.style || "").trim();
  const isFrostyStippling = activeStyleNorm === "Frosty Stippling";
  const isCozyMarkerFur = activeStyleNorm === "Cozy Marker & Fur";
  const isWaterFlowing = activeStyleNorm === "Water/Flowing Gradient";
  const isBotanicalLayered = activeStyleNorm === "Botanical Layered";
  const isStepByStepMarkerStyle =
    isFrostyStippling ||
    isCozyMarkerFur ||
    isWaterFlowing ||
    isBotanicalLayered;

  // Đồng bộ thông số Bảng Điều Khiển Tùy Chỉnh Hiệu Ứng (Advanced Effect Customization Panel)
  const effSettings = options.effectSettings ?? {
    shadow_depth: 70,
    stippling_density: 40,
    white_highlights: 80,
    texture_lines: true,
  };
  const effShadowRatio =
    Math.max(0, Math.min(100, Number(effSettings.shadow_depth ?? 70))) / 100;
  const effStippleRatio =
    Math.max(0, Math.min(100, Number(effSettings.stippling_density ?? 40))) /
    100;
  const effHighlightRatio =
    Math.max(0, Math.min(100, Number(effSettings.white_highlights ?? 80))) /
    100;
  const effTextureLines =
    effSettings.texture_lines !== undefined
      ? Boolean(effSettings.texture_lines)
      : true;
  // Hệ số nhân độ đậm bóng đổ (mặc định 70% tương ứng ~1.0x, 100% tương ứng ~1.42x, 0% tắt bóng đổ)
  const shadowScale = effShadowRatio / 0.7;

  for (let y = 0; y < h; y++) {
    const ny = y / h;
    const row = y * w;
    for (let x = 0; x < w; x++) {
      const nx = x / w;
      const idx = row + x;
      const pixelIdx = idx * 4;
      const topMaskAlpha = lineArtAlphaMask[idx];

      // 1. NẾU ĐIỂM ẢNH THUỘC LÕI MẶT NẠ LINE-ART (topMaskAlpha === 255):
      // Khóa cứng đường nét mực đen gốc của tác giả, tuyệt đối không cho bất kỳ màu nào tô đè hay làm nhòe nét!
      if (topMaskAlpha >= 250) {
        interactiveLabels[idx] = -1;
        colorData[pixelIdx] = inkCoreR;
        colorData[pixelIdx + 1] = inkCoreG;
        colorData[pixelIdx + 2] = inkCoreB;
        colorData[pixelIdx + 3] = 255;
        continue;
      }

      // 2. LỚP ĐỔ MÀU VÙNG KHÉP KÍN BÊN DƯỚI (CLOSED-REGION FLOOD-FILL & MULTI-TONE SHADING LAYER):
      // Mỗi điểm ảnh chỉ nhận duy nhất màu của vùng contour khép kín `regId` chứa nó
      const regId = labels[idx] > 0 ? labels[idx] : dilatedLabels[idx];
      interactiveLabels[idx] = regId;
      let fillR = 255;
      let fillG = 255;
      let fillB = 255;

      // Khoảng cách thực tế (tính bằng pixel) từ điểm ảnh hiện tại tới đường biên nét đen gần nhất
      const distPx = distField[idx] / 3.2;

      if (regId > 0) {
        const assigned = regionColorMap.get(regId);
        if (assigned) {
          const reg = regions[regId - 1];
          const role = assigned.role;
          fillR = assigned.midtone.r;
          fillG = assigned.midtone.g;
          fillB = assigned.midtone.b;

          if (role === "outer_margin") {
            fillR = 255;
            fillG = 255;
            fillB = 255;
          } else if (role === "sky" || role === "background") {
            // Chuyển màu bầu trời / tường đa tầng (Multi-Tone Atmospheric Sky Gradient)
            const skyGradWeight = Math.min(1, Math.max(0, ny * 0.96));
            const zenithTone = isTwilightOrMagical
              ? mixRgb(assigned.cellShadow, shadowSubtone, 0.32)
              : assigned.midtone;
            const horizonSky = mixRgb(
              assigned.softHighlight,
              highlightTint,
              isTwilightOrMagical ? 0.42 : 0.3
            );
            const midSky = mixRgb(
              assigned.midtone,
              assigned.companionGradientTone,
              0.28
            );
            const skyMix =
              skyGradWeight < 0.5
                ? mixRgb(zenithTone, midSky, skyGradWeight * 2)
                : mixRgb(midSky, horizonSky, (skyGradWeight - 0.5) * 2);

            fillR = skyMix.r;
            fillG = skyMix.g;
            fillB = skyMix.b;

            // Đổ bóng Ambient Occlusion nhẹ ở rìa khung cảnh để tăng chiều sâu không gian
            if (distPx < 10 && effShadowRatio > 0) {
              const bgAo =
                Math.pow(1 - distPx / 10, 1.8) *
                0.16 *
                Math.min(1.45, shadowScale);
              const shadedBg = mixRgb(
                { r: fillR, g: fillG, b: fillB },
                assigned.cellShadow,
                Math.min(0.65, bgAo)
              );
              fillR = shadedBg.r;
              fillG = shadedBg.g;
              fillB = shadedBg.b;
            }
          } else if (assigned.isBubble && reg) {
            // 2A. HIỆU ỨNG BỌT NƯỚC / BONG BÓNG XÀ PHÒNG PHÁT SÁNG (IRIDESCENT GLOW BUBBLE FX):
            // - Tâm trong trẻo pha trắng kem/ánh hồng phấn
            // - Viền bong bóng phản quang đa sắc (Hồng Magenta - Tím - Lam Ngọc)
            // - Điểm phản quang trắng tinh hình lưỡi liềm ở góc đón sáng trên-trái
            const rx = (x - reg.minX) / Math.max(1, reg.maxX - reg.minX);
            const ry = (y - reg.minY) / Math.max(1, reg.maxY - reg.minY);
            const dxNorm = (rx - 0.5) * 2;
            const dyNorm = (ry - 0.5) * 2;
            const radial = Math.min(1, Math.hypot(dxNorm, dyNorm));

            // Lõi bong bóng sáng trong trẻo
            const bubbleCore = mixRgb(
              { r: 255, g: 252, b: 250 },
              highlightTint,
              0.22
            );
            // Vành bong bóng cầu vồng (Iridescent Rim: Hồng phát sáng <-> Lam tím huyền ảo)
            const rimAngleWeight = Math.max(
              0,
              Math.min(1, (dxNorm * 0.65 + dyNorm * 0.75 + 1) * 0.5)
            );
            const iridescentRimColor = mixRgb(
              glowAuraColor,
              secondaryGlowAuraColor,
              rimAngleWeight
            );
            const rimFactor = Math.pow(radial, 1.45) * 0.78;
            let bubbleMix = mixRgb(bubbleCore, iridescentRimColor, rimFactor);

            // Điểm bắt sáng phản quang trắng sáng (Specular Crescent Highlight) ở góc trên-trái của bong bóng
            const specDist = Math.hypot(rx - 0.31, ry - 0.29);
            if (specDist < 0.24) {
              const specW = Math.pow(1 - specDist / 0.24, 1.5) * 0.92;
              bubbleMix = mixRgb(
                bubbleMix,
                { r: 255, g: 255, b: 255 },
                specW
              );
            } else {
              // Điểm phản quang phụ nhỏ ở góc dưới-phải
              const secSpecDist = Math.hypot(rx - 0.71, ry - 0.72);
              if (secSpecDist < 0.14) {
                const secSpecW =
                  Math.pow(1 - secSpecDist / 0.14, 1.6) * 0.55;
                bubbleMix = mixRgb(
                  bubbleMix,
                  { r: 255, g: 250, b: 255 },
                  secSpecW
                );
              }
            }

            fillR = bubbleMix.r;
            fillG = bubbleMix.g;
            fillB = bubbleMix.b;
          } else if (role === "cloud" && reg) {
            // Bọt xà phòng dày / Đám mây bồng bềnh đa sắc (Fluffy Foam & Cloud Multi-Tone Volume)
            const rx = (x - reg.minX) / Math.max(1, reg.maxX - reg.minX);
            const ry = (y - reg.minY) / Math.max(1, reg.maxY - reg.minY);
            const cloudTopGlow = mixRgb(
              { r: 255, g: 253, b: 250 },
              highlightTint,
              0.24
            );
            const cloudBottomShadow = mixRgb(
              assigned.midtone,
              glowAuraColor,
              0.36
            );
            const cloudMix = mixRgb(
              cloudTopGlow,
              cloudBottomShadow,
              Math.pow(Math.max(0, Math.min(1, ry)), 1.35) * 0.58
            );
            fillR = cloudMix.r;
            fillG = cloudMix.g;
            fillB = cloudMix.b;

            if (distPx < 9 && ry > 0.45 && effShadowRatio > 0) {
              const foamAo =
                Math.pow(1 - distPx / 9, 1.6) *
                0.28 *
                Math.min(1.45, shadowScale);
              const foamShaded = mixRgb(
                { r: fillR, g: fillG, b: fillB },
                assigned.cellShadow,
                Math.min(0.75, foamAo)
              );
              fillR = foamShaded.r;
              fillG = foamShaded.g;
              fillB = foamShaded.b;
            } else if (rx < 0.45 && ry < 0.42 && distPx >= 1.5 && distPx <= 6) {
              const foamRim = mixRgb(
                { r: fillR, g: fillG, b: fillB },
                { r: 255, g: 255, b: 255 },
                0.55
              );
              fillR = foamRim.r;
              fillG = foamRim.g;
              fillB = foamRim.b;
            }
          } else if (reg && reg.size > 36) {
            // 3. ĐỔ BÓNG ĐA SẮC & CHUYỂN MÀU GRADIENT MỊN MÀNG (OHUHU MULTI-TONE GRADIENT & 3D AMBIENT OCCLUSION):
            const rx = (x - reg.minX) / Math.max(1, reg.maxX - reg.minX);
            const ry = (y - reg.minY) / Math.max(1, reg.maxY - reg.minY);
            const lightProj =
              (rx - 0.5) * lightDirX + (ry - 0.5) * lightDirY;
            const crossProj =
              (rx - 0.5) * crossDirX + (ry - 0.5) * crossDirY;

            // Bước 3.1: Phối chuyển màu đa sắc mượt mà (Multi-Tone Companion Hue Blend)
            // Giúp mỗi vật thể/chiếc nơ/tán lá chuyển từ màu gốc sang màu phụ liền kề mềm mại như tô bút cồn Ohuhu
            if (crossProj > -0.15 && role !== "eye_white") {
              const companionW = Math.min(
                0.34,
                Math.max(0, (crossProj + 0.15) * 0.48)
              );
              const compBlend = mixRgb(
                { r: fillR, g: fillG, b: fillB },
                assigned.companionGradientTone,
                companionW
              );
              fillR = compBlend.r;
              fillG = compBlend.g;
              fillB = compBlend.b;
            }

            // Bước 3.2: Chuyển sắc Sáng -> Trung gian -> Tối theo hướng nguồn sáng (Directional Light-to-Shadow Gradient)
            if (lightProj < -0.04) {
              const gradW = Math.min(0.46, Math.abs(lightProj + 0.04) * 0.78);
              const lit = mixRgb(
                { r: fillR, g: fillG, b: fillB },
                assigned.softHighlight,
                gradW
              );
              fillR = lit.r;
              fillG = lit.g;
              fillB = lit.b;
            } else if (lightProj > 0.06 && effShadowRatio > 0) {
              const shadW = Math.min(
                0.72,
                (lightProj - 0.06) * 0.82 * shadowScale
              );
              const shadTarget =
                effShadowRatio >= 0.8
                  ? mixRgb(
                      assigned.cellShadow,
                      assigned.deepAccentShadow,
                      (effShadowRatio - 0.7) * 1.4
                    )
                  : assigned.cellShadow;
              const shad = mixRgb(
                { r: fillR, g: fillG, b: fillB },
                shadTarget,
                shadW
              );
              fillR = shad.r;
              fillG = shad.g;
              fillB = shad.b;
            }

            // Bước 3.3: Đổ bóng khối 3D mềm tại ranh giới nét vẽ (Soft 3D Ambient Occlusion Cushioning)
            // & Viền Phản Quang Phát Sáng (Luminous Rim Highlight) trên bề mặt đón sáng
            if (role !== "eye_white" && reg.size > 90) {
              const maxAoRadius = Math.min(
                14,
                Math.max(
                  4.5,
                  Math.min(reg.maxX - reg.minX, reg.maxY - reg.minY) * 0.26
                )
              );

              if (
                lightProj < -0.09 &&
                distPx >= 1.1 &&
                distPx <= 5.6 &&
                effHighlightRatio > 0
              ) {
                // Viền bắt sáng phản quang (Rim Highlight) dọc theo cạnh đón ánh sáng
                const rimBell = 1 - Math.abs(distPx - 3.1) / 2.6;
                const rimStrength = Math.min(
                  0.85,
                  Math.max(0, rimBell) *
                    Math.min(1, Math.abs(lightProj + 0.09) * 2.4) *
                    0.48 *
                    (effHighlightRatio / 0.8)
                );
                const rimmed = mixRgb(
                  { r: fillR, g: fillG, b: fillB },
                  assigned.rimHighlight,
                  rimStrength
                );
                fillR = rimmed.r;
                fillG = rimmed.g;
                fillB = rimmed.b;
              } else if (
                distPx < maxAoRadius &&
                lightProj > -0.14 &&
                effShadowRatio > 0
              ) {
                // Bóng đổ 3D mềm mại (Soft Ambient Occlusion) ôm theo đường nét khép kín phía khuất sáng
                const aoCurve = Math.pow(1 - distPx / maxAoRadius, 1.55);
                const directionalBoost = Math.max(
                  0.22,
                  Math.min(1, (lightProj + 0.25) * 1.15)
                );
                const aoWeight = Math.min(
                  0.78,
                  aoCurve * directionalBoost * 0.42 * shadowScale
                );
                const shadowTarget =
                  aoWeight > 0.22 || effShadowRatio >= 0.75
                    ? mixRgb(
                        assigned.cellShadow,
                        assigned.deepAccentShadow,
                        Math.min(0.85, 0.35 + effShadowRatio * 0.45)
                      )
                    : assigned.cellShadow;
                const aoShaded = mixRgb(
                  { r: fillR, g: fillG, b: fillB },
                  shadowTarget,
                  aoWeight
                );
                fillR = aoShaded.r;
                fillG = aoShaded.g;
                fillB = aoShaded.b;
              }
            }

            // Bước 3.4: Tâm phát sáng rực rỡ (Bright Glowing Core) cho các chi tiết đèn, sao, mặt trời, nhụy hoa
            if (
              assigned.isGlowEmitter ||
              role === "sun" ||
              role === "flower_center"
            ) {
              const radial = Math.hypot(rx - 0.5, ry - 0.5) * 2;
              if (radial < 0.78) {
                const coreFalloff = Math.pow(1 - radial / 0.78, 1.45);
                const glowCoreTarget = assigned.isGlowEmitter
                  ? { r: 255, g: 253, b: 242 }
                  : mixRgb(highlightTint, { r: 255, g: 250, b: 225 }, 0.55);
                const warmCore = mixRgb(
                  { r: fillR, g: fillG, b: fillB },
                  glowCoreTarget,
                  coreFalloff * (assigned.isGlowEmitter ? 0.76 : 0.48)
                );
                fillR = warmCore.r;
                fillG = warmCore.g;
                fillB = warmCore.b;
              }
            }

            // Bước 3.5: BỘ MÁY TÔ MÀU CHUYÊN SÂU THEO TỪNG BƯỚC & TÙY CHỈNH HIỆU ỨNG (ADVANCED EFFECT CUSTOMIZATION ENGINE)
            // Tích hợp: (A) Multi-layer Shading (shadow_depth), (B) Stippling Density & Texture Lines (stippling_density, texture_lines), (C) White Gel Pen Highlights (white_highlights)
            if (role !== "eye_white" && reg.size > 65) {
              // (A) MULTI-LAYER SHADING (Đổ bóng nhiều lớp cho nếp gấp & vùng khuất sáng theo thanh trượt shadow_depth):
              if (
                effShadowRatio > 0.15 &&
                (isStepByStepMarkerStyle || effShadowRatio > 0.45)
              ) {
                if (lightProj > 0.14 || (distPx < 5.2 && lightProj > 0.02)) {
                  const baseLayer2 =
                    lightProj > 0.24
                      ? 0.34
                      : lightProj > 0.14
                      ? 0.2
                      : Math.max(0, (1 - distPx / 5.2) * 0.24);
                  const styleBoost = isStepByStepMarkerStyle ? 1.0 : 0.75;
                  const layer2Weight = Math.min(
                    0.68,
                    baseLayer2 * shadowScale * styleBoost
                  );
                  const multiShade = mixRgb(
                    { r: fillR, g: fillG, b: fillB },
                    assigned.deepAccentShadow,
                    layer2Weight
                  );
                  fillR = multiShade.r;
                  fillG = multiShade.g;
                  fillB = multiShade.b;
                }
              }

              // (B1) TEXTURE DOTS / STIPPLING DENSITY (Mật độ hạt chấm texture theo thanh trượt stippling_density 0% - 100%):
              const cellX = Math.floor(x / 3);
              const cellY = Math.floor(y / 3);
              const dotHash =
                (((cellX * 73856093) ^
                  (cellY * 19349663) ^
                  (regId * 83492791)) >>>
                  0) %
                1000;
              const subX = (x % 3) - 1;
              const subY = (y % 3) - 1;
              const isDotCenter = subX * subX + subY * subY <= 1;

              if (effStippleRatio > 0 && isDotCenter && distPx > 1.5) {
                // Hệ số mật độ hạt chấm (mặc định 40% = 0.40)
                const stippleDensityMult = isFrostyStippling
                  ? Math.max(0.35, effStippleRatio * 2.1)
                  : effStippleRatio * 1.35;
                const shadowStippleThreshold = Math.max(
                  15,
                  Math.min(
                    680,
                    Math.round((lightProj + 0.32) * 460 * stippleDensityMult)
                  )
                );
                if (dotHash < shadowStippleThreshold) {
                  const stippleTone =
                    dotHash % 3 === 0
                      ? assigned.deepAccentShadow
                      : assigned.cellShadow;
                  const stippleAlpha = isFrostyStippling
                    ? Math.min(0.65, 0.28 + effStippleRatio * 0.42)
                    : Math.min(0.52, 0.14 + effStippleRatio * 0.36);
                  const stippled = mixRgb(
                    { r: fillR, g: fillG, b: fillB },
                    stippleTone,
                    stippleAlpha
                  );
                  fillR = stippled.r;
                  fillG = stippled.g;
                  fillB = stippled.b;
                } else if (
                  (isFrostyStippling || effStippleRatio >= 0.55) &&
                  lightProj < -0.05 &&
                  dotHash > Math.max(620, 940 - Math.round(effStippleRatio * 340))
                ) {
                  // Đốm hạt xốp sáng (Frosty Light Stipple Dots) ở vùng đón sáng
                  const frostyDot = mixRgb(
                    { r: fillR, g: fillG, b: fillB },
                    { r: 255, g: 255, b: 255 },
                    Math.min(0.62, 0.25 + effStippleRatio * 0.4)
                  );
                  fillR = frostyDot.r;
                  fillG = frostyDot.g;
                  fillB = frostyDot.b;
                }
              }

              // (B2) TEXTURE LINES / FUR / VEINS (Vân nổi chi tiết theo nút bật/tắt texture_lines):
              if (effTextureLines) {
                if (isCozyMarkerFur) {
                  // Phong cách 2: Cozy Marker & Fur / Bút dạ lông & Đổ bóng khối (Vân lông ngắn, sọc ấm & khối 3D rõ rệt)
                  const furAngle =
                    Math.sin(rx * 18 + ry * 6 + regId) * 0.65 +
                    Math.cos((x * 0.45 - y * 0.25) * 1.3);
                  const furTuftHash =
                    (((Math.floor(x / 2) * 374761393) ^
                      (Math.floor(y / 4) * 668265263)) >>>
                      0) %
                    100;
                  if (furAngle > 0.85 && furTuftHash < 42) {
                    const furStroke = mixRgb(
                      { r: fillR, g: fillG, b: fillB },
                      lightProj > 0
                        ? assigned.deepAccentShadow
                        : assigned.cellShadow,
                      0.32
                    );
                    fillR = furStroke.r;
                    fillG = furStroke.g;
                    fillB = furStroke.b;
                  } else if (
                    furAngle < -0.88 &&
                    furTuftHash < 35 &&
                    lightProj < 0.08
                  ) {
                    const furHighlight = mixRgb(
                      { r: fillR, g: fillG, b: fillB },
                      assigned.rimHighlight,
                      0.36
                    );
                    fillR = furHighlight.r;
                    fillG = furHighlight.g;
                    fillB = furHighlight.b;
                  }
                } else if (isWaterFlowing) {
                  // Phong cách 3: Water/Flowing Gradient / Dòng chảy uốn lượn (Đường lượn sóng mềm mại cho nước, mây & bề mặt)
                  const flowWave = Math.sin(
                    rx * 16 + Math.sin(ry * 10 + regId * 0.5) * 2.1 + ry * 8
                  );
                  if (flowWave > 0.68) {
                    const crestMix = mixRgb(
                      { r: fillR, g: fillG, b: fillB },
                      assigned.rimHighlight,
                      (flowWave - 0.68) * 1.15
                    );
                    fillR = crestMix.r;
                    fillG = crestMix.g;
                    fillB = crestMix.b;
                  } else if (flowWave < -0.68) {
                    const troughMix = mixRgb(
                      { r: fillR, g: fillG, b: fillB },
                      assigned.cellShadow,
                      Math.abs(flowWave + 0.68) * 0.95
                    );
                    fillR = troughMix.r;
                    fillG = troughMix.g;
                    fillB = troughMix.b;
                  }
                } else if (isBotanicalLayered) {
                  // Phong cách 4: Botanical Layered / Hoa lá chi tiết (Gân lá, gân cánh hoa màu đậm & chấm phấn nhụy)
                  const dxCenter = rx - 0.5;
                  const dyBase = ry - 0.85;
                  const veinWave = Math.abs(
                    Math.sin((dxCenter * 22 + dyBase * 12) * Math.PI)
                  );
                  const centerRib =
                    Math.abs(dxCenter) < 0.028 && ry > 0.2 && ry < 0.92;
                  if (
                    (centerRib || (veinWave < 0.09 && distPx > 2.2)) &&
                    reg.size > 110
                  ) {
                    const veined = mixRgb(
                      { r: fillR, g: fillG, b: fillB },
                      assigned.deepAccentShadow,
                      centerRib ? 0.38 : 0.24
                    );
                    fillR = veined.r;
                    fillG = veined.g;
                    fillB = veined.b;
                  } else if (isDotCenter && dotHash < 95 && ry < 0.45) {
                    const pollenDot = mixRgb(
                      { r: fillR, g: fillG, b: fillB },
                      { r: 255, g: 252, b: 230 },
                      0.55
                    );
                    fillR = pollenDot.r;
                    fillG = pollenDot.g;
                    fillB = pollenDot.b;
                  }
                } else if (!isFrostyStippling && reg.size > 160 && distPx > 2.4) {
                  // Đường vân cọ marker mảnh nhẹ (Subtle Marker Brush / Vein Lines) cho các phong cách khác khi bật Vân nổi chi tiết
                  const strokeWave = Math.sin(
                    (rx * 14 - ry * 9 + regId * 0.3) * Math.PI
                  );
                  if (strokeWave > 0.92 && dotHash < 280) {
                    const brushLine = mixRgb(
                      { r: fillR, g: fillG, b: fillB },
                      lightProj > 0
                        ? assigned.cellShadow
                        : assigned.softHighlight,
                      0.16
                    );
                    fillR = brushLine.r;
                    fillG = brushLine.g;
                    fillB = brushLine.b;
                  }
                }
              }

              // (C) WHITE GEL PEN HIGHLIGHTS (Đánh sáng bằng bút Gel trắng theo thanh trượt white_highlights 0% - 100%):
              if (effHighlightRatio > 0 && reg.size > 130) {
                // Vệt sáng bút Gel trắng dọc theo đường viền đón sáng (White Gel Pen Contour Rim Dash)
                const maxGelBandWidth =
                  2.2 +
                  effHighlightRatio * (isStepByStepMarkerStyle ? 1.8 : 1.3);
                const isGelRimBand =
                  lightProj < -0.14 - (1 - effHighlightRatio) * 0.12 &&
                  distPx >= 1.9 &&
                  distPx <= maxGelBandWidth;
                const dashThreshold = Math.max(
                  4,
                  Math.min(17, Math.round(effHighlightRatio * 17))
                );
                const dashPattern =
                  ((x + y + regId * 7) % 19) < dashThreshold;
                if (isGelRimBand && dashPattern) {
                  const gelStrength = Math.min(
                    0.96,
                    (isStepByStepMarkerStyle ? 0.45 : 0.32) +
                      effHighlightRatio * 0.52
                  );
                  const gelRim = mixRgb(
                    { r: fillR, g: fillG, b: fillB },
                    { r: 255, g: 255, b: 255 },
                    gelStrength
                  );
                  fillR = gelRim.r;
                  fillG = gelRim.g;
                  fillB = gelRim.b;
                }

                // Đốm sáng ngôi sao 4 cánh / Chấm sáng đôi bút Gel trắng tại đỉnh khối 3D (White Gel Pen Star Sparkle)
                if (
                  (isStepByStepMarkerStyle || effHighlightRatio >= 0.45) &&
                  reg.size > Math.max(180, Math.round(420 - effHighlightRatio * 220))
                ) {
                  const starRadius = 2.6 + effHighlightRatio * 2.4;
                  const peakX = reg.minX + (reg.maxX - reg.minX) * 0.29;
                  const peakY = reg.minY + (reg.maxY - reg.minY) * 0.27;
                  const dxPeak = Math.abs(x - peakX);
                  const dyPeak = Math.abs(y - peakY);
                  const isStarCross =
                    (dxPeak <= 1.2 && dyPeak <= starRadius) ||
                    (dyPeak <= 1.2 && dxPeak <= starRadius) ||
                    dxPeak + dyPeak <= starRadius * 0.58;
                  if (isStarCross && distPx > 2.2) {
                    const starFade = Math.max(
                      0.35,
                      1 - Math.hypot(dxPeak, dyPeak) / (starRadius + 0.4)
                    );
                    const starAlpha = Math.min(
                      0.98,
                      starFade * (0.38 + effHighlightRatio * 0.6)
                    );
                    const gelStar = mixRgb(
                      { r: fillR, g: fillG, b: fillB },
                      { r: 255, g: 255, b: 255 },
                      starAlpha
                    );
                    fillR = gelStar.r;
                    fillG = gelStar.g;
                    fillB = gelStar.b;
                  }
                }
              }
            }
          }

          // 4. LỚP PHỦ ÁNH SÁNG MÔI TRƯỜNG ĐỒNG BỘ (GLOBAL AMBIENT LIGHTING OVERLAY) & QUẦNG SÁNG MỜ (RADIAL GLOW AURA):
          if (role !== "outer_margin") {
            // 4A. Phủ lớp ánh sáng môi trường toàn cục (Ambient Lighting Overlay) giúp toàn bộ vật thể hòa quyện
            if (!assigned.hasDirectOverride) {
              const sceneLightProj =
                (nx - 0.5) * lightDirX + (ny - 0.5) * lightDirY;
              const envWeight = isTwilightOrMagical ? 0.14 : 0.08;
              const envTarget =
                sceneLightProj < 0
                  ? mixRgb(highlightTint, ambientOverlayTint, 0.5)
                  : mixRgb(shadowSubtone, ambientOverlayTint, 0.4);
              const envOverlaid = mixRgb(
                { r: fillR, g: fillG, b: fillB },
                envTarget,
                Math.min(
                  envWeight,
                  Math.abs(sceneLightProj) * envWeight * 1.65
                )
              );
              fillR = envOverlaid.r;
              fillG = envOverlaid.g;
              fillB = envOverlaid.b;
            }

            // 4B. Hòa trộn Quầng Sáng Mờ (Soft Radial Glow Aura) tỏa ra từ Bong bóng, Ánh sao, Đèn
            const auraA = glowAuraAlpha[idx];
            if (auraA > 0.005) {
              const effAura = assigned.hasDirectOverride ? auraA * 0.35 : auraA;
              const ar = glowAuraR[idx];
              const ag = glowAuraG[idx];
              const ab = glowAuraB[idx];
              // Hòa trộn kiểu Screen + Soft Glow để tạo quầng sáng hồng/tím/vàng lung linh
              const screenedR = 255 - ((255 - fillR) * (255 - ar)) / 255;
              const screenedG = 255 - ((255 - fillG) * (255 - ag)) / 255;
              const screenedB = 255 - ((255 - fillB) * (255 - ab)) / 255;
              const glowTargetR = screenedR * 0.65 + ar * 0.35;
              const glowTargetG = screenedG * 0.65 + ag * 0.35;
              const glowTargetB = screenedB * 0.65 + ab * 0.35;

              fillR = clampByte(fillR * (1 - effAura) + glowTargetR * effAura);
              fillG = clampByte(fillG * (1 - effAura) + glowTargetG * effAura);
              fillB = clampByte(fillB * (1 - effAura) + glowTargetB * effAura);
            }

            // 4C. Tâm hạt sáng / ánh sao lấp lánh trên nền trời (Starlight Twinkle Core)
            const starW = starCoreBoost[idx];
            if (starW > 0.01 && !assigned.hasDirectOverride) {
              fillR = clampByte(fillR * (1 - starW) + 255 * starW);
              fillG = clampByte(fillG * (1 - starW) + 252 * starW);
              fillB = clampByte(fillB * (1 - starW) + 245 * starW);
            }
          }
        }
      }

      // 5. ĐẶT LỚP MẶT NẠ LINE-ART (ALPHA / MULTIPLY MASK) LÊN TRÊN CÙNG:
      // Hòa trộn viền chống răng cưa của nét vẽ gốc đè lên lớp màu Flood-Fill bên dưới,
      // giúp biên nét đen sắc nét 100%, không hở viền trắng và không bao giờ nhòe màu!
      if (topMaskAlpha > 0) {
        const aNorm = topMaskAlpha / 255;
        colorData[pixelIdx] = clampByte(
          fillR * (1 - aNorm) + inkCoreR * aNorm
        );
        colorData[pixelIdx + 1] = clampByte(
          fillG * (1 - aNorm) + inkCoreG * aNorm
        );
        colorData[pixelIdx + 2] = clampByte(
          fillB * (1 - aNorm) + inkCoreB * aNorm
        );
      } else {
        colorData[pixelIdx] = fillR;
        colorData[pixelIdx + 1] = fillG;
        colorData[pixelIdx + 2] = fillB;
      }
      colorData[pixelIdx + 3] = 255;
    }
  }

  colorCtx.putImageData(colorImageData, 0, 0);

  if (detectedObjects.length === 0) {
    const fallbackItems: Array<{ id: string; labelVi: string; defaultRgb: RGB; roles: SemanticRole[] }> = [
      {
        id: "main_character",
        labelVi: "Nhân vật chính",
        defaultRgb: mainCharDefaultColor,
        roles: ["main_character"],
      },
      {
        id: "secondary_character",
        labelVi: "Nhân vật phụ / Vật dụng",
        defaultRgb: secondary30[0],
        roles: ["secondary_character"],
      },
      {
        id: "nature_plant",
        labelVi: "Cây cối & Lá",
        defaultRgb: effectiveBotanicalPool[0],
        roles: ["leaves", "tree_canopy"],
      },
      {
        id: "flowers",
        labelVi: "Hoa & Điểm nhấn",
        defaultRgb: accent10[0],
        roles: ["flower_petal", "flowers"],
      },
      {
        id: "background_wall_sky",
        labelVi: "Bầu trời / Tường nền",
        defaultRgb: wallOrSkyBaseTone,
        roles: ["sky", "background"],
      },
      {
        id: "background_floor_ground",
        labelVi: "Sàn nhà / Mặt đất",
        defaultRgb: floorOrGroundBaseTone,
        roles: ["floor_ground"],
      },
    ];

    for (const item of fallbackItems) {
      const normLabel = item.labelVi.toLowerCase();
      const userHex = normalizedUserObjectColors.get(normLabel);
      const roleCustom = item.roles
        .map((r) => roleCustomColors.get(r)?.[0])
        .find(Boolean);
      const finalHex =
        userHex || (roleCustom ? rgbToHex(roleCustom) : rgbToHex(item.defaultRgb));
      const isOverride = Boolean(userHex || roleCustom);
      detectedObjects.push({
        id: item.id,
        labelVi: item.labelVi,
        primaryHex: finalHex,
        isUserOverride: isOverride,
      });
      detectedObjectsSummary.push(
        `${item.labelVi}: ${finalHex}${isOverride ? " (Ưu tiên theo yêu cầu)" : ""}`
      );
    }
  }

  // Đảm bảo mọi thẻ đối tượng người dùng tự thêm mới hoặc sửa tên trong userObjectColors đều xuất hiện trong detectedObjects
  const existingNormLabels = new Set(
    detectedObjects.map((d) => d.labelVi.trim().toLowerCase())
  );
  let customTagIdx = 1;
  for (const [normKey, hexVal] of Array.from(
    normalizedUserObjectColors.entries()
  )) {
    if (!existingNormLabels.has(normKey)) {
      const displayLabel =
        rawUserObjectDisplayNames.get(normKey) ||
        normKey.charAt(0).toUpperCase() + normKey.slice(1);
      detectedObjects.push({
        id: `custom_tag_${customTagIdx++}`,
        labelVi: displayLabel,
        primaryHex: hexVal,
        isUserOverride: true,
      });
      detectedObjectsSummary.push(
        `${displayLabel}: ${hexVal} (Ưu tiên theo yêu cầu)`
      );
      existingNormLabels.add(normKey);
    }
  }

  // Xây dựng Bản Đồ Phân Đoạn Tương Tác (Interactive Segmentation Map) phục vụ Click & Hover trực tiếp trên Canvas
  const getRoleVietnameseName = (role: SemanticRole, id: number): string => {
    switch (role) {
      case "main_character":
        return "Nhân vật chính";
      case "secondary_character":
        return "Nhân vật phụ / Vật dụng";
      case "sky":
      case "background":
        return "Bầu trời / Tường nền";
      case "floor_ground":
        return "Sàn nhà / Mặt đất";
      case "cloud":
        return "Đám mây";
      case "sun":
      case "sun_ray":
        return "Mặt trời / Tia nắng";
      case "flower_petal":
      case "flowers":
        return "Hoa & Điểm nhấn";
      case "flower_center":
        return "Nhụy hoa";
      case "tree_canopy":
      case "leaves":
        return "Cây cối & Lá";
      case "tree_trunk":
        return "Thân cây gỗ";
      case "grass_ground":
        return "Thảm cỏ";
      case "mountain":
        return "Đồi núi";
      case "skin":
        return "Làn da";
      case "eye_iris":
      case "eye_white":
        return "Đôi mắt";
      case "lips":
        return "Đôi môi";
      case "bird":
      case "accent":
        return "Chi tiết điểm nhấn";
      case "outer_margin":
        return "Viền lề trang giấy";
      default:
        return `Vùng chi tiết #${id}`;
    }
  };

  const interactiveRegions: InteractiveRegionMeta[] = regions.map((reg) => {
    const assignedShading = regionColorMap.get(reg.id);
    const colorHex = assignedShading
      ? rgbToHex(assignedShading.midtone)
      : "#FFFFFF";
    const roleLabelVi = getRoleVietnameseName(reg.role, reg.id);

    let matchedObjectId: string | undefined = regionAssignedObjId.get(reg.id);
    let matchedObjectLabelVi: string | undefined = matchedObjectId
      ? objById.get(matchedObjectId)?.labelVi
      : undefined;

    // Nếu vùng chưa gán trực tiếp trong regionAssignedObjId, kiểm tra tọa độ tâm trong activeSceneObjects hoặc ánh xạ theo role
    if (!matchedObjectLabelVi && reg.role !== "outer_margin") {
      const rCx = reg.cx * 1000;
      const rCy = reg.cy * 1000;
      let bestTightObj: DetectedObjectColorMapping | undefined;
      let bestArea = Infinity;

      for (const obj of activeSceneObjects) {
        const isBg =
          obj.category === "background_wall_sky" ||
          obj.category === "background_floor_ground";
        if (isBg) continue;
        if (reg.role === "sky" || reg.role === "floor_ground") continue;
        const [ymin, xmin, ymax, xmax] = obj.box_2d;
        if (rCx >= xmin && rCx <= xmax && rCy >= ymin && rCy <= ymax) {
          const area = Math.max(1, (xmax - xmin) * (ymax - ymin));
          if (area < bestArea) {
            bestArea = area;
            bestTightObj = obj;
          }
        }
      }

      if (bestTightObj) {
        matchedObjectId = bestTightObj.id;
        matchedObjectLabelVi = bestTightObj.labelVi;
      } else {
        // Ánh xạ với thẻ tương ứng trong detectedObjects theo ngữ nghĩa (sky, floor_ground, main_character, nature_plant...)
        const fallbackBadge = detectedObjects.find((d) => {
          const dl = d.labelVi.toLowerCase();
          if (
            (reg.role === "sky" || reg.role === "background") &&
            (d.id === "background_wall_sky" ||
              /(bầu trời|tường|nền trên)/i.test(dl))
          ) {
            return true;
          }
          if (
            reg.role === "floor_ground" &&
            (d.id === "background_floor_ground" ||
              /(tuyết|sàn|mặt đất|thảm)/i.test(dl))
          ) {
            return true;
          }
          if (
            reg.role === "main_character" &&
            (d.id === "main_character" || /(nhân vật chính)/i.test(dl))
          ) {
            return true;
          }
          if (
            (reg.role === "leaves" || reg.role === "tree_canopy") &&
            (d.id === "nature_plant" || /(cây|lá|bồn hoa)/i.test(dl))
          ) {
            return true;
          }
          if (
            (reg.role === "flower_petal" || reg.role === "flowers") &&
            (d.id === "flowers" || /(hoa)/i.test(dl))
          ) {
            return true;
          }
          return false;
        });
        if (fallbackBadge) {
          matchedObjectId = fallbackBadge.id;
          matchedObjectLabelVi = fallbackBadge.labelVi;
        }
      }
    }

    const isRegionOverride = Boolean(
      options.userRegionColors?.[reg.id] &&
        /^#[0-9A-Fa-f]{6}$/.test(options.userRegionColors[reg.id].trim())
    );
    const isObjectOverride =
      !isRegionOverride &&
      Boolean(
        (options.userObjectRegionColors?.[reg.id] &&
          /^#[0-9A-Fa-f]{6}$/.test(
            options.userObjectRegionColors[reg.id].trim()
          )) ||
          aiRegionColorOverride.get(reg.id)?.isUserOverride
      );

    return {
      id: reg.id,
      minX: reg.minX,
      maxX: reg.maxX,
      minY: reg.minY,
      maxY: reg.maxY,
      cx: reg.cx,
      cy: reg.cy,
      size: reg.size,
      role: reg.role,
      roleLabelVi,
      colorHex,
      objectId: matchedObjectId,
      objectLabelVi: matchedObjectLabelVi,
      isRegionOverride,
      isObjectOverride,
    };
  });

  return {
    imageUrl: colorCanvas.toDataURL("image/png", 0.98),
    regionsDetected: regions.length,
    width: w,
    height: h,
    interactiveMap: {
      width: w,
      height: h,
      labels: interactiveLabels,
      regions: interactiveRegions,
    },
    appliedSummary: {
      goldenRatios: ratios,
      dominantColors: dominant60.slice(0, 3).map(rgbToHex),
      auxiliaryColors: secondary30.slice(0, 3).map(rgbToHex),
      accentColors: accent10.slice(0, 2).map(rgbToHex),
      skinToneHex: rgbToHex(skinSystem.base),
      highlightToneHex: rgbToHex(highlightTint),
      shadowSubtoneHex: rgbToHex(shadowSubtone),
      colorWheelRule: colorWheelRuleName,
      parsedVietnameseRules: vnParsed.summaryList,
      detectedObjectsSummary,
      detectedObjects,
    },
  };
}
