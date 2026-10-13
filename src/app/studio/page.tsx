"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Sparkles,
  Download,
  RotateCcw,
  Palette,
  AlertCircle,
  CheckCircle2,
  Sliders,
  Bookmark,
  Share2,
  Info,
  Pencil,
  X,
  Plus,
  Trash2,
  Check,
} from "lucide-react";
import {
  ColoringConfig,
  ColoringStyle,
  BasePalette,
  MoodType,
  LightingType,
  ColorModeType,
  CustomGoldenRatioConfig,
  EffectSettings,
} from "@/types";
import { NAMED_PALETTES, FREEBIES } from "@/data/creative-content";
import { ImageUploader } from "@/components/studio/ImageUploader";
import { ConfigurationPanel } from "@/components/studio/ConfigurationPanel";
import {
  BeforeAfterSlider,
  CanvasColorPickPayload,
} from "@/components/studio/BeforeAfterSlider";
import {
  smartColorLineArt,
  BASE_PALETTE_SWATCHES,
  AISceneAnalysis,
  DetectedObjectBadgeItem,
  InteractiveSegmentationMap,
} from "@/lib/smart-coloring";
import {
  ColoringPromptBuilder,
  DEFAULT_EFFECT_SETTINGS,
} from "@/lib/prompt-builder";

function StudioContent() {
  const searchParams = useSearchParams();

  // Trạng thái hình ảnh
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string>("image/png");
  const [imageName, setImageName] = useState<string>("line-art.png");

  // Trạng thái cấu hình tô màu (bao gồm biến trạng thái effectSettings mặc định)
  const [config, setConfig] = useState<ColoringConfig>({
    style: "Pastel",
    palette: "Pastel",
    mood: "Peaceful",
    lighting: "Soft light",
    colorMode: "ai_harmony",
    customInstruction: "",
    effectSettings: { ...DEFAULT_EFFECT_SETTINGS },
  });

  const [selectedNamedPaletteId, setSelectedNamedPaletteId] = useState<string>("lavender-dream");

  // Trạng thái xử lý AI và kết quả
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState<string>("Đang phân tích đường nét bức tranh...");
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isMockMode, setIsMockMode] = useState(false);
  const [generatedPrompt, setGeneratedPrompt] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [journalSaved, setJournalSaved] = useState(false);
  const [currentJournalEntryId, setCurrentJournalEntryId] = useState<
    string | null
  >(null);
  const [appliedSummary, setAppliedSummary] = useState<{
    goldenRatios?: {
      dominant: number;
      secondary: number;
      accent: number;
    };
    dominantColors: string[];
    auxiliaryColors: string[];
    accentColors?: string[];
    skinToneHex?: string;
    highlightToneHex?: string;
    shadowSubtoneHex?: string;
    colorWheelRule?: string;
    parsedVietnameseRules: string[];
    detectedObjectsSummary?: string[];
    detectedObjects?: DetectedObjectBadgeItem[];
  } | null>(null);
  const [activeProvider, setActiveProvider] = useState<string>("smart-engine");
  const [aiNotes, setAiNotes] = useState<string | null>(null);

  // Ma trận Ưu tiên Ghi đè Màu sắc (Override Priority Matrix):
  // - Ưu tiên 1 (Cao nhất - region_colors): userRegionColors — Màu của "Chỉ vùng" cụ thể (hoặc chọn đa vùng Multi-Select). Ghi đè tuyệt đối lên đối tượng chứa nó.
  // - Ưu tiên 2 (object_colors): userObjectColors & userObjectRegionColors — Màu tùy chỉnh của "Cả đối tượng".
  // - Ưu tiên 3 (Golden Ratio): Tông màu tự động từ hệ thống Golden Ratio 60-30-10.
  const [userRegionColors, setUserRegionColors] = useState<Record<number, string>>({});
  const [userObjectColors, setUserObjectColors] = useState<Record<string, string>>({});
  const [userObjectRegionColors, setUserObjectRegionColors] = useState<Record<number, string>>({});
  const [interactiveMap, setInteractiveMap] = useState<InteractiveSegmentationMap | null>(null);
  const [deletedObjectLabels, setDeletedObjectLabels] = useState<string[]>([]);
  const [lastAiSceneAnalysis, setLastAiSceneAnalysis] = useState<AISceneAnalysis | undefined>(
    undefined
  );
  const [activeEditingObject, setActiveEditingObject] = useState<{
    id?: string;
    labelVi: string;
    currentHex: string;
  } | null>(null);
  const [editingObjectLabelInput, setEditingObjectLabelInput] = useState<string>("");
  const [manualHexInput, setManualHexInput] = useState<string>("#FF8FAB");

  // Trạng thái thêm mới thẻ đối tượng tùy chỉnh ([+ Thêm đối tượng tùy chỉnh])
  const [showAddObjectForm, setShowAddObjectForm] = useState<boolean>(false);
  const [newCustomObjectLabel, setNewCustomObjectLabel] = useState<string>("");
  const [newCustomObjectHex, setNewCustomObjectHex] = useState<string>("#FF8FAB");

  // Trạng thái chỉnh sửa trực tiếp từng ô màu trong các nhóm Tỷ Lệ Golden Ratio (60% - 30% - 10%)
  const [activeEditingGoldenSwatch, setActiveEditingGoldenSwatch] = useState<{
    group:
      | "dominantColors"
      | "secondaryColors"
      | "accentColors"
      | "skinToneHex"
      | "highlightToneHex"
      | "shadowSubtoneHex";
    index: number;
    label: string;
    currentHex: string;
  } | null>(null);
  const [goldenHexInput, setGoldenHexInput] = useState<string>("#9D4EDD");

  // Tùy chọn nhập nhanh Google Gemini API Key ngay trên trình duyệt
  const [geminiApiKey, setGeminiApiKey] = useState<string>(
    process.env.NEXT_PUBLIC_GEMINI_API_KEY || ""
  );
  const [showGeminiModal, setShowGeminiModal] = useState<boolean>(false);
  const [geminiTestStatus, setGeminiTestStatus] = useState<{
    loading: boolean;
    ok?: boolean;
    message?: string;
  }>({
    loading: false,
    ok: true,
    message:
      "✅ Đã kích hoạt khóa Google Gemini API (model: gemini-flash-latest / gemini-3.5-flash) để hỗ trợ phân tích & tô màu tranh!",
  });

  useEffect(() => {
    try {
      const savedKey = localStorage.getItem("studio_gemini_api_key");
      if (savedKey) {
        setGeminiApiKey(savedKey);
      }
    } catch {}
  }, []);

  const handleSaveGeminiKey = (rawInput: string) => {
    const match = rawInput.match(/(?:AIzaSy|AQ\.)[A-Za-z0-9_-]{20,60}/);
    const newKey = match ? match[0] : rawInput;
    setGeminiApiKey(newKey);
    setGeminiTestStatus({ loading: false });
    try {
      if (newKey.trim()) {
        localStorage.setItem("studio_gemini_api_key", newKey.trim());
      } else {
        localStorage.removeItem("studio_gemini_api_key");
      }
    } catch {}
  };

  const handleTestGeminiConnection = async () => {
    const cleanKey = geminiApiKey.trim();
    if (!cleanKey) {
      setGeminiTestStatus({
        loading: false,
        ok: false,
        message:
          "Vui lòng dán mã API Key từ Google AI Studio vào ô bên trên trước khi kiểm tra.",
      });
      return;
    }
    setGeminiTestStatus({ loading: true });
    const candidateModels = [
      "gemini-flash-latest",
      "gemini-3.5-flash",
      "gemini-flash-lite-latest",
    ];
    let lastError = "API Key không hợp lệ hoặc máy chủ đang bận.";

    for (const modelName of candidateModels) {
      try {
        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${cleanKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text: "Trả lời ngắn gọn 1 câu tiếng Việt: Hệ thống AI Google Gemini đã kết nối thành công với Studio Tô Màu!",
                    },
                  ],
                },
              ],
            }),
          }
        );
        const data = await res.json();
        if (res.ok) {
          const reply =
            data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
            `Đã kết nối thành công với model ${modelName}!`;
          setGeminiTestStatus({
            loading: false,
            ok: true,
            message: `✅ Kết nối thành công (model: ${modelName}): "${reply}"`,
          });
          return;
        }
        lastError = data?.error?.message || `HTTP ${res.status}`;
      } catch (err: unknown) {
        lastError =
          err instanceof Error ? err.message : "Không thể kết nối tới Gemini API.";
      }
    }

    setGeminiTestStatus({
      loading: false,
      ok: false,
      message: `❌ Lỗi kết nối: ${lastError}`,
    });
  };

  // Theo dõi chữ ký EffectSettings & trạng thái chỉnh sửa thực tế của người dùng để KHÔNG tự động tô lại ảnh khi vừa mở từ Nhật Ký
  const getEffectSettingsSignature = (es?: EffectSettings): string => {
    const target = es || DEFAULT_EFFECT_SETTINGS;
    return `${target.shadow_depth}:${target.stippling_density}:${target.white_highlights}:${Boolean(target.texture_lines)}`;
  };
  const lastEffectSigRef = useRef<string>(
    getEffectSettingsSignature(DEFAULT_EFFECT_SETTINGS)
  );
  const hasUserModifiedArtworkRef = useRef<boolean>(false);

  // Trích xuất màu sắc thực tế của từng vùng từ bức tranh đã lưu (colImg) để đồng bộ hoàn toàn với InteractiveMap khi mở từ Nhật ký
  const syncInteractiveMapWithSavedImage = (
    savedColoredImgUrl: string,
    map: InteractiveSegmentationMap
  ): Promise<{
    updatedMap: InteractiveSegmentationMap;
    sampledRegionHexMap: Record<number, string>;
  }> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        try {
          const canvas = document.createElement("canvas");
          canvas.width = map.width;
          canvas.height = map.height;
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            resolve({ updatedMap: map, sampledRegionHexMap: {} });
            return;
          }
          ctx.drawImage(img, 0, 0, map.width, map.height);
          const pixels = ctx.getImageData(0, 0, map.width, map.height).data;

          const maxRegionId = map.regions.reduce(
            (max, r) => (r.id > max ? r.id : max),
            0
          );
          const rSum = new Float64Array(maxRegionId + 1);
          const gSum = new Float64Array(maxRegionId + 1);
          const bSum = new Float64Array(maxRegionId + 1);
          const counts = new Int32Array(maxRegionId + 1);

          const totalPixels = map.labels.length;
          for (let i = 0; i < totalPixels; i += 2) {
            const rid = map.labels[i];
            if (rid <= 0 || rid > maxRegionId) continue;
            const pIdx = i * 4;
            const r = pixels[pIdx];
            const g = pixels[pIdx + 1];
            const b = pixels[pIdx + 2];
            const a = pixels[pIdx + 3];
            if (a < 128) continue;
            // Bỏ qua điểm nét vẽ đen và đốm sáng gel trắng tinh
            if (r < 55 && g < 55 && b < 55) continue;
            if (r > 250 && g > 250 && b > 250) continue;
            rSum[rid] += r;
            gSum[rid] += g;
            bSum[rid] += b;
            counts[rid] += 1;
          }

          const toHexByte = (n: number) =>
            Math.min(255, Math.max(0, Math.round(n)))
              .toString(16)
              .padStart(2, "0")
              .toUpperCase();

          const sampledRegionHexMap: Record<number, string> = {};
          const updatedRegions = map.regions.map((reg) => {
            if (reg.role === "outer_margin") return reg;
            const c = counts[reg.id];
            if (c > 0) {
              const hex = `#${toHexByte(rSum[reg.id] / c)}${toHexByte(
                gSum[reg.id] / c
              )}${toHexByte(bSum[reg.id] / c)}`;
              sampledRegionHexMap[reg.id] = hex;
              return { ...reg, colorHex: hex };
            }
            return reg;
          });

          resolve({
            updatedMap: {
              ...map,
              regions: updatedRegions,
            },
            sampledRegionHexMap,
          });
        } catch {
          resolve({ updatedMap: map, sampledRegionHexMap: {} });
        }
      };
      img.onerror = () =>
        resolve({ updatedMap: map, sampledRegionHexMap: {} });
      img.src = savedColoredImgUrl;
    });
  };

  // Đọc tham số URL khi chuyển từ Nhật Ký Sáng Tạo (editJournalId), Cảm Hứng, Bảng Màu, Thử Thách, Góc Học Phối Màu hoặc Tranh Miễn Phí
  useEffect(() => {
    const paramEditJournalId = searchParams.get("editJournalId");
    const paramStyle = searchParams.get("style");
    const paramPalette = searchParams.get("palette");
    const paramMood = searchParams.get("mood") as MoodType | null;
    const paramLighting = searchParams.get("lighting") as LightingType | null;
    const paramFreebie = searchParams.get("freebie");
    const paramColors = searchParams.get("colors");
    const paramInstruction = searchParams.get("instruction");

    // KHÔI PHỤC PHIÊN LÀM VIỆC TỪ NHẬT KÝ SÁNG TẠO (STATE HYDRATION FROM SAVED JOURNAL ENTRY)
    if (paramEditJournalId) {
      try {
        let targetEntry: Record<string, unknown> | null = null;
        const sessionRaw = sessionStorage.getItem(
          "active_editing_journal_entry"
        );
        if (sessionRaw) {
          const parsedSession = JSON.parse(sessionRaw);
          if (parsedSession && parsedSession.id === paramEditJournalId) {
            targetEntry = parsedSession;
          }
        }
        if (!targetEntry) {
          const journalRaw = localStorage.getItem("coloring_journal");
          if (journalRaw) {
            const list = JSON.parse(journalRaw);
            if (Array.isArray(list)) {
              targetEntry =
                list.find(
                  (item: { id?: string }) => item.id === paramEditJournalId
                ) || null;
            }
          }
        }

        if (targetEntry && typeof targetEntry.originalImage === "string") {
          const origImg = targetEntry.originalImage;
          const colImg =
            typeof targetEntry.coloredImage === "string"
              ? targetEntry.coloredImage
              : null;
          const entryTitle =
            typeof targetEntry.title === "string"
              ? targetEntry.title
              : "line-art.png";
          const entryMime =
            typeof targetEntry.mimeType === "string"
              ? targetEntry.mimeType
              : "image/png";
          const savedPaletteStr =
            typeof targetEntry.palette === "string" ? targetEntry.palette : "";
          const savedNamedPaletteId =
            typeof targetEntry.selectedNamedPaletteId === "string"
              ? targetEntry.selectedNamedPaletteId
              : undefined;

          const matchedNamedPalette = NAMED_PALETTES.find(
            (p) =>
              (savedNamedPaletteId && p.id === savedNamedPaletteId) ||
              p.id === savedPaletteStr ||
              p.name.toLowerCase() === savedPaletteStr.toLowerCase()
          );

          const savedConfigObj = targetEntry.config as
            | ColoringConfig
            | undefined;
          const savedGolden = (targetEntry.customGoldenRatio ||
            savedConfigObj?.customGoldenRatio) as
            | CustomGoldenRatioConfig
            | undefined;
          const savedEffects = (targetEntry.effectSettings ||
            savedConfigObj?.effectSettings || {
              ...DEFAULT_EFFECT_SETTINGS,
            }) as typeof DEFAULT_EFFECT_SETTINGS;
          const savedPaletteColors = Array.isArray(targetEntry.paletteColors)
            ? (targetEntry.paletteColors as string[])
            : savedConfigObj?.customPaletteColors ||
              matchedNamedPalette?.colors;

          const hydratedConfig: ColoringConfig = savedConfigObj
            ? {
                ...savedConfigObj,
                customGoldenRatio: savedGolden,
                effectSettings: savedEffects,
              }
            : {
                style:
                  (typeof targetEntry.style === "string"
                    ? (targetEntry.style as ColoringStyle)
                    : "Pastel") || "Pastel",
                palette:
                  (matchedNamedPalette?.styleGroup as BasePalette) || "Pastel",
                namedPaletteId: matchedNamedPalette?.id,
                customPaletteColors: savedPaletteColors,
                mood: "Peaceful",
                lighting: "Soft light",
                colorMode: "ai_harmony",
                customInstruction: "",
                customGoldenRatio: savedGolden,
                effectSettings: savedEffects,
              };

          const hydratedObjColors =
            (targetEntry.userObjectColors as Record<string, string>) || {};
          const hydratedObjRegionColors =
            (targetEntry.userObjectRegionColors as Record<number, string>) ||
            {};
          const hydratedRegionColors =
            (targetEntry.userRegionColors as Record<number, string>) || {};
          const hydratedDeletedLabels = Array.isArray(
            targetEntry.deletedObjectLabels
          )
            ? (targetEntry.deletedObjectLabels as string[])
            : [];
          const hydratedSceneAnalysis = targetEntry.aiSceneAnalysis as
            | AISceneAnalysis
            | undefined;
          const hydratedSummary = targetEntry.appliedSummary as
            | typeof appliedSummary
            | undefined;

          // Khóa chữ ký EffectSettings & đánh dấu chưa chỉnh sửa để ngăn useEffect tự động tô lại ảnh gốc đã lưu
          lastEffectSigRef.current = getEffectSettingsSignature(
            hydratedConfig.effectSettings
          );
          hasUserModifiedArtworkRef.current = false;

          setCurrentJournalEntryId(String(targetEntry.id));
          setOriginalImage(origImg);
          setMimeType(entryMime);
          setImageName(entryTitle);
          if (colImg) {
            setResultImage(colImg);
          }
          setConfig(hydratedConfig);
          setSelectedNamedPaletteId(
            savedNamedPaletteId !== undefined
              ? savedNamedPaletteId
              : matchedNamedPalette?.id || "lavender-dream"
          );
          setUserObjectColors(hydratedObjColors);
          setUserObjectRegionColors(hydratedObjRegionColors);
          setUserRegionColors(hydratedRegionColors);
          setDeletedObjectLabels(hydratedDeletedLabels);
          setLastAiSceneAnalysis(hydratedSceneAnalysis);
          if (hydratedSummary) {
            setAppliedSummary(hydratedSummary);
          }
          setJournalSaved(true);
          setErrorMessage(null);

          // Khởi tạo lại bản đồ phân đoạn tương tác (interactiveMap) & danh sách thẻ đối tượng từ bức tranh đã lưu (KHÔNG ghi đè resultImage)
          const effectiveColorsToHydrate =
            savedPaletteColors && savedPaletteColors.length > 0
              ? savedPaletteColors
              : matchedNamedPalette?.colors ||
                BASE_PALETTE_SWATCHES[hydratedConfig.palette] ||
                [];

          smartColorLineArt(origImg, {
            paletteColors:
              effectiveColorsToHydrate.length > 0
                ? effectiveColorsToHydrate
                : undefined,
            basePalette: hydratedConfig.palette,
            style: hydratedConfig.style,
            mood: hydratedConfig.mood,
            lighting: hydratedConfig.lighting,
            colorMode: hydratedConfig.colorMode,
            customInstruction: hydratedConfig.customInstruction,
            aiSceneAnalysis: hydratedSceneAnalysis,
            userRegionColors: hydratedRegionColors,
            userObjectColors: hydratedObjColors,
            userObjectRegionColors: hydratedObjRegionColors,
            customGoldenRatio: hydratedConfig.customGoldenRatio,
            effectSettings: hydratedConfig.effectSettings,
          })
            .then(async (smartRes) => {
              if (!colImg) {
                setResultImage(smartRes.imageUrl);
              }
              if (smartRes.interactiveMap) {
                if (colImg) {
                  const { updatedMap, sampledRegionHexMap } =
                    await syncInteractiveMapWithSavedImage(
                      colImg,
                      smartRes.interactiveMap
                    );
                  setInteractiveMap(updatedMap);
                  // Nếu là tác phẩm lưu từ phiên cũ chưa có metadata vùng, giữ màu nền từng vùng từ ảnh đã lưu để khi sửa 1 chi tiết không làm đổi màu các vùng khác
                  if (
                    !hydratedSceneAnalysis &&
                    Object.keys(hydratedObjRegionColors).length === 0 &&
                    Object.keys(sampledRegionHexMap).length > 0
                  ) {
                    setUserObjectRegionColors(sampledRegionHexMap);
                  }
                } else {
                  setInteractiveMap(smartRes.interactiveMap);
                }
              }
              if (smartRes.appliedSummary) {
                setAppliedSummary(
                  hydratedSummary &&
                    hydratedSummary.detectedObjects &&
                    hydratedSummary.detectedObjects.length > 0
                    ? {
                        ...smartRes.appliedSummary,
                        ...hydratedSummary,
                      }
                    : smartRes.appliedSummary
                );
              }
            })
            .catch(() => {});

          return;
        }
      } catch {}
    }

    if (paramFreebie) {
      const foundFreebie = FREEBIES.find((f) => f.id === paramFreebie);
      if (foundFreebie && foundFreebie.lineArtData) {
        const srcUrl = foundFreebie.lineArtData;
        if (srcUrl.startsWith("data:")) {
          setOriginalImage(srcUrl);
          setMimeType("image/svg+xml");
          setImageName(`${foundFreebie.title}.svg`);
        } else {
          fetch(srcUrl)
            .then((r) => r.blob())
            .then((blob) => {
              const reader = new FileReader();
              reader.onload = (e) => {
                const res = e.target?.result as string;
                if (res) {
                  setOriginalImage(res);
                  setMimeType(blob.type || "image/png");
                  setImageName(`${foundFreebie.title}.png`);
                }
              };
              reader.readAsDataURL(blob);
            })
            .catch(() => {
              setOriginalImage(srcUrl);
              setMimeType("image/png");
              setImageName(`${foundFreebie.title}.png`);
            });
        }
      }
    }

    if (paramStyle) {
      const standardStyles = [
        "Cute",
        "Kawaii",
        "Pastel",
        "Cozy",
        "Anime",
        "Vintage",
        "Fantasy",
        "Watercolor",
        "Frosty Stippling",
        "Cozy Marker & Fur",
        "Water/Flowing Gradient",
        "Botanical Layered",
        "Custom",
      ];
      if (standardStyles.includes(paramStyle)) {
        setConfig((prev) => ({ ...prev, style: paramStyle as ColoringStyle }));
      } else {
        setConfig((prev) => ({ ...prev, style: "Custom", customStyle: paramStyle }));
      }
    }
    if (paramMood) {
      setConfig((prev) => ({ ...prev, mood: paramMood }));
    }
    if (paramLighting) {
      setConfig((prev) => ({ ...prev, lighting: paramLighting }));
    }
    if (paramInstruction) {
      setConfig((prev) => ({ ...prev, customInstruction: paramInstruction }));
    }
    if (paramPalette) {
      const foundNamed = NAMED_PALETTES.find(
        (p) => p.id === paramPalette || p.name.toLowerCase() === paramPalette.toLowerCase()
      );
      if (foundNamed) {
        setSelectedNamedPaletteId(foundNamed.id);
        setConfig((prev) => ({
          ...prev,
          palette: foundNamed.styleGroup as BasePalette,
          namedPaletteId: foundNamed.id,
          customPaletteColors: foundNamed.colors,
        }));
      }
    }
    if (paramColors) {
      const parsedHexes = paramColors
        .split(",")
        .map((c) => c.trim())
        .filter((c) => /^#[0-9A-Fa-f]{6}$/.test(c));
      if (parsedHexes.length > 0) {
        setConfig((prev) => ({
          ...prev,
          customPaletteColors: parsedHexes,
        }));
      }
    }
  }, [searchParams]);

  // Hiệu ứng thông báo tiến trình xử lý
  useEffect(() => {
    if (!isLoading) return;

    const step1 = setTimeout(() => {
      setLoadingStep("Đang hòa trộn bảng màu và tạo bóng đổ...");
    }, 500);

    const step2 = setTimeout(() => {
      setLoadingStep("AI đang hoàn thiện việc tô màu bức tranh...");
    }, 1100);

    return () => {
      clearTimeout(step1);
      clearTimeout(step2);
    };
  }, [isLoading]);

  const handleImageSelected = (base64: string, type: string, name: string) => {
    setOriginalImage(base64);
    setMimeType(type);
    setImageName(name);
    setResultImage(null);
    setErrorMessage(null);
    setCurrentJournalEntryId(null);
    setJournalSaved(false);
    setUserObjectColors({});
    setUserObjectRegionColors({});
    setUserRegionColors({});
    setInteractiveMap(null);
    setDeletedObjectLabels([]);
    setLastAiSceneAnalysis(undefined);
    setActiveEditingObject(null);
    setShowAddObjectForm(false);
  };

  const handleClearImage = () => {
    setOriginalImage(null);
    setResultImage(null);
    setErrorMessage(null);
    setCurrentJournalEntryId(null);
    setJournalSaved(false);
    setUserObjectColors({});
    setUserObjectRegionColors({});
    setUserRegionColors({});
    setInteractiveMap(null);
    setDeletedObjectLabels([]);
    setLastAiSceneAnalysis(undefined);
    setActiveEditingObject(null);
    setShowAddObjectForm(false);
  };

  // Hàm tính danh sách màu từ Bảng màu hiện tại để dùng chung
  const getEffectivePaletteColors = () => {
    const activeNamedPalette = NAMED_PALETTES.find(
      (p) => p.id === selectedNamedPaletteId
    );
    return !selectedNamedPaletteId &&
      config.customPaletteColors &&
      config.customPaletteColors.length > 0
      ? config.customPaletteColors
      : activeNamedPalette?.colors ||
          config.customPaletteColors ||
          BASE_PALETTE_SWATCHES[config.palette] ||
          [];
  };

  // Lấy danh sách nhãn đối tượng hiện hành (bao gồm các đối tượng đã sửa tên & thêm mới)
  const getRelabeledObjectsSummaryList = (
    overridesToUse: Record<string, string> = userObjectColors,
    objectsList: DetectedObjectBadgeItem[] | undefined = appliedSummary?.detectedObjects
  ): string[] => {
    if (objectsList && objectsList.length > 0) {
      return objectsList.map((o) => {
        const hex = overridesToUse[o.labelVi.trim().toLowerCase()] || o.primaryHex;
        return `${o.labelVi} (${hex})`;
      });
    }
    return Object.entries(overridesToUse).map(([k, v]) => `${k} (${v})`);
  };

  // Cập nhật lại Prompt hiển thị theo Ma Trận 3 Tầng Ưu Tiên (Ưu tiên 1: Chỉ vùng > Ưu tiên 2: Cả đối tượng > Ưu tiên 3: Golden Ratio) + Effect Settings
  const rebuildLivePrompt = (
    nextConfig: ColoringConfig,
    nextOverrides: Record<string, string>,
    nextDetectedObjects?: DetectedObjectBadgeItem[],
    nextRegionOverrides: Record<number, string> = userRegionColors
  ) => {
    const activeNamedPalette = NAMED_PALETTES.find(
      (p) => p.id === selectedNamedPaletteId
    );
    const effectiveColors = getEffectivePaletteColors();
    const relabeledList = getRelabeledObjectsSummaryList(
      nextOverrides,
      nextDetectedObjects ?? appliedSummary?.detectedObjects
    );
    const built = ColoringPromptBuilder.buildPrompt({
      ...nextConfig,
      namedPaletteName: activeNamedPalette?.name,
      paletteColors: effectiveColors,
      userRegionColors: nextRegionOverrides,
      userObjectColors: nextOverrides,
      relabeledObjectsList: relabeledList,
      effectSettings: nextConfig.effectSettings,
    });
    setGeneratedPrompt(built);
  };

  // Tự động cập nhật Prompt ẩn & kết xuất lại bức tranh trên Canvas CHỈ KHI người dùng chủ động kéo thanh trượt Hiệu ứng (effectSettings)
  useEffect(() => {
    const currentEffectSig = getEffectSettingsSignature(config.effectSettings);
    if (!originalImage || !resultImage || isLoading) {
      lastEffectSigRef.current = currentEffectSig;
      return;
    }
    // Bỏ qua nếu chữ ký hiệu ứng không thay đổi (ngăn chặn tự động tô lại ảnh khi vừa mở từ Nhật ký hoặc mới tải trang)
    if (currentEffectSig === lastEffectSigRef.current) {
      return;
    }
    lastEffectSigRef.current = currentEffectSig;
    hasUserModifiedArtworkRef.current = true;

    rebuildLivePrompt(
      config,
      userObjectColors,
      appliedSummary?.detectedObjects,
      userRegionColors
    );
    const timer = setTimeout(async () => {
      const effectiveColors = getEffectivePaletteColors();
      try {
        const smartRes = await smartColorLineArt(originalImage, {
          paletteColors:
            effectiveColors.length > 0 ? effectiveColors : undefined,
          basePalette: config.palette,
          style: config.style,
          mood: config.mood,
          lighting: config.lighting,
          colorMode: config.colorMode,
          customInstruction: config.customInstruction,
          aiSceneAnalysis: lastAiSceneAnalysis,
          userRegionColors,
          userObjectColors,
          userObjectRegionColors,
          customGoldenRatio: config.customGoldenRatio,
          effectSettings: config.effectSettings,
        });
        setResultImage(smartRes.imageUrl);
        if (smartRes.interactiveMap) {
          setInteractiveMap(smartRes.interactiveMap);
        }
        if (smartRes.appliedSummary) {
          setAppliedSummary(smartRes.appliedSummary);
        }
      } catch {}
    }, 120);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    config.effectSettings?.shadow_depth,
    config.effectSettings?.stippling_density,
    config.effectSettings?.white_highlights,
    config.effectSettings?.texture_lines,
  ]);

  // Đồng bộ custom_golden_ratio vào config + Prompt + cập nhật lại bức tranh trên Canvas ngay lập tức
  const applyCustomGoldenRatioAndReRender = async (
    nextCustomGolden: CustomGoldenRatioConfig | undefined,
    overridesToUse: Record<string, string> = userObjectColors
  ) => {
    hasUserModifiedArtworkRef.current = true;
    const nextConfig: ColoringConfig = {
      ...config,
      customGoldenRatio: nextCustomGolden,
    };
    setConfig(nextConfig);
    rebuildLivePrompt(nextConfig, overridesToUse);

    if (originalImage) {
      const effectiveColors = getEffectivePaletteColors();
      try {
        const smartRes = await smartColorLineArt(originalImage, {
          paletteColors:
            effectiveColors.length > 0 ? effectiveColors : undefined,
          basePalette: nextConfig.palette,
          style: nextConfig.style,
          mood: nextConfig.mood,
          lighting: nextConfig.lighting,
          colorMode: nextConfig.colorMode,
          customInstruction: nextConfig.customInstruction,
          aiSceneAnalysis: lastAiSceneAnalysis,
          userRegionColors,
          userObjectColors: overridesToUse,
          userObjectRegionColors,
          customGoldenRatio: nextCustomGolden,
          effectSettings: nextConfig.effectSettings,
        });
        setResultImage(smartRes.imageUrl);
        if (smartRes.interactiveMap) {
          setInteractiveMap(smartRes.interactiveMap);
        }
        if (smartRes.appliedSummary) {
          setAppliedSummary(smartRes.appliedSummary);
        }
      } catch {}
    }
  };

  // Điều chỉnh thanh trượt tỷ lệ % Golden Ratio (60 - 30 - 10) ngay tại màn hình kết quả
  const handleStudioGoldenRatioSliderChange = async (
    role: "dominant" | "secondary" | "accent",
    rawValue: number
  ) => {
    const val = Math.max(5, Math.min(85, Math.round(rawValue)));
    const currentRatios = config.customGoldenRatio?.ratios ||
      appliedSummary?.goldenRatios || {
        dominant: 60,
        secondary: 30,
        accent: 10,
      };

    let d = currentRatios.dominant;
    let s = currentRatios.secondary;
    let a = currentRatios.accent;

    if (role === "dominant") {
      d = val;
      const rem = Math.max(10, 100 - d);
      const oldOther = s + a || 40;
      s = Math.max(5, Math.round((s / oldOther) * rem));
      a = Math.max(5, 100 - d - s);
    } else if (role === "secondary") {
      s = val;
      const rem = Math.max(10, 100 - s);
      const oldOther = d + a || 70;
      d = Math.max(5, Math.round((d / oldOther) * rem));
      a = Math.max(5, 100 - d - s);
    } else {
      a = val;
      const rem = Math.max(10, 100 - a);
      const oldOther = d + s || 90;
      d = Math.max(5, Math.round((d / oldOther) * rem));
      s = Math.max(5, 100 - d - a);
    }

    const baseDom =
      config.customGoldenRatio?.dominantColors ||
      appliedSummary?.dominantColors ||
      getEffectivePaletteColors().slice(0, 2);
    const baseSec =
      config.customGoldenRatio?.secondaryColors ||
      appliedSummary?.auxiliaryColors ||
      getEffectivePaletteColors().slice(2, 4);
    const baseAcc =
      config.customGoldenRatio?.accentColors ||
      appliedSummary?.accentColors || [
        appliedSummary?.auxiliaryColors?.[2] || "#FFD166",
      ];

    const nextCustomGolden: CustomGoldenRatioConfig = {
      enabled: true,
      ratios: { dominant: d, secondary: s, accent: a },
      dominantColors: [...baseDom],
      secondaryColors: [...baseSec],
      accentColors: [...baseAcc],
      skinToneHex:
        config.customGoldenRatio?.skinToneHex || appliedSummary?.skinToneHex,
      highlightToneHex:
        config.customGoldenRatio?.highlightToneHex ||
        appliedSummary?.highlightToneHex,
      shadowSubtoneHex:
        config.customGoldenRatio?.shadowSubtoneHex ||
        appliedSummary?.shadowSubtoneHex,
    };

    await applyCustomGoldenRatioAndReRender(nextCustomGolden);
  };

  // Chọn nhanh Preset tỷ lệ Golden Ratio (60-30-10, 70-20-10, 50-35-15, 45-40-15)
  const handleStudioGoldenPreset = async (
    dominant: number,
    secondary: number,
    accent: number
  ) => {
    const baseDom =
      config.customGoldenRatio?.dominantColors ||
      appliedSummary?.dominantColors ||
      getEffectivePaletteColors().slice(0, 2);
    const baseSec =
      config.customGoldenRatio?.secondaryColors ||
      appliedSummary?.auxiliaryColors ||
      getEffectivePaletteColors().slice(2, 4);
    const baseAcc =
      config.customGoldenRatio?.accentColors ||
      appliedSummary?.accentColors || [
        appliedSummary?.auxiliaryColors?.[2] || "#FFD166",
      ];

    const nextCustomGolden: CustomGoldenRatioConfig = {
      enabled: true,
      ratios: { dominant, secondary, accent },
      dominantColors: [...baseDom],
      secondaryColors: [...baseSec],
      accentColors: [...baseAcc],
      skinToneHex:
        config.customGoldenRatio?.skinToneHex || appliedSummary?.skinToneHex,
      highlightToneHex:
        config.customGoldenRatio?.highlightToneHex ||
        appliedSummary?.highlightToneHex,
      shadowSubtoneHex:
        config.customGoldenRatio?.shadowSubtoneHex ||
        appliedSummary?.shadowSubtoneHex,
    };

    await applyCustomGoldenRatioAndReRender(nextCustomGolden);
  };

  // Đổi màu trực tiếp cho từng ô màu trong các nhóm Golden Ratio (60% Chủ đạo / 30% Phụ / 10% Nhấn / Da / Sáng / Tối)
  const handleApplyGoldenSwatchColor = async (
    group:
      | "dominantColors"
      | "secondaryColors"
      | "accentColors"
      | "skinToneHex"
      | "highlightToneHex"
      | "shadowSubtoneHex",
    index: number,
    rawHex: string
  ) => {
    const cleanHex = (
      rawHex.startsWith("#") ? rawHex.trim() : `#${rawHex.trim()}`
    ).toUpperCase();
    if (!/^#[0-9A-F]{6}$/.test(cleanHex)) return;

    setGoldenHexInput(cleanHex);
    setActiveEditingGoldenSwatch((prev) =>
      prev && prev.group === group && prev.index === index
        ? { ...prev, currentHex: cleanHex }
        : prev
    );

    const currentRatios = config.customGoldenRatio?.ratios ||
      appliedSummary?.goldenRatios || {
        dominant: 60,
        secondary: 30,
        accent: 10,
      };
    const nextDom = [
      ...(config.customGoldenRatio?.dominantColors ||
        appliedSummary?.dominantColors ||
        getEffectivePaletteColors().slice(0, 2)),
    ];
    const nextSec = [
      ...(config.customGoldenRatio?.secondaryColors ||
        appliedSummary?.auxiliaryColors ||
        getEffectivePaletteColors().slice(2, 4)),
    ];
    const nextAcc = [
      ...(config.customGoldenRatio?.accentColors ||
        appliedSummary?.accentColors || [
          appliedSummary?.auxiliaryColors?.[2] || "#FFD166",
        ]),
    ];

    let nextSkin =
      config.customGoldenRatio?.skinToneHex || appliedSummary?.skinToneHex;
    let nextHighlight =
      config.customGoldenRatio?.highlightToneHex ||
      appliedSummary?.highlightToneHex;
    let nextShadow =
      config.customGoldenRatio?.shadowSubtoneHex ||
      appliedSummary?.shadowSubtoneHex;

    if (group === "dominantColors") {
      nextDom[index] = cleanHex;
    } else if (group === "secondaryColors") {
      nextSec[index] = cleanHex;
    } else if (group === "accentColors") {
      nextAcc[index] = cleanHex;
    } else if (group === "skinToneHex") {
      nextSkin = cleanHex;
    } else if (group === "highlightToneHex") {
      nextHighlight = cleanHex;
    } else if (group === "shadowSubtoneHex") {
      nextShadow = cleanHex;
    }

    const nextCustomGolden: CustomGoldenRatioConfig = {
      enabled: true,
      ratios: currentRatios,
      dominantColors: nextDom,
      secondaryColors: nextSec,
      accentColors: nextAcc,
      skinToneHex: nextSkin,
      highlightToneHex: nextHighlight,
      shadowSubtoneHex: nextShadow,
    };

    await applyCustomGoldenRatioAndReRender(nextCustomGolden);
  };

  // Đặt lại cấu hình Golden Ratio về mặc định (60 - 30 - 10) của Bảng màu
  const handleResetGoldenRatio = async () => {
    setActiveEditingGoldenSwatch(null);
    await applyCustomGoldenRatioAndReRender(undefined);
  };

  // Suy luận nhanh khung tọa độ box_2d [ymin, xmin, ymax, xmax] từ mô tả tiếng Việt khi người dùng tự thêm/sửa tên thẻ đối tượng
  const inferHeuristicBoxAndCategory = (
    descRaw: string
  ): {
    category:
      | "main_character"
      | "secondary_character"
      | "nature_plant"
      | "object_item"
      | "background_wall_sky"
      | "background_floor_ground";
    box_2d: [number, number, number, number];
  } => {
    const d = descRaw.toLowerCase().trim();
    if (/(bầu trời|trời đêm|vách tường|bức tường|tường gạch|tường|nền trên|mây)/i.test(d)) {
      return { category: "background_wall_sky", box_2d: [60, 75, 580, 925] };
    }
    if (/(lớp tuyết|bãi tuyết|nền tuyết|tuyết phủ|tuyết|sàn|mặt đất|thảm|nền dưới)/i.test(d)) {
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
    if (/(cây|lá|bụi cỏ|hoa|chậu cây)/i.test(d)) {
      if (/(trái)/i.test(d)) {
        return { category: "nature_plant", box_2d: [535, 10, 900, 295] };
      }
      return { category: "nature_plant", box_2d: [500, 20, 920, 295] };
    }
    if (/(dép|giày|ủng)/i.test(d)) {
      return { category: "object_item", box_2d: [740, 240, 845, 385] };
    }
    if (/(mắt|con ngươi|mũi|miệng)/i.test(d)) {
      return { category: "object_item", box_2d: [280, 260, 440, 520] };
    }
    if (
      /(cá sấu|hà mã|khủng long|thân con|to ở giữa|nhân vật chính|chủ thể chính|gấu|cún|thỏ)/i.test(
        d
      )
    ) {
      return { category: "main_character", box_2d: [245, 195, 765, 575] };
    }
    if (/(vịt|bạn nhỏ|nhân vật phụ)/i.test(d)) {
      return { category: "secondary_character", box_2d: [450, 140, 735, 340] };
    }
    if (/(mèo)/i.test(d)) {
      return { category: "secondary_character", box_2d: [735, 690, 950, 980] };
    }
    if (/(trái)/i.test(d)) {
      return { category: "object_item", box_2d: [300, 20, 800, 350] };
    }
    if (/(phải)/i.test(d)) {
      return { category: "object_item", box_2d: [200, 550, 800, 980] };
    }
    if (/(trên)/i.test(d)) {
      return { category: "object_item", box_2d: [30, 150, 320, 850] };
    }
    if (/(dưới)/i.test(d)) {
      return { category: "object_item", box_2d: [680, 150, 980, 850] };
    }
    return { category: "object_item", box_2d: [250, 200, 780, 650] };
  };

  // Cập nhật màu sắc VÀ/HOẶC sửa tên (Rename Object Label) cho 1 đối tượng (Ưu tiên 2: object_colors)
  // Lưu ý: Tuyệt đối KHÔNG ghi đè vào userRegionColors (Ưu tiên 1: region_colors) để bảo vệ các vùng đã chỉnh sửa "Chỉ vùng"!
  const handleApplyObjectColorOverride = async (
    labelVi: string,
    rawHex: string,
    newLabelRaw?: string,
    objId?: string,
    explicitObjectRegionOverrides?: Record<number, string>
  ) => {
    const cleanHex = (
      rawHex.startsWith("#") ? rawHex.trim() : `#${rawHex.trim()}`
    ).toUpperCase();
    if (!/^#[0-9A-F]{6}$/.test(cleanHex)) return;
    hasUserModifiedArtworkRef.current = true;

    const finalLabelVi = (newLabelRaw ?? editingObjectLabelInput ?? labelVi).trim() || labelVi.trim();
    const oldNormKey = labelVi.trim().toLowerCase();
    const newNormKey = finalLabelVi.toLowerCase();

    const nextOverrides: Record<string, string> = { ...userObjectColors };
    if (oldNormKey !== newNormKey) {
      delete nextOverrides[oldNormKey];
    }
    nextOverrides[newNormKey] = cleanHex;

    // Đồng bộ bản đồ vùng của đối tượng ở Ưu tiên 2 (userObjectRegionColors), KHÔNG chạm vào userRegionColors (Ưu tiên 1)
    const nextObjectRegionColors: Record<number, string> =
      explicitObjectRegionOverrides
        ? { ...explicitObjectRegionOverrides }
        : { ...userObjectRegionColors };
    if (!explicitObjectRegionOverrides && interactiveMap) {
      for (const r of interactiveMap.regions) {
        if (
          (objId && r.objectId === objId) ||
          r.objectLabelVi?.trim().toLowerCase() === oldNormKey ||
          r.objectLabelVi?.trim().toLowerCase() === newNormKey
        ) {
          nextObjectRegionColors[r.id] = cleanHex;
        }
      }
    }

    setUserObjectColors(nextOverrides);
    setUserObjectRegionColors(nextObjectRegionColors);
    setManualHexInput(cleanHex);
    setEditingObjectLabelInput(finalLabelVi);
    setActiveEditingObject({
      id: objId ?? activeEditingObject?.id,
      labelVi: finalLabelVi,
      currentHex: cleanHex,
    });

    // Cập nhật luôn vào lastAiSceneAnalysis để giữ nguyên box_2d hoặc tinh chỉnh theo mô tả mới
    let nextSceneAnalysis = lastAiSceneAnalysis;
    if (lastAiSceneAnalysis && Array.isArray(lastAiSceneAnalysis.objects)) {
      const inferred = inferHeuristicBoxAndCategory(finalLabelVi);
      const updatedSceneObjs = lastAiSceneAnalysis.objects.map((o) => {
        if (
          (objId && o.id === objId) ||
          o.labelVi.trim().toLowerCase() === oldNormKey
        ) {
          const shouldRefineCategory =
            oldNormKey !== newNormKey &&
            inferred.category === "main_character";
          return {
            ...o,
            labelVi: finalLabelVi,
            keywordsVi: Array.from(
              new Set([...(o.keywordsVi || []), newNormKey])
            ),
            category: shouldRefineCategory ? "main_character" : o.category,
            primaryHex: cleanHex,
            isUserOverride: true,
          };
        }
        return o;
      });
      nextSceneAnalysis = {
        ...lastAiSceneAnalysis,
        objects: updatedSceneObjs,
      };
      setLastAiSceneAnalysis(nextSceneAnalysis);
    }

    // 1. Cập nhật ngay lập tức (Real-time UI update) trên danh sách thẻ đối tượng
    let nextDetectedList: DetectedObjectBadgeItem[] | undefined;
    setAppliedSummary((prev) => {
      if (!prev) return prev;
      const existingList = prev.detectedObjects || [];
      const foundExisting = existingList.some(
        (obj) =>
          (objId && obj.id === objId) ||
          obj.labelVi.trim().toLowerCase() === oldNormKey
      );
      const updatedObjects = foundExisting
        ? existingList.map((obj) =>
            (objId && obj.id === objId) ||
            obj.labelVi.trim().toLowerCase() === oldNormKey
              ? {
                  ...obj,
                  labelVi: finalLabelVi,
                  primaryHex: cleanHex,
                  isUserOverride: true,
                }
              : obj
          )
        : [
            ...existingList,
            {
              id: objId || `canvas_obj_${Date.now()}`,
              labelVi: finalLabelVi,
              primaryHex: cleanHex,
              isUserOverride: true,
            },
          ];
      nextDetectedList = updatedObjects;
      const updatedSummaryStrings = updatedObjects.map(
        (o) =>
          `${o.labelVi}: ${o.primaryHex}${
            o.isUserOverride ? " (Ưu tiên theo yêu cầu)" : ""
          }`
      );
      return {
        ...prev,
        detectedObjects: updatedObjects,
        detectedObjectsSummary: updatedSummaryStrings,
      };
    });

    rebuildLivePrompt(config, nextOverrides, nextDetectedList, userRegionColors);

    // 2. Cập nhật lại bức tranh trên Canvas ngay lập tức (Ưu tiên 1 userRegionColors luôn thắng Ưu tiên 2 userObjectColors)
    if (originalImage) {
      const effectiveColors = getEffectivePaletteColors();
      try {
        const smartRes = await smartColorLineArt(originalImage, {
          paletteColors:
            effectiveColors.length > 0 ? effectiveColors : undefined,
          basePalette: config.palette,
          style: config.style,
          mood: config.mood,
          lighting: config.lighting,
          colorMode: config.colorMode,
          customInstruction: config.customInstruction,
          aiSceneAnalysis: nextSceneAnalysis,
          userRegionColors,
          userObjectColors: nextOverrides,
          userObjectRegionColors: nextObjectRegionColors,
          customGoldenRatio: config.customGoldenRatio,
          effectSettings: config.effectSettings,
        });
        setResultImage(smartRes.imageUrl);
        if (smartRes.interactiveMap) {
          setInteractiveMap(smartRes.interactiveMap);
        }
        if (smartRes.appliedSummary) {
          setAppliedSummary(smartRes.appliedSummary);
        }
      } catch {}
    }
  };

  // Xử lý khi người dùng Click trực tiếp lên bức tranh (Canvas) — Hỗ trợ Ưu tiên 1 ("Chỉ vùng" & Chọn đa vùng Batch Coloring) và Ưu tiên 2 ("Cả đối tượng")
  const handleCanvasColorPick = async (payload: CanvasColorPickPayload) => {
    const cleanHex = (
      payload.newHex.startsWith("#")
        ? payload.newHex.trim()
        : `#${payload.newHex.trim()}`
    ).toUpperCase();
    if (!/^#[0-9A-F]{6}$/.test(cleanHex)) return;
    hasUserModifiedArtworkRef.current = true;

    // ƯU TIÊN 1 (CAO NHẤT - region_colors): Chế độ "Chỉ vùng" hoặc "Chọn nhiều vùng cùng lúc (Batch Coloring)"
    if (payload.applyScope === "region") {
      const targetRegionIds =
        payload.regionIds && payload.regionIds.length > 0
          ? payload.regionIds
          : payload.regionId
          ? [payload.regionId]
          : [];
      if (targetRegionIds.length === 0) return;

      const nextRegionColors: Record<number, string> = {
        ...userRegionColors,
      };
      for (const rid of targetRegionIds) {
        nextRegionColors[rid] = cleanHex;
      }
      setUserRegionColors(nextRegionColors);
      rebuildLivePrompt(
        config,
        userObjectColors,
        appliedSummary?.detectedObjects,
        nextRegionColors
      );

      if (originalImage) {
        const effectiveColors = getEffectivePaletteColors();
        try {
          const smartRes = await smartColorLineArt(originalImage, {
            paletteColors:
              effectiveColors.length > 0 ? effectiveColors : undefined,
            basePalette: config.palette,
            style: config.style,
            mood: config.mood,
            lighting: config.lighting,
            colorMode: config.colorMode,
            customInstruction: config.customInstruction,
            aiSceneAnalysis: lastAiSceneAnalysis,
            userRegionColors: nextRegionColors,
            userObjectColors,
            userObjectRegionColors,
            customGoldenRatio: config.customGoldenRatio,
            effectSettings: config.effectSettings,
          });
          setResultImage(smartRes.imageUrl);
          if (smartRes.interactiveMap) {
            setInteractiveMap(smartRes.interactiveMap);
          }
          if (smartRes.appliedSummary) {
            setAppliedSummary(smartRes.appliedSummary);
          }
        } catch {}
      }
      return;
    }

    // ƯU TIÊN 2 (object_colors): Chế độ "Cả đối tượng" -> cập nhật bản đồ màu đối tượng (KHÔNG ghi đè lên các vùng đã có trong userRegionColors)
    const nextObjectRegionColors: Record<number, string> = {
      ...userObjectRegionColors,
    };
    if (payload.allObjectRegionIds && payload.allObjectRegionIds.length > 0) {
      for (const rid of payload.allObjectRegionIds) {
        nextObjectRegionColors[rid] = cleanHex;
      }
    }
    if (payload.regionId) {
      nextObjectRegionColors[payload.regionId] = cleanHex;
    }

    await handleApplyObjectColorOverride(
      payload.labelVi,
      cleanHex,
      payload.newLabelVi || payload.labelVi,
      payload.objectId,
      nextObjectRegionColors
    );
  };

  // Khôi phục màu tự động cho vùng / nhóm vùng (Ưu tiên 1) hoặc đối tượng (Ưu tiên 2) được chọn trực tiếp trên Canvas
  const handleResetCanvasRegionOverride = async (
    regionId?: number,
    labelVi?: string,
    applyScope?: "object" | "region",
    allObjectRegionIds?: number[],
    regionIds?: number[]
  ) => {
    hasUserModifiedArtworkRef.current = true;
    const nextRegionColors = { ...userRegionColors };
    const nextObjectRegionColors = { ...userObjectRegionColors };
    const nextObjectColors = { ...userObjectColors };

    if (applyScope === "region") {
      const idsToReset =
        regionIds && regionIds.length > 0
          ? regionIds
          : regionId
          ? [regionId]
          : [];
      for (const rid of idsToReset) {
        delete nextRegionColors[rid];
      }
      setUserRegionColors(nextRegionColors);
      rebuildLivePrompt(
        config,
        nextObjectColors,
        appliedSummary?.detectedObjects,
        nextRegionColors
      );
    } else {
      if (allObjectRegionIds) {
        for (const rid of allObjectRegionIds) {
          delete nextObjectRegionColors[rid];
        }
      }
      if (regionId) {
        delete nextObjectRegionColors[regionId];
      }
      setUserObjectRegionColors(nextObjectRegionColors);
      if (labelVi) {
        delete nextObjectColors[labelVi.trim().toLowerCase()];
        setUserObjectColors(nextObjectColors);
      }
      rebuildLivePrompt(
        config,
        nextObjectColors,
        appliedSummary?.detectedObjects,
        nextRegionColors
      );
    }

    if (originalImage) {
      const effectiveColors = getEffectivePaletteColors();
      try {
        const smartRes = await smartColorLineArt(originalImage, {
          paletteColors:
            effectiveColors.length > 0 ? effectiveColors : undefined,
          basePalette: config.palette,
          style: config.style,
          mood: config.mood,
          lighting: config.lighting,
          colorMode: config.colorMode,
          customInstruction: config.customInstruction,
          aiSceneAnalysis: lastAiSceneAnalysis,
          userRegionColors: nextRegionColors,
          userObjectColors: nextObjectColors,
          userObjectRegionColors: nextObjectRegionColors,
          customGoldenRatio: config.customGoldenRatio,
          effectSettings: config.effectSettings,
        });
        setResultImage(smartRes.imageUrl);
        if (smartRes.interactiveMap) {
          setInteractiveMap(smartRes.interactiveMap);
        }
        if (smartRes.appliedSummary) {
          setAppliedSummary(smartRes.appliedSummary);
        }
      } catch {}
    }
  };

  // Thêm mới thẻ đối tượng thủ công ([+ Thêm đối tượng tùy chỉnh])
  const handleAddCustomObjectTag = async () => {
    const cleanLabel = newCustomObjectLabel.trim();
    if (!cleanLabel) return;
    hasUserModifiedArtworkRef.current = true;
    const rawHex = newCustomObjectHex.trim();
    const cleanHex = (
      rawHex.startsWith("#") ? rawHex : `#${rawHex}`
    ).toUpperCase();
    const validHex = /^#[0-9A-F]{6}$/.test(cleanHex) ? cleanHex : "#FF8FAB";

    const normKey = cleanLabel.toLowerCase();
    const nextOverrides: Record<string, string> = {
      ...userObjectColors,
      [normKey]: validHex,
    };
    setUserObjectColors(nextOverrides);

    // Xóa khỏi danh sách đã xóa nếu người dùng thêm lại cùng tên
    setDeletedObjectLabels((prev) =>
      prev.filter((d) => d.toLowerCase() !== normKey)
    );

    const newObjId = `custom_obj_${Date.now()}`;
    const inferred = inferHeuristicBoxAndCategory(cleanLabel);

    let nextSceneAnalysis: AISceneAnalysis = lastAiSceneAnalysis
      ? {
          ...lastAiSceneAnalysis,
          objects: [...lastAiSceneAnalysis.objects],
        }
      : {
          sceneSummaryVi:
            "Danh sách đối tượng đã được hiệu chỉnh theo yêu cầu người dùng.",
          backgroundWallOrSkyHex: "#F4F1EA",
          backgroundFloorOrGroundHex: "#E9E0D2",
          objects: (appliedSummary?.detectedObjects || []).map((d) => {
            const inf = inferHeuristicBoxAndCategory(d.labelVi);
            return {
              id: d.id,
              labelVi: d.labelVi,
              keywordsVi: [d.labelVi.toLowerCase()],
              category: inf.category,
              box_2d: inf.box_2d,
              primaryHex: d.primaryHex,
              isUserOverride: d.isUserOverride,
            };
          }),
        };

    const existingIdx = nextSceneAnalysis.objects.findIndex(
      (o) => o.labelVi.trim().toLowerCase() === normKey
    );
    if (existingIdx >= 0) {
      nextSceneAnalysis.objects[existingIdx] = {
        ...nextSceneAnalysis.objects[existingIdx],
        labelVi: cleanLabel,
        primaryHex: validHex,
        isUserOverride: true,
      };
    } else {
      nextSceneAnalysis.objects.push({
        id: newObjId,
        labelVi: cleanLabel,
        keywordsVi: [normKey],
        category: inferred.category,
        box_2d: inferred.box_2d,
        primaryHex: validHex,
        isUserOverride: true,
      });
    }
    setLastAiSceneAnalysis(nextSceneAnalysis);

    const nextBadgeList: DetectedObjectBadgeItem[] = [
      ...(appliedSummary?.detectedObjects || []).filter(
        (o) => o.labelVi.trim().toLowerCase() !== normKey
      ),
      {
        id: newObjId,
        labelVi: cleanLabel,
        primaryHex: validHex,
        isUserOverride: true,
      },
    ];

    setAppliedSummary((prev) =>
      prev
        ? {
            ...prev,
            detectedObjects: nextBadgeList,
            detectedObjectsSummary: nextBadgeList.map(
              (o) =>
                `${o.labelVi}: ${o.primaryHex}${
                  o.isUserOverride ? " (Ưu tiên theo yêu cầu)" : ""
                }`
            ),
          }
        : prev
    );

    setNewCustomObjectLabel("");
    setShowAddObjectForm(false);
    rebuildLivePrompt(config, nextOverrides, nextBadgeList, userRegionColors);

    if (originalImage) {
      const effectiveColors = getEffectivePaletteColors();
      try {
        const smartRes = await smartColorLineArt(originalImage, {
          paletteColors:
            effectiveColors.length > 0 ? effectiveColors : undefined,
          basePalette: config.palette,
          style: config.style,
          mood: config.mood,
          lighting: config.lighting,
          colorMode: config.colorMode,
          customInstruction: config.customInstruction,
          aiSceneAnalysis: nextSceneAnalysis,
          userRegionColors,
          userObjectColors: nextOverrides,
          userObjectRegionColors,
          customGoldenRatio: config.customGoldenRatio,
          effectSettings: config.effectSettings,
        });
        setResultImage(smartRes.imageUrl);
        if (smartRes.interactiveMap) {
          setInteractiveMap(smartRes.interactiveMap);
        }
        if (smartRes.appliedSummary) {
          setAppliedSummary(smartRes.appliedSummary);
        }
      } catch {}
    }
  };

  // Xóa hoàn toàn 1 thẻ đối tượng mà AI nhận diện sai hoặc bị thừa ([Xóa thẻ])
  const handleDeleteObjectTag = async (labelVi: string, objId?: string) => {
    hasUserModifiedArtworkRef.current = true;
    const normKey = labelVi.trim().toLowerCase();
    const nextOverrides = { ...userObjectColors };
    delete nextOverrides[normKey];
    setUserObjectColors(nextOverrides);
    setDeletedObjectLabels((prev) =>
      prev.includes(labelVi.trim()) ? prev : [...prev, labelVi.trim()]
    );

    if (
      activeEditingObject &&
      (activeEditingObject.labelVi.trim().toLowerCase() === normKey ||
        (objId && activeEditingObject.id === objId))
    ) {
      setActiveEditingObject(null);
    }

    let nextSceneAnalysis = lastAiSceneAnalysis;
    if (lastAiSceneAnalysis && Array.isArray(lastAiSceneAnalysis.objects)) {
      nextSceneAnalysis = {
        ...lastAiSceneAnalysis,
        objects: lastAiSceneAnalysis.objects.filter(
          (o) =>
            !(
              (objId && o.id === objId) ||
              o.labelVi.trim().toLowerCase() === normKey
            )
        ),
      };
      setLastAiSceneAnalysis(nextSceneAnalysis);
    }

    let nextBadgeList: DetectedObjectBadgeItem[] | undefined;
    setAppliedSummary((prev) => {
      if (!prev) return prev;
      const filtered = (prev.detectedObjects || []).filter(
        (o) =>
          !(
            (objId && o.id === objId) ||
            o.labelVi.trim().toLowerCase() === normKey
          )
      );
      nextBadgeList = filtered;
      return {
        ...prev,
        detectedObjects: filtered,
        detectedObjectsSummary: filtered.map(
          (o) =>
            `${o.labelVi}: ${o.primaryHex}${
              o.isUserOverride ? " (Ưu tiên theo yêu cầu)" : ""
            }`
        ),
      };
    });

    rebuildLivePrompt(config, nextOverrides, nextBadgeList, userRegionColors);

    if (originalImage) {
      const effectiveColors = getEffectivePaletteColors();
      try {
        const smartRes = await smartColorLineArt(originalImage, {
          paletteColors:
            effectiveColors.length > 0 ? effectiveColors : undefined,
          basePalette: config.palette,
          style: config.style,
          mood: config.mood,
          lighting: config.lighting,
          colorMode: config.colorMode,
          customInstruction: config.customInstruction,
          aiSceneAnalysis: nextSceneAnalysis,
          userRegionColors,
          userObjectColors: nextOverrides,
          userObjectRegionColors,
          customGoldenRatio: config.customGoldenRatio,
          effectSettings: config.effectSettings,
        });
        setResultImage(smartRes.imageUrl);
        if (smartRes.interactiveMap) {
          setInteractiveMap(smartRes.interactiveMap);
        }
        if (smartRes.appliedSummary) {
          setAppliedSummary({
            ...smartRes.appliedSummary,
            detectedObjects:
              nextBadgeList && nextBadgeList.length > 0
                ? nextBadgeList
                : smartRes.appliedSummary.detectedObjects,
          });
        }
      } catch {}
    }
  };

  // Xóa ghi đè màu của 1 đối tượng cụ thể (Ưu tiên 2) để quay về màu tự động của bảng màu (vẫn bảo toàn các vùng đã chỉnh riêng ở Ưu tiên 1)
  const handleRemoveObjectOverride = async (labelVi: string) => {
    hasUserModifiedArtworkRef.current = true;
    const normKey = labelVi.trim().toLowerCase();
    const nextOverrides = { ...userObjectColors };
    delete nextOverrides[normKey];
    setUserObjectColors(nextOverrides);

    const nextObjectRegionColors = { ...userObjectRegionColors };
    if (interactiveMap) {
      for (const r of interactiveMap.regions) {
        if (r.objectLabelVi?.trim().toLowerCase() === normKey) {
          delete nextObjectRegionColors[r.id];
        }
      }
      setUserObjectRegionColors(nextObjectRegionColors);
    }

    setActiveEditingObject(null);
    rebuildLivePrompt(config, nextOverrides, undefined, userRegionColors);

    if (originalImage) {
      const effectiveColors = getEffectivePaletteColors();
      try {
        const smartRes = await smartColorLineArt(originalImage, {
          paletteColors:
            effectiveColors.length > 0 ? effectiveColors : undefined,
          basePalette: config.palette,
          style: config.style,
          mood: config.mood,
          lighting: config.lighting,
          colorMode: config.colorMode,
          customInstruction: config.customInstruction,
          aiSceneAnalysis: lastAiSceneAnalysis,
          userRegionColors,
          userObjectColors: nextOverrides,
          userObjectRegionColors: nextObjectRegionColors,
          customGoldenRatio: config.customGoldenRatio,
          effectSettings: config.effectSettings,
        });
        setResultImage(smartRes.imageUrl);
        if (smartRes.interactiveMap) {
          setInteractiveMap(smartRes.interactiveMap);
        }
        if (smartRes.appliedSummary) {
          setAppliedSummary(smartRes.appliedSummary);
        }
      } catch {}
    }
  };

  // Xóa toàn bộ ghi đè màu đối tượng và màu vùng
  const handleResetAllObjectOverrides = async () => {
    hasUserModifiedArtworkRef.current = true;
    setUserObjectColors({});
    setUserObjectRegionColors({});
    setUserRegionColors({});
    setDeletedObjectLabels([]);
    setActiveEditingObject(null);
    rebuildLivePrompt(config, {}, undefined, {});
    if (originalImage) {
      const effectiveColors = getEffectivePaletteColors();
      try {
        const smartRes = await smartColorLineArt(originalImage, {
          paletteColors:
            effectiveColors.length > 0 ? effectiveColors : undefined,
          basePalette: config.palette,
          style: config.style,
          mood: config.mood,
          lighting: config.lighting,
          colorMode: config.colorMode,
          customInstruction: config.customInstruction,
          aiSceneAnalysis: lastAiSceneAnalysis,
          userRegionColors: {},
          userObjectColors: {},
          userObjectRegionColors: {},
          customGoldenRatio: config.customGoldenRatio,
          effectSettings: config.effectSettings,
        });
        setResultImage(smartRes.imageUrl);
        if (smartRes.interactiveMap) {
          setInteractiveMap(smartRes.interactiveMap);
        }
        if (smartRes.appliedSummary) {
          setAppliedSummary(smartRes.appliedSummary);
        }
      } catch {}
    }
  };

  // Lưu trữ hoặc cập nhật gói dữ liệu trạng thái phiên làm việc (Session Metadata JSON) vào Nhật ký (localStorage)
  const saveSessionToJournal = (params: {
    coloredImg: string;
    summaryToSave?: typeof appliedSummary;
    sceneAnalysisToSave?: AISceneAnalysis;
    preferredId?: string | null;
  }) => {
    if (!originalImage || !params.coloredImg) return;
    const activeNamed = NAMED_PALETTES.find(
      (p) => p.id === selectedNamedPaletteId
    );
    const effectiveColors = getEffectivePaletteColors();
    const entryId =
      params.preferredId || currentJournalEntryId || `gen-${Date.now()}`;
    setCurrentJournalEntryId(entryId);

    const entryPayload = {
      id: entryId,
      title: imageName,
      originalImage,
      coloredImage: params.coloredImg,
      mimeType,
      style: config.style,
      palette: activeNamed?.name || config.palette,
      date: new Date().toLocaleDateString("vi-VN"),
      config: {
        ...config,
        customGoldenRatio: config.customGoldenRatio,
        effectSettings: config.effectSettings || {
          ...DEFAULT_EFFECT_SETTINGS,
        },
      },
      selectedNamedPaletteId,
      paletteColors: effectiveColors,
      userObjectColors,
      userObjectRegionColors,
      userRegionColors,
      deletedObjectLabels,
      customGoldenRatio: config.customGoldenRatio,
      effectSettings: config.effectSettings || { ...DEFAULT_EFFECT_SETTINGS },
      aiSceneAnalysis: params.sceneAnalysisToSave ?? lastAiSceneAnalysis,
      appliedSummary: params.summaryToSave ?? appliedSummary,
    };

    try {
      const localJournal = JSON.parse(
        localStorage.getItem("coloring_journal") || "[]"
      );
      const list = Array.isArray(localJournal) ? localJournal : [];
      const existingIdx = list.findIndex(
        (item: { id?: string }) => item.id === entryId
      );
      if (existingIdx >= 0) {
        list[existingIdx] = entryPayload;
      } else {
        list.unshift(entryPayload);
      }
      localStorage.setItem(
        "coloring_journal",
        JSON.stringify(list.slice(0, 30))
      );
      sessionStorage.setItem(
        "active_editing_journal_entry",
        JSON.stringify(entryPayload)
      );
    } catch {}
  };

  // Tự động đồng bộ các chỉnh sửa mới nhất (đổi màu đối tượng, chỉ vùng, tỷ lệ Golden Ratio, thanh trượt Hiệu ứng) vào bản ghi Nhật ký hiện tại
  useEffect(() => {
    if (
      !hasUserModifiedArtworkRef.current ||
      !currentJournalEntryId ||
      !originalImage ||
      !resultImage ||
      isLoading
    ) {
      return;
    }
    saveSessionToJournal({
      coloredImg: resultImage,
      summaryToSave: appliedSummary,
      sceneAnalysisToSave: lastAiSceneAnalysis,
      preferredId: currentJournalEntryId,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    resultImage,
    userObjectColors,
    userObjectRegionColors,
    userRegionColors,
    deletedObjectLabels,
    config.style,
    config.palette,
    config.customGoldenRatio,
    config.effectSettings,
    selectedNamedPaletteId,
  ]);

  const handleGenerate = async () => {
    if (!originalImage) {
      setErrorMessage("Vui lòng tải lên hoặc chọn một bức tranh nét trước khi tô màu.");
      return;
    }

    hasUserModifiedArtworkRef.current = true;
    setIsLoading(true);
    setErrorMessage(null);
    setLoadingStep("Đang phân tích đường nét bức tranh...");
    setJournalSaved(false);

    // Khi bấm "Bắt Đầu Tô Màu Bằng AI" / "Tô Lại Phiên Bản Khác", chỉ giữ lại vùng của các đối tượng mà người dùng chủ động khóa màu
    const activeObjectRegionColorsForGen =
      Object.keys(userObjectColors).length > 0 ? userObjectRegionColors : {};
    if (Object.keys(userObjectColors).length === 0) {
      setUserObjectRegionColors({});
    }

    const activeNamedPalette = NAMED_PALETTES.find(
      (p) => p.id === selectedNamedPaletteId
    );
    const effectiveColors = getEffectivePaletteColors();
    const relabeledObjectsList = getRelabeledObjectsSummaryList(
      userObjectColors,
      appliedSummary?.detectedObjects
    );

    try {
      const res = await fetch("/api/color", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageBase64: originalImage,
          mimeType,
          config,
          namedPaletteName: activeNamedPalette?.name,
          paletteColors: effectiveColors,
          userObjectColors,
          relabeledObjectsList,
          deletedObjectLabels,
          customGoldenRatio: config.customGoldenRatio,
          title: imageName ? imageName.replace(/\.[^/.]+$/, "") : "Tranh Tô Màu",
          geminiApiKey: geminiApiKey.trim() || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || "Không thể hoàn thành việc tô màu. Vui lòng thử lại.");
      }

      if (data.aiSceneAnalysis) {
        setLastAiSceneAnalysis(data.aiSceneAnalysis);
      }

      let finalColoredImage = data.imageUrl;
      let latestSummary = appliedSummary;
      // Luôn thực thi Cơ chế Khóa Biên & Đổ Màu Vùng Khép Kín (Hard-Mask & Flood-Fill Rendering Pipeline)
      // để tách Lớp Line-Art gốc làm mặt nạ trên cùng và chống tràn màu 100% giữa các đối tượng kề cận
      if (originalImage) {
        const smartRes = await smartColorLineArt(originalImage, {
          paletteColors: effectiveColors.length > 0 ? effectiveColors : undefined,
          basePalette: config.palette,
          style: config.style,
          mood: config.mood,
          lighting: config.lighting,
          colorMode: config.colorMode,
          customInstruction: config.customInstruction,
          aiSceneAnalysis: data.aiSceneAnalysis,
          userRegionColors,
          userObjectColors,
          userObjectRegionColors: activeObjectRegionColorsForGen,
          customGoldenRatio: config.customGoldenRatio,
          effectSettings: config.effectSettings,
        });
        finalColoredImage = smartRes.imageUrl;
        if (smartRes.interactiveMap) {
          setInteractiveMap(smartRes.interactiveMap);
        }
        latestSummary = smartRes.appliedSummary || null;
        setAppliedSummary(latestSummary);
      }

      setResultImage(finalColoredImage);
      setIsMockMode(Boolean(data.isMock) && data.provider === "mock");
      setActiveProvider(data.provider || "mock");
      setAiNotes(data.notes || null);
      setGeneratedPrompt(data.prompt);

      // Tự động lưu bản ghi kèm đầy đủ gói dữ liệu trạng thái (Metadata JSON) vào nhật ký trình duyệt
      saveSessionToJournal({
        coloredImg: finalColoredImage,
        summaryToSave: latestSummary,
        sceneAnalysisToSave: data.aiSceneAnalysis || lastAiSceneAnalysis,
        preferredId:
          currentJournalEntryId || data.generationId || `gen-${Date.now()}`,
      });
      setJournalSaved(true);
    } catch (err: unknown) {
      // Fallback: Nếu API gặp sự cố hoặc ngoại tuyến, vẫn tô màu thông minh thành công cho người dùng
      if (originalImage) {
        try {
          const smartRes = await smartColorLineArt(originalImage, {
            paletteColors: effectiveColors.length > 0 ? effectiveColors : undefined,
            basePalette: config.palette,
            style: config.style,
            mood: config.mood,
            lighting: config.lighting,
            colorMode: config.colorMode,
            customInstruction: config.customInstruction,
            aiSceneAnalysis: lastAiSceneAnalysis,
            userRegionColors,
            userObjectColors,
            userObjectRegionColors: activeObjectRegionColorsForGen,
            customGoldenRatio: config.customGoldenRatio,
            effectSettings: config.effectSettings,
          });
          setResultImage(smartRes.imageUrl);
          if (smartRes.interactiveMap) {
            setInteractiveMap(smartRes.interactiveMap);
          }
          setAppliedSummary(smartRes.appliedSummary || null);
          setIsMockMode(true);
          setActiveProvider("mock");
          setErrorMessage(null);
          saveSessionToJournal({
            coloredImg: smartRes.imageUrl,
            summaryToSave: smartRes.appliedSummary || null,
            sceneAnalysisToSave: lastAiSceneAnalysis,
            preferredId: currentJournalEntryId || `gen-${Date.now()}`,
          });
          setJournalSaved(true);
          return;
        } catch {
          // Fall through to error setting
        }
      }
      const msg = err instanceof Error ? err.message : "Đã xảy ra lỗi không mong muốn.";
      setErrorMessage(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (!resultImage) return;
    const link = document.createElement("a");
    link.href = resultImage;
    link.download = `to-mau-${imageName || "tac-pham"}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const activeNamedPalette = NAMED_PALETTES.find(
    (p) => p.id === selectedNamedPaletteId
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Khung tiêu đề đầu trang */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pastel-pink/60 text-studio-800 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-studio-600" />
              Studio Tô Màu Tranh Nét Bằng AI
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-studio-900 tracking-tight">
              Biến Tranh Nét Vẽ Thành Tác Phẩm Sắc Màu
            </h1>
            <p className="text-sm text-studio-500 mt-1">
              Chọn phong cách, bảng màu và tâm trạng yêu thích. AI sẽ bảo toàn 100% đường nét gốc và tô phủ màu sắc hài hòa diệu kỳ!
            </p>
          </div>

          {/* Đèn chỉ báo trạng thái động cơ AI & Nút kết nối Google Gemini */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setShowGeminiModal((prev) => !prev)}
              className={`px-3.5 py-1.5 rounded-2xl border text-xs font-semibold transition-all flex items-center gap-2 ${
                geminiApiKey.trim()
                  ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                  : "bg-studio-50 border-studio-200 text-studio-800 hover:bg-studio-100"
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  geminiApiKey.trim()
                    ? "bg-emerald-500 animate-pulse"
                    : "bg-amber-500"
                }`}
              />
              {geminiApiKey.trim()
                ? "Google Gemini AI: Đã Kết Nối"
                : "⚡ Kết Nối Google Gemini AI"}
            </button>
          </div>
        </div>

        {/* Khung cấu hình nhanh Google Gemini API Key */}
        {showGeminiModal && (
          <div className="p-4 rounded-3xl bg-white border border-studio-200 shadow-soft space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-xs font-bold text-studio-900 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-studio-700" />
                  Tích Hợp AI Google Gemini Hỗ Trợ Chỉnh & Tô Màu Ảnh
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 text-[10px] font-bold">
                  model: gemini-flash-latest
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowGeminiModal(false)}
                className="text-xs text-studio-400 hover:text-studio-800 font-semibold"
              >
                Đóng ✕
              </button>
            </div>
            <p className="text-xs text-studio-600 leading-relaxed">
              Website đã được cấu hình kết nối trực tiếp tới mô hình{" "}
              <code className="bg-studio-100 px-1.5 py-0.5 rounded font-bold text-studio-900">
                gemini-flash-latest
              </code>{" "}
              của Google. Để kích hoạt quyền gọi API từ tài khoản của bạn, hãy bấm{" "}
              <a
                href="https://aistudio.google.com/apikey"
                target="_blank"
                rel="noreferrer"
                className="underline font-semibold text-indigo-600 hover:text-indigo-800"
              >
                Lấy mã khóa (Copy API Key) tại Google AI Studio
              </a>{" "}
              (mã bắt đầu bằng chữ <code className="bg-studio-100 px-1.5 py-0.5 rounded font-semibold">AIzaSy...</code> ở góc trên bên phải màn hình chứa đoạn code Python bạn vừa gửi) rồi dán vào ô dưới đây:
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="password"
                value={geminiApiKey}
                onChange={(e) => handleSaveGeminiKey(e.target.value)}
                placeholder="Dán mã khóa Gemini API Key của bạn vào đây (bắt đầu bằng AIzaSy...)..."
                className="flex-1 px-3.5 py-2 text-xs rounded-2xl border border-studio-200 focus:outline-none focus:ring-2 focus:ring-studio-400"
              />
              <button
                type="button"
                onClick={handleTestGeminiConnection}
                disabled={geminiTestStatus.loading}
                className="px-4 py-2 rounded-2xl bg-studio-900 text-white text-xs font-semibold hover:bg-studio-800 disabled:opacity-50 transition-all"
              >
                {geminiTestStatus.loading
                  ? "Đang kiểm tra..."
                  : "🔌 Kiểm Tra Kết Nối (gemini-flash-latest)"}
              </button>
              {geminiApiKey && (
                <button
                  type="button"
                  onClick={() => handleSaveGeminiKey("")}
                  className="px-3.5 py-2 rounded-2xl bg-rose-50 text-rose-700 border border-rose-200 text-xs font-semibold hover:bg-rose-100"
                >
                  Xóa Key
                </button>
              )}
            </div>
            {geminiTestStatus.message && (
              <div
                className={`p-2.5 rounded-2xl text-xs font-medium border ${
                  geminiTestStatus.ok
                    ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                    : "bg-amber-50 text-amber-800 border-amber-200"
                }`}
              >
                {geminiTestStatus.message}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Lưới không gian làm việc chính */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Cột trái: Tải ảnh & Tùy chọn cấu hình (5 cột) */}
        <div className="lg:col-span-5 space-y-6">
          {/* 1. Tải lên ảnh nét vẽ */}
          <div>
            <h2 className="text-sm font-bold text-studio-800 mb-2 flex items-center gap-1.5">
              <span>1. Bản Vẽ Nét (Line-Art)</span>
            </h2>
            <ImageUploader
              onImageSelected={handleImageSelected}
              selectedImage={originalImage}
              onClear={handleClearImage}
            />
          </div>

          {/* 2. Bảng cấu hình */}
          <div>
            <h2 className="text-sm font-bold text-studio-800 mb-2 flex items-center gap-1.5">
              <span>2. Tùy Chọn Tô Màu</span>
            </h2>
            <ConfigurationPanel
              config={config}
              onChange={setConfig}
              selectedNamedPaletteId={selectedNamedPaletteId}
              onSelectNamedPalette={setSelectedNamedPaletteId}
            />
          </div>

          {/* Nút bắt đầu tô màu */}
          <div>
            <button
              onClick={handleGenerate}
              disabled={isLoading || !originalImage}
              className={`w-full py-4 rounded-3xl font-bold text-sm shadow-soft transition-all flex items-center justify-center gap-2 ${
                isLoading || !originalImage
                  ? "bg-studio-200 text-studio-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-studio-900 via-studio-800 to-studio-900 text-white hover:shadow-soft-lg hover:scale-[1.01] active:scale-[0.99]"
              }`}
            >
              {isLoading ? (
                <>
                  <RotateCcw className="w-4 h-4 animate-spin text-pastel-butter" />
                  <span>Đang Tiến Hành Tô Màu...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-pastel-butter" />
                  <span>Bắt Đầu Tô Màu Bằng AI</span>
                </>
              )}
            </button>
          </div>

          {/* Khung thông báo lỗi */}
          {errorMessage && (
            <div className="p-4 rounded-3xl bg-rose-50 border border-rose-200 text-rose-800 text-xs space-y-2">
              <div className="flex items-center gap-2 font-bold">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>Không thể hoàn thành yêu cầu</span>
              </div>
              <p className="text-rose-700 leading-relaxed">{errorMessage}</p>
              <button
                onClick={handleGenerate}
                className="px-3 py-1 bg-white text-rose-800 font-semibold rounded-xl border border-rose-200 shadow-xs hover:bg-rose-100"
              >
                Thử Lại
              </button>
            </div>
          )}
        </div>

        {/* Cột phải: So sánh & Kết quả tương tác (7 cột) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Khung kết quả */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-bold text-studio-800 flex items-center gap-1.5">
                <span>3. So Sánh &amp; Tác Phẩm Hoàn Thiện</span>
              </h2>
              {resultImage && (
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Tô Màu Hoàn Tất
                </span>
              )}
            </div>

            {/* Trạng thái đang tải */}
            {isLoading && (
              <div className="bg-white rounded-3xl p-12 text-center border border-studio-100 shadow-soft flex flex-col items-center justify-center space-y-4 min-h-[400px]">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full border-4 border-pastel-lilac border-t-studio-700 animate-spin" />
                  <Sparkles className="w-6 h-6 text-studio-700 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-studio-900">
                    {loadingStep}
                  </h3>
                  <p className="text-xs text-studio-500 mt-1 max-w-xs mx-auto">
                    Đang bảo toàn nét vẽ gốc và áp dụng phong cách {config.style} cùng bảng màu hài hòa...
                  </p>
                </div>
              </div>
            )}

            {/* Kết quả sau khi tô: Thanh trượt Trước / Sau */}
            {!isLoading && resultImage && originalImage && (
              <div className="space-y-4">
                <BeforeAfterSlider
                  originalImage={originalImage}
                  coloredImage={resultImage}
                  isMock={isMockMode}
                  interactiveMap={interactiveMap}
                  detectedObjects={appliedSummary?.detectedObjects}
                  aiSceneAnalysis={lastAiSceneAnalysis}
                  paletteColors={getEffectivePaletteColors()}
                  goldenColors={{
                    dominant:
                      config.customGoldenRatio?.dominantColors ||
                      appliedSummary?.dominantColors ||
                      [],
                    secondary:
                      config.customGoldenRatio?.secondaryColors ||
                      appliedSummary?.auxiliaryColors ||
                      [],
                    accent:
                      config.customGoldenRatio?.accentColors ||
                      appliedSummary?.accentColors ||
                      [],
                    skinToneHex:
                      config.customGoldenRatio?.skinToneHex ||
                      appliedSummary?.skinToneHex,
                  }}
                  onCanvasColorPick={handleCanvasColorPick}
                  onResetRegionOverride={handleResetCanvasRegionOverride}
                />

                {/* Thông báo chế độ AI đang sử dụng (Đã ẩn khỏi giao diện theo yêu cầu, vẫn hoạt động ngầm) */}
                <div className="hidden">
                  {activeProvider.includes("gemini") ? (
                    <div className="p-3.5 rounded-2xl bg-emerald-50/90 border border-emerald-200 text-emerald-900 text-xs flex items-start gap-2.5">
                      <Sparkles className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <p className="font-bold">
                          Đã Xử Lý Cùng AI Google Gemini ({activeProvider})
                        </p>
                        <p className="text-[11px] text-emerald-800 leading-relaxed">
                          {aiNotes ||
                            "Bức tranh đã được Google Gemini AI phân tích ngữ nghĩa và tô phủ màu sắc hài hòa."}
                        </p>
                      </div>
                    </div>
                  ) : (
                    isMockMode && (
                      <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
                        <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                        <div className="space-y-1">
                          <p className="font-bold">
                            Động Cơ Tô Màu Phân Đoạn Thông Minh (Hỗ Trợ Google Gemini AI)
                          </p>
                          <p className="text-[11px] text-amber-800 leading-relaxed">
                            Bức tranh được xử lý bởi Động cơ Phân đoạn Ngữ nghĩa. Để kết hợp cùng <strong>Google Gemini AI</strong>, bạn có thể nhấn nút <strong>&ldquo;⚡ Kết Nối Google Gemini AI&rdquo;</strong> ở góc phải phía trên để dán API Key hoặc điền <code className="bg-amber-100 px-1 py-0.5 rounded">GEMINI_API_KEY</code> trong tệp <code className="bg-amber-100 px-1 py-0.5 rounded">.env</code>.
                          </p>
                        </div>
                      </div>
                    )
                  )}
                </div>

                {/* Thanh công cụ thao tác kết quả */}
                <div className="bg-white rounded-3xl p-4 shadow-soft border border-studio-100 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleDownload}
                      className="px-4 py-2.5 rounded-2xl bg-studio-900 text-white text-xs font-bold hover:bg-studio-800 transition-all flex items-center gap-1.5 shadow-sm"
                    >
                      <Download className="w-4 h-4" />
                      Tải Tranh Về
                    </button>

                    <button
                      onClick={handleGenerate}
                      className="px-3.5 py-2.5 rounded-2xl bg-studio-100 text-studio-800 text-xs font-semibold hover:bg-studio-200 transition-all flex items-center gap-1.5"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Tô Lại Phiên Bản Khác
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        if (resultImage) {
                          saveSessionToJournal({
                            coloredImg: resultImage,
                            summaryToSave: appliedSummary,
                            sceneAnalysisToSave: lastAiSceneAnalysis,
                            preferredId: currentJournalEntryId,
                          });
                        }
                        setJournalSaved(true);
                      }}
                      className={`px-3 py-2 rounded-2xl text-xs font-medium border transition-all flex items-center gap-1.5 ${
                        journalSaved
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : "bg-white text-studio-600 border-studio-200 hover:bg-studio-50"
                      }`}
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                      {journalSaved ? "Đã Lưu Trong Nhật Ký" : "Lưu Vào Nhật Ký"}
                    </button>
                  </div>
                </div>

                {/* Bảng màu Golden Ratio 60-30-10 & Không khí đã áp dụng */}
                <div className="bg-white rounded-3xl p-4 shadow-soft border border-studio-100 space-y-3.5">
                  {(() => {
                    const activeRatios =
                      config.customGoldenRatio?.ratios ||
                      appliedSummary?.goldenRatios || {
                        dominant: 60,
                        secondary: 30,
                        accent: 10,
                      };
                    const domList =
                      config.customGoldenRatio?.dominantColors ||
                      appliedSummary?.dominantColors ||
                      activeNamedPalette?.colors?.slice(0, 2) ||
                      BASE_PALETTE_SWATCHES[config.palette]?.slice(0, 2) || [
                        "#FDE2E4",
                        "#DFCCF1",
                      ];
                    const secList =
                      config.customGoldenRatio?.secondaryColors ||
                      appliedSummary?.auxiliaryColors?.slice(0, 2) ||
                      activeNamedPalette?.colors?.slice(2, 4) ||
                      BASE_PALETTE_SWATCHES[config.palette]?.slice(2, 4) || [
                        "#CCE3DE",
                        "#FFF1C5",
                      ];
                    const accList =
                      config.customGoldenRatio?.accentColors ||
                      appliedSummary?.accentColors || [
                        appliedSummary?.auxiliaryColors?.[2] || "#FFD166",
                      ];
                    const skinHex =
                      config.customGoldenRatio?.skinToneHex ||
                      appliedSummary?.skinToneHex ||
                      appliedSummary?.auxiliaryColors?.[1] ||
                      "#FFE5D9";
                    const highlightHex =
                      config.customGoldenRatio?.highlightToneHex ||
                      appliedSummary?.highlightToneHex;
                    const shadowHex =
                      config.customGoldenRatio?.shadowSubtoneHex ||
                      appliedSummary?.shadowSubtoneHex;

                    return (
                      <>
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h3 className="text-xs font-bold text-studio-800 flex items-center gap-1.5">
                            <Palette className="w-3.5 h-3.5 text-studio-600" />
                            Hệ Thống Phối Màu Golden Ratio ({activeRatios.dominant} -{" "}
                            {activeRatios.secondary} - {activeRatios.accent}) &amp; Ánh Sáng
                          </h3>
                          <div className="flex items-center gap-1.5">
                            {config.customGoldenRatio?.enabled && (
                              <button
                                type="button"
                                onClick={handleResetGoldenRatio}
                                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 transition-colors"
                                title="Khôi phục tỷ lệ 60-30-10 và màu mặc định của bảng màu"
                              >
                                <RotateCcw className="w-2.5 h-2.5" />
                                Đặt lại 60-30-10
                              </button>
                            )}
                            <span className="text-[11px] font-semibold text-studio-700 bg-studio-50 px-2.5 py-0.5 rounded-full border border-studio-100">
                              {appliedSummary?.colorWheelRule ||
                                activeNamedPalette?.name ||
                                config.palette}
                            </span>
                          </div>
                        </div>

                        {/* Thanh Tỷ lệ trực quan & Sliders điều chỉnh linh hoạt (Dynamic Percentage Sliders) */}
                        <div className="p-3 rounded-2xl bg-studio-50/70 border border-studio-100 space-y-2.5">
                          <div className="flex flex-wrap items-center justify-between gap-1.5">
                            <span className="text-[10px] font-bold text-studio-700 flex items-center gap-1">
                              <Sliders className="w-3 h-3 text-studio-600" />
                              Thanh Trượt Tỷ Lệ Golden Ratio Động (Tổng = 100%):
                            </span>
                            <div className="flex flex-wrap items-center gap-1">
                              {[
                                { label: "60-30-10 (Chuẩn)", d: 60, s: 30, a: 10 },
                                { label: "70-20-10", d: 70, s: 20, a: 10 },
                                { label: "50-35-15", d: 50, s: 35, a: 15 },
                                { label: "45-40-15", d: 45, s: 40, a: 15 },
                              ].map((preset) => {
                                const isActivePreset =
                                  activeRatios.dominant === preset.d &&
                                  activeRatios.secondary === preset.s &&
                                  activeRatios.accent === preset.a;
                                return (
                                  <button
                                    key={preset.label}
                                    type="button"
                                    onClick={() =>
                                      handleStudioGoldenPreset(
                                        preset.d,
                                        preset.s,
                                        preset.a
                                      )
                                    }
                                    className={`px-2 py-0.5 rounded-lg text-[9px] font-bold border transition-all cursor-pointer ${
                                      isActivePreset
                                        ? "bg-studio-900 text-white border-studio-900"
                                        : "bg-white text-studio-600 border-studio-200 hover:border-studio-400"
                                    }`}
                                  >
                                    {preset.label}
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* Thanh Bar biểu diễn tỷ lệ trực quan */}
                          <div className="w-full h-3.5 rounded-full overflow-hidden flex border border-studio-200 shadow-2xs">
                            <div
                              style={{
                                width: `${activeRatios.dominant}%`,
                                backgroundColor: domList[0] || "#9D4EDD",
                              }}
                              className="h-full flex items-center justify-center text-[8px] font-extrabold text-white drop-shadow-xs transition-all duration-200"
                              title={`Màu chủ đạo: ${activeRatios.dominant}%`}
                            >
                              {activeRatios.dominant >= 18
                                ? `${activeRatios.dominant}%`
                                : ""}
                            </div>
                            <div
                              style={{
                                width: `${activeRatios.secondary}%`,
                                backgroundColor: secList[0] || "#48CAE4",
                              }}
                              className="h-full flex items-center justify-center text-[8px] font-extrabold text-studio-900 transition-all duration-200 border-l border-white/50"
                              title={`Màu phụ: ${activeRatios.secondary}%`}
                            >
                              {activeRatios.secondary >= 15
                                ? `${activeRatios.secondary}%`
                                : ""}
                            </div>
                            <div
                              style={{
                                width: `${activeRatios.accent}%`,
                                backgroundColor: accList[0] || "#FFD166",
                              }}
                              className="h-full flex items-center justify-center text-[8px] font-extrabold text-studio-900 transition-all duration-200 border-l border-white/50"
                              title={`Màu nhấn: ${activeRatios.accent}%`}
                            >
                              {activeRatios.accent >= 10
                                ? `${activeRatios.accent}%`
                                : ""}
                            </div>
                          </div>

                          {/* 3 Thanh trượt % */}
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-0.5">
                            <div className="bg-white px-2.5 py-1.5 rounded-xl border border-studio-100">
                              <div className="flex items-center justify-between text-[10px] font-semibold text-studio-700 mb-1">
                                <span>Chủ đạo (Dominant)</span>
                                <span className="font-mono font-bold text-studio-900">
                                  {activeRatios.dominant}%
                                </span>
                              </div>
                              <input
                                type="range"
                                min={15}
                                max={80}
                                value={activeRatios.dominant}
                                onChange={(e) =>
                                  handleStudioGoldenRatioSliderChange(
                                    "dominant",
                                    Number(e.target.value)
                                  )
                                }
                                className="w-full accent-studio-900 h-1.5 cursor-pointer"
                              />
                            </div>

                            <div className="bg-white px-2.5 py-1.5 rounded-xl border border-studio-100">
                              <div className="flex items-center justify-between text-[10px] font-semibold text-studio-700 mb-1">
                                <span>Màu phụ (Secondary)</span>
                                <span className="font-mono font-bold text-studio-900">
                                  {activeRatios.secondary}%
                                </span>
                              </div>
                              <input
                                type="range"
                                min={10}
                                max={65}
                                value={activeRatios.secondary}
                                onChange={(e) =>
                                  handleStudioGoldenRatioSliderChange(
                                    "secondary",
                                    Number(e.target.value)
                                  )
                                }
                                className="w-full accent-studio-700 h-1.5 cursor-pointer"
                              />
                            </div>

                            <div className="bg-white px-2.5 py-1.5 rounded-xl border border-studio-100">
                              <div className="flex items-center justify-between text-[10px] font-semibold text-studio-700 mb-1">
                                <span>Màu nhấn (Accent)</span>
                                <span className="font-mono font-bold text-studio-900">
                                  {activeRatios.accent}%
                                </span>
                              </div>
                              <input
                                type="range"
                                min={5}
                                max={45}
                                value={activeRatios.accent}
                                onChange={(e) =>
                                  handleStudioGoldenRatioSliderChange(
                                    "accent",
                                    Number(e.target.value)
                                  )
                                }
                                className="w-full accent-amber-500 h-1.5 cursor-pointer"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Nhóm 1: Màu chủ đạo (Bấm vào từng ô màu để đổi mã HEX trực tiếp) */}
                        <div className="space-y-1.5">
                          <span className="text-[10px] font-semibold text-studio-500 block">
                            {activeRatios.dominant}% Màu Chủ Đạo (Dominant — Chủ thể chính, tóc, cánh hoa — Bấm vào ô màu để đổi):
                          </span>
                          <div className="flex flex-wrap items-center gap-2">
                            {domList.map((hex, idx) => {
                              const isEditing =
                                activeEditingGoldenSwatch?.group ===
                                  "dominantColors" &&
                                activeEditingGoldenSwatch?.index === idx;
                              return (
                                <button
                                  key={`dom_${idx}`}
                                  type="button"
                                  onClick={() => {
                                    if (isEditing) {
                                      setActiveEditingGoldenSwatch(null);
                                    } else {
                                      setActiveEditingGoldenSwatch({
                                        group: "dominantColors",
                                        index: idx,
                                        label: `Màu chủ đạo #${idx + 1} (${activeRatios.dominant}%)`,
                                        currentHex: hex,
                                      });
                                      setGoldenHexInput(hex);
                                    }
                                  }}
                                  className={`group flex items-center gap-1.5 px-2.5 py-1 rounded-xl border transition-all cursor-pointer ${
                                    isEditing
                                      ? "bg-studio-900 text-white border-studio-900 shadow-sm ring-2 ring-studio-300"
                                      : "bg-studio-50 text-studio-700 border-studio-200 hover:bg-white hover:border-studio-400"
                                  }`}
                                  title="Bấm để đổi màu Chủ đạo này"
                                >
                                  <span
                                    className="w-3.5 h-3.5 rounded-full border border-black/15 shrink-0"
                                    style={{ backgroundColor: hex }}
                                  />
                                  <span className="text-[10px] font-mono font-semibold">
                                    {hex}
                                  </span>
                                  <Pencil className="w-2.5 h-2.5 opacity-55 group-hover:opacity-100" />
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Nhóm 2: Màu phụ + Màu nhấn + Da + Vùng sáng/tối bổ túc (Bấm vào từng ô màu để đổi) */}
                        <div className="space-y-1.5 pt-1 border-t border-studio-100/70">
                          <span className="text-[10px] font-semibold text-studio-500 block">
                            {activeRatios.secondary}% Màu Phụ • {activeRatios.accent}% Màu Nhấn • Sắc Da • Bóng Đổ Bổ Túc (Bấm vào từng ô để đổi màu):
                          </span>
                          <div className="flex flex-wrap items-center gap-2">
                            {[
                              ...secList.map((hex, sIdx) => ({
                                group: "secondaryColors" as const,
                                index: sIdx,
                                label: `${activeRatios.secondary}% Màu phụ #${sIdx + 1} (Nền/Lá)`,
                                hex,
                              })),
                              ...accList.map((hex, aIdx) => ({
                                group: "accentColors" as const,
                                index: aIdx,
                                label: `${activeRatios.accent}% Màu nhấn #${aIdx + 1} (Chi tiết/Nhụy)`,
                                hex,
                              })),
                              {
                                group: "skinToneHex" as const,
                                index: 0,
                                label: "Sắc da & Undertone",
                                hex: skinHex,
                              },
                              ...(highlightHex
                                ? [
                                    {
                                      group: "highlightToneHex" as const,
                                      index: 0,
                                      label: "Vùng sáng (Highlight)",
                                      hex: highlightHex,
                                    },
                                  ]
                                : []),
                              ...(shadowHex
                                ? [
                                    {
                                      group: "shadowSubtoneHex" as const,
                                      index: 0,
                                      label: "Vùng tối bổ túc (Shadow)",
                                      hex: shadowHex,
                                    },
                                  ]
                                : []),
                            ].map((aux, idx) => {
                              const isEditing =
                                activeEditingGoldenSwatch?.group ===
                                  aux.group &&
                                activeEditingGoldenSwatch?.index === aux.index;
                              return (
                                <button
                                  key={`${aux.group}_${aux.index}_${idx}`}
                                  type="button"
                                  onClick={() => {
                                    if (isEditing) {
                                      setActiveEditingGoldenSwatch(null);
                                    } else {
                                      setActiveEditingGoldenSwatch({
                                        group: aux.group,
                                        index: aux.index,
                                        label: aux.label,
                                        currentHex: aux.hex,
                                      });
                                      setGoldenHexInput(aux.hex);
                                    }
                                  }}
                                  className={`group flex items-center gap-1.5 px-2.5 py-1 rounded-xl border transition-all cursor-pointer ${
                                    isEditing
                                      ? "bg-studio-900 text-white border-studio-900 shadow-sm ring-2 ring-studio-300"
                                      : "bg-pastel-pink/15 text-studio-700 border-studio-200 hover:bg-white hover:border-studio-400"
                                  }`}
                                  title={`Bấm để đổi màu ${aux.label}`}
                                >
                                  <span
                                    className="w-3.5 h-3.5 rounded-full border border-black/15 shrink-0"
                                    style={{ backgroundColor: aux.hex }}
                                  />
                                  <span className="text-[10px] font-medium">
                                    {aux.label} (
                                    <span className="font-mono font-semibold">
                                      {aux.hex}
                                    </span>
                                    )
                                  </span>
                                  <Pencil className="w-2.5 h-2.5 opacity-55 group-hover:opacity-100" />
                                </button>
                              );
                            })}
                          </div>

                          {/* POPUP CHỈNH MÀU NHÓM GOLDEN RATIO (60% - 30% - 10%) */}
                          {activeEditingGoldenSwatch && (
                            <div className="mt-2 p-3 rounded-2xl bg-white border-2 border-studio-800/80 shadow-md space-y-2.5 animate-in fade-in duration-150">
                              <div className="flex items-center justify-between gap-2 pb-1.5 border-b border-studio-100">
                                <div className="flex items-center gap-2">
                                  <span
                                    className="w-4 h-4 rounded-full border border-black/20"
                                    style={{
                                      backgroundColor:
                                        activeEditingGoldenSwatch.currentHex,
                                    }}
                                  />
                                  <span className="text-xs font-bold text-studio-900">
                                    🎨 Đổi màu nhóm Golden Ratio:{" "}
                                    <span className="text-indigo-700 underline">
                                      {activeEditingGoldenSwatch.label}
                                    </span>
                                  </span>
                                </div>
                                <button
                                  type="button"
                                  onClick={() =>
                                    setActiveEditingGoldenSwatch(null)
                                  }
                                  className="p-1 rounded-lg text-studio-400 hover:text-studio-800 hover:bg-studio-100"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              </div>

                              <div className="flex flex-wrap items-center gap-1.5">
                                {Array.from(
                                  new Set([
                                    ...getEffectivePaletteColors(),
                                    "#FF8FAB",
                                    "#9D4EDD",
                                    "#48CAE4",
                                    "#FFD166",
                                    "#52B788",
                                    "#F4A261",
                                    "#E76F51",
                                    "#2A9D8F",
                                    "#FFE5D9",
                                    "#3B2D54",
                                  ])
                                ).map((sw, sIdx) => {
                                  const normSw = sw.toUpperCase();
                                  return (
                                    <button
                                      key={`gr_sw_${sIdx}`}
                                      type="button"
                                      onClick={() =>
                                        handleApplyGoldenSwatchColor(
                                          activeEditingGoldenSwatch.group,
                                          activeEditingGoldenSwatch.index,
                                          normSw
                                        )
                                      }
                                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-mono border border-studio-200 bg-studio-50 hover:bg-white hover:border-studio-400 cursor-pointer"
                                    >
                                      <span
                                        className="w-3 h-3 rounded-full border border-black/15"
                                        style={{ backgroundColor: normSw }}
                                      />
                                      <span>{normSw}</span>
                                    </button>
                                  );
                                })}
                              </div>

                              <div className="flex flex-wrap items-center gap-2 pt-1">
                                <label className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-studio-700 cursor-pointer bg-studio-50 px-2.5 py-1 rounded-xl border border-studio-200">
                                  <span>Chọn màu tự do:</span>
                                  <input
                                    type="color"
                                    value={
                                      /^#[0-9A-Fa-f]{6}$/.test(
                                        activeEditingGoldenSwatch.currentHex
                                      )
                                        ? activeEditingGoldenSwatch.currentHex
                                        : "#9D4EDD"
                                    }
                                    onChange={(e) =>
                                      handleApplyGoldenSwatchColor(
                                        activeEditingGoldenSwatch.group,
                                        activeEditingGoldenSwatch.index,
                                        e.target.value
                                      )
                                    }
                                    className="w-5 h-5 rounded cursor-pointer border-0 bg-transparent p-0"
                                  />
                                </label>
                                <div className="inline-flex items-center gap-1">
                                  <input
                                    type="text"
                                    value={goldenHexInput}
                                    onChange={(e) =>
                                      setGoldenHexInput(
                                        e.target.value.toUpperCase()
                                      )
                                    }
                                    maxLength={7}
                                    placeholder="#9D4EDD"
                                    className="w-24 px-2 py-1 text-xs font-mono font-semibold rounded-xl border border-studio-200 text-studio-900"
                                  />
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleApplyGoldenSwatchColor(
                                        activeEditingGoldenSwatch.group,
                                        activeEditingGoldenSwatch.index,
                                        goldenHexInput
                                      )
                                    }
                                    className="px-2.5 py-1 rounded-xl text-[11px] font-bold bg-studio-900 text-white hover:bg-studio-800"
                                  >
                                    Áp dụng HEX
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </>
                    );
                  })()}

                  {/* Nhóm 3: Không khí & Chỉ dẫn Tiếng Việt đã thực thi */}
                  <div className="pt-1 border-t border-studio-100/70 flex flex-wrap items-center gap-1.5 text-[10px]">
                    <span className="px-2 py-0.5 rounded-lg bg-studio-100 text-studio-800 font-semibold">
                      Phong cách: {config.style}
                    </span>
                    <span className="px-2 py-0.5 rounded-lg bg-pastel-lavender/40 text-studio-800 font-semibold">
                      Tâm trạng: {config.mood}
                    </span>
                    <span className="px-2 py-0.5 rounded-lg bg-pastel-butter/50 text-studio-800 font-semibold">
                      Ánh sáng: {config.lighting}
                    </span>
                    <span className="px-2 py-0.5 rounded-lg bg-pastel-mint/40 text-studio-800 font-semibold">
                      Chế độ: {config.colorMode}
                    </span>
                    {appliedSummary?.parsedVietnameseRules?.map((rule, rIdx) => (
                      <span
                        key={rIdx}
                        className="px-2 py-0.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium"
                      >
                        ✓ {rule}
                      </span>
                    ))}
                  </div>

                  {/* Nhóm 4: Danh sách Đối tượng AI đã Nhận diện & Tương tác Sửa Tên / Thêm / Xóa / Chỉnh Màu từng Đối tượng */}
                  <div className="pt-2.5 border-t border-studio-100/70 space-y-2.5 relative">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-[11px] font-bold text-studio-700 flex items-center gap-1.5">
                        🎯 Đối Tượng Đã Nhận Diện (Bấm vào thẻ để Sửa Tên / Đổi Màu hoặc Xóa thẻ sai):
                      </span>
                      <div className="flex flex-wrap items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            setShowAddObjectForm((prev) => !prev);
                            setActiveEditingObject(null);
                          }}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-[10px] font-bold border transition-all cursor-pointer ${
                            showAddObjectForm
                              ? "bg-studio-900 text-white border-studio-900 shadow-xs"
                              : "bg-indigo-50 text-indigo-800 border-indigo-200 hover:bg-indigo-100"
                          }`}
                        >
                          <Plus className="w-3 h-3" />
                          <span>+ Thêm đối tượng tùy chỉnh</span>
                        </button>

                        {(Object.keys(userObjectColors).length > 0 ||
                          deletedObjectLabels.length > 0) && (
                          <button
                            type="button"
                            onClick={handleResetAllObjectOverrides}
                            className="inline-flex items-center gap-1 px-2 py-1 rounded-xl text-[10px] font-semibold bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 transition-colors cursor-pointer"
                          >
                            <RotateCcw className="w-2.5 h-2.5" />
                            Đặt lại mặc định
                          </button>
                        )}
                      </div>
                    </div>

                    {/* FORM THÊM ĐỐI TƯỢNG TÙY CHỈNH THỦ CÔNG ([+ Thêm đối tượng tùy chỉnh]) */}
                    {showAddObjectForm && (
                      <div className="p-3.5 rounded-2xl bg-indigo-50/50 border-2 border-indigo-300 shadow-md space-y-2.5 animate-in fade-in duration-150">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-indigo-950 flex items-center gap-1.5">
                            <Plus className="w-3.5 h-3.5 text-indigo-700" />
                            Thêm Đối Tượng Tùy Chỉnh (Dành cho chi tiết AI bỏ sót hoặc cần chỉ định rõ):
                          </span>
                          <button
                            type="button"
                            onClick={() => setShowAddObjectForm(false)}
                            className="p-1 rounded-lg text-studio-400 hover:text-studio-800 hover:bg-white/80"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center">
                          <div className="sm:col-span-6">
                            <label className="text-[10px] font-semibold text-studio-600 block mb-1">
                              Tên / Mô tả vị trí đối tượng:
                            </label>
                            <input
                              type="text"
                              value={newCustomObjectLabel}
                              onChange={(e) =>
                                setNewCustomObjectLabel(e.target.value)
                              }
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault();
                                  handleAddCustomObjectTag();
                                }
                              }}
                              placeholder="VD: Chiếc dép, Mắt con cá sấu, Thân con cá sấu to ở giữa..."
                              className="w-full px-3 py-1.5 text-xs font-medium rounded-xl bg-white border border-indigo-200 focus:outline-none focus:border-indigo-600 text-studio-900"
                            />
                          </div>

                          <div className="sm:col-span-3">
                            <label className="text-[10px] font-semibold text-studio-600 block mb-1">
                              Mã màu HEX gán:
                            </label>
                            <div className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-xl border border-indigo-200">
                              <input
                                type="color"
                                value={
                                  /^#[0-9A-Fa-f]{6}$/.test(newCustomObjectHex)
                                    ? newCustomObjectHex
                                    : "#FF8FAB"
                                }
                                onChange={(e) =>
                                  setNewCustomObjectHex(
                                    e.target.value.toUpperCase()
                                  )
                                }
                                className="w-5 h-5 rounded cursor-pointer border-0 bg-transparent p-0 shrink-0"
                              />
                              <input
                                type="text"
                                value={newCustomObjectHex}
                                onChange={(e) =>
                                  setNewCustomObjectHex(
                                    e.target.value.toUpperCase()
                                  )
                                }
                                maxLength={7}
                                placeholder="#FF8FAB"
                                className="w-full text-xs font-mono font-bold text-studio-900 focus:outline-none"
                              />
                            </div>
                          </div>

                          <div className="sm:col-span-3 flex items-end h-full pt-3 sm:pt-4">
                            <button
                              type="button"
                              onClick={handleAddCustomObjectTag}
                              disabled={!newCustomObjectLabel.trim()}
                              className="w-full py-1.5 px-3 rounded-xl bg-indigo-700 hover:bg-indigo-800 disabled:opacity-40 text-white text-xs font-bold transition-all flex items-center justify-center gap-1 shadow-xs cursor-pointer"
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span>Thêm Thẻ Màu</span>
                            </button>
                          </div>
                        </div>

                        {/* Chọn nhanh màu từ Bảng màu cho đối tượng mới */}
                        <div className="flex flex-wrap items-center gap-1.5 pt-1">
                          <span className="text-[10px] font-semibold text-studio-500 mr-1">
                            Chọn nhanh màu:
                          </span>
                          {Array.from(
                            new Set([
                              ...getEffectivePaletteColors(),
                              ...(appliedSummary?.dominantColors || []),
                              ...(appliedSummary?.auxiliaryColors || []),
                              ...(appliedSummary?.accentColors || []),
                              "#52B788",
                              "#FF6B6B",
                              "#F4A261",
                              "#FFD166",
                              "#48CAE4",
                              "#9D4EDD",
                            ])
                          ).map((sw, idx) => {
                            const normSw = sw.toUpperCase();
                            return (
                              <button
                                key={`add_sw_${idx}`}
                                type="button"
                                onClick={() => setNewCustomObjectHex(normSw)}
                                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-mono border cursor-pointer transition-all ${
                                  newCustomObjectHex.toUpperCase() === normSw
                                    ? "bg-studio-900 text-white border-studio-900 font-bold"
                                    : "bg-white text-studio-700 border-studio-200 hover:border-studio-400"
                                }`}
                              >
                                <span
                                  className="w-3 h-3 rounded-full border border-black/15"
                                  style={{ backgroundColor: normSw }}
                                />
                                <span>{normSw}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Danh sách Interactive Badges / Chips kèm nút [Xóa thẻ] */}
                    <div className="flex flex-wrap items-center gap-1.5">
                      {(appliedSummary?.detectedObjects &&
                      appliedSummary.detectedObjects.length > 0
                        ? appliedSummary.detectedObjects
                        : (appliedSummary?.detectedObjectsSummary || []).map(
                            (raw, idx) => {
                              const hexMatch = raw.match(/#[0-9a-fA-F]{6}/);
                              const hex = hexMatch
                                ? hexMatch[0].toUpperCase()
                                : "#FF8FAB";
                              const labelPart =
                                raw.split(":")[0]?.trim() ||
                                `Đối tượng ${idx + 1}`;
                              return {
                                id: `obj_${idx}`,
                                labelVi: labelPart,
                                primaryHex: hex,
                                isUserOverride: raw.includes("Ưu tiên"),
                              };
                            }
                          )
                      ).map((objItem, idx) => {
                        const normLabel = objItem.labelVi.trim().toLowerCase();
                        const activeHex =
                          userObjectColors[normLabel] ||
                          objItem.primaryHex ||
                          "#FF8FAB";
                        const isOverridden =
                          Boolean(userObjectColors[normLabel]) ||
                          objItem.isUserOverride;
                        const isEditingThis =
                          activeEditingObject?.labelVi === objItem.labelVi;

                        return (
                          <div
                            key={`${objItem.id}_${idx}`}
                            className={`group inline-flex items-center rounded-xl text-[11px] font-medium border transition-all select-none overflow-hidden ${
                              isEditingThis
                                ? "bg-studio-900 text-white border-studio-900 shadow-md ring-2 ring-studio-300 scale-[1.02]"
                                : isOverridden
                                ? "bg-emerald-50 text-emerald-950 border-emerald-400 font-bold shadow-xs hover:bg-emerald-100/80"
                                : "bg-studio-50/90 text-studio-800 border-studio-200 hover:bg-white hover:border-studio-400 hover:shadow-xs"
                            }`}
                          >
                            <button
                              type="button"
                              onClick={() => {
                                if (isEditingThis) {
                                  setActiveEditingObject(null);
                                } else {
                                  setActiveEditingObject({
                                    id: objItem.id,
                                    labelVi: objItem.labelVi,
                                    currentHex: activeHex,
                                  });
                                  setEditingObjectLabelInput(objItem.labelVi);
                                  setManualHexInput(activeHex);
                                  setShowAddObjectForm(false);
                                }
                              }}
                              title={`Bấm để sửa tên hoặc đổi màu cho "${objItem.labelVi}"`}
                              className="inline-flex items-center gap-1.5 pl-2.5 pr-1.5 py-1 cursor-pointer"
                            >
                              <span
                                className="w-3.5 h-3.5 rounded-full border border-black/20 shadow-2xs shrink-0 transition-transform group-hover:scale-110"
                                style={{ backgroundColor: activeHex }}
                              />
                              <span>
                                {objItem.labelVi}:{" "}
                                <span className="font-mono font-semibold">
                                  {activeHex}
                                </span>
                              </span>
                              {isOverridden && (
                                <span
                                  className={`px-1 py-0.2 rounded text-[9px] font-bold ${
                                    isEditingThis
                                      ? "bg-emerald-500 text-white"
                                      : "bg-emerald-200/80 text-emerald-900"
                                  }`}
                                >
                                  Ưu tiên
                                </span>
                              )}
                              <Pencil
                                className={`w-3 h-3 ml-0.5 transition-opacity ${
                                  isEditingThis
                                    ? "opacity-100 text-amber-300"
                                    : "opacity-55 group-hover:opacity-100 text-studio-500"
                                }`}
                              />
                            </button>

                            {/* Nút [Xóa thẻ] trực tiếp trên từng thẻ đối tượng */}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteObjectTag(
                                  objItem.labelVi,
                                  objItem.id
                                );
                              }}
                              title={`Xóa thẻ "${objItem.labelVi}" (nếu AI nhận diện sai hoặc bị thừa)`}
                              className={`px-1.5 py-1 border-l transition-colors cursor-pointer ${
                                isEditingThis
                                  ? "border-studio-700 text-rose-300 hover:bg-rose-600 hover:text-white"
                                  : "border-studio-200/70 text-studio-400 hover:bg-rose-100 hover:text-rose-700"
                              }`}
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        );
                      })}
                    </div>

                    {/* POPUP SỬA TÊN/MÔ TẢ ĐỐI TƯỢNG (RENAME OBJECT LABEL) & CHỌN MÀU NHANH/TỰ DO */}
                    {activeEditingObject && (
                      <div className="mt-2 p-3.5 rounded-2xl bg-white border-2 border-studio-800/80 shadow-lg space-y-3 animate-in fade-in duration-150">
                        <div className="flex items-center justify-between gap-2 pb-2 border-b border-studio-100">
                          <div className="flex items-center gap-2">
                            <span
                              className="w-5 h-5 rounded-full border border-black/20 shadow-xs shrink-0"
                              style={{
                                backgroundColor: activeEditingObject.currentHex,
                              }}
                            />
                            <div>
                              <p className="text-xs font-bold text-studio-900">
                                ✏️ Sửa tên &amp; Chỉnh màu đối tượng:{" "}
                                <span className="text-emerald-700 underline">
                                  {activeEditingObject.labelVi}
                                </span>
                              </p>
                              <p className="text-[10px] text-studio-500">
                                Bạn có thể sửa lại mô tả chi tiết (VD: &ldquo;Thân con cá sấu to ở giữa&rdquo;) để AI định vị chuẩn xác hơn
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() =>
                                handleDeleteObjectTag(
                                  activeEditingObject.labelVi,
                                  activeEditingObject.id
                                )
                              }
                              className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 transition-colors cursor-pointer"
                              title="Xóa bỏ thẻ đối tượng này"
                            >
                              <Trash2 className="w-3 h-3" />
                              <span>Xóa thẻ</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => setActiveEditingObject(null)}
                              className="p-1 rounded-lg text-studio-400 hover:text-studio-800 hover:bg-studio-100 transition-colors"
                              title="Đóng bảng chỉnh sửa"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* 1. Ô Input SỬA LẠI TÊN / MÔ TẢ CỦA ĐỐI TƯỢNG (RENAME OBJECT LABEL) */}
                        <div className="space-y-1.5 bg-studio-50/70 p-2.5 rounded-xl border border-studio-200/80">
                          <label className="text-[10px] font-bold text-studio-700 uppercase tracking-wider block">
                            1. Sửa lại Tên / Mô tả chi tiết của đối tượng (Rename Object Label):
                          </label>
                          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2">
                            <input
                              type="text"
                              value={editingObjectLabelInput}
                              onChange={(e) =>
                                setEditingObjectLabelInput(e.target.value)
                              }
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault();
                                  handleApplyObjectColorOverride(
                                    activeEditingObject.labelVi,
                                    activeEditingObject.currentHex,
                                    editingObjectLabelInput,
                                    activeEditingObject.id
                                  );
                                }
                              }}
                              placeholder="VD: Thân con cá sấu to ở giữa..."
                              className="w-full px-3 py-1.5 text-xs font-semibold rounded-xl bg-white border border-studio-300 focus:outline-none focus:border-studio-900 text-studio-900"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                handleApplyObjectColorOverride(
                                  activeEditingObject.labelVi,
                                  activeEditingObject.currentHex,
                                  editingObjectLabelInput,
                                  activeEditingObject.id
                                )
                              }
                              className="shrink-0 px-3 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-[11px] font-bold transition-colors flex items-center gap-1 cursor-pointer shadow-2xs"
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span>Lưu tên &amp; màu</span>
                            </button>
                          </div>
                        </div>

                        {/* 2. Bảng chọn màu nhanh (Quick Palette Picker) từ Bảng Màu hiện tại */}
                        <div className="space-y-1.5">
                          <span className="text-[10px] font-bold text-studio-600 uppercase tracking-wider block">
                            2. Chọn nhanh màu từ Bảng màu hiện tại &amp; Tỷ lệ vàng:
                          </span>
                          <div className="flex flex-wrap items-center gap-1.5">
                            {Array.from(
                              new Set([
                                ...getEffectivePaletteColors(),
                                ...(appliedSummary?.dominantColors || []),
                                ...(appliedSummary?.auxiliaryColors || []),
                                ...(appliedSummary?.accentColors || []),
                                ...(appliedSummary?.skinToneHex
                                  ? [appliedSummary.skinToneHex]
                                  : []),
                                "#FF6B6B",
                                "#F4A261",
                                "#E9C46A",
                                "#2A9D8F",
                                "#457B9D",
                                "#83C5BE",
                                "#B5838D",
                                "#9B5DE5",
                                "#52B788",
                                "#FFE5D9",
                              ])
                            ).map((swatchHex, sIdx) => {
                              const normSwatch = swatchHex.toUpperCase();
                              const isSelected =
                                activeEditingObject.currentHex.toUpperCase() ===
                                normSwatch;
                              return (
                                <button
                                  key={`${normSwatch}_${sIdx}`}
                                  type="button"
                                  onClick={() =>
                                    handleApplyObjectColorOverride(
                                      activeEditingObject.labelVi,
                                      normSwatch,
                                      editingObjectLabelInput,
                                      activeEditingObject.id
                                    )
                                  }
                                  title={`Chọn màu ${normSwatch} cho ${editingObjectLabelInput || activeEditingObject.labelVi}`}
                                  className={`inline-flex items-center gap-1 px-2 py-1 rounded-xl text-[10px] font-mono border transition-all cursor-pointer ${
                                    isSelected
                                      ? "bg-studio-900 text-white border-studio-900 font-bold ring-2 ring-studio-300 scale-105"
                                      : "bg-studio-50/70 text-studio-700 border-studio-200 hover:bg-white hover:border-studio-400 hover:scale-105"
                                  }`}
                                >
                                  <span
                                    className="w-3.5 h-3.5 rounded-full border border-black/15"
                                    style={{ backgroundColor: normSwatch }}
                                  />
                                  <span>{normSwatch}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* 3. Color Picker tự do & Nhập mã HEX thủ công */}
                        <div className="pt-2 border-t border-studio-100 flex flex-wrap items-center justify-between gap-2">
                          <div className="flex flex-wrap items-center gap-2">
                            <label className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-studio-700 cursor-pointer bg-studio-50 px-2.5 py-1 rounded-xl border border-studio-200 hover:border-studio-400">
                              <span>🌈 Bảng màu tự do:</span>
                              <input
                                type="color"
                                value={
                                  /^#[0-9A-Fa-f]{6}$/.test(
                                    activeEditingObject.currentHex
                                  )
                                    ? activeEditingObject.currentHex
                                    : "#FF8FAB"
                                }
                                onChange={(e) =>
                                  handleApplyObjectColorOverride(
                                    activeEditingObject.labelVi,
                                    e.target.value,
                                    editingObjectLabelInput,
                                    activeEditingObject.id
                                  )
                                }
                                className="w-6 h-6 rounded cursor-pointer border-0 bg-transparent p-0"
                              />
                            </label>

                            <div className="inline-flex items-center gap-1">
                              <input
                                type="text"
                                value={manualHexInput}
                                onChange={(e) =>
                                  setManualHexInput(e.target.value.toUpperCase())
                                }
                                placeholder="#FF5733"
                                maxLength={7}
                                className="w-24 px-2.5 py-1 text-xs font-mono font-semibold rounded-xl border border-studio-200 focus:outline-none focus:border-studio-800 text-studio-900"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  const candidate = manualHexInput.startsWith("#")
                                    ? manualHexInput.trim()
                                    : `#${manualHexInput.trim()}`;
                                  if (/^#[0-9A-Fa-f]{6}$/.test(candidate)) {
                                    handleApplyObjectColorOverride(
                                      activeEditingObject.labelVi,
                                      candidate,
                                      editingObjectLabelInput,
                                      activeEditingObject.id
                                    );
                                  }
                                }}
                                className="px-2.5 py-1 rounded-xl text-[11px] font-bold bg-studio-900 text-white hover:bg-studio-800 transition-colors cursor-pointer"
                              >
                                Áp dụng HEX
                              </button>
                            </div>
                          </div>

                          {userObjectColors[
                            activeEditingObject.labelVi.trim().toLowerCase()
                          ] && (
                            <button
                              type="button"
                              onClick={() =>
                                handleRemoveObjectOverride(
                                  activeEditingObject.labelVi
                                )
                              }
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-[11px] font-semibold bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 transition-colors cursor-pointer"
                            >
                              <RotateCcw className="w-3 h-3" />
                              Khôi phục màu mặc định
                            </button>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Hiển thị trạng thái STRICT RE-LABELING RULE + Ưu tiên số 1 (user_object_colors) + Ưu tiên số 2 (custom_golden_ratio) (Đã ẩn khỏi giao diện theo yêu cầu, vẫn hoạt động ngầm) */}
                    {(Object.keys(userObjectColors).length > 0 ||
                      deletedObjectLabels.length > 0 ||
                      config.customGoldenRatio?.enabled) && (
                      <div className="hidden p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200 text-[10px] text-emerald-900 space-y-1.5">
                        {Object.keys(userObjectColors).length > 0 && (
                          <>
                            <div className="leading-relaxed">
                              🏷️{" "}
                              <strong>
                                GHI ĐÈ TÊN ĐỐI TƯỢNG (`STRICT RE-LABELING RULE`):
                              </strong>{" "}
                              <span className="text-emerald-950">
                                Người dùng đã hiệu chỉnh lại danh sách nhận diện đối tượng thành:{" "}
                              </span>
                              <code className="font-mono bg-white/90 px-1.5 py-0.5 rounded border border-emerald-200 font-semibold">
                                [
                                {getRelabeledObjectsSummaryList(
                                  userObjectColors,
                                  appliedSummary?.detectedObjects
                                ).join(", ")}
                                ]
                              </code>
                            </div>
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <span>
                                🥇 <strong>ƯU TIÊN SỐ 1 (`user_object_colors`):</strong>{" "}
                                <code className="font-mono bg-white/80 px-1.5 py-0.5 rounded border border-emerald-200">
                                  {JSON.stringify(userObjectColors)}
                                </code>
                              </span>
                            </div>
                          </>
                        )}
                        {deletedObjectLabels.length > 0 && (
                          <div>
                            🗑️ <strong>Đã xóa thẻ nhận diện sai:</strong>{" "}
                            <code className="font-mono bg-rose-50 text-rose-800 px-1.5 py-0.5 rounded border border-rose-200">
                              [{deletedObjectLabels.join(", ")}]
                            </code>
                          </div>
                        )}
                        {config.customGoldenRatio?.enabled && (
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <span>
                              🥈 <strong>ƯU TIÊN SỐ 2 (`custom_golden_ratio`):</strong>{" "}
                              <code className="font-mono bg-white/80 px-1.5 py-0.5 rounded border border-emerald-200">
                                {JSON.stringify({
                                  ratios: config.customGoldenRatio.ratios,
                                  dominant: config.customGoldenRatio.dominantColors,
                                  secondary: config.customGoldenRatio.secondaryColors,
                                  accent: config.customGoldenRatio.accentColors,
                                })}
                              </code>
                            </span>
                          </div>
                        )}
                        <p className="text-[10px] text-emerald-700 font-medium">
                          ✓ AI bắt buộc định vị đối tượng theo mô tả chi tiết mới này và phủ chính xác mã màu được gán khi bấm &ldquo;Tô Lại Phiên Bản Khác&rdquo; hoặc &ldquo;Tô Màu Ngay&rdquo;.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Chi tiết prompt ẩn (Đã ẩn khỏi giao diện theo yêu cầu, vẫn hoạt động ngầm) */}
                  {generatedPrompt && (
                    <details className="hidden text-[11px] text-studio-500 pt-2 border-t border-studio-100">
                      <summary className="cursor-pointer font-semibold hover:text-studio-800">
                        Xem Chi Tiết Câu Lệnh Prompt AI Đã Tạo
                      </summary>
                      <p className="mt-2 p-2.5 bg-studio-50 rounded-xl leading-relaxed font-mono text-[10px] text-studio-700">
                        {generatedPrompt}
                      </p>
                    </details>
                  )}
                </div>
              </div>
            )}

            {/* Trạng thái trống khi chưa tạo ảnh */}
            {!isLoading && !resultImage && (
              <div className="bg-white rounded-3xl p-8 text-center border border-dashed border-studio-200 shadow-soft flex flex-col items-center justify-center min-h-[400px]">
                {originalImage ? (
                  <div className="space-y-4 max-w-sm">
                    <div className="w-48 h-48 mx-auto rounded-2xl bg-studio-50 p-2 border border-studio-100 overflow-hidden flex items-center justify-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={originalImage}
                        alt="Đã sẵn sàng tô màu"
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-studio-900">
                        Tranh Nét Đã Sẵn Sàng Tô Màu!
                      </h3>
                      <p className="text-xs text-studio-500 mt-1">
                        Hãy chọn phong cách &amp; bảng màu ở cột bên trái, sau đó nhấn <strong>Bắt Đầu Tô Màu Bằng AI</strong> để xem phép màu xuất hiện!
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3 max-w-xs">
                    <div className="w-16 h-16 rounded-2xl bg-pastel-pink/40 flex items-center justify-center mx-auto text-studio-600">
                      <Sparkles className="w-8 h-8" />
                    </div>
                    <h3 className="text-sm font-bold text-studio-900">
                      Chưa Chọn Bản Vẽ Nét
                    </h3>
                    <p className="text-xs text-studio-500 leading-relaxed">
                      Tải lên bức tranh nét vẽ từ máy tính của bạn hoặc chọn thử một trong các tranh nét mẫu dễ thương ở cột bên trái để bắt đầu.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function StudioPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <div className="w-10 h-10 border-4 border-pastel-lilac border-t-studio-700 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-xs text-studio-500">Đang tải Studio Tô Màu AI...</p>
        </div>
      }
    >
      <StudioContent />
    </Suspense>
  );
}
