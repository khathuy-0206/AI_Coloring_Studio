"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Compass,
  Sparkles,
  ArrowRight,
  Palette,
  Check,
  Layers,
  Search,
} from "lucide-react";
import {
  INSPIRATION_CATEGORIES,
  INSPIRATION_CONCEPTS,
} from "@/data/creative-content";

export default function InspirationPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const copyHex = (hex: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1500);
  };

  const filteredConcepts = useMemo(() => {
    return INSPIRATION_CONCEPTS.filter((item) => {
      const matchCategory =
        selectedCategory === "all" || item.categoryId === selectedCategory;
      const matchSearch =
        !searchQuery.trim() ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.suggestedStyle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.tags && item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  const activeCategoryObj = useMemo(() => {
    if (selectedCategory === "all") return null;
    return INSPIRATION_CATEGORIES.find((c) => c.id === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* 1. KHUNG TIÊU ĐỀ CHÍNH */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/85 backdrop-blur-md border border-[#E8D7F1] shadow-soft text-studio-900 text-xs font-bold">
          <Compass className="w-4 h-4 text-purple-600" />
          <span>Góc Tìm Cảm Hứng Sáng Tạo</span>
          <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
          <span className="text-studio-500 font-medium">10 Danh Mục • 30 Chủ Đề Tuyển Chọn</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-studio-900 tracking-tight [text-wrap:balance] leading-tight">
          Tìm Cảm Hứng Sáng Tạo Cho Tranh Vẽ
        </h1>

        <p className="text-sm sm:text-base text-studio-600 max-w-2xl mx-auto [text-wrap:balance] leading-relaxed">
          Mỗi chủ đề đều có tác phẩm mẫu hoàn thiện đúng phong cách, bảng màu 5 sắc độ và gợi ý tô màu riêng biệt.
          Nhấp <strong className="text-studio-800 font-semibold">&ldquo;Thử Phong Cách Này&rdquo;</strong> để bắt đầu tô màu ngay trong Studio!
        </p>

        {/* Thanh tìm kiếm nhanh */}
        <div className="pt-2 max-w-md mx-auto">
          <div className="relative">
            <Search className="w-4 h-4 text-studio-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo chủ đề, phong cách (vd: Phòng ngủ, Lò sưởi, Trà chiều...)"
              className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-white/90 border border-studio-200/80 shadow-soft text-xs sm:text-sm text-studio-900 placeholder:text-studio-400 focus:outline-none focus:ring-2 focus:ring-[#E8D7F1] focus:border-purple-300 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-studio-400 hover:text-studio-700 px-1.5 py-0.5 rounded-md"
              >
                Xóa
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. BỘ 10 DANH MỤC TRÌNH BÀY THEO TỪNG Ô VUÔNG XẾP THÀNH HÌNH CHỮ NHẬT TRỰC QUAN (5 CỘT x 2 HÀNG) */}
      <div className="bg-white/80 backdrop-blur-md rounded-3xl p-5 sm:p-7 border border-[#E8D7F1]/80 shadow-soft space-y-4">
        {/* Tiêu đề bảng danh mục + Nút chuyển Tất Cả */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-studio-100/80 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-purple-100/70 flex items-center justify-center text-purple-700">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-studio-900 flex items-center gap-2">
                <span>10 Danh Mục Sáng Tạo</span>
                <span className="text-[11px] font-semibold px-2 py-0.2 rounded-full bg-pastel-pink text-studio-700">
                  30 chủ đề
                </span>
              </h2>
              <p className="text-[11px] text-studio-400">
                Nhấp vào ô vuông danh mục bên dưới để lọc nhanh các chủ đề tương ứng (mỗi danh mục có 3 chủ đề)
              </p>
            </div>
          </div>

          <button
            onClick={() => setSelectedCategory("all")}
            className={`self-start sm:self-center px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
              selectedCategory === "all"
                ? "bg-studio-900 text-white shadow-soft"
                : "bg-white text-studio-700 border border-studio-200 hover:bg-studio-50"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FFF1C5]" />
            <span>Xem Tất Cả 30 Chủ Đề</span>
          </button>
        </div>

        {/* Lưới 10 ô vuông xếp thành hình chữ nhật (5 cột x 2 hàng trên Desktop) */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4">
          {INSPIRATION_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(isSelected ? "all" : cat.id)}
                className={`aspect-square rounded-2xl p-2 sm:p-2.5 flex flex-col items-center justify-between text-center transition-all duration-200 border group relative ${
                  isSelected
                    ? "bg-gradient-to-b from-[#E8D7F1]/70 via-white to-[#FFCCD5]/50 border-purple-400 shadow-soft-lg ring-2 ring-purple-400 -translate-y-1"
                    : "bg-white hover:bg-purple-50/30 border-studio-100 hover:border-purple-200 shadow-2xs hover:shadow-soft hover:-translate-y-0.5"
                }`}
                title={cat.description}
              >
                {/* Biểu tượng danh mục */}
                <div
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-xl sm:text-2xl transition-transform group-hover:scale-110 mb-1 ${
                    isSelected ? "bg-white shadow-soft" : "bg-studio-50 group-hover:bg-white"
                  }`}
                >
                  {cat.icon}
                </div>

                {/* Tên danh mục */}
                <p
                  className={`text-[11px] sm:text-xs font-bold leading-tight line-clamp-2 px-0.5 ${
                    isSelected ? "text-purple-950 font-black" : "text-studio-800 group-hover:text-purple-700"
                  }`}
                >
                  {cat.name}
                </p>

                {/* Huy hiệu số lượng */}
                <span
                  className={`text-[9px] font-semibold px-2 py-0.2 rounded-full mt-0.5 ${
                    isSelected
                      ? "bg-purple-600 text-white font-bold"
                      : "bg-studio-50 text-studio-400"
                  }`}
                >
                  3 chủ đề
                </span>

                {/* Dấu tích khi đang chọn */}
                {isSelected && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-purple-600 text-white text-[9px] font-bold flex items-center justify-center shadow-xs">
                    ✓
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Banner thông tin danh mục đang chọn */}
      {activeCategoryObj && (
        <div className="bg-gradient-to-r from-white via-white/95 to-pastel-lilac/30 rounded-3xl p-5 border border-[#E8D7F1] shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fadeIn">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#E8D7F1]/50 border border-white flex items-center justify-center text-2xl shadow-soft">
              {activeCategoryObj.icon}
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-studio-900 flex items-center gap-2">
                <span>{activeCategoryObj.name}</span>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-pastel-pink text-studio-700">
                  Hiển thị 6 chủ đề nghệ thuật
                </span>
              </h2>
              <p className="text-xs text-studio-500 mt-0.5 max-w-xl">
                {activeCategoryObj.description}
              </p>
            </div>
          </div>
          <button
            onClick={() => setSelectedCategory("all")}
            className="text-xs font-semibold text-purple-600 hover:text-purple-800 self-start sm:self-center shrink-0 px-3.5 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 transition-colors"
          >
            ← Bỏ lọc, xem tất cả 126 chủ đề
          </button>
        </div>
      )}

      {/* 3. LƯỚI CÁC THẺ Ý TƯỞNG CẢM HỨNG (Ảnh mẫu phong cách sách tô màu Coco Wyo) */}
      {filteredConcepts.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-studio-100 shadow-soft max-w-md mx-auto space-y-3">
          <div className="text-4xl">🎨</div>
          <h3 className="text-base font-bold text-studio-800">Không tìm thấy chủ đề phù hợp</h3>
          <p className="text-xs text-studio-500">
            Thử tìm với từ khóa khác hoặc bấm nút bên dưới để xem lại toàn bộ 126 chủ đề.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("all");
              setSearchQuery("");
            }}
            className="mt-2 px-4 py-2 rounded-xl bg-studio-900 text-white text-xs font-bold hover:bg-studio-800 transition-all"
          >
            Hiển Thị Lại Tất Cả
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredConcepts.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl overflow-hidden border border-studio-100 shadow-soft hover:shadow-soft-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Ảnh mẫu minh họa chuẩn phong cách tranh tô màu và màu sắc từng chủ đề */}
              <div className="relative aspect-square sm:aspect-[4/3] bg-gradient-to-br from-[#E8D7F1]/20 via-[#BDE0FE]/20 to-[#FFCCD5]/20 overflow-hidden flex items-center justify-center p-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-contain drop-shadow-sm group-hover:scale-105 transition-transform duration-500 rounded-xl"
                  loading="lazy"
                />

                {/* Danh mục tag ở góc trên bên trái */}
                {item.categoryName && (
                  <div className="absolute top-4 left-4 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md border border-white text-[10px] font-bold text-studio-700 shadow-soft">
                    {item.categoryName}
                  </div>
                )}

                {/* Huy hiệu phong cách độc nhất */}
                <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-studio-900/90 backdrop-blur-md text-white text-[10px] font-bold shadow-soft flex items-center gap-1.5 border border-white/20">
                  <Sparkles className="w-3 h-3 text-[#FFF1C5]" />
                  <span className="whitespace-nowrap">{item.suggestedStyle}</span>
                </div>
              </div>

              {/* Thông tin chi tiết thẻ */}
              <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  {/* Tiêu đề & mô tả */}
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-studio-900 [text-wrap:balance] group-hover:text-purple-700 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-studio-500 mt-1.5 leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  {/* BẢNG MÀU GỢI Ý (5 MÃ MÀU TRỰC QUAN) */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-studio-500 font-medium flex items-center gap-1">
                        <Palette className="w-3 h-3 text-purple-500" />
                        <span>Bảng màu:</span>
                        <strong className="text-studio-800 font-bold">
                          {item.namedPaletteName || item.suggestedPalette}
                        </strong>
                      </span>
                      {copiedHex && (
                        <span className="text-[10px] text-green-600 font-bold flex items-center gap-0.5 animate-fadeIn">
                          <Check className="w-3 h-3" /> Đã sao chép!
                        </span>
                      )}
                    </div>

                    {/* Dãy nút màu swatches */}
                    <div className="flex items-center gap-2 pt-0.5">
                      {item.paletteColors &&
                        item.paletteColors.map((colorHex, idx) => (
                          <button
                            key={idx}
                            onClick={(e) => copyHex(colorHex, e)}
                            title={`Nhấp để sao chép mã màu ${colorHex}`}
                            className="group/swatch relative w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white shadow-soft transition-transform hover:scale-125 focus:outline-none"
                            style={{ backgroundColor: colorHex }}
                          >
                            <span className="opacity-0 group-hover/swatch:opacity-100 absolute -top-7 left-1/2 -translate-x-1/2 bg-studio-900 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-soft transition-opacity pointer-events-none whitespace-nowrap z-20">
                              {colorHex}
                            </span>
                          </button>
                        ))}
                    </div>
                  </div>

                  {/* Badges tâm trạng & ánh sáng */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-md bg-pastel-pink/60 text-studio-700">
                      Tâm trạng: {item.mood}
                    </span>
                    <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-md bg-pastel-lavender/60 text-studio-700">
                      Ánh sáng: {item.lighting}
                    </span>
                  </div>
                </div>

                {/* Nút hành động đưa cấu hình vào Studio */}
                <div className="pt-4 border-t border-studio-100 mt-2">
                  <Link
                    href={`/studio?style=${encodeURIComponent(item.suggestedStyle)}&palette=${encodeURIComponent(
                      item.namedPaletteName || item.suggestedPalette
                    )}&mood=${encodeURIComponent(item.mood)}&lighting=${encodeURIComponent(item.lighting)}`}
                    className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-studio-900 to-studio-800 text-white text-xs font-bold hover:from-studio-800 hover:to-studio-700 transition-all flex items-center justify-center gap-2 shadow-soft hover:shadow-soft-lg group/btn"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#FFF1C5] group-hover/btn:rotate-12 transition-transform" />
                    <span>Thử Phong Cách Này</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
