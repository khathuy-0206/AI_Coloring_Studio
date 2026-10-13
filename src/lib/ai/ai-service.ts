import { ColoringConfig } from "@/types";
import { ColoringPromptBuilder } from "../prompt-builder";

export interface GenerateColoringParams {
  imageBase64: string; // Data URL or base64
  mimeType: string;
  config: ColoringConfig;
  namedPaletteName?: string;
  paletteColors?: string[];
  userObjectColors?: Record<string, string>;
  relabeledObjectsList?: string[];
  deletedObjectLabels?: string[];
}

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

export interface ColoringServiceResult {
  imageUrl: string;
  prompt: string;
  provider: string;
  model: string;
  isMock: boolean;
  notes?: string;
  aiVietnameseInstruction?: string;
  aiSceneAnalysis?: AISceneAnalysis;
}

export interface AIImageService {
  name: string;
  generateColoring(
    params: GenerateColoringParams
  ): Promise<ColoringServiceResult>;
  validateImage(imageBuffer: Buffer, mimeType: string): Promise<boolean>;
}

/**
 * Mock AI Service for local development and testing without API costs.
 */
export class MockAIImageService implements AIImageService {
  name = "MockAIImageService";

  async validateImage(
    imageBuffer: Buffer,
    mimeType: string
  ): Promise<boolean> {
    const validMimes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
    return validMimes.includes(mimeType) && imageBuffer.length > 0;
  }

  async generateColoring(
    params: GenerateColoringParams
  ): Promise<ColoringServiceResult> {
    const prompt = ColoringPromptBuilder.buildPrompt({
      style: params.config.style,
      customStyle: params.config.customStyle,
      palette: params.config.palette,
      namedPaletteName: params.namedPaletteName,
      paletteColors: params.paletteColors,
      mood: params.config.mood,
      lighting: params.config.lighting,
      colorMode: params.config.colorMode,
      customInstruction: params.config.customInstruction,
      userObjectColors: params.userObjectColors,
      customGoldenRatio: params.config.customGoldenRatio,
      effectSettings: params.config.effectSettings,
      relabeledObjectsList: params.relabeledObjectsList,
    });

    await new Promise((resolve) => setTimeout(resolve, 200));

    const inputImgUrl = params.imageBase64.startsWith("data:")
      ? params.imageBase64
      : `data:${params.mimeType};base64,${params.imageBase64}`;

    return {
      imageUrl: inputImgUrl,
      prompt,
      provider: "mock",
      model: "smart-lineart-engine-v4",
      isMock: true,
      notes:
        "Được xử lý bởi Động cơ Nhận diện Đối tượng & Phân bổ Bảng màu theo Bối cảnh (Local Smart Engine).",
    };
  }
}

/**
 * Google Gemini AI Image & Vision Coloring Service
 * Thực thi Quy trình Nhận diện Đối tượng Động (Universal Object Segmentation), Hiệu chỉnh Nhãn Đối Tượng (Strict Re-Labeling Rule) & Tỷ lệ Golden Ratio 3 Cấp độ Ưu tiên:
 * - Ưu tiên số 1 (User Object Override & Re-Labeling - user_object_colors)
 * - Ưu tiên số 2 (Custom Golden Ratio & Palette Rules - custom_golden_ratio)
 * - Ưu tiên số 3 (Real-world Logic)
 */
export class GeminiAIImageService implements AIImageService {
  name = "GeminiAIImageService";
  private apiKey: string;
  private model: string;

  constructor(apiKey: string, model = "gemini-flash-latest") {
    this.apiKey = apiKey;
    this.model = model;
  }

  async validateImage(
    imageBuffer: Buffer,
    mimeType: string
  ): Promise<boolean> {
    const validMimes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
    return validMimes.includes(mimeType) && imageBuffer.length > 0;
  }

  async generateColoring(
    params: GenerateColoringParams
  ): Promise<ColoringServiceResult> {
    const prompt = ColoringPromptBuilder.buildPrompt({
      style: params.config.style,
      customStyle: params.config.customStyle,
      palette: params.config.palette,
      namedPaletteName: params.namedPaletteName,
      paletteColors: params.paletteColors,
      mood: params.config.mood,
      lighting: params.config.lighting,
      colorMode: params.config.colorMode,
      customInstruction: params.config.customInstruction,
      userObjectColors: params.userObjectColors,
      customGoldenRatio: params.config.customGoldenRatio,
      effectSettings: params.config.effectSettings,
      relabeledObjectsList: params.relabeledObjectsList,
    });

    const cleanBase64 = params.imageBase64.replace(
      /^data:image\/[a-zA-Z0-9+.-]+;base64,/,
      ""
    );
    const effectiveMime =
      params.mimeType === "image/svg+xml" ? "image/png" : params.mimeType;

    const userObjectColorsObj = params.userObjectColors || {};
    const userObjectColorsJson = JSON.stringify(userObjectColorsObj);
    const customGoldenRatioJson = JSON.stringify(
      params.config.customGoldenRatio || {
        ratios: { dominant: 60, secondary: 30, accent: 10 },
      }
    );

    const formattedRelabeledList =
      params.relabeledObjectsList && params.relabeledObjectsList.length > 0
        ? `[${params.relabeledObjectsList.join(", ")}]`
        : Object.keys(userObjectColorsObj).length > 0
        ? `[${Object.entries(userObjectColorsObj)
            .map(([k, v]) => `${k}: ${v}`)
            .join(", ")}]`
        : "[]";

    const strictRelabelingSentence =
      Object.keys(userObjectColorsObj).length > 0 ||
      (params.relabeledObjectsList && params.relabeledObjectsList.length > 0)
        ? `GHI ĐÈ TÊN ĐỐI TƯỢNG (STRICT RE-LABELING RULE): Người dùng đã hiệu chỉnh lại danh sách nhận diện đối tượng thành: ${formattedRelabeledList}. AI bắt buộc phải định vị đối tượng theo mô tả chi tiết mới này và phủ chính xác mã màu được gán, không được dùng kết quả nhận diện tự động ban đầu.`
        : "";

    // QUY TRÌNH KHÓA BIÊN & TÔ VÙNG KHÉP KÍN VỚI GEMINI VISION (HARD-MASK & FLOOD-FILL RENDERING PIPELINE):
    // Tuyệt đối không dùng mô hình sinh ảnh tự do làm mờ/nhòe nét mực gốc của tác giả.
    // Sử dụng Gemini Vision để định vị chính xác tọa độ các vùng đối tượng khép kín (tight box_2d)
    // và chuyển cho Bộ máy Canvas Flood-Fill & Top-Layer Line-Art Multiply Mask đổ màu chính xác 100%!
    const visionModels = [
      this.model || "gemini-flash-latest",
      "gemini-flash-latest",
      "gemini-3.5-flash",
      "gemini-3-flash-preview",
      "gemini-flash-lite-latest",
      "gemini-3.1-flash-lite",
    ].filter((v, i, a) => Boolean(v) && a.indexOf(v) === i);

    const inputImgUrl = params.imageBase64.startsWith("data:")
      ? params.imageBase64
      : `data:${params.mimeType};base64,${params.imageBase64}`;

    const paletteHexList =
      params.paletteColors && params.paletteColors.length > 0
        ? params.paletteColors.join(", ")
        : "#FF8FAB, #FFD166, #72EFDD, #B892FF, #A2D2FF";

    const userCustomNote = (params.config.customInstruction || "").trim();
    const deletedListStr =
      params.deletedObjectLabels && params.deletedObjectLabels.length > 0
        ? params.deletedObjectLabels.join(", ")
        : "";

    const markerStyleDirectives =
      ColoringPromptBuilder.getStepByStepMarkerDirectives(params.config.style);
    const effectSettingsDirectives =
      ColoringPromptBuilder.getEffectSettingsDirectives(
        params.config.effectSettings
      );

    const systemVisionPrompt = `Bạn là Hệ thống AI Thị Giác Máy Tính (Hard-Mask & Closed-Path Contour Flood-Fill Localization Engine).
Nhiệm vụ của bạn là phân tích bức tranh Line-Art đính kèm để phục vụ bộ máy Đổ Màu Vùng Khép Kín (Flood-Fill) và Khóa Biên (Hard-Mask Layer Isolation), trả về ĐÚNG 1 ĐỐI TƯỢNG JSON (không kèm markdown) theo Quy trình nghiêm ngặt sau:

THÔNG SỐ CẤU HÌNH CỦA NGƯỜI DÙNG:
- Phong cách: ${params.config.style}
- Chỉ dẫn Kỹ thuật Marker & Texture (AI Rendering Directives): ${markerStyleDirectives}
- Thông số Tùy chỉnh Hiệu ứng của Người dùng (Effect Control Panel): ${effectSettingsDirectives}
- Bảng màu đã chọn: "${params.namedPaletteName || params.config.palette}" gồm các mã HEX: [${paletteHexList}]
- Cấu hình Tỷ lệ Golden Ratio (custom_golden_ratio): ${customGoldenRatioJson}
- Tâm trạng: ${params.config.mood}, Ánh sáng: ${params.config.lighting}, Chế độ: ${params.config.colorMode}
- YÊU CẦU TỰ CHỌN CỦA NGƯỜI DÙNG (USER OVERRIDE): "${userCustomNote || "Không có ghi chú văn bản"}"
- DANH SÁCH MÀU ĐỐI TƯỢNG NGƯỜI DÙNG CHỈ ĐỊNH TRỰC TIẾP: user_object_colors = ${userObjectColorsJson}
${strictRelabelingSentence ? `- ${strictRelabelingSentence}` : ""}
${deletedListStr ? `- CÁC THẺ ĐỐI TƯỢNG ĐÃ BỊ NGƯỜI DÙNG XÓA BỎ (TUYỆT ĐỐI KHÔNG TRẢ VỀ TRONG DANH SÁCH objects): [${deletedListStr}]` : ""}

I. NHẬN DIỆN VÙNG CONTOUR KHÉP KÍN & CHỐNG CHỒNG LẤN RANH GIỚI (CLOSED-PATH CONTOUR DETECTION & BOUNDARY BLEED PREVENTION):
   Quét toàn bộ bức tranh Line-Art và liệt kê ĐẦY ĐỦ tất cả các đối tượng riêng biệt (từ 6 đến 16 đối tượng) kèm khung tọa độ chuẩn hóa 2D "box_2d": [ymin, xmin, ymax, xmax] (trong thang 0..1000, với ymin < ymax và xmin < xmax):
   - QUY TẮC KHÓA BIÊN CHỐNG TRÀN (ZERO COLOR BLEEDING): Khung "box_2d" của mỗi đối tượng phải BÁM SÁT ĐƯỜNG NÉT ĐEN ngoài cùng của riêng đối tượng đó, tuyệt đối không mở rộng lấn sang đối tượng đứng sát bên cạnh (Ví dụ: Tách biệt rõ tọa độ của "Hòm thư" với "Chim cánh cụt", tách biệt "Chú chim nhỏ trên hòm thư" với "Hòm thư", tách biệt "Lớp tuyết phủ dưới đất" với "Tường/Cột bưu điện").
   - BẮT BUỘC: Mọi đối tượng có trong user_object_colors (${userObjectColorsJson}) hoặc trong Danh sách mới ${formattedRelabeledList} PHẢI được định vị chính xác tọa độ "box_2d" tương ứng với mô tả chi tiết của người dùng (ví dụ: "Hòm thư", "Thân con cá sấu to ở giữa", "Chiếc dép", "Mắt con cá sấu"...) và xuất hiện trong mảng "objects" với đúng "labelVi" và "primaryHex" mà người dùng đã gán!
   - "main_character": Chủ thể chính / Nhân vật chính (chim cánh cụt, cá sấu, gấu, thỏ, cún, người...). Khung box_2d phải bao sát đường nét của nhân vật đó, không lấn sang hòm thư, thân cây hay đồ vật bên cạnh.
   - "secondary_character": Nhân vật phụ / Thú cưng nhỏ đi kèm (chú chim nhỏ trên hòm thư, người tuyết, vịt nhỏ, mèo con, sóc...).
   - "nature_plant": Cây cối, cây thông, bồn hoa tulip, chậu cây, bụi cỏ, tán lá, vòng nguyệt quế.
   - "object_item": Chi tiết / Vật dụng / Phụ kiện / Đồ đạc (hòm thư, phong bì thư, bảng hiệu POST OFFICE, biển OPEN, xe cắm trại, lửa trại, đèn lồng, máy giặt, đồng hồ, chiếc dép, tủ đồ, máy pha cà phê, hộp quà, giỏ đồ...). Liệt kê từng vật dụng lớn ở vị trí riêng biệt với box_2d vừa khít.
   - "background_wall_sky": Bối cảnh phía trên (Tường bưu điện, Tường phòng, Bầu trời đêm, Mây).
   - "background_floor_ground": Bối cảnh phía dưới (Lớp tuyết phủ dưới mặt đất, Sàn nhà, Mặt đất, Thảm).

II. QUY TẮC ƯU TIÊN TUYỆT ĐỐI KHI ĐỔ MÀU FLOOD-FILL (STRICT PROMPT OVERRIDE PIPELINE):
   1. ƯU TIÊN SỐ 1 (User Object Override & Re-Labeling - user_object_colors): Nếu người dùng đã đổi màu riêng hoặc sửa tên/thêm mới thẻ đối tượng trong user_object_colors = ${userObjectColorsJson} hoặc trong câu lệnh "${userCustomNote}", AI bắt buộc phải định vị đối tượng theo mô tả chi tiết mới này và phủ chính xác mã màu được gán vào vùng contour của đối tượng đó (đặt "isUserOverride": true và "primaryHex" bằng đúng mã HEX đó).
   2. ƯU TIÊN SỐ 2 (Custom Golden Ratio & Palette Rules): Các đối tượng không bị chỉ định riêng ("isUserOverride": false) được phân bổ theo đúng tỷ lệ phần trăm (%) và dải mã màu trong custom_golden_ratio = ${customGoldenRatioJson} và [${paletteHexList}]. Đảm bảo 2 đối tượng đứng sát nhau (như tuyết và tường, hòm thư và nhân vật) luôn nhận các mã màu có độ tương phản/tách biệt rõ ràng qua đường nét đen.
   3. ƯU TIÊN SỐ 3 (Real-world Logic): Đảm bảo quy luật tự nhiên cho "nature_plant" (cây cối, lá cỏ ưu tiên tông xanh lá trong bảng màu), bầu trời/tuyết/nền thoáng dịu, và da người ấm tự nhiên.

III. CHỈ DẪN HIỆU ỨNG KỸ THUẬT TÔ MÀU THEO TỪNG BƯỚC & TÙY CHỈNH NGƯỜI DÙNG (AI RENDERING & EFFECT DIRECTIVES):
   - Áp dụng nghiêm ngặt: ${effectSettingsDirectives}
   - Multi-layer Shading: Với mỗi đối tượng trong "objects", hãy cung cấp cả "primaryHex" (tông màu nền cơ bản) và "secondaryHex" (tông màu bóng tối đậm hơn - Darker tone shadows cho các nếp gấp, vùng khuất sáng hoặc gân lá/vân lông).
   - White Gel Pen Highlights: Thiết lập độ tương phản màu sắc sao cho các điểm sáng trắng (White highlights / starburst sparkles) tại các điểm giao nhau hoặc đỉnh khối 3D nổi bật rực rỡ.
   - Texture Dots / Stippling: Lựa chọn cặp sắc độ "primaryHex" và "secondaryHex" có chiều sâu để lớp hạt texture (Stippling dots / Fur strokes / Flowing waves / Botanical veins) theo phong cách "${params.config.style}" hiển thị rõ nét như tô bút marker thủ công trên giấy.

ĐỊNH DẠNG JSON TRẢ VỀ BẮT BUỘC:
{
  "sceneSummaryVi": "Tóm tắt ngắn gọn 1-2 câu tiếng Việt về các vùng đối tượng khép kín đã nhận diện và cách đổ màu Flood-Fill",
  "backgroundWallOrSkyHex": "#HEX_MAU_TUONG_HOAC_BAU_TROI_DIU_NHE",
  "backgroundFloorOrGroundHex": "#HEX_MAU_TUYET_HOAC_SAN_MAT_DAT_TACH_BIET",
  "objects": [
    {
      "id": "obj_1",
      "labelVi": "Tên đối tượng tiếng Việt (VD: Hòm thư bưu điện)",
      "keywordsVi": ["hòm thư bưu điện", "hòm thư", "thùng thư"],
      "category": "object_item",
      "box_2d": [ymin, xmin, ymax, xmax],
      "primaryHex": "#HEX_CHINH",
      "secondaryHex": "#HEX_PHU",
      "isUserOverride": true,
      "matchedUserPhrase": "Cụm từ người dùng nếu có"
    }
  ]
}`;

    for (const vModel of visionModels) {
      try {
        const visionEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/${vModel}:generateContent?key=${this.apiKey}`;
        const visionRes = await fetch(visionEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  { text: systemVisionPrompt },
                  {
                    inlineData: {
                      mimeType: effectiveMime,
                      data: cleanBase64,
                    },
                  },
                ],
              },
            ],
            generationConfig: {
              responseMimeType: "application/json",
              temperature: 0.15,
            },
          }),
        });

        if (visionRes.ok) {
          const visionData = await visionRes.json();
          const rawText =
            visionData?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";

          let parsedAnalysis: AISceneAnalysis | undefined;
          try {
            const cleanedJson = rawText
              .replace(/^```json\s*/i, "")
              .replace(/```\s*$/i, "")
              .trim();
            const candidate = JSON.parse(cleanedJson);
            if (candidate && Array.isArray(candidate.objects)) {
              parsedAnalysis = {
                sceneSummaryVi:
                  candidate.sceneSummaryVi ||
                  `Đã nhận diện ${candidate.objects.length} đối tượng và phân bổ bảng màu theo bối cảnh.`,
                backgroundWallOrSkyHex:
                  candidate.backgroundWallOrSkyHex || "#F4F1EA",
                backgroundFloorOrGroundHex:
                  candidate.backgroundFloorOrGroundHex || "#E9E0D2",
                objects: candidate.objects
                  .filter(
                    (o: unknown): o is Record<string, unknown> =>
                      Boolean(o) &&
                      typeof o === "object" &&
                      Array.isArray((o as Record<string, unknown>).box_2d) &&
                      ((o as Record<string, unknown>).box_2d as unknown[]).length === 4
                  )
                  .map((o: Record<string, unknown>, idx: number) => ({
                    id: String(o.id || `obj_${idx + 1}`),
                    labelVi: String(o.labelVi || `Đối tượng ${idx + 1}`),
                    keywordsVi: Array.isArray(o.keywordsVi)
                      ? o.keywordsVi.map((k) => String(k).toLowerCase())
                      : [String(o.labelVi || "").toLowerCase()],
                    category: (o.category as DetectedObjectColorMapping["category"]) || "object_item",
                    box_2d: (o.box_2d as number[]).map((n) =>
                      Math.max(0, Math.min(1000, Number(n) || 0))
                    ) as [number, number, number, number],
                    primaryHex: String(o.primaryHex || "#FF8FAB"),
                    secondaryHex: o.secondaryHex
                      ? String(o.secondaryHex)
                      : undefined,
                    isUserOverride: Boolean(o.isUserOverride),
                    matchedUserPhrase: o.matchedUserPhrase
                      ? String(o.matchedUserPhrase)
                      : undefined,
                  })),
              };

              // Loại bỏ các thẻ đối tượng mà người dùng đã xóa thủ công
              if (params.deletedObjectLabels && params.deletedObjectLabels.length > 0) {
                const deletedNormSet = new Set(
                  params.deletedObjectLabels.map((d) => d.toLowerCase().trim())
                );
                parsedAnalysis.objects = parsedAnalysis.objects.filter(
                  (obj) => !deletedNormSet.has(obj.labelVi.toLowerCase().trim())
                );
              }

              // Áp dụng cưỡng bức (Deterministic Enforcement) danh sách user_object_colors lên kết quả trả về
              for (const obj of parsedAnalysis.objects) {
                const normLabel = obj.labelVi.toLowerCase().trim();
                for (const [userKey, userHex] of Object.entries(userObjectColorsObj)) {
                  const normKey = userKey.toLowerCase().trim();
                  if (
                    normKey &&
                    userHex &&
                    (normLabel === normKey ||
                      normLabel.includes(normKey) ||
                      normKey.includes(normLabel) ||
                      obj.keywordsVi.some((kw) => kw === normKey || kw.includes(normKey)))
                  ) {
                    obj.primaryHex = userHex.toUpperCase();
                    obj.isUserOverride = true;
                    obj.matchedUserPhrase = `${obj.labelVi}: ${userHex.toUpperCase()}`;
                  }
                }
              }
            }
          } catch (parseErr) {
            console.warn("Gemini JSON parse fallback:", parseErr);
          }

          if (parsedAnalysis) {
            const overrideSummary = parsedAnalysis.objects
              .filter((o) => o.isUserOverride)
              .map((o) => `${o.labelVi} → ${o.primaryHex}`)
              .join(", ");
            const detectedNames = parsedAnalysis.objects
              .slice(0, 8)
              .map((o) => `${o.labelVi} (${o.primaryHex})`)
              .join(", ");

            return {
              imageUrl: inputImgUrl,
              prompt,
              provider: `gemini-vision (${vModel})`,
              model: vModel,
              isMock: true,
              aiSceneAnalysis: parsedAnalysis,
              notes: `Đã kết nối Google Gemini (${vModel}): ${parsedAnalysis.sceneSummaryVi}. Đối tượng nhận diện: ${detectedNames}.${overrideSummary ? ` Ưu tiên ghi đè theo yêu cầu: ${overrideSummary}.` : ""}`,
            };
          }
        }
      } catch (visionErr) {
        console.warn(`Gemini Vision (${vModel}) fallback notice:`, visionErr);
      }
    }

    return {
      imageUrl: inputImgUrl,
      prompt,
      provider: "mock",
      model: "smart-lineart-engine-v4",
      isMock: true,
      notes:
        "Được xử lý bởi Động cơ Nhận diện Đối tượng & Phân bổ Bảng màu theo Bối cảnh (Local Smart Engine).",
    };
  }
}

/**
 * OpenAI Provider implementation (DALL-E / Images API)
 */
export class OpenAIImageService implements AIImageService {
  name = "OpenAIImageService";
  private apiKey: string;
  private model: string;

  constructor(apiKey: string, model = "dall-e-2") {
    this.apiKey = apiKey;
    this.model = model;
  }

  async validateImage(
    imageBuffer: Buffer,
    mimeType: string
  ): Promise<boolean> {
    const validMimes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
    return validMimes.includes(mimeType) && imageBuffer.length > 0;
  }

  async generateColoring(
    params: GenerateColoringParams
  ): Promise<ColoringServiceResult> {
    const prompt = ColoringPromptBuilder.buildPrompt({
      style: params.config.style,
      customStyle: params.config.customStyle,
      palette: params.config.palette,
      namedPaletteName: params.namedPaletteName,
      paletteColors: params.paletteColors,
      mood: params.config.mood,
      lighting: params.config.lighting,
      colorMode: params.config.colorMode,
      customInstruction: params.config.customInstruction,
    });

    try {
      const cleanBase64 = params.imageBase64.replace(
        /^data:image\/[a-z]+;base64,/,
        ""
      );
      const buffer = Buffer.from(cleanBase64, "base64");

      const formData = new FormData();
      const blob = new Blob([buffer], { type: params.mimeType });
      formData.append("image", blob, "lineart.png");
      formData.append("prompt", prompt);
      formData.append("n", "1");
      formData.append("size", "1024x1024");
      if (this.model) {
        formData.append("model", this.model);
      }

      const response = await fetch("https://api.openai.com/v1/images/edits", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData?.error?.message ||
            `OpenAI API responded with status ${response.status}`
        );
      }

      const data = await response.json();
      const outputUrl = data.data?.[0]?.url || data.data?.[0]?.b64_json;

      if (!outputUrl) {
        throw new Error("No image data returned from AI provider.");
      }

      return {
        imageUrl: outputUrl,
        prompt,
        provider: "openai",
        model: this.model,
        isMock: false,
      };
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "AI Coloring request failed.";
      throw new Error(errorMessage);
    }
  }
}

/**
 * Service Factory - Hỗ trợ linh hoạt Google Gemini (`gemini-flash-latest`), OpenAI hoặc Local Smart Engine
 */
export function getAIService(customGeminiKey?: string): AIImageService {
  if (customGeminiKey && customGeminiKey.trim().length > 10) {
    return new GeminiAIImageService(
      customGeminiKey.trim(),
      process.env.GEMINI_MODEL ||
        process.env.AI_MODEL ||
        "gemini-flash-latest"
    );
  }

  const provider = (process.env.AI_PROVIDER || "mock").toLowerCase();
  const geminiKey =
    process.env.GEMINI_API_KEY ||
    process.env.GOOGLE_API_KEY ||
    (provider === "gemini" ? process.env.AI_API_KEY : "");
  const openAiKey =
    process.env.OPENAI_API_KEY ||
    (provider === "openai" ? process.env.AI_API_KEY : "");

  if (
    (provider === "gemini" ||
      Boolean(process.env.GEMINI_API_KEY) ||
      Boolean(process.env.GOOGLE_API_KEY)) &&
    geminiKey &&
    geminiKey.trim().length > 0
  ) {
    return new GeminiAIImageService(
      geminiKey.trim(),
      process.env.GEMINI_MODEL ||
        process.env.AI_MODEL ||
        "gemini-flash-latest"
    );
  }

  if (provider === "openai" && openAiKey && openAiKey.trim().length > 0) {
    return new OpenAIImageService(
      openAiKey.trim(),
      process.env.AI_MODEL || "dall-e-2"
    );
  }

  return new MockAIImageService();
}
