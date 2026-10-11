export type ColoringStyle =
  | "Cute"
  | "Kawaii"
  | "Pastel"
  | "Cozy"
  | "Anime"
  | "Vintage"
  | "Fantasy"
  | "Watercolor"
  | "Custom";

export type BasePalette =
  | "Pink"
  | "Purple"
  | "Blue"
  | "Green"
  | "Warm"
  | "Cool"
  | "Vintage"
  | "Pastel"
  | "Neutral"
  | "Retro"
  | "Cyberpunk"
  | "Cinematic"
  | "Boho"
  | "Luxury"
  | "Custom";

export type MoodType =
  | "Cute"
  | "Cozy"
  | "Warm"
  | "Dreamy"
  | "Magical"
  | "Peaceful"
  | "Vibrant"
  | "Nostalgic";

export type LightingType =
  | "Daylight"
  | "Soft light"
  | "Sunset"
  | "Golden hour"
  | "Warm indoor"
  | "Night"
  | "Moonlight";

export type ColorModeType =
  | "ai_harmony" // AI tự phối màu
  | "strict_palette" // Bám sát palette
  | "dominant_accent" // Ưu tiên màu chủ đạo
  | "artistic_contrast"; // Tương phản nghệ thuật

export interface NamedPalette {
  id: string;
  name: string;
  description: string;
  colors: string[]; // HEX array
  dominantColor: string;
  accentColors: string[];
  styleGroup: string;
  tags?: string[];
}

export interface CustomGoldenRatioConfig {
  enabled?: boolean;
  ratios: {
    dominant: number; // Mặc định 60 (%)
    secondary: number; // Mặc định 30 (%)
    accent: number; // Mặc định 10 (%)
  };
  dominantColors?: string[]; // Mảng HEX nhóm Chủ đạo (60%)
  secondaryColors?: string[]; // Mảng HEX nhóm Màu phụ (30%)
  accentColors?: string[]; // Mảng HEX nhóm Màu nhấn (10%)
  skinToneHex?: string; // Mã HEX Sắc độ da & Undertone
  highlightToneHex?: string; // Mã HEX Vùng sáng (Highlight)
  shadowSubtoneHex?: string; // Mã HEX Vùng tối bổ túc (Shadow)
}

export interface ColoringConfig {
  style: ColoringStyle;
  customStyle?: string;
  palette: BasePalette;
  namedPaletteId?: string;
  customPaletteColors?: string[];
  customGoldenRatio?: CustomGoldenRatioConfig;
  mood: MoodType;
  lighting: LightingType;
  colorMode: ColorModeType;
  customInstruction?: string;
}

export interface GenerationMetadata {
  id: string;
  projectId?: string;
  originalImageKey?: string;
  generatedImageUrl: string;
  prompt: string;
  provider: string;
  model?: string;
  isMock: boolean;
  config: ColoringConfig;
  status: "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED";
  createdAt: string;
}

export interface InspirationCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface InspirationConceptItem {
  id: string;
  categoryId: string;
  categoryName?: string;
  title: string;
  description: string;
  imageUrl: string;
  lineArtUrl?: string;
  suggestedStyle: string; // Phong cách nghệ thuật đặc trưng cho từng chủ đề
  suggestedPalette: BasePalette;
  namedPaletteName?: string;
  paletteColors: string[]; // Mảng mã màu HEX trực quan hiển thị trên thẻ
  mood: MoodType;
  lighting: LightingType;
  tags: string[];
  isPopular?: boolean;
  isNew?: boolean;
}

export interface ChallengeItem {
  id: string;
  title: string;
  description: string;
  topic: string;
  startDate: string;
  endDate: string;
  suggestedPalette: string[];
  suggestedStyle: ColoringStyle;
  sampleLineArtUrl?: string;
  participantCount?: number;
  badgeName?: string;
}

export interface FreebieItem {
  id: string;
  title: string;
  category: "line-art" | "wallpaper" | "palette-card" | "guide";
  thumbnailUrl: string;
  downloadUrl?: string;
  format: "PNG" | "SVG" | "PDF";
  dimensions?: string;
  lineArtData?: string; // Inline SVG or base64 data for 1-click loading into Studio
  license: string;
}

export interface TutorialStepItem {
  step_number: number;
  level_badge?: string;
  title?: string;
  image_url: string;
  marker_codes?: string[];
  description: string;
}

export interface ArticleItem {
  id: string;
  title: string;
  slug: string;
  summary: string;
  readTime: string;
  category:
    | "Fundamentals"
    | "Techniques"
    | "Color Palettes"
    | "Inspiration"
    | "Visual Tutorial";
  coverColor: string;
  cover_image?: string;
  palette_used?: string[];
  steps?: TutorialStepItem[];
  content: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    text: string;
    description: string;
    icon: string;
    result: {
      style: ColoringStyle;
      palette: BasePalette;
      mood: MoodType;
      lighting: LightingType;
      paletteName: string;
    };
  }[];
}
