"use client";

import React, { useState } from "react";
import {
  BookOpen,
  Clock,
  Sparkles,
  Palette,
  Check,
  Copy,
  LayoutGrid,
  Rows3,
  ZoomIn,
  X,
} from "lucide-react";
import { LEARN_ARTICLES } from "@/data/creative-content";
import { ArticleItem, TutorialStepItem } from "@/types";

export default function LearnPage() {
  const [activeArticleId, setActiveArticleId] = useState<string>(
    LEARN_ARTICLES[0].id
  );
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [stepLayout, setStepLayout] = useState<"grid" | "list">("grid");
  const [lightboxStep, setLightboxStep] = useState<TutorialStepItem | null>(
    null
  );

  const activeArticle: ArticleItem =
    LEARN_ARTICLES.find((a) => a.id === activeArticleId) || LEARN_ARTICLES[0];

  const handleCopyHex = (hex: string) => {
    try {
      navigator.clipboard.writeText(hex);
      setCopiedHex(hex);
      setTimeout(() => setCopiedHex(null), 1500);
    } catch {}
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Khung tiêu đề */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pastel-lavender text-studio-900 text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5 text-studio-700" />
          Góc Học Phối Màu &amp; Hướng Dẫn Trực Quan
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-studio-900">
          Hướng Dẫn Tô Màu Từng Bước &amp; Lý Thuyết Màu Sắc
        </h1>
        <p className="text-sm text-studio-500">
          Khám phá các bài hướng dẫn &ldquo;How to Color...&rdquo; trực quan từng bước (Step 1 → Step 4) chuẩn sách dạy tô màu chuyên nghiệp kèm bảng mã màu HEX tham khảo.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Cột trái: Danh sách các bài hướng dẫn (4 cột) */}
        <div className="lg:col-span-4 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-studio-500 px-1 mb-2">
            Danh Sách Bài Hướng Dẫn ({LEARN_ARTICLES.length})
          </h3>

          {LEARN_ARTICLES.map((article) => {
            const isSelected = article.id === activeArticleId;
            const hasVisualSteps = Boolean(
              article.steps && article.steps.length > 0
            );

            return (
              <button
                key={article.id}
                type="button"
                onClick={() => setActiveArticleId(article.id)}
                className={`w-full p-4 rounded-3xl text-left transition-all border ${
                  isSelected
                    ? "bg-white border-studio-800 ring-2 ring-studio-400/40 shadow-soft"
                    : "bg-white/70 border-studio-100 hover:bg-white hover:border-studio-200"
                }`}
              >
                <div className="flex gap-3.5 items-start">
                  {article.cover_image && (
                    <div className="w-16 h-16 rounded-2xl overflow-hidden border border-studio-100 shrink-0 bg-white flex items-center justify-center">
                      <img
                        src={article.cover_image}
                        alt={article.title}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1.5 mb-1.5">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          hasVisualSteps
                            ? "bg-violet-100 text-violet-800"
                            : "bg-studio-100 text-studio-700"
                        }`}
                      >
                        {articleCategoryName(article.category)}
                      </span>
                      <span className="text-[10px] text-studio-400 flex items-center gap-1 shrink-0">
                        <Clock className="w-3 h-3" />
                        {article.readTime}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-studio-900 leading-snug">
                      {article.title}
                    </h4>
                    <p className="text-xs text-studio-500 mt-1 line-clamp-2">
                      {article.summary}
                    </p>

                    {article.palette_used && article.palette_used.length > 0 && (
                      <div className="flex items-center gap-1 mt-2.5">
                        {article.palette_used.slice(0, 6).map((hex) => (
                          <span
                            key={hex}
                            className="w-3.5 h-3.5 rounded-full border border-black/10 shadow-2xs"
                            style={{ backgroundColor: hex }}
                            title={hex}
                          />
                        ))}
                        {hasVisualSteps && (
                          <span className="ml-auto text-[10px] font-bold text-violet-700">
                            {article.steps?.length} bước ảnh →
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Cột phải: Nội dung chi tiết bài viết & Visual Step-by-Step Grid (8 cột) */}
        <div className="lg:col-span-8 bg-white rounded-4xl p-6 sm:p-10 border border-studio-100 shadow-soft space-y-8">
          {/* Phần 1: Tiêu đề bài viết */}
          <div className="space-y-3 border-b border-studio-100 pb-6">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-pastel-pink text-studio-800">
                {articleCategoryName(activeArticle.category)}
              </span>
              <span className="text-xs text-studio-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {activeArticle.readTime}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-studio-900">
              {activeArticle.title}
            </h2>
            <p className="text-sm text-studio-600 font-medium leading-relaxed">
              {activeArticle.summary}
            </p>
          </div>

          {/* Phần 2: Ảnh bìa thiết kế dễ thương (cover_image) & Bảng mã màu HEX tham khảo (palette_used) */}
          {(activeArticle.cover_image ||
            (activeArticle.palette_used &&
              activeArticle.palette_used.length > 0)) && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 bg-gradient-to-br from-pastel-lavender/35 via-pastel-pink/25 to-pastel-butter/30 p-5 sm:p-6 rounded-3xl border border-studio-100">
              {activeArticle.cover_image && (
                <div className="md:col-span-5">
                  <div className="rounded-2xl overflow-hidden border-2 border-white shadow-soft bg-white flex items-center justify-center">
                    <img
                      src={activeArticle.cover_image}
                      alt={activeArticle.title}
                      className="w-full h-auto max-h-[360px] object-contain"
                    />
                  </div>
                </div>
              )}

              <div
                className={`${
                  activeArticle.cover_image ? "md:col-span-7" : "md:col-span-12"
                } flex flex-col justify-center space-y-3`}
              >
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 text-studio-800 text-[11px] font-bold border border-studio-100 w-fit">
                  <Palette className="w-3.5 h-3.5 text-rose-500" />
                  <span>Bảng Mã Màu Tham Khảo (Palette Used)</span>
                </div>
                <p className="text-xs text-studio-600">
                  Bấm vào từng ô màu bên dưới để sao chép nhanh mã HEX tham khảo cho bài thực hành.
                </p>

                {activeArticle.palette_used && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
                    {activeArticle.palette_used.map((hex) => {
                      const isCopied = copiedHex === hex;
                      return (
                        <button
                          key={hex}
                          type="button"
                          onClick={() => handleCopyHex(hex)}
                          className="flex items-center gap-2.5 p-2 rounded-2xl bg-white/95 hover:bg-white border border-studio-100 shadow-2xs transition-all group"
                          title="Bấm để sao chép mã HEX"
                        >
                          <span
                            className="w-7 h-7 rounded-xl border border-black/10 shrink-0 shadow-inner"
                            style={{ backgroundColor: hex }}
                          />
                          <div className="text-left min-w-0 flex-1">
                            <span className="block text-xs font-extrabold font-mono text-studio-900">
                              {hex}
                            </span>
                            <span className="block text-[10px] text-studio-400 group-hover:text-studio-600">
                              {isCopied ? "Đã chép!" : "Sao chép"}
                            </span>
                          </div>
                          {isCopied ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          ) : (
                            <Copy className="w-3.5 h-3.5 text-studio-300 group-hover:text-studio-600 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Phần 3: LƯỚI HÌNH ẢNH MINH HỌA TỪNG BƯỚC 2x2 (VISUAL STEP-BY-STEP IMAGE GRID) */}
          {activeArticle.steps && activeArticle.steps.length > 0 && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg font-black text-studio-900 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-500" />
                    Minh Họa Thực Hành Từng Bước (Step 1 → Step{" "}
                    {activeArticle.steps.length})
                  </h3>
                  <p className="text-xs text-studio-500">
                    Bấm vào bất kỳ hình ảnh bước nào để phóng to xem chi tiết mã bút màu và nét cọ.
                  </p>
                </div>

                {/* Nút chuyển đổi Lưới 2x2 hoặc Dọc nối tiếp */}
                <div className="inline-flex items-center gap-1 p-1 rounded-2xl bg-studio-50 border border-studio-100">
                  <button
                    type="button"
                    onClick={() => setStepLayout("grid")}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                      stepLayout === "grid"
                        ? "bg-studio-900 text-white shadow-2xs"
                        : "text-studio-600 hover:text-studio-900"
                    }`}
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                    <span>Lưới 2x2</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setStepLayout("list")}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                      stepLayout === "list"
                        ? "bg-studio-900 text-white shadow-2xs"
                        : "text-studio-600 hover:text-studio-900"
                    }`}
                  >
                    <Rows3 className="w-3.5 h-3.5" />
                    <span>Xem Lớn Từng Bước</span>
                  </button>
                </div>
              </div>

              <div
                className={
                  stepLayout === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 gap-6"
                    : "space-y-6"
                }
              >
                {activeArticle.steps.map((step) => (
                  <div
                    key={step.step_number}
                    className="rounded-3xl border border-studio-100 bg-studio-50/50 hover:bg-white hover:border-studio-200 transition-all overflow-hidden flex flex-col justify-between shadow-2xs group"
                  >
                    <div>
                      {/* Thanh đầu mỗi bước */}
                      <div className="px-4 py-3 bg-white border-b border-studio-100 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-1 rounded-xl bg-studio-900 text-white text-xs font-black">
                            STEP {step.step_number}
                          </span>
                          {step.level_badge && (
                            <span className="px-2.5 py-1 rounded-xl bg-pastel-butter/70 text-studio-900 text-[11px] font-extrabold">
                              {step.level_badge}
                            </span>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={() => setLightboxStep(step)}
                          className="p-1.5 rounded-xl text-studio-500 hover:text-studio-900 hover:bg-studio-50 transition-colors flex items-center gap-1 text-[11px] font-semibold"
                          title="Phóng to ảnh minh họa"
                        >
                          <ZoomIn className="w-3.5 h-3.5" />
                          <span>Phóng to</span>
                        </button>
                      </div>

                      {/* Ảnh minh họa của Bước */}
                      <div
                        onClick={() => setLightboxStep(step)}
                        className="relative bg-white cursor-zoom-in overflow-hidden border-b border-studio-100"
                      >
                        <img
                          src={step.image_url}
                          alt={step.title || `Step ${step.step_number}`}
                          className="w-full h-auto object-contain max-h-[520px] mx-auto transition-transform duration-300 group-hover:scale-[1.01]"
                        />
                      </div>
                    </div>

                    {/* Mô tả kỹ thuật tô bên dưới mỗi bức ảnh */}
                    <div className="p-4 sm:p-5 space-y-2.5 bg-white">
                      {step.title && (
                        <h4 className="text-sm font-black text-studio-900">
                          {step.title}
                        </h4>
                      )}

                      {step.marker_codes && step.marker_codes.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {step.marker_codes.map((code) => (
                            <span
                              key={code}
                              className="px-2 py-0.5 rounded-lg bg-violet-50 text-violet-900 border border-violet-200/70 text-[10px] font-bold"
                            >
                              🖍️ {code}
                            </span>
                          ))}
                        </div>
                      )}

                      <p className="text-xs sm:text-sm text-studio-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Phần 4: Nội dung ghi chú & mẹo chuyên sâu */}
          {activeArticle.content && (
            <div className="prose prose-studio max-w-none text-studio-700 text-sm leading-relaxed whitespace-pre-line pt-4 border-t border-studio-100">
              {activeArticle.content}
            </div>
          )}
        </div>
      </div>

      {/* Modal Phóng To Hình Ảnh Bước Hướng Dẫn (Lightbox) */}
      {lightboxStep && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setLightboxStep(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto p-5 sm:p-6 space-y-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-studio-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-xl bg-studio-900 text-white text-xs font-black">
                  STEP {lightboxStep.step_number}
                </span>
                {lightboxStep.level_badge && (
                  <span className="px-2.5 py-1 rounded-xl bg-pastel-butter text-studio-900 text-xs font-bold">
                    {lightboxStep.level_badge}
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={() => setLightboxStep(null)}
                className="p-2 rounded-full bg-studio-100 hover:bg-studio-200 text-studio-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="rounded-2xl overflow-hidden bg-studio-50 border border-studio-100">
              <img
                src={lightboxStep.image_url}
                alt={lightboxStep.title || `Step ${lightboxStep.step_number}`}
                className="w-full h-auto max-h-[68vh] object-contain mx-auto"
              />
            </div>

            <div className="space-y-2">
              {lightboxStep.title && (
                <h4 className="text-base font-black text-studio-900">
                  {lightboxStep.title}
                </h4>
              )}
              <p className="text-xs sm:text-sm text-studio-600 leading-relaxed">
                {lightboxStep.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function articleCategoryName(cat: string) {
  switch (cat) {
    case "Visual Tutorial":
      return "Hướng Dẫn Từng Bước";
    case "Fundamentals":
      return "Kiến Thức Nền Tảng";
    case "Techniques":
      return "Kỹ Thuật Đổ Bóng";
    case "Inspiration":
      return "Nguồn Cảm Hứng";
    default:
      return cat;
  }
}
