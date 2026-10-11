import React from "react";
import Link from "next/link";
import { Heart, Sparkles, Palette, ShieldCheck, Cpu } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-studio-200/60 bg-white/60 backdrop-blur-sm py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-pastel-pink to-pastel-lilac flex items-center justify-center">
                <Palette className="w-4 h-4 text-studio-700" />
              </div>
              <span className="font-bold text-base text-studio-900">
                AI Coloring Studio
              </span>
            </div>
            <p className="text-xs text-studio-500 leading-relaxed max-w-sm">
              Không gian sáng tạo và thư giãn tâm trí của bạn. Biến đổi các bản vẽ nét đen trắng (line-art) thành những tác phẩm màu sắc hài hòa, tuyệt đẹp bằng AI mà không cần biết viết câu lệnh prompt.
            </p>
            <div className="flex items-center gap-4 text-[11px] text-studio-400 pt-1">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                Giữ Nguyên Nét Vẽ Gốc
              </span>
              <span className="flex items-center gap-1">
                <Cpu className="w-3.5 h-3.5 text-indigo-500" />
                Kiến Trúc PostgreSQL &amp; Prisma
              </span>
            </div>
          </div>

          {/* Quick Explore */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-studio-800 mb-3">
              Khám Phá Studio
            </h4>
            <ul className="space-y-2 text-xs text-studio-600">
              <li>
                <Link href="/studio" className="hover:text-studio-900 transition-colors">
                  Studio Tô Màu AI
                </Link>
              </li>
              <li>
                <Link href="/palettes" className="hover:text-studio-900 transition-colors">
                  Thư Viện Bảng Màu
                </Link>
              </li>
              <li>
                <Link href="/inspiration" className="hover:text-studio-900 transition-colors">
                  Góc Tìm Cảm Hứng
                </Link>
              </li>
              <li>
                <Link href="/challenges" className="hover:text-studio-900 transition-colors">
                  Thử Thách Định Kỳ
                </Link>
              </li>
            </ul>
          </div>

          {/* Creative Community */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-studio-800 mb-3">
              Thư Giãn &amp; Học Tập
            </h4>
            <ul className="space-y-2 text-xs text-studio-600">
              <li>
                <Link href="/cozy-corner" className="hover:text-studio-900 transition-colors">
                  Góc Thư Giãn &amp; Âm Thanh
                </Link>
              </li>
              <li>
                <Link href="/quiz" className="hover:text-studio-900 transition-colors">
                  Trắc Nghiệm Phong Cách
                </Link>
              </li>
              <li>
                <Link href="/learn" className="hover:text-studio-900 transition-colors">
                  Hướng Dẫn Phối Màu
                </Link>
              </li>
              <li>
                <Link href="/freebies" className="hover:text-studio-900 transition-colors">
                  Tải Tranh Nét Miễn Phí
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-studio-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-studio-400">
          <p>© 2026 AI Coloring Studio. Thiết kế vì sự tĩnh lặng &amp; niềm vui sáng tạo nghệ thuật.</p>
          <p className="flex items-center gap-1 text-studio-500">
            Dành tặng với <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" /> cho những tâm hồn yêu nghệ thuật và sự bình yên.
          </p>
        </div>
      </div>
    </footer>
  );
}
