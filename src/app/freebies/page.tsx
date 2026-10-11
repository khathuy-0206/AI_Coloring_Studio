"use client";

import React from "react";
import Link from "next/link";
import { Gift, Download, Sparkles, FileText, CheckCircle2 } from "lucide-react";
import { FREEBIES } from "@/data/creative-content";

export default function FreebiesPage() {
  const downloadFreebie = (
    freebieTitle: string,
    lineArtData?: string,
    format: string = "PNG"
  ) => {
    if (!lineArtData) return;
    const ext = format.toLowerCase() === "svg" ? "svg" : "png";
    const link = document.createElement("a");
    link.href = lineArtData;
    link.download = `${freebieTitle.toLowerCase().replace(/\s+/g, "-")}.${ext}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Khung tiêu đề */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pastel-mint/80 text-studio-900 text-xs font-semibold">
          <Gift className="w-3.5 h-3.5 text-studio-700" />
          Góc Tranh Miễn Phí &amp; Quà Tặng
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-studio-900">
          Tranh Nét Vẽ &amp; Thẻ Màu Tải Miễn Phí
        </h1>
        <p className="text-sm text-studio-500">
          Bộ sưu tập các bức tranh nét vẽ chất lượng cao và tài liệu tham khảo phối màu. Hoàn toàn miễn phí cho mục đích thư giãn cá nhân!
        </p>
      </div>

      {/* Lưới các mục quà tặng */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {FREEBIES.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl p-5 border border-studio-100 shadow-soft hover:shadow-soft-lg transition-all flex flex-col justify-between group space-y-4"
          >
            <div>
              <div className="aspect-square rounded-2xl bg-studio-50/80 p-3 border border-studio-100 flex items-center justify-center overflow-hidden mb-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.thumbnailUrl}
                  alt={item.title}
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-studio-100 text-studio-700">
                  {item.format}
                </span>
                <span className="text-[10px] text-studio-400">
                  {item.dimensions}
                </span>
              </div>

              <h3 className="text-sm font-bold text-studio-900 leading-snug">
                {item.title}
              </h3>
              <p className="text-[11px] text-studio-400 mt-1 line-clamp-1">
                {item.license}
              </p>
            </div>

            <div className="space-y-2 pt-2 border-t border-studio-100">
              <Link
                href={`/studio?freebie=${item.id}`}
                className="w-full py-2 rounded-xl bg-studio-900 text-white text-xs font-bold hover:bg-studio-800 transition-all text-center flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5 text-pastel-butter" />
                <span>Tô Trong Studio</span>
              </Link>

              {item.lineArtData && (
                <button
                  onClick={() =>
                    downloadFreebie(item.title, item.lineArtData, item.format)
                  }
                  className="w-full py-2 rounded-xl bg-studio-50 hover:bg-studio-100 text-studio-700 text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Tải Tệp Về Máy</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
