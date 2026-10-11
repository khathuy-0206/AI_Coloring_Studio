"use client";

import React, { useState, useRef } from "react";
import {
  UploadCloud,
  Image as ImageIcon,
  X,
  RefreshCw,
  Sparkles,
  AlertCircle,
} from "lucide-react";
import { SAMPLE_LINE_ARTS } from "@/data/creative-content";

interface ImageUploaderProps {
  onImageSelected: (base64: string, mimeType: string, filename: string) => void;
  selectedImage: string | null;
  onClear: () => void;
}

export function ImageUploader({
  onImageSelected,
  selectedImage,
  onClear,
}: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = (file: File) => {
    setErrorMessage(null);

    // Kiểm tra dung lượng (giới hạn 10MB)
    const maxMb = 10;
    if (file.size > maxMb * 1024 * 1024) {
      setErrorMessage(`Kích thước tệp quá lớn (${(file.size / (1024 * 1024)).toFixed(1)}MB). Giới hạn tối đa là ${maxMb}MB.`);
      return;
    }

    // Kiểm tra định dạng
    const validMimes = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/webp",
      "image/svg+xml",
    ];
    if (!validMimes.includes(file.type)) {
      setErrorMessage("Vui lòng tải lên tệp ảnh định dạng PNG, JPG, JPEG hoặc SVG.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        onImageSelected(result, file.type, file.name);
      }
    };
    reader.onerror = () => {
      setErrorMessage("Không thể đọc tệp ảnh. Vui lòng chọn một hình ảnh khác.");
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const handleSelectSample = async (sampleData: string, sampleName: string) => {
    setErrorMessage(null);
    if (sampleData.startsWith("data:")) {
      const isSvg = sampleData.startsWith("data:image/svg");
      onImageSelected(
        sampleData,
        isSvg ? "image/svg+xml" : "image/png",
        sampleName
      );
      return;
    }

    try {
      const res = await fetch(sampleData);
      const blob = await res.blob();
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result) {
          onImageSelected(result, blob.type || "image/png", `${sampleName}.png`);
        }
      };
      reader.readAsDataURL(blob);
    } catch {
      onImageSelected(sampleData, "image/png", `${sampleName}.png`);
    }
  };

  return (
    <div className="space-y-4">
      {/* Khung tải lên / Xem trước ảnh */}
      {!selectedImage ? (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-3xl p-6 text-center cursor-pointer transition-all ${
            isDragging
              ? "border-studio-500 bg-pastel-pink/40 scale-[1.01]"
              : "border-studio-200 bg-white hover:border-studio-300 hover:bg-studio-50/50"
          } shadow-soft`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png, image/jpeg, image/jpg, image/webp, image/svg+xml"
            onChange={handleFileChange}
            className="hidden"
          />

          <div className="flex flex-col items-center justify-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-pastel-pink to-pastel-lilac flex items-center justify-center shadow-soft">
              <UploadCloud className="w-7 h-7 text-studio-700" />
            </div>

            <div>
              <p className="text-sm font-bold text-studio-900">
                Nhấp để tải lên hoặc kéo thả tranh nét vẽ vào đây
              </p>
              <p className="text-xs text-studio-500 mt-1">
                Hỗ trợ PNG, JPG, JPEG hoặc SVG tối đa 10MB
              </p>
            </div>

            <span className="px-3.5 py-1.5 rounded-xl bg-studio-100 text-[11px] font-semibold text-studio-700">
              Chọn Tệp Ảnh Từ Thiết Bị
            </span>
          </div>
        </div>
      ) : (
        <div className="relative rounded-3xl overflow-hidden bg-white p-3 border border-studio-200 shadow-soft">
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-studio-50 flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={selectedImage}
              alt="Bản vẽ nét đã chọn"
              className="max-h-full max-w-full object-contain"
            />

            {/* Các nút thao tác nhanh */}
            <div className="absolute top-2 right-2 flex items-center gap-1.5">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                title="Thay đổi ảnh khác"
                className="p-1.5 rounded-xl bg-white/90 backdrop-blur-md shadow-sm text-studio-700 hover:bg-white hover:text-studio-900"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClear();
                }}
                title="Gỡ ảnh này"
                className="p-1.5 rounded-xl bg-white/90 backdrop-blur-md shadow-sm text-rose-600 hover:bg-rose-50"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="absolute bottom-2 left-2">
              <span className="px-2.5 py-1 rounded-lg bg-white/90 backdrop-blur-md text-[10px] font-bold text-studio-700 shadow-sm">
                Đã Sẵn Sàng Tô Màu
              </span>
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/png, image/jpeg, image/jpg, image/webp, image/svg+xml"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      )}

      {/* Thông báo lỗi */}
      {errorMessage && (
        <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Chọn nhanh tranh mẫu có sẵn */}
      <div className="pt-1">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-studio-700 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-studio-500" />
            Chưa có tranh nét? Thử ngay mẫu sau:
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            {
              url: SAMPLE_LINE_ARTS.coinLaundry,
              name: "Tiệm Giặt Ủi",
            },
            {
              url: SAMPLE_LINE_ARTS.winterDinner,
              name: "Tiệc Mùa Đông",
            },
            {
              url: SAMPLE_LINE_ARTS.schoolLockerPuppy,
              name: "Cún Tủ Đồ",
            },
            {
              url: SAMPLE_LINE_ARTS.cozyCoffeeCorner,
              name: "Góc Cà Phê",
            },
            {
              url: SAMPLE_LINE_ARTS.winterPostOffice,
              name: "Bưu Điện Đông",
            },
            {
              url: SAMPLE_LINE_ARTS.nightCamperVan,
              name: "Xe Cắm Trại",
            },
            {
              url: SAMPLE_LINE_ARTS.winterRoomCleaning,
              name: "Dọn Phòng Đông",
            },
            {
              url: SAMPLE_LINE_ARTS.bunnyCoffeeShop,
              name: "Cà Phê Thỏ",
            },
          ].map((sample) => (
            <button
              key={sample.name}
              type="button"
              onClick={() => handleSelectSample(sample.url, sample.name)}
              className="p-2 rounded-2xl border border-studio-200 bg-white hover:border-studio-400 hover:bg-pastel-pink/20 transition-all text-left flex flex-col items-center gap-1.5 shadow-sm group cursor-pointer"
            >
              <div className="w-11 h-11 rounded-xl bg-studio-50 border border-studio-100 p-1 flex items-center justify-center overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={sample.url}
                  alt={sample.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-[10px] font-medium text-studio-700 group-hover:text-studio-900 text-center leading-tight">
                {sample.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
