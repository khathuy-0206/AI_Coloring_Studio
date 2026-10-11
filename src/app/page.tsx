"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Palette,
  Compass,
  Trophy,
  Coffee,
  HelpCircle,
  BookOpen,
  Gift,
  ArrowRight,
  Check,
  Copy,
  Heart,
  SlidersHorizontal,
} from "lucide-react";
import {
  NAMED_PALETTES,
  INSPIRATION_CONCEPTS,
  getTodaysColorMood,
  COLORING_CHALLENGES,
  FREEBIES,
  SAMPLE_LINE_ARTS,
} from "@/data/creative-content";

export default function HomePage() {
  const todayMood = getTodaysColorMood();
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const copyToClipboard = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1500);
  };

  return (
    <div className="space-y-20 pb-16">
      {/* 1. KHUNG BANNER MINH HOẠ NGHỆ THUẬT (ILLUSTRATED HERO BANNER) */}
      <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4">
        <div className="relative rounded-4xl sm:rounded-[2.5rem] overflow-hidden shadow-soft-xl border border-white/80 min-h-[520px] sm:min-h-[580px] flex items-center justify-center">
          {/* Lớp ảnh nền minh họa nghệ thuật (Tranh Studio Ghibli Tô Màu) */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-[1.02]"
            style={{ backgroundImage: "url('/hero-bg.jpg')" }}
          />

          {/* Lớp phủ chuyển sắc mộng mơ với 3 màu chủ đạo #FFCCD5, #E8D7F1, #BDE0FE */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#FFCCD5]/40 via-[#E8D7F1]/55 to-[#BDE0FE]/60 backdrop-blur-[1.5px]" />
          <div className="absolute inset-0 bg-radial-vignette opacity-30" />

          {/* Các bong bóng và đốm sáng lung linh trôi nổi */}
          <div className="absolute top-8 left-12 w-14 h-14 rounded-full bg-white/40 backdrop-blur-md border border-white/60 animate-float shadow-soft pointer-events-none hidden sm:block" />
          <div className="absolute bottom-12 left-1/4 w-10 h-10 rounded-full bg-[#BDE0FE]/50 backdrop-blur-md border border-white/70 animate-pulse pointer-events-none hidden sm:block" />
          <div className="absolute top-16 right-16 w-16 h-16 rounded-full bg-[#FFCCD5]/50 backdrop-blur-md border border-white/70 animate-float pointer-events-none hidden sm:block" />

          {/* Khung nội dung chính giữa (Căn chỉnh cân đối theo mẫu The Ocean Version of You) */}
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-12 text-center flex flex-col items-center">
            {/* Huy hiệu nhỏ phía trên */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-white/90 shadow-soft text-studio-900 text-xs font-bold mb-6 animate-float">
              <Sparkles className="w-4 h-4 text-rose-400" />
              <span>Studio Tô Màu Tranh Nét Bằng AI • Dịu Dàng, Đáng Yêu &amp; Ấm Cúng</span>
            </div>

            {/* Tiêu đề chính theo yêu cầu: "Một góc nhỏ" ở 1 dòng, "Ngàn ý tưởng sắc màu" ở 1 dòng duy nhất, căn lề ở giữa */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-studio-900 tracking-tight leading-[1.2] drop-shadow-sm text-center">
              <span className="block">Một góc nhỏ</span>
              <span className="block mt-2 sm:mt-3 bg-gradient-to-r from-rose-500 via-purple-600 to-indigo-600 bg-clip-text text-transparent whitespace-nowrap">
                Ngàn ý tưởng sắc màu
              </span>
            </h1>

            {/* Mô tả theo yêu cầu người dùng */}
            <p className="mt-5 text-base sm:text-lg text-studio-800/90 font-medium max-w-2xl mx-auto leading-relaxed drop-shadow-xs bg-white/40 sm:bg-white/30 backdrop-blur-xs px-4 py-2 rounded-2xl border border-white/40">
              Tô màu cùng AI, khám phá bảng màu xinh, tìm cảm hứng và tận hưởng những phút giây sáng tạo theo phong cách riêng.
            </p>

            {/* Nút hành động chính phong cách bong bóng phát sáng như mẫu tham khảo */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
              <Link
                href="/studio"
                className="w-full sm:w-auto px-9 py-4 rounded-full bg-gradient-to-r from-studio-900 via-studio-800 to-studio-900 text-white font-bold text-sm shadow-soft-xl hover:shadow-glow hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2.5 group border border-white/30"
              >
                <Sparkles className="w-4 h-4 text-[#FFF1C5] group-hover:rotate-12 transition-transform" />
                <span>Bắt Đầu Tô Màu Ngay</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/inspiration"
                className="w-full sm:w-auto px-7 py-4 rounded-full bg-white/85 backdrop-blur-md text-studio-900 font-bold text-sm border border-white shadow-soft hover:bg-white hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Compass className="w-4 h-4 text-studio-600" />
                <span>Khám Phá Cảm Hứng</span>
              </Link>
            </div>

            {/* Các điểm nhấn tinh tế phía dưới */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-2.5 text-xs font-semibold text-studio-800">
              <span className="px-3.5 py-1.5 rounded-full bg-white/75 backdrop-blur-md border border-white shadow-xs flex items-center gap-1.5">
                🌸 100% Giữ Nguyên Nét Vẽ Gốc
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-white/75 backdrop-blur-md border border-white shadow-xs flex items-center gap-1.5">
                🎨 3 Màu Chủ Đạo: Hồng, Tím, Xanh
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-white/75 backdrop-blur-md border border-white shadow-xs flex items-center gap-1.5">
                ☕ Không Cần Biết Viết Prompt
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TÂM TRẠNG MÀU SẮC HÔM NAY (Section 5.3) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-4xl bg-gradient-to-br from-[#FFCCD5]/60 via-[#E8D7F1]/60 to-[#BDE0FE]/50 border border-white/70 p-6 sm:p-10 shadow-soft">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-studio-600 px-3 py-1 rounded-full bg-white/70">
                Tâm Trạng Màu Sắc Hôm Nay • {todayMood.day}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-studio-900">
                {todayMood.name}
              </h2>
              <p className="text-xs sm:text-sm text-studio-600 italic">
                &ldquo;{todayMood.quote}&rdquo;
              </p>
            </div>

            {/* Các ô màu và nút áp dụng vào Studio */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 bg-white/80 p-2 rounded-2xl border border-white shadow-xs">
                {todayMood.colors.map((hex, idx) => (
                  <button
                    key={idx}
                    onClick={() => copyToClipboard(hex)}
                    title={`Nhấp để sao chép mã ${hex}`}
                    className="group relative flex flex-col items-center"
                  >
                    <span
                      className="w-8 h-8 rounded-xl shadow-xs border border-black/10 group-hover:scale-110 transition-transform"
                      style={{ backgroundColor: hex }}
                    />
                    <span className="text-[9px] font-mono text-studio-500 mt-1">
                      {copiedHex === hex ? "Đã chép!" : hex}
                    </span>
                  </button>
                ))}
              </div>

              <Link
                href={`/studio?style=${todayMood.style}&palette=${todayMood.namedPalette}&mood=${todayMood.mood}&lighting=${todayMood.lighting}`}
                className="px-5 py-3 rounded-2xl bg-studio-900 text-white font-bold text-xs shadow-soft hover:bg-studio-800 transition-all flex items-center gap-1.5"
              >
                <span>Tô Màu Với Tâm Trạng Hôm Nay</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. GÓC TÌM CẢM HỨNG (Section 5.1) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-studio-900">
              Góc Tìm Cảm Hứng Sáng Tạo
            </h2>
            <p className="text-xs sm:text-sm text-studio-500 mt-0.5">
              Khám phá các chủ đề được tuyển chọn và chuyển thẳng cấu hình vào Studio chỉ với 1 cú nhấp.
            </p>
          </div>
          <Link
            href="/inspiration"
            className="text-xs font-bold text-studio-700 hover:text-studio-900 flex items-center gap-1"
          >
            <span>Xem Tất Cả</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {INSPIRATION_CONCEPTS.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl overflow-hidden border border-studio-100 shadow-soft hover:shadow-soft-lg transition-all group flex flex-col justify-between"
            >
              <div className="p-4 bg-studio-50/60 aspect-[4/3] flex items-center justify-center overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-5 space-y-3">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-pastel-pink text-studio-800">
                    {item.suggestedStyle}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-pastel-lavender text-studio-800">
                    {item.namedPaletteName || item.suggestedPalette}
                  </span>
                </div>

                <h3 className="text-base font-bold text-studio-900 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-studio-500 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>

                {/* 5 Swatches Bảng Màu Trực Quan */}
                <div className="flex items-center gap-1.5 pt-0.5">
                  {item.paletteColors && item.paletteColors.map((colorHex, idx) => (
                    <div
                      key={idx}
                      className="w-5 h-5 rounded-full border border-white shadow-xs"
                      style={{ backgroundColor: colorHex }}
                      title={colorHex}
                    />
                  ))}
                </div>

                <div className="pt-2 border-t border-studio-100 flex items-center justify-between">
                  <span className="text-[11px] text-studio-400 font-medium">
                    {item.lighting}
                  </span>
                  <Link
                    href={`/studio?style=${encodeURIComponent(item.suggestedStyle)}&palette=${encodeURIComponent(item.namedPaletteName || item.suggestedPalette)}&mood=${encodeURIComponent(item.mood)}&lighting=${encodeURIComponent(item.lighting)}`}
                    className="px-3.5 py-1.5 rounded-xl bg-studio-50 hover:bg-studio-900 hover:text-white text-studio-800 text-xs font-bold transition-all flex items-center gap-1"
                  >
                    <span>Thử Phong Cách Này</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. THƯ VIỆN BẢNG MÀU SẮC (Section 5.2) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-studio-900">
              Thư Viện Bảng Màu Sắc
            </h2>
            <p className="text-xs sm:text-sm text-studio-500 mt-0.5">
              Nhấp vào ô màu bất kỳ để sao chép mã HEX hoặc đưa toàn bộ bảng màu vào Studio để tô tranh.
            </p>
          </div>
          <Link
            href="/palettes"
            className="text-xs font-bold text-studio-700 hover:text-studio-900 flex items-center gap-1"
          >
            <span>Khám Phá Thêm</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {NAMED_PALETTES.slice(0, 4).map((palette) => (
            <div
              key={palette.id}
              className="bg-white rounded-3xl p-4 border border-studio-100 shadow-soft hover:shadow-soft-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-bold text-studio-900">
                    {palette.name}
                  </h3>
                  <span className="text-[10px] font-semibold text-studio-500 bg-studio-50 px-2 py-0.5 rounded-lg">
                    {palette.styleGroup}
                  </span>
                </div>
                <p className="text-[11px] text-studio-500 line-clamp-2 leading-relaxed mb-3">
                  {palette.description}
                </p>

                {/* Các ô màu */}
                <div className="flex items-center gap-1.5 mb-4">
                  {palette.colors.map((hex, idx) => (
                    <button
                      key={idx}
                      onClick={() => copyToClipboard(hex)}
                      title={`Sao chép ${hex}`}
                      className="flex-1 h-10 rounded-xl border border-black/5 hover:scale-105 transition-transform"
                      style={{ backgroundColor: hex }}
                    />
                  ))}
                </div>
              </div>

              <Link
                href={`/studio?palette=${palette.id}`}
                className="w-full py-2 rounded-xl bg-studio-50 hover:bg-studio-100 text-studio-800 text-xs font-bold transition-all text-center block"
              >
                Dùng Trong Studio
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* 5. THỬ THÁCH TUẦN & CÁC HOẠT ĐỘNG THƯ GIÃN */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Banner Thử Thách Tuần */}
          <div className="bg-gradient-to-tr from-[#FFCCD5]/50 via-[#E8D7F1]/55 to-[#BDE0FE]/45 rounded-4xl p-8 border border-white shadow-soft flex flex-col justify-between">
            <div className="space-y-3">
              <span className="px-3 py-1 rounded-full bg-white/90 text-studio-800 text-[11px] font-bold inline-flex items-center gap-1.5 shadow-xs">
                <Trophy className="w-3.5 h-3.5 text-amber-500" />
                Thử Thách Nổi Bật
              </span>
              <h3 className="text-2xl font-black text-studio-900">
                {COLORING_CHALLENGES[0].title}
              </h3>
              <p className="text-xs sm:text-sm text-studio-600 leading-relaxed">
                {COLORING_CHALLENGES[0].description}
              </p>
              <div className="flex items-center gap-2 pt-2">
                <span className="text-xs font-semibold text-studio-700">
                  Bảng màu gợi ý:
                </span>
                <div className="flex items-center gap-1">
                  {COLORING_CHALLENGES[0].suggestedPalette.map((hex, idx) => (
                    <span
                      key={idx}
                      className="w-5 h-5 rounded-full border border-black/10"
                      style={{ backgroundColor: hex }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6">
              <Link
                href={`/studio?style=${COLORING_CHALLENGES[0].suggestedStyle}`}
                className="px-6 py-3 rounded-2xl bg-studio-900 text-white font-bold text-xs shadow-soft hover:bg-studio-800 transition-all inline-flex items-center gap-2"
              >
                <span>Tham Gia Thử Thách</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Mini-game Trắc nghiệm & Góc Thư Giãn */}
          <div className="space-y-4">
            <div className="bg-white rounded-4xl p-6 border border-studio-100 shadow-soft flex items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-studio-500">
                  Trò Chơi Tương Tác
                </span>
                <h4 className="text-base font-bold text-studio-900">
                  Trắc Nghiệm Phong Cách Màu Sắc
                </h4>
                <p className="text-xs text-studio-500">
                  Khám phá bảng màu và phong cách nghệ thuật đồng điệu nhất với tâm trạng của bạn qua 3 câu hỏi vui.
                </p>
              </div>
              <Link
                href="/quiz"
                className="px-4 py-2.5 rounded-2xl bg-pastel-pink text-studio-900 font-bold text-xs shadow-xs hover:bg-pastel-rose transition-all shrink-0"
              >
                Làm Quiz
              </Link>
            </div>

            <div className="bg-white rounded-4xl p-6 border border-studio-100 shadow-soft flex items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-studio-500">
                  Tĩnh Lặng &amp; Thư Thái
                </span>
                <h4 className="text-base font-bold text-studio-900">
                  Góc Thư Giãn &amp; Đồng Hồ Đếm Giờ
                </h4>
                <p className="text-xs text-studio-500">
                  Lắng nghe tiếng mưa rơi êm đềm, tiếng sóng biển vỗ và thiết lập đồng hồ đếm giờ 15 phút tập trung tô màu.
                </p>
              </div>
              <Link
                href="/cozy-corner"
                className="px-4 py-2.5 rounded-2xl bg-pastel-mint text-studio-900 font-bold text-xs shadow-xs hover:bg-pastel-sage transition-all shrink-0"
              >
                Vào Góc Nhỏ
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
