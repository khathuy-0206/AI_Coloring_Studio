"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Bookmark,
  Sparkles,
  Download,
  Trash2,
  Calendar,
  Palette,
  ArrowRight,
} from "lucide-react";

interface JournalEntry {
  id: string;
  title: string;
  originalImage: string;
  coloredImage: string;
  style: string;
  palette: string;
  date: string;
}

export default function JournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem("coloring_journal");
      if (stored) {
        setEntries(JSON.parse(stored));
      }
    } catch {}
  }, []);

  const handleDelete = (id: string) => {
    const updated = entries.filter((e) => e.id !== id);
    setEntries(updated);
    try {
      localStorage.setItem("coloring_journal", JSON.stringify(updated));
    } catch {}
  };

  const handleDownload = (coloredImage: string, title: string) => {
    const link = document.createElement("a");
    link.href = coloredImage;
    link.download = `to-mau-${title || "tac-pham"}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!mounted) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Khung tiêu đề */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pastel-pink/80 text-studio-900 text-xs font-semibold mb-2">
            <Bookmark className="w-3.5 h-3.5 text-studio-700" />
            Nhật Ký Sáng Tạo Của Tôi
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-studio-900">
            Tác Phẩm Đã Lưu &amp; Lịch Sử Tô Màu
          </h1>
          <p className="text-sm text-studio-500 mt-1">
            Lưu giữ những kiệt tác màu sắc đã hoàn thiện, phong cách đã dùng và dấu mốc sáng tạo của riêng bạn.
          </p>
        </div>

        <Link
          href="/studio"
          className="px-5 py-3 rounded-2xl bg-studio-900 text-white font-bold text-xs shadow-soft hover:bg-studio-800 transition-all flex items-center gap-1.5 self-start sm:self-center"
        >
          <Sparkles className="w-3.5 h-3.5 text-pastel-butter" />
          <span>Tạo Bức Tranh Mới</span>
        </Link>
      </div>

      {/* Lưới các mục trong nhật ký */}
      {entries.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {entries.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-5 border border-studio-100 shadow-soft hover:shadow-soft-lg transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                {/* Ảnh so sánh trước và sau */}
                <div className="grid grid-cols-2 gap-2 aspect-[4/3] rounded-2xl overflow-hidden bg-studio-50 p-2 mb-3 border border-studio-100">
                  <div className="relative rounded-xl overflow-hidden bg-white flex items-center justify-center p-1">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.originalImage}
                      alt="Bản nét"
                      className="max-h-full max-w-full object-contain"
                    />
                    <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-black/60 text-[9px] text-white font-semibold">
                      Nét Vẽ
                    </span>
                  </div>

                  <div className="relative rounded-xl overflow-hidden bg-white flex items-center justify-center p-1">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.coloredImage}
                      alt="Bản màu"
                      className="max-h-full max-w-full object-contain"
                    />
                    <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-studio-900/80 text-[9px] text-white font-semibold">
                      Đã Tô Màu
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-pastel-pink text-studio-800">
                    {item.style}
                  </span>
                  <span className="text-[10px] text-studio-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {item.date}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-studio-900 truncate">
                  {item.title}
                </h3>
                <p className="text-[11px] text-studio-500 flex items-center gap-1 mt-0.5">
                  <Palette className="w-3 h-3 text-studio-400" />
                  {item.palette}
                </p>
              </div>

              {/* Các nút thao tác */}
              <div className="pt-2 border-t border-studio-100 flex items-center justify-between">
                <button
                  onClick={() => handleDownload(item.coloredImage, item.title)}
                  className="px-3 py-1.5 rounded-xl bg-studio-50 hover:bg-studio-100 text-studio-700 text-xs font-semibold flex items-center gap-1.5 transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Tải Về</span>
                </button>

                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-1.5 rounded-xl text-rose-500 hover:bg-rose-50 transition-all"
                  title="Xoá khỏi nhật ký"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Trạng thái trống */
        <div className="bg-white rounded-4xl p-12 text-center border border-dashed border-studio-200 shadow-soft max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-pastel-pink/50 flex items-center justify-center mx-auto text-studio-700">
            <Bookmark className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-base font-bold text-studio-900">
              Nhật Ký Của Bạn Đang Trống
            </h3>
            <p className="text-xs text-studio-500 mt-1 leading-relaxed">
              Mỗi khi bạn tô màu một bức tranh trong Studio và nhấn &ldquo;Lưu Vào Nhật Ký&rdquo;, tác phẩm sẽ được lưu giữ tại đây để bạn thưởng thức lại bất cứ lúc nào!
            </p>
          </div>
          <Link
            href="/studio"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-2xl bg-studio-900 text-white font-bold text-xs shadow-soft hover:bg-studio-800 transition-all"
          >
            <span>Tô Bức Tranh Đầu Tiên</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}
    </div>
  );
}
