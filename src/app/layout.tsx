import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "AI Coloring Studio - Tô Màu Tranh Nét Vẽ Cùng Trí Tuệ Nhân Tạo",
  description:
    "Studio sáng tạo trực tuyến giúp biến tranh nét vẽ (line-art) đen trắng thành tác phẩm màu sắc tuyệt đẹp bằng AI. Trải nghiệm bảng màu pastel nhẹ nhàng, ánh sáng ấm áp và các hoạt động tô màu thư giãn.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className="min-h-screen flex flex-col antialiased selection:bg-pastel-lilac selection:text-studio-900">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
