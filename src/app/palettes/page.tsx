"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Palette, Copy, Check, ArrowRight, Sparkles, Star } from "lucide-react";
import { NAMED_PALETTES, getTodaysColorMood } from "@/data/creative-content";

export default function PalettesPage() {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [filterGroup, setFilterGroup] = useState<string>("Tất cả");

  const todayMood = getTodaysColorMood();

  const copyToClipboard = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1500);
  };

  const groups = [
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

  const groupBadgeStyle: Record<string, string> = {
    Retro: "bg-amber-50 text-amber-900 border-amber-200",
    Cyberpunk: "bg-fuchsia-950 text-cyan-300 border-fuchsia-700",
    Cinematic: "bg-slate-900 text-rose-200 border-slate-700",
    Boho: "bg-orange-50 text-stone-800 border-orange-200",
    Luxury: "bg-purple-950 text-amber-300 border-amber-500/40",
  };

  const filteredPalettes =
    filterGroup === "Tất cả"
      ? NAMED_PALETTES
      : NAMED_PALETTES.filter(
          (p) =>
            p.styleGroup.toLowerCase() === filterGroup.toLowerCase() ||
            (p.tags || []).some((t) =>
              t.toLowerCase().includes(filterGroup.toLowerCase())
            )
        );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Khung tiêu đề */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pastel-pink/70 text-studio-900 text-xs font-semibold">
          <Palette className="w-3.5 h-3.5 text-studio-700" />
          Thư Viện Bảng Màu Đa Phong Cách ({NAMED_PALETTES.length} Bộ Sưu Tập)
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-studio-900">
          Các Bảng Màu Nghệ Thuật Tuyển Chọn
        </h1>
        <p className="text-sm text-studio-500">
          Từ sắc Pastel dịu êm đến Retro hoài cổ, Cyberpunk rực rỡ, Cinematic trầm sâu, Boho mộc mạc và Luxury hoàng gia. Nhấp vào ô màu bất kỳ để sao chép mã HEX hoặc mở ngay trong Studio để tô màu.
        </p>
      </div>

      {/* Banner Bảng màu của ngày */}
      <div className="rounded-3xl bg-gradient-to-r from-[#FFCCD5]/60 via-[#E8D7F1]/55 to-[#BDE0FE]/50 p-6 sm:p-8 border border-white shadow-soft">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-studio-700 px-2.5 py-0.5 rounded-full bg-white/80 inline-flex items-center gap-1">
              <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
              Bảng Màu Của Ngày ({todayMood.day})
            </span>
            <h2 className="text-2xl font-black text-studio-900">
              {todayMood.namedPalette}
            </h2>
            <p className="text-xs text-studio-600 max-w-md">
              &ldquo;{todayMood.quote}&rdquo; Lựa chọn hoàn hảo cho buổi tô màu thư giãn hôm nay của bạn.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 bg-white/90 p-2 rounded-2xl shadow-xs">
              {todayMood.colors.map((hex, idx) => (
                <button
                  key={idx}
                  onClick={() => copyToClipboard(hex)}
                  title={`Sao chép ${hex}`}
                  className="group relative flex flex-col items-center cursor-pointer"
                >
                  <span
                    className="w-10 h-10 rounded-xl border border-black/10 group-hover:scale-105 transition-transform"
                    style={{ backgroundColor: hex }}
                  />
                  <span className="text-[9px] font-mono text-studio-600 mt-1 font-semibold">
                    {copiedHex === hex ? "Đã chép!" : hex}
                  </span>
                </button>
              ))}
            </div>

            <Link
              href={`/studio?palette=${todayMood.namedPalette}&style=${todayMood.style}&mood=${todayMood.mood}&lighting=${todayMood.lighting}`}
              className="px-5 py-3 rounded-2xl bg-studio-900 text-white font-bold text-xs shadow-soft hover:bg-studio-800 transition-all flex items-center gap-1.5"
            >
              <span>Dùng Trong Studio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Thanh điều hướng danh mục bảng màu (UI Filter Tabs) */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {groups.map((grp) => {
          const isSelected = filterGroup === grp;
          const count =
            grp === "Tất cả"
              ? NAMED_PALETTES.length
              : NAMED_PALETTES.filter(
                  (p) =>
                    p.styleGroup.toLowerCase() === grp.toLowerCase() ||
                    (p.tags || []).some((t) =>
                      t.toLowerCase().includes(grp.toLowerCase())
                    )
                ).length;

          return (
            <button
              key={grp}
              type="button"
              onClick={() => setFilterGroup(grp)}
              className={`px-3.5 py-1.5 rounded-2xl text-xs font-medium transition-all cursor-pointer inline-flex items-center gap-1.5 ${
                isSelected
                  ? "bg-studio-900 text-white font-bold shadow-xs scale-[1.02]"
                  : "bg-white text-studio-600 border border-studio-100 hover:bg-studio-50 hover:border-studio-300"
              }`}
            >
              <span>{grp}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  isSelected
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

      {/* Lưới hiển thị các bảng màu */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPalettes.map((palette) => (
          <div
            key={palette.id}
            className="bg-white rounded-3xl p-6 border border-studio-100 shadow-soft hover:shadow-soft-lg transition-all flex flex-col justify-between space-y-5"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <h3 className="text-base font-bold text-studio-900 leading-snug">
                  {palette.name}
                </h3>
                <span
                  className={`shrink-0 text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                    groupBadgeStyle[palette.styleGroup] ||
                    "text-studio-600 bg-studio-50 border-studio-100"
                  }`}
                >
                  {palette.styleGroup}
                </span>
              </div>
              <p className="text-xs text-studio-500 leading-relaxed mb-3">
                {palette.description}
              </p>

              {/* Nhãn phân loại chi tiết (Tags) */}
              {palette.tags && palette.tags.length > 0 && (
                <div className="flex flex-wrap items-center gap-1 mb-3.5">
                  {palette.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] font-medium px-2 py-0.5 rounded-lg bg-studio-50 text-studio-600 border border-studio-100"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Các dải màu và mã HEX */}
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 h-14 rounded-2xl overflow-hidden p-1 bg-studio-50 border border-studio-100">
                  {palette.colors.map((hex, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => copyToClipboard(hex)}
                      title={`Sao chép ${hex}`}
                      className="flex-1 h-full rounded-xl transition-transform hover:scale-[1.03] active:scale-95 relative group flex items-center justify-center border border-black/5 cursor-pointer"
                      style={{ backgroundColor: hex }}
                    >
                      <span className="opacity-0 group-hover:opacity-100 text-[10px] font-bold text-studio-900 bg-white/90 px-1 py-0.5 rounded shadow-xs transition-opacity">
                        {copiedHex === hex ? "✓" : hex}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Dãy mã HEX hiển thị trực quan bên dưới từng ô màu */}
                <div className="grid grid-cols-5 gap-1 text-center">
                  {palette.colors.map((hex, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => copyToClipboard(hex)}
                      className="text-[9px] font-mono font-semibold text-studio-500 hover:text-studio-900 truncate cursor-pointer"
                      title={`Nhấn để sao chép ${hex}`}
                    >
                      {copiedHex === hex ? "Đã chép!" : hex}
                    </button>
                  ))}
                </div>

                {/* Màu chủ đạo */}
                <div className="flex items-center justify-between text-[11px] text-studio-400 pt-1">
                  <span className="flex items-center gap-1.5">
                    Màu chủ đạo:
                    <span
                      className="w-3 h-3 rounded-full border border-black/10 inline-block"
                      style={{ backgroundColor: palette.dominantColor }}
                    />
                    <strong className="text-studio-700 font-mono">
                      {palette.dominantColor}
                    </strong>
                  </span>
                  <span>{palette.colors.length} Sắc độ</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-studio-100 flex items-center justify-between">
              <span className="text-[11px] text-studio-400">
                Nhấp ô màu để chép mã
              </span>
              <Link
                href={`/studio?palette=${palette.id}`}
                className="px-4 py-2 rounded-xl bg-studio-900 text-white text-xs font-bold hover:bg-studio-800 transition-all flex items-center gap-1.5 shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5 text-pastel-butter" />
                <span>Dùng Trong Studio</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
