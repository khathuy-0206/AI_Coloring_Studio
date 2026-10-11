"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Palette,
  Sparkles,
  Compass,
  Trophy,
  Gift,
  BookOpen,
  HelpCircle,
  Coffee,
  Bookmark,
  Volume2,
  VolumeX,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { ambientSound } from "@/lib/audio-synth";

export function Navbar() {
  const pathname = usePathname();
  const [isPlayingSound, setIsPlayingSound] = useState(false);
  const [soundType, setSoundType] = useState<"rain" | "ocean" | "fire">("rain");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setMoreDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleSound = () => {
    if (isPlayingSound) {
      ambientSound.stop();
      setIsPlayingSound(false);
    } else {
      ambientSound.play(soundType, 0.2);
      setIsPlayingSound(true);
    }
  };

  // Các mục chính luôn hiển thị trên thanh điều hướng desktop
  const primaryLinks = [
    { href: "/studio", label: "Studio Tô Màu", icon: Sparkles, badge: "AI" },
    { href: "/inspiration", label: "Cảm Hứng", icon: Compass },
    { href: "/palettes", label: "Bảng Màu", icon: Palette },
    { href: "/challenges", label: "Thử Thách", icon: Trophy },
    { href: "/freebies", label: "Tranh Miễn Phí", icon: Gift },
  ];

  // Các mục bổ sung nằm trong menu xổ xuống "Thêm" để giao diện luôn gọn gàng
  const secondaryLinks = [
    { href: "/learn", label: "Học Phối Màu", icon: BookOpen },
    { href: "/quiz", label: "Trắc Nghiệm", icon: HelpCircle },
    { href: "/cozy-corner", label: "Góc Thư Giãn", icon: Coffee },
    { href: "/journal", label: "Nhật Ký", icon: Bookmark },
  ];

  const allLinks = [...primaryLinks, ...secondaryLinks];
  const isSecondaryActive = secondaryLinks.some((l) => pathname === l.href);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/85 border-b border-studio-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pastel-pink via-pastel-lilac to-pastel-mint p-0.5 shadow-soft transition-transform group-hover:scale-105">
              <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                <Palette className="w-5 h-5 text-purple-600 transition-transform group-hover:rotate-12" />
              </div>
            </div>
            <div className="flex flex-col whitespace-nowrap">
              <span className="font-bold text-base sm:text-lg tracking-tight text-studio-900 flex items-center gap-1.5">
                AI Coloring Studio
                <span className="text-[10px] uppercase font-bold px-1.5 py-0.2 rounded-full bg-pastel-pink text-studio-700">
                  v1.1
                </span>
              </span>
              <span className="text-[11px] text-studio-400 font-medium -mt-1 hidden sm:block">
                Dịu Dàng, Đáng Yêu &amp; Ấm Cúng
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
            {primaryLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? "bg-pastel-pink/80 text-studio-900 shadow-xs"
                      : "text-studio-600 hover:text-studio-900 hover:bg-studio-50"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? "text-studio-800" : "text-studio-400"}`} />
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="text-[9px] px-1 py-0.2 bg-gradient-to-r from-pastel-lilac to-pastel-rose text-studio-800 font-bold rounded-md">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}

            {/* Menu Xổ Xuống "Thêm" (Dropdown menu) */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isSecondaryActive || moreDropdownOpen
                    ? "bg-pastel-lavender/70 text-studio-900"
                    : "text-studio-600 hover:text-studio-900 hover:bg-studio-50"
                }`}
              >
                <span>Thêm</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-studio-400 transition-transform ${
                    moreDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {moreDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white/95 backdrop-blur-md rounded-2xl border border-studio-100 shadow-soft-xl py-2 z-50 animate-fadeIn space-y-0.5">
                  {secondaryLinks.map((link) => {
                    const Icon = link.icon;
                    const isActive = pathname === link.href;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMoreDropdownOpen(false)}
                        className={`flex items-center gap-2.5 px-3.5 py-2 text-xs font-semibold transition-all ${
                          isActive
                            ? "bg-pastel-pink/60 text-studio-900 font-bold"
                            : "text-studio-600 hover:bg-studio-50 hover:text-studio-900"
                        }`}
                      >
                        <Icon className="w-4 h-4 text-purple-500" />
                        <span>{link.label}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Ambient Sound Toggle */}
            <button
              onClick={toggleSound}
              title={isPlayingSound ? "Tắt âm thanh thư giãn" : "Bật âm thanh mưa êm dịu"}
              className={`p-2 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all ${
                isPlayingSound
                  ? "bg-pastel-lavender text-studio-800 ring-2 ring-pastel-lilac animate-pulse"
                  : "bg-studio-50 text-studio-500 hover:bg-studio-100 hover:text-studio-800"
              }`}
            >
              {isPlayingSound ? (
                <>
                  <Volume2 className="w-4 h-4 text-studio-700" />
                  <span className="hidden md:inline text-xs font-semibold whitespace-nowrap">Đang Bật</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4" />
                  <span className="hidden md:inline text-xs whitespace-nowrap">Âm Thanh</span>
                </>
              )}
            </button>

            {/* Quick CTA to Studio */}
            <Link
              href="/studio"
              className="px-3.5 sm:px-4 py-2 rounded-2xl bg-gradient-to-r from-studio-900 to-studio-800 text-white text-xs font-bold shadow-soft hover:shadow-soft-lg hover:from-studio-800 hover:to-studio-700 transition-all flex items-center gap-1.5 whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5 text-pastel-butter" />
              <span>Tô Màu Ngay</span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-studio-600 hover:bg-studio-100"
              aria-label="Chuyển đổi menu điều hướng"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-3 px-2 border-t border-studio-100 grid grid-cols-2 gap-1.5 bg-white/95 backdrop-blur-md rounded-b-2xl shadow-soft-lg animate-fadeIn">
            {allLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-pastel-pink text-studio-900 font-bold"
                      : "text-studio-600 hover:bg-studio-50"
                  }`}
                >
                  <Icon className="w-4 h-4 text-studio-500" />
                  <span className="whitespace-nowrap">{link.label}</span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
}
