import { NextRequest, NextResponse } from "next/server";
import { getAIService } from "@/lib/ai/ai-service";
import { ColoringPromptBuilder } from "@/lib/prompt-builder";
import { prisma } from "@/lib/prisma";
import { ColoringConfig } from "@/types";

export const maxDuration = 60; // Allow sufficient time for AI image rendering

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      imageBase64,
      mimeType = "image/png",
      config,
      namedPaletteName,
      paletteColors,
      title = "Coloring Creation",
      geminiApiKey,
      userObjectColors,
      relabeledObjectsList,
      deletedObjectLabels,
    } = body as {
      imageBase64: string;
      mimeType: string;
      config: ColoringConfig;
      namedPaletteName?: string;
      paletteColors?: string[];
      title?: string;
      geminiApiKey?: string;
      userObjectColors?: Record<string, string>;
      relabeledObjectsList?: string[];
      deletedObjectLabels?: string[];
    };

    // 1. Upload & Input Validation
    if (!imageBase64 || typeof imageBase64 !== "string") {
      return NextResponse.json(
        { error: "Vui lòng tải lên một tệp ảnh tranh nét hợp lệ." },
        { status: 400 }
      );
    }

    const maxUploadMb = parseInt(process.env.MAX_UPLOAD_MB || "10", 10);
    // Estimate base64 byte size
    const estimatedSizeBytes = (imageBase64.length * 3) / 4;
    const maxSizeBytes = maxUploadMb * 1024 * 1024;

    if (estimatedSizeBytes > maxSizeBytes) {
      return NextResponse.json(
        {
          error: `Kích thước tệp vượt quá giới hạn cho phép ${maxUploadMb}MB. Vui lòng chọn tệp nhỏ hơn.`,
        },
        { status: 400 }
      );
    }

    const validMimes = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/webp",
      "image/svg+xml",
    ];
    if (mimeType && !validMimes.includes(mimeType.toLowerCase())) {
      return NextResponse.json(
        {
          error:
            "Định dạng tệp không được hỗ trợ. Vui lòng tải ảnh PNG, JPG/JPEG hoặc SVG.",
        },
        { status: 400 }
      );
    }

    // 2. Validate configuration
    if (!config || !config.style || !config.palette || !config.mood) {
      return NextResponse.json(
        { error: "Thiếu các thông số cấu hình tô màu bắt buộc." },
        { status: 400 }
      );
    }

    // 3. Build prompt through ColoringPromptBuilder (Strict Separation of Concerns)
    const prompt = ColoringPromptBuilder.buildPrompt({
      style: config.style,
      customStyle: config.customStyle,
      palette: config.palette,
      namedPaletteName,
      paletteColors,
      mood: config.mood,
      lighting: config.lighting,
      colorMode: config.colorMode,
      customInstruction: config.customInstruction,
      userObjectColors,
      customGoldenRatio: config.customGoldenRatio,
      relabeledObjectsList,
    });

    // 4. Invoke AI Service (Google Gemini / OpenAI / Local Smart Engine)
    const aiService = getAIService(geminiApiKey);
    const generationResult = await aiService.generateColoring({
      imageBase64,
      mimeType,
      config,
      namedPaletteName,
      paletteColors,
      userObjectColors,
      relabeledObjectsList,
      deletedObjectLabels,
    });

    // 5. Database Persistence (Prisma ORM)
    let savedProjectId: string | undefined;
    let savedGenerationId: string | undefined;

    try {
      // Save project and generation record
      const project = await prisma.coloringProject.create({
        data: {
          title: title || `${config.style} Coloring`,
          status: "ACTIVE",
          configurations: {
            create: {
              style: config.style,
              palette: config.palette,
              mood: config.mood,
              lighting: config.lighting,
              colorMode: config.colorMode,
              customInstruction: config.customInstruction || null,
            },
          },
          originalImages: {
            create: {
              storageKey: `inline-${Date.now()}`,
              mimeType,
              fileSize: Math.round(estimatedSizeBytes),
            },
          },
          generations: {
            create: {
              provider: generationResult.provider,
              model: generationResult.model,
              prompt: generationResult.prompt,
              status: "COMPLETED",
              generatedImageKey: generationResult.imageUrl.slice(0, 100), // Key or preview snippet
              completedAt: new Date(),
            },
          },
        },
        include: {
          generations: true,
        },
      });

      savedProjectId = project.id;
      savedGenerationId = project.generations[0]?.id;
    } catch (dbErr) {
      // Non-fatal logging if DB operation fails so user experience is not disrupted
      console.warn("DB generation persistence notice:", dbErr);
    }

    // 6. Return response
    return NextResponse.json({
      success: true,
      imageUrl: generationResult.imageUrl,
      prompt: generationResult.prompt,
      provider: generationResult.provider,
      model: generationResult.model,
      isMock: generationResult.isMock,
      notes: generationResult.notes,
      aiVietnameseInstruction: generationResult.aiVietnameseInstruction,
      aiSceneAnalysis: generationResult.aiSceneAnalysis,
      projectId: savedProjectId,
      generationId: savedGenerationId,
      createdAt: new Date().toISOString(),
    });
  } catch (error: unknown) {
    console.error("AI Coloring API Error:", error);
    const message =
      error instanceof Error
        ? error.message
        : "Không thể xử lý yêu cầu tô màu. Vui lòng thử lại.";

    return NextResponse.json(
      {
        error: message,
        status: "FAILED",
      },
      { status: 500 }
    );
  }
}
