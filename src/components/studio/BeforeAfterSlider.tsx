"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  SlidersHorizontal,
  Maximize2,
  Minimize2,
  MousePointerClick,
  Palette,
  X,
  Check,
  Sparkles,
  RotateCcw,
  Layers,
  Target,
} from "lucide-react";
import {
  InteractiveSegmentationMap,
  InteractiveRegionMeta,
  DetectedObjectBadgeItem,
  AISceneAnalysis,
} from "@/lib/smart-coloring";

export interface CanvasColorPickPayload {
  labelVi: string;
  newHex: string;
  newLabelVi?: string;
  objectId?: string;
  regionId?: number;
  regionIds?: number[];
  allObjectRegionIds?: number[];
  applyScope: "object" | "region";
}

interface BeforeAfterSliderProps {
  originalImage: string;
  coloredImage: string;
  isMock?: boolean;
  interactiveMap?: InteractiveSegmentationMap | null;
  detectedObjects?: DetectedObjectBadgeItem[];
  aiSceneAnalysis?: AISceneAnalysis;
  paletteColors?: string[];
  goldenColors?: {
    dominant: string[];
    secondary: string[];
    accent: string[];
    skinToneHex?: string;
  };
  regionColorOverridesCount?: number;
  objectColorOverridesCount?: number;
  onCanvasColorPick?: (payload: CanvasColorPickPayload) => void;
  onResetRegionOverride?: (
    regionId?: number,
    labelVi?: string,
    applyScope?: "object" | "region",
    allObjectRegionIds?: number[],
    regionIds?: number[]
  ) => void;
}

interface ResolvedCanvasHit {
  px: number;
  py: number;
  xNorm: number; // 0..1000
  yNorm: number; // 0..1000
  containerXPercent: number; // 0..100
  containerYPercent: number; // 0..100
  regionId: number;
  regionMeta: InteractiveRegionMeta;
  objectId?: string;
  objectLabelVi: string;
  currentHex: string;
  hasNamedObject: boolean;
  allObjectRegionIds: number[];
}

export function BeforeAfterSlider({
  originalImage,
  coloredImage,
  isMock = false,
  interactiveMap,
  detectedObjects = [],
  aiSceneAnalysis,
  paletteColors = [],
  goldenColors,
  onCanvasColorPick,
  onResetRegionOverride,
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [viewMode, setViewMode] = useState<"slider" | "original" | "colored">(
    "slider"
  );
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Trạng thái tương tác Hover, Click đơn vùng & Chọn đa vùng đồng thời (Multi-Region Selection)
  const [hoveredHit, setHoveredHit] = useState<ResolvedCanvasHit | null>(null);
  const [selectedHit, setSelectedHit] = useState<ResolvedCanvasHit | null>(
    null
  );
  const [selectedHits, setSelectedHits] = useState<ResolvedCanvasHit[]>([]);
  const [isMultiSelectMode, setIsMultiSelectMode] = useState<boolean>(false);
  // Mặc định ưu tiên "Chỉ vùng" (Ưu tiên 1 - Cao nhất) khi click trực tiếp trên Canvas
  const [applyScope, setApplyScope] = useState<"object" | "region">("region");
  const [editLabelInput, setEditLabelInput] = useState<string>("");
  const [customHexInput, setCustomHexInput] = useState<string>("#FF8FAB");

  const containerRef = useRef<HTMLDivElement>(null);
  const coloredImgRef = useRef<HTMLImageElement>(null);
  const overlayCanvasRef = useRef<HTMLCanvasElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  const isDraggingSlider = useRef(false);
  const mouseDownPos = useRef<{ x: number; y: number } | null>(null);

  const handleMoveSlider = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  // Bắt đầu kéo thanh trượt khi người dùng nắm vào đường phân cách giữa tranh
  const handleSliderHandleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    isDraggingSlider.current = true;
  };

  const handleSliderHandleTouchStart = (e: React.TouchEvent) => {
    e.stopPropagation();
    isDraggingSlider.current = true;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDraggingSlider.current && e.touches.length > 0) {
      handleMoveSlider(e.touches[0].clientX);
    }
  };

  useEffect(() => {
    const handleMouseUpGlobal = () => {
      isDraggingSlider.current = false;
    };
    const handleMouseMoveGlobal = (e: MouseEvent) => {
      if (isDraggingSlider.current) {
        handleMoveSlider(e.clientX);
      }
    };

    window.addEventListener("mouseup", handleMouseUpGlobal);
    window.addEventListener("mousemove", handleMouseMoveGlobal);
    return () => {
      window.removeEventListener("mouseup", handleMouseUpGlobal);
      window.removeEventListener("mousemove", handleMouseMoveGlobal);
    };
  }, [handleMoveSlider]);

  // Ánh xạ tọa độ chuột (clientX, clientY) sang tọa độ Pixel & Mặt nạ phân đoạn (Coordinate-to-Mask Mapping)
  const resolveHitAtClientPoint = useCallback(
    (clientX: number, clientY: number): ResolvedCanvasHit | null => {
      if (!interactiveMap || !coloredImgRef.current || !containerRef.current) {
        return null;
      }

      const imgEl = coloredImgRef.current;
      const rect = imgEl.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return null;

      const mapW = interactiveMap.width;
      const mapH = interactiveMap.height;
      const imgAspect = mapW / mapH;
      const boxAspect = rect.width / rect.height;

      let renderW = rect.width;
      let renderH = rect.height;
      let offsetX = 0;
      let offsetY = 0;

      if (imgAspect > boxAspect) {
        renderW = rect.width;
        renderH = rect.width / imgAspect;
        offsetY = (rect.height - renderH) / 2;
      } else {
        renderH = rect.height;
        renderW = rect.height * imgAspect;
        offsetX = (rect.width - renderW) / 2;
      }

      const relX = (clientX - rect.left - offsetX) / renderW;
      const relY = (clientY - rect.top - offsetY) / renderH;

      if (relX < 0 || relX > 1 || relY < 0 || relY > 1) {
        return null;
      }

      const px = Math.min(mapW - 1, Math.max(0, Math.floor(relX * mapW)));
      const py = Math.min(mapH - 1, Math.max(0, Math.floor(relY * mapH)));
      const xNorm = Math.round(relX * 1000);
      const yNorm = Math.round(relY * 1000);

      // Tìm vùng khép kín (regId) tại đúng điểm (px, py); nếu trúng đường nét mực đen (-1), quét bán kính 6px xung quanh
      let regId = interactiveMap.labels[py * mapW + px];
      if (
        regId <= 0 ||
        interactiveMap.regions[regId - 1]?.role === "outer_margin"
      ) {
        let foundId = -1;
        for (let radius = 1; radius <= 6 && foundId <= 0; radius++) {
          for (let dy = -radius; dy <= radius; dy++) {
            for (let dx = -radius; dx <= radius; dx++) {
              const nx = px + dx;
              const ny = py + dy;
              if (nx >= 0 && nx < mapW && ny >= 0 && ny < mapH) {
                const cand = interactiveMap.labels[ny * mapW + nx];
                if (
                  cand > 0 &&
                  interactiveMap.regions[cand - 1]?.role !== "outer_margin"
                ) {
                  foundId = cand;
                  break;
                }
              }
            }
            if (foundId > 0) break;
          }
        }
        regId = foundId;
      }

      if (regId <= 0) return null;
      const regMeta = interactiveMap.regions[regId - 1];
      if (!regMeta || regMeta.role === "outer_margin") return null;

      // Đối chiếu với danh sách đối tượng từ AI (Gemini Vision) & danh sách thẻ đối tượng hiện tại
      let objectId = regMeta.objectId;
      let objectLabelVi = regMeta.objectLabelVi;

      // Nếu vùng chưa gán objectId trực tiếp, đối chiếu thêm với khung bao box_2d từ aiSceneAnalysis
      if (
        !objectLabelVi &&
        aiSceneAnalysis?.objects &&
        regMeta.role !== "sky" &&
        regMeta.role !== "floor_ground"
      ) {
        let bestArea = Infinity;
        for (const o of aiSceneAnalysis.objects) {
          if (
            o.category === "background_wall_sky" ||
            o.category === "background_floor_ground"
          ) {
            continue;
          }
          const [ymin, xmin, ymax, xmax] = o.box_2d;
          if (
            xNorm >= xmin &&
            xNorm <= xmax &&
            yNorm >= ymin &&
            yNorm <= ymax
          ) {
            const area = Math.max(1, (xmax - xmin) * (ymax - ymin));
            if (area < bestArea) {
              bestArea = area;
              objectId = o.id;
              objectLabelVi = o.labelVi;
            }
          }
        }
      }

      // Đồng bộ tên và màu mới nhất từ detectedObjects (nếu người dùng đã đổi tên hoặc đổi màu thẻ)
      if (detectedObjects.length > 0 && (objectId || objectLabelVi)) {
        const matchedBadge = detectedObjects.find(
          (b) =>
            (objectId && b.id === objectId) ||
            (objectLabelVi &&
              b.labelVi.trim().toLowerCase() ===
                objectLabelVi.trim().toLowerCase())
        );
        if (matchedBadge) {
          objectId = matchedBadge.id;
          objectLabelVi = matchedBadge.labelVi;
        }
      }

      const hasNamedObject = Boolean(objectLabelVi);
      const finalLabelVi = objectLabelVi || regMeta.roleLabelVi;

      // Tập hợp toàn bộ các vùng contour thuộc cùng đối tượng này để tô/highlight đồng bộ
      const allObjectRegionIds: number[] = [];
      if (objectId || objectLabelVi) {
        const normTargetLabel = (objectLabelVi || "").trim().toLowerCase();
        for (const r of interactiveMap.regions) {
          if (
            (objectId && r.objectId === objectId) ||
            (normTargetLabel &&
              r.objectLabelVi?.trim().toLowerCase() === normTargetLabel)
          ) {
            allObjectRegionIds.push(r.id);
          }
        }
      }
      if (!allObjectRegionIds.includes(regId)) {
        allObjectRegionIds.push(regId);
      }

      const containerXPercent = Math.max(
        5,
        Math.min(
          95,
          ((clientX - containerRect.left) / Math.max(1, containerRect.width)) *
            100
        )
      );
      const containerYPercent = Math.max(
        5,
        Math.min(
          95,
          ((clientY - containerRect.top) / Math.max(1, containerRect.height)) *
            100
        )
      );

      return {
        px,
        py,
        xNorm,
        yNorm,
        containerXPercent,
        containerYPercent,
        regionId: regId,
        regionMeta: regMeta,
        objectId,
        objectLabelVi: finalLabelVi,
        currentHex: regMeta.colorHex,
        hasNamedObject,
        allObjectRegionIds,
      };
    },
    [interactiveMap, aiSceneAnalysis, detectedObjects]
  );

  // Khi interactiveMap được cập nhật sau khi Re-render màu mới, đồng bộ lại màu hiển thị trên Popup đang mở
  useEffect(() => {
    if (!interactiveMap) return;
    if (selectedHit) {
      const updatedReg = interactiveMap.regions[selectedHit.regionId - 1];
      if (updatedReg) {
        setSelectedHit((prev) =>
          prev
            ? {
                ...prev,
                regionMeta: updatedReg,
                currentHex: updatedReg.colorHex,
              }
            : null
        );
        setCustomHexInput(updatedReg.colorHex);
      }
    }
    if (selectedHits.length > 0) {
      setSelectedHits((prevList) =>
        prevList.map((item) => {
          const updated = interactiveMap.regions[item.regionId - 1];
          return updated
            ? {
                ...item,
                regionMeta: updated,
                currentHex: updated.colorHex,
              }
            : item;
        })
      );
    }
  }, [interactiveMap, selectedHit?.regionId, selectedHits.length]);

  // Vẽ hiệu ứng làm sáng viền đối tượng / đa vùng khép kín (Hover & Multi-Region Selection Highlight Outline) trên lớp Canvas phụ
  useEffect(() => {
    const canvas = overlayCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (!interactiveMap) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }

    const { width: w, height: h, labels, regions } = interactiveMap;
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
    ctx.clearRect(0, 0, w, h);

    const activeTarget = selectedHit || hoveredHit;
    if (!activeTarget && selectedHits.length === 0) return;

    // Tập hợp các vùng đang được chọn trực tiếp (Single hoặc Multi-Select)
    const directSelectedRegionSet = new Set<number>();
    for (const hItem of selectedHits) {
      directSelectedRegionSet.add(hItem.regionId);
    }
    if (selectedHit) {
      directSelectedRegionSet.add(selectedHit.regionId);
    }

    // Xác định tổng tập hợp các vùng cần làm sáng viền trên Canvas
    const targetRegionSet = new Set<number>();
    if (selectedHit) {
      if (
        applyScope === "object" &&
        selectedHits.length <= 1 &&
        selectedHit.allObjectRegionIds.length > 0
      ) {
        selectedHit.allObjectRegionIds.forEach((id) => targetRegionSet.add(id));
      } else {
        directSelectedRegionSet.forEach((id) => targetRegionSet.add(id));
      }
    }
    if (hoveredHit) {
      targetRegionSet.add(hoveredHit.regionId);
    }

    if (targetRegionSet.size === 0) return;

    // Tính khung giới hạn (Bounding Box) của các vùng được highlight để tối ưu tốc độ dựng hình (60fps)
    let minX = w;
    let maxX = 0;
    let minY = h;
    let maxY = 0;
    for (const rid of Array.from(targetRegionSet)) {
      const r = regions[rid - 1];
      if (!r) continue;
      if (r.minX < minX) minX = r.minX;
      if (r.maxX > maxX) maxX = r.maxX;
      if (r.minY < minY) minY = r.minY;
      if (r.maxY > maxY) maxY = r.maxY;
    }

    minX = Math.max(0, minX - 4);
    maxX = Math.min(w - 1, maxX + 4);
    minY = Math.max(0, minY - 4);
    maxY = Math.min(h - 1, maxY + 4);
    const boxW = maxX - minX + 1;
    const boxH = maxY - minY + 1;
    if (boxW <= 0 || boxH <= 0) return;

    const imgData = ctx.createImageData(boxW, boxH);
    const data = imgData.data;
    const hoveredRegionId = hoveredHit?.regionId ?? -1;

    for (let y = minY; y <= maxY; y++) {
      const row = y * w;
      const outRow = (y - minY) * boxW;
      for (let x = minX; x <= maxX; x++) {
        const regId = labels[row + x];
        if (!targetRegionSet.has(regId)) continue;

        const isDirectSelected = directSelectedRegionSet.has(regId);
        const isHoveredOnly = !isDirectSelected && regId === hoveredRegionId;

        // Kiểm tra điểm ảnh có nằm sát biên đối tượng / vùng khép kín hay không
        const leftId = x > 0 ? labels[row + x - 1] : -1;
        const rightId = x + 1 < w ? labels[row + x + 1] : -1;
        const upId = y > 0 ? labels[row - w + x] : -1;
        const downId = y + 1 < h ? labels[row + w + x] : -1;

        const left2Id = x > 1 ? labels[row + x - 2] : -1;
        const right2Id = x + 2 < w ? labels[row + x + 2] : -1;
        const up2Id = y > 1 ? labels[row - w * 2 + x] : -1;
        const down2Id = y + 2 < h ? labels[row + w * 2 + x] : -1;

        const isOuterEdge =
          !targetRegionSet.has(leftId) ||
          !targetRegionSet.has(rightId) ||
          !targetRegionSet.has(upId) ||
          !targetRegionSet.has(downId);

        // Viền riêng của từng vùng nằm trong danh sách chọn đa vùng (Multi-Region Highlight Border)
        const isIndividualContourEdge =
          (isDirectSelected || isHoveredOnly) &&
          (leftId !== regId ||
            rightId !== regId ||
            upId !== regId ||
            downId !== regId);

        const isIndividualInnerRing =
          !isIndividualContourEdge &&
          (isDirectSelected || isHoveredOnly) &&
          (left2Id !== regId ||
            right2Id !== regId ||
            up2Id !== regId ||
            down2Id !== regId);

        const isInnerRing =
          !isOuterEdge &&
          (!targetRegionSet.has(left2Id) ||
            !targetRegionSet.has(right2Id) ||
            !targetRegionSet.has(up2Id) ||
            !targetRegionSet.has(down2Id));

        const outIdx = (outRow + (x - minX)) * 4;

        if (isIndividualContourEdge || isOuterEdge) {
          // Đường viền sáng nổi bật màu Ngọc lục bảo (Highlight Border cho mọi vùng được chọn đồng thời)
          data[outIdx] = 16;
          data[outIdx + 1] = 185;
          data[outIdx + 2] = 129;
          data[outIdx + 3] = 250;
        } else if (isIndividualInnerRing || isInnerRing) {
          // Vòng sáng trắng bên trong tạo độ tương phản rõ nét trên mọi nền màu
          data[outIdx] = 255;
          data[outIdx + 1] = 255;
          data[outIdx + 2] = 255;
          data[outIdx + 3] = 230;
        } else if (isDirectSelected) {
          // Phủ lớp sáng dịu nhẹ lên tất cả các vùng đang nằm trong nhóm chọn đa vùng
          data[outIdx] = 255;
          data[outIdx + 1] = 255;
          data[outIdx + 2] = 255;
          data[outIdx + 3] = 52;
        } else if (isHoveredOnly) {
          data[outIdx] = 255;
          data[outIdx + 1] = 255;
          data[outIdx + 2] = 255;
          data[outIdx + 3] = 36;
        } else {
          // Các vùng phụ thuộc cùng đối tượng (khi ở chế độ "Cả đối tượng")
          data[outIdx] = 16;
          data[outIdx + 1] = 185;
          data[outIdx + 2] = 129;
          data[outIdx + 3] = 28;
        }
      }
    }

    ctx.putImageData(imgData, minX, minY);
  }, [interactiveMap, hoveredHit, selectedHit, selectedHits, applyScope]);

  // Xử lý sự kiện di chuột (Hover) trên khung tranh
  const handleContainerMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDraggingSlider.current) return;
    if (popupRef.current && popupRef.current.contains(e.target as Node)) {
      return;
    }
    const hit = resolveHitAtClientPoint(e.clientX, e.clientY);
    setHoveredHit(hit);
  };

  const handleContainerMouseLeave = () => {
    setHoveredHit(null);
  };

  const handleContainerMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (popupRef.current && popupRef.current.contains(e.target as Node)) {
      return;
    }
    mouseDownPos.current = { x: e.clientX, y: e.clientY };
  };

  // Bỏ chọn toàn bộ các vùng trên Canvas
  const handleClearAllSelectedRegions = () => {
    setSelectedHits([]);
    setSelectedHit(null);
  };

  // Xóa nhóm vùng chọn (chỉ giữ lại vùng đang xem cuối cùng hoặc xóa danh sách chọn đa vùng)
  const handleResetMultiSelectionGroup = () => {
    if (selectedHit) {
      setSelectedHits([selectedHit]);
    } else {
      setSelectedHits([]);
    }
    setIsMultiSelectMode(false);
  };

  // Xử lý sự kiện Click trực tiếp lên bức tranh (Hỗ trợ Click đơn vùng & Shift+Click / Chế độ Chọn nhiều vùng)
  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (popupRef.current && popupRef.current.contains(e.target as Node)) {
      return;
    }
    if (mouseDownPos.current) {
      const dist = Math.hypot(
        e.clientX - mouseDownPos.current.x,
        e.clientY - mouseDownPos.current.y
      );
      if (dist > 8) {
        return;
      }
    }

    const hit = resolveHitAtClientPoint(e.clientX, e.clientY);
    if (!hit) {
      if (!isMultiSelectMode && !e.shiftKey && !e.ctrlKey && !e.metaKey) {
        handleClearAllSelectedRegions();
      }
      return;
    }

    // Nếu người dùng click vào vùng bên trái thanh trượt (đang che bởi lớp Nét Gốc), tự động kéo nhẹ thanh trượt hoặc mở chế độ xem màu tại vùng đó
    if (viewMode === "slider" && hit.containerXPercent < sliderPosition) {
      setSliderPosition(Math.max(8, hit.containerXPercent - 12));
    } else if (viewMode === "original") {
      setViewMode("colored");
    }

    const isMultiTrigger =
      e.shiftKey || e.ctrlKey || e.metaKey || isMultiSelectMode;

    if (isMultiTrigger) {
      // Chế độ Chọn đa vùng đồng thời (Multi-Region Selection)
      const exists = selectedHits.some((h) => h.regionId === hit.regionId);
      if (exists) {
        if (selectedHits.length > 1) {
          const remaining = selectedHits.filter(
            (h) => h.regionId !== hit.regionId
          );
          setSelectedHits(remaining);
          const lastHit = remaining[remaining.length - 1];
          setSelectedHit(lastHit);
          setEditLabelInput(lastHit.objectLabelVi);
          setCustomHexInput(lastHit.currentHex);
        }
      } else {
        const nextHits = [...selectedHits, hit];
        setSelectedHits(nextHits);
        setSelectedHit(hit);
        setApplyScope("region");
        setEditLabelInput(hit.objectLabelVi);
        setCustomHexInput(hit.currentHex);
      }
      return;
    }

    // Click đơn vùng thông thường: Mặc định ưu tiên số 1 ("Chỉ vùng" - region)
    setSelectedHits([hit]);
    setSelectedHit(hit);
    setApplyScope("region");
    setEditLabelInput(hit.objectLabelVi);
    setCustomHexInput(hit.currentHex);
  };

  // Thực thi đổi màu ngay lập tức cho 1 vùng, đa vùng (Batch Coloring), hoặc cả đối tượng
  const triggerColorChange = (rawHex: string, customLabel?: string) => {
    if (!selectedHit || !onCanvasColorPick) return;
    const cleanHex = (
      rawHex.startsWith("#") ? rawHex.trim() : `#${rawHex.trim()}`
    ).toUpperCase();
    if (!/^#[0-9A-F]{6}$/.test(cleanHex)) return;

    const finalLabel =
      (customLabel ?? editLabelInput).trim() || selectedHit.objectLabelVi;
    const targetRegionIds =
      selectedHits.length > 0
        ? selectedHits.map((h) => h.regionId)
        : [selectedHit.regionId];

    setCustomHexInput(cleanHex);
    setSelectedHit((prev) =>
      prev
        ? {
            ...prev,
            objectLabelVi: finalLabel,
            currentHex: cleanHex,
          }
        : null
    );
    if (applyScope === "region") {
      setSelectedHits((prevList) =>
        prevList.map((item) => ({
          ...item,
          currentHex: cleanHex,
        }))
      );
    }

    onCanvasColorPick({
      labelVi: selectedHit.objectLabelVi,
      newHex: cleanHex,
      newLabelVi: finalLabel,
      objectId: selectedHit.objectId,
      regionId: selectedHit.regionId,
      regionIds: targetRegionIds,
      allObjectRegionIds: selectedHit.allObjectRegionIds,
      applyScope,
    });
  };

  // Tổng hợp bảng màu nhanh (Quick Swatches) từ Bảng màu hiện tại + Golden Ratio 60-30-10
  const quickSwatches = Array.from(
    new Set([
      ...paletteColors,
      ...(goldenColors?.dominant || []),
      ...(goldenColors?.secondary || []),
      ...(goldenColors?.accent || []),
      ...(goldenColors?.skinToneHex ? [goldenColors.skinToneHex] : []),
      "#FF6B6B",
      "#F4A261",
      "#E9C46A",
      "#2A9D8F",
      "#457B9D",
      "#9B5DE5",
      "#52B788",
      "#FF8FAB",
      "#FFE5D9",
      "#FFFFFF",
    ])
  ).slice(0, 16);

  const multiCount = selectedHits.length;

  return (
    <div
      className={`relative flex flex-col bg-white rounded-3xl p-4 shadow-soft border border-studio-100 ${
        isFullscreen ? "fixed inset-4 z-50 p-6 bg-white/98 shadow-soft-xl" : ""
      }`}
    >
      {/* Thanh điều khiển trên cùng */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-studio-100 mb-3">
        <div className="flex items-center gap-1.5 bg-studio-50 p-1 rounded-2xl">
          <button
            type="button"
            onClick={() => setViewMode("slider")}
            className={`px-3 py-1 rounded-xl text-xs font-medium transition-all cursor-pointer ${
              viewMode === "slider"
                ? "bg-white text-studio-900 shadow-sm font-semibold"
                : "text-studio-500 hover:text-studio-800"
            }`}
          >
            <span className="flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Thanh Trượt
            </span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode("original")}
            className={`px-3 py-1 rounded-xl text-xs font-medium transition-all cursor-pointer ${
              viewMode === "original"
                ? "bg-white text-studio-900 shadow-sm font-semibold"
                : "text-studio-500 hover:text-studio-800"
            }`}
          >
            Nét Gốc
          </button>
          <button
            type="button"
            onClick={() => setViewMode("colored")}
            className={`px-3 py-1 rounded-xl text-xs font-medium transition-all cursor-pointer ${
              viewMode === "colored"
                ? "bg-white text-studio-900 shadow-sm font-semibold"
                : "text-studio-500 hover:text-studio-800"
            }`}
          >
            Đã Tô Màu
          </button>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          {interactiveMap && (
            <>
              <button
                type="button"
                onClick={() => {
                  const nextMode = !isMultiSelectMode;
                  setIsMultiSelectMode(nextMode);
                  if (nextMode) {
                    setApplyScope("region");
                  }
                }}
                className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full border transition-all cursor-pointer ${
                  isMultiSelectMode || multiCount > 1
                    ? "bg-emerald-700 text-white border-emerald-800 shadow-xs"
                    : "bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100"
                }`}
                title="Bật chế độ Chọn nhiều vùng cùng lúc (hoặc giữ phím Shift khi Click trên tranh)"
              >
                <MousePointerClick className="w-3.5 h-3.5" />
                <span>
                  {isMultiSelectMode || multiCount > 1
                    ? `Chế độ Chọn nhiều vùng (${multiCount} vùng)`
                    : "Chọn nhiều vùng (Shift + Click)"}
                </span>
              </button>

              {multiCount > 1 && (
                <button
                  type="button"
                  onClick={handleClearAllSelectedRegions}
                  className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 cursor-pointer"
                  title="Hủy chọn tất cả các vùng đang chọn"
                >
                  <X className="w-3 h-3" />
                  Hủy chọn ({multiCount})
                </button>
              )}
            </>
          )}

          {isMock && (
            <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-pastel-butter text-amber-900 border border-amber-200">
              Bản Xem Thử (Mock)
            </span>
          )}

          <button
            type="button"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 rounded-xl text-studio-500 hover:bg-studio-100 hover:text-studio-800 cursor-pointer"
            title={isFullscreen ? "Thu nhỏ" : "Toàn màn hình"}
          >
            {isFullscreen ? (
              <Minimize2 className="w-4 h-4" />
            ) : (
              <Maximize2 className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Vùng hiển thị tác phẩm (Hỗ trợ Hover Highlight & Direct Click Đơn Vùng / Đa Vùng) */}
      <div
        ref={containerRef}
        onMouseMove={handleContainerMouseMove}
        onMouseLeave={handleContainerMouseLeave}
        onMouseDown={handleContainerMouseDown}
        onClick={handleContainerClick}
        onTouchMove={handleTouchMove}
        className="relative w-full aspect-square max-h-[600px] select-none overflow-hidden rounded-2xl bg-studio-50/80 cursor-crosshair flex items-center justify-center border border-studio-100"
      >
        {/* Lớp 1: Tranh màu đã tô */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center p-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={coloredImgRef}
            src={coloredImage}
            alt="Tranh đã tô màu bằng AI"
            className="w-full h-full object-contain pointer-events-none"
          />
        </div>

        {/* Lớp 2: Tranh nét gốc (khi ở chế độ Thanh Trượt hoặc Nét Gốc) */}
        {viewMode !== "colored" && (
          <div
            className="absolute inset-0 w-full h-full flex items-center justify-center p-2 overflow-hidden pointer-events-none"
            style={{
              clipPath:
                viewMode === "original"
                  ? "inset(0 0 0 0)"
                  : `inset(0 ${100 - sliderPosition}% 0 0)`,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={originalImage}
              alt="Bản vẽ nét ban đầu"
              className="w-full h-full object-contain pointer-events-none bg-white"
            />
          </div>
        )}

        {/* Lớp 3: Mặt nạ làm sáng viền đối tượng & nhóm vùng chọn đồng thời (Highlight Outline Overlay) */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center p-2 pointer-events-none">
          <canvas
            ref={overlayCanvasRef}
            className="w-full h-full object-contain pointer-events-none"
          />
        </div>

        {/* Nhãn nổi theo trỏ chuột khi Hover qua đối tượng trên tranh */}
        {hoveredHit && (
          <div
            className="absolute z-20 pointer-events-none transition-transform duration-75"
            style={{
              left: `${Math.min(76, Math.max(8, hoveredHit.containerXPercent))}%`,
              top: `${Math.max(6, hoveredHit.containerYPercent - 7)}%`,
              transform: "translate(-50%, -100%)",
            }}
          >
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-studio-900/92 text-white text-[11px] font-semibold shadow-lg border border-white/20 backdrop-blur-md whitespace-nowrap">
              <span
                className="w-3 h-3 rounded-full border border-white/60 shrink-0"
                style={{ backgroundColor: hoveredHit.currentHex }}
              />
              <span>{hoveredHit.objectLabelVi}</span>
              <span className="text-[9px] font-mono text-emerald-300">
                (Vùng #{hoveredHit.regionId} • {hoveredHit.currentHex})
              </span>
              <span className="text-[9px] bg-emerald-500/30 text-emerald-200 px-1.5 py-0.2 rounded-md border border-emerald-400/30">
                {isMultiSelectMode || selectedHit
                  ? "Shift+Click để chọn gộp vùng"
                  : "Click để đổi màu"}
              </span>
            </div>
          </div>
        )}

        {/* Cột mốc và con lăn trượt Trước / Sau */}
        {viewMode === "slider" && (
          <>
            <div
              onMouseDown={handleSliderHandleMouseDown}
              onTouchStart={handleSliderHandleTouchStart}
              title="Kéo qua lại để so sánh Nét Gốc và Bản Màu"
              className="absolute top-0 bottom-0 w-5 -ml-2.5 cursor-ew-resize z-10 flex items-center justify-center group"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="h-full w-0.5 bg-white shadow-[0_0_10px_rgba(0,0,0,0.35)]" />
              <div className="absolute top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-soft-lg flex items-center justify-center border border-studio-200 group-hover:scale-110 transition-transform">
                <SlidersHorizontal className="w-4 h-4 text-studio-700" />
              </div>
            </div>

            {/* Thẻ chú thích góc */}
            <div className="absolute bottom-3 left-3 pointer-events-none">
              <span className="px-2.5 py-1 rounded-xl bg-white/90 backdrop-blur-md text-[11px] font-bold text-studio-800 shadow-sm border border-studio-100">
                Nét Gốc
              </span>
            </div>
            <div className="absolute bottom-3 right-3 pointer-events-none">
              <span className="px-2.5 py-1 rounded-xl bg-studio-900/80 backdrop-blur-md text-[11px] font-bold text-white shadow-sm">
                Click: Chọn vùng • Shift+Click: Chọn nhiều vùng
              </span>
            </div>
          </>
        )}

        {/* POPUP CHỌN MÀU NHANH TRỰC TIẾP TRÊN CANVAS (QUICK COLOR PICKER OVERLAY) */}
        {selectedHit && (
          <div
            ref={popupRef}
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            className="absolute z-30 w-76 sm:w-84 rounded-2xl bg-white/98 backdrop-blur-md border-2 border-studio-900 shadow-2xl p-3 space-y-2.5 animate-in fade-in zoom-in-95 duration-150 cursor-default"
            style={{
              left:
                multiCount > 1 || isMultiSelectMode
                  ? "12px"
                  : selectedHit.containerXPercent > 52
                  ? `${Math.max(3, selectedHit.containerXPercent - 44)}%`
                  : `${Math.min(52, selectedHit.containerXPercent + 3)}%`,
              top:
                multiCount > 1 || isMultiSelectMode
                  ? "12px"
                  : selectedHit.containerYPercent > 52
                  ? `${Math.max(3, selectedHit.containerYPercent - 46)}%`
                  : `${Math.min(48, selectedHit.containerYPercent + 3)}%`,
            }}
          >
            {/* Tiêu đề & Nút đóng */}
            <div className="flex items-start justify-between gap-2 pb-2 border-b border-studio-100">
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className="w-5 h-5 rounded-full border border-black/20 shadow-xs shrink-0"
                  style={{ backgroundColor: selectedHit.currentHex }}
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-xs font-bold text-studio-900 truncate">
                      {multiCount > 1
                        ? `Đang chọn ${multiCount} vùng cùng lúc`
                        : selectedHit.objectLabelVi}
                    </span>
                    <span className="px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 text-[9px] font-mono font-bold">
                      {multiCount > 1
                        ? `${multiCount} vùng`
                        : `Vùng #${selectedHit.regionId}`}
                    </span>
                  </div>
                  <p className="text-[10px] text-studio-500">
                    {multiCount > 1 ? (
                      <span>
                        Đổ màu hàng loạt (Ưu tiên 1) • Mã màu:{" "}
                        <span className="font-mono font-bold text-studio-800">
                          {selectedHit.currentHex}
                        </span>
                      </span>
                    ) : (
                      <span>
                        Tọa độ ({selectedHit.xNorm}, {selectedHit.yNorm}) • Mã màu:{" "}
                        <span className="font-mono font-bold text-studio-800">
                          {selectedHit.currentHex}
                        </span>
                      </span>
                    )}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleClearAllSelectedRegions}
                className="p-1 rounded-lg text-studio-400 hover:text-studio-900 hover:bg-studio-100 transition-colors cursor-pointer shrink-0"
                title="Đóng bảng chọn màu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Thanh điều khiển Chọn Đa Vùng (Multi-Region Selection & Batch Coloring) */}
            <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-2 space-y-1.5">
              <div className="flex items-center justify-between gap-1.5 flex-wrap">
                <button
                  type="button"
                  onClick={() => {
                    const next = !isMultiSelectMode;
                    setIsMultiSelectMode(next);
                    if (next) setApplyScope("region");
                  }}
                  className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
                    isMultiSelectMode
                      ? "bg-emerald-700 text-white shadow-2xs"
                      : "bg-white text-emerald-900 border border-emerald-300 hover:bg-emerald-100"
                  }`}
                  title="Bật để click chọn thêm nhiều vùng trên tranh mà không cần giữ phím Shift"
                >
                  <Target className="w-3 h-3 shrink-0" />
                  <span>
                    {isMultiSelectMode
                      ? "Đang bật: Click tranh để thêm vùng"
                      : "+ Chọn nhiều vùng (hoặc giữ Shift)"}
                  </span>
                </button>

                {multiCount > 1 && (
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={handleResetMultiSelectionGroup}
                      className="px-1.5 py-0.5 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100 text-[9px] font-bold cursor-pointer"
                      title="Xóa nhóm vùng chọn, chỉ giữ lại 1 vùng hiện tại"
                    >
                      Xóa nhóm vùng chọn
                    </button>
                    <button
                      type="button"
                      onClick={handleClearAllSelectedRegions}
                      className="px-1.5 py-0.5 rounded-lg bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 text-[9px] font-bold cursor-pointer"
                      title="Hủy chọn tất cả các vùng trên Canvas"
                    >
                      Hủy chọn tất cả
                    </button>
                  </div>
                )}
              </div>

              {/* Danh sách các thẻ vùng đang được chọn đồng thời */}
              <div className="flex items-center gap-1 flex-wrap max-h-16 overflow-y-auto">
                {selectedHits.map((hItem) => (
                  <span
                    key={hItem.regionId}
                    className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-white border border-emerald-200 text-[9px] font-mono font-bold text-studio-800 shadow-2xs"
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full border border-black/20 shrink-0"
                      style={{ backgroundColor: hItem.currentHex }}
                    />
                    <span>Vùng #{hItem.regionId}</span>
                    {multiCount > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          const rem = selectedHits.filter(
                            (r) => r.regionId !== hItem.regionId
                          );
                          setSelectedHits(rem);
                          if (
                            selectedHit.regionId === hItem.regionId &&
                            rem.length > 0
                          ) {
                            setSelectedHit(rem[rem.length - 1]);
                          }
                        }}
                        className="text-studio-400 hover:text-rose-600 cursor-pointer ml-0.5"
                        title={`Bỏ vùng #${hItem.regionId} khỏi nhóm chọn`}
                      >
                        ×
                      </button>
                    )}
                  </span>
                ))}
              </div>
            </div>

            {/* Chế độ phạm vi tô: Ưu tiên 1 ("Chỉ vùng" / Đa vùng) cao hơn Ưu tiên 2 ("Cả đối tượng") */}
            <div className="grid grid-cols-2 gap-1 bg-studio-50 p-1 rounded-xl border border-studio-200/80">
              <button
                type="button"
                onClick={() => setApplyScope("region")}
                className={`flex items-center justify-center gap-1 px-2 py-1.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                  applyScope === "region"
                    ? "bg-emerald-700 text-white shadow-2xs"
                    : "text-studio-600 hover:text-studio-900"
                }`}
                title="Ưu tiên 1 (Cao nhất): Chỉ đổ màu cho vùng (hoặc nhóm vùng) đang chọn, ghi đè tuyệt đối lên màu của đối tượng"
              >
                <Target className="w-3 h-3 shrink-0" />
                <span className="truncate">
                  {multiCount > 1
                    ? `Chỉ ${multiCount} vùng chọn (Ưu tiên 1)`
                    : `Chỉ vùng #${selectedHit.regionId} (Ưu tiên 1)`}
                </span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setApplyScope("object");
                  setIsMultiSelectMode(false);
                }}
                className={`flex items-center justify-center gap-1 px-2 py-1.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                  applyScope === "object"
                    ? "bg-studio-900 text-white shadow-2xs"
                    : "text-studio-600 hover:text-studio-900"
                }`}
                title="Ưu tiên 2: Đổi màu cho toàn bộ đối tượng (các vùng đã chỉnh riêng ở 'Chỉ vùng' vẫn được giữ nguyên)"
              >
                <Layers className="w-3 h-3 shrink-0" />
                <span className="truncate">
                  Cả đối tượng ({selectedHit.allObjectRegionIds.length} vùng)
                </span>
              </button>
            </div>

            {/* Ô sửa nhanh tên đối tượng ngay trên Popup */}
            <div className="flex items-center gap-1.5">
              <input
                type="text"
                value={editLabelInput}
                onChange={(e) => setEditLabelInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    triggerColorChange(
                      selectedHit.currentHex,
                      editLabelInput
                    );
                  }
                }}
                placeholder="Tên đối tượng tại điểm click..."
                className="w-full px-2.5 py-1 text-[11px] font-semibold rounded-xl bg-studio-50 border border-studio-200 focus:outline-none focus:bg-white focus:border-studio-900 text-studio-900"
              />
              {editLabelInput.trim() &&
                editLabelInput.trim() !== selectedHit.objectLabelVi && (
                  <button
                    type="button"
                    onClick={() =>
                      triggerColorChange(
                        selectedHit.currentHex,
                        editLabelInput
                      )
                    }
                    className="shrink-0 px-2 py-1 rounded-xl bg-emerald-700 text-white text-[10px] font-bold hover:bg-emerald-800 cursor-pointer flex items-center gap-0.5"
                    title="Lưu tên mới cho đối tượng"
                  >
                    <Check className="w-3 h-3" />
                    Lưu
                  </button>
                )}
            </div>

            {/* Bảng chọn màu nhanh (Quick Palette Swatches) */}
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-studio-600 uppercase tracking-wider flex items-center gap-1">
                <Palette className="w-3 h-3 text-studio-500" />
                {applyScope === "region" && multiCount > 1
                  ? `Chọn màu gán đồng loạt cho ${multiCount} vùng:`
                  : "Chọn nhanh màu từ Bảng màu hiện tại:"}
              </span>
              <div className="grid grid-cols-8 gap-1.5 pt-0.5">
                {quickSwatches.map((hex, idx) => {
                  const normHex = hex.toUpperCase();
                  const isActive =
                    selectedHit.currentHex.toUpperCase() === normHex;
                  return (
                    <button
                      key={`${normHex}_${idx}`}
                      type="button"
                      onClick={() => triggerColorChange(normHex)}
                      title={
                        applyScope === "region"
                          ? multiCount > 1
                            ? `Đổ màu ${normHex} đồng loạt cho ${multiCount} vùng đang chọn`
                            : `Đổ màu ${normHex} cho Chỉ vùng #${selectedHit.regionId}`
                          : `Đổ màu ${normHex} cho Cả đối tượng ${editLabelInput || selectedHit.objectLabelVi}`
                      }
                      className={`w-7 h-7 rounded-xl border transition-all cursor-pointer flex items-center justify-center ${
                        isActive
                          ? "ring-2 ring-studio-900 scale-110 border-white shadow-sm"
                          : "border-black/15 hover:scale-110 hover:border-studio-700"
                      }`}
                      style={{ backgroundColor: normHex }}
                    >
                      {isActive && (
                        <Check className="w-3.5 h-3.5 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Color Picker tự do & Nhập HEX thủ công */}
            <div className="pt-2 border-t border-studio-100 flex items-center justify-between gap-1.5">
              <label className="inline-flex items-center gap-1.5 px-2 py-1 rounded-xl bg-studio-50 border border-studio-200 hover:border-studio-400 text-[10px] font-semibold text-studio-700 cursor-pointer">
                <span>🌈 Tự chọn:</span>
                <input
                  type="color"
                  value={
                    /^#[0-9A-Fa-f]{6}$/.test(selectedHit.currentHex)
                      ? selectedHit.currentHex
                      : "#FF8FAB"
                  }
                  onChange={(e) => triggerColorChange(e.target.value)}
                  className="w-5 h-5 rounded cursor-pointer border-0 bg-transparent p-0"
                />
              </label>

              <div className="flex items-center gap-1">
                <input
                  type="text"
                  value={customHexInput}
                  onChange={(e) =>
                    setCustomHexInput(e.target.value.toUpperCase())
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      triggerColorChange(customHexInput);
                    }
                  }}
                  maxLength={7}
                  placeholder="#FF5733"
                  className="w-18 px-2 py-1 text-[11px] font-mono font-bold rounded-xl border border-studio-200 focus:outline-none focus:border-studio-900 text-studio-900"
                />
                <button
                  type="button"
                  onClick={() => triggerColorChange(customHexInput)}
                  className="px-2 py-1 rounded-xl bg-studio-900 text-white text-[10px] font-bold hover:bg-studio-800 cursor-pointer"
                >
                  Đổi màu
                </button>
              </div>

              {onResetRegionOverride && (
                <button
                  type="button"
                  onClick={() => {
                    const targetRegionIds =
                      selectedHits.length > 0
                        ? selectedHits.map((h) => h.regionId)
                        : [selectedHit.regionId];
                    onResetRegionOverride(
                      selectedHit.regionId,
                      selectedHit.objectLabelVi,
                      applyScope,
                      selectedHit.allObjectRegionIds,
                      targetRegionIds
                    );
                  }}
                  title="Khôi phục màu tự động cho vùng / nhóm vùng đang chọn"
                  className="p-1.5 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Thanh trượt tinh chỉnh phụ & Hướng dẫn tương tác nhanh */}
      <div className="pt-3 px-2 space-y-2">
        {viewMode === "slider" && (
          <div className="flex items-center gap-3">
            <span className="text-[11px] text-studio-400 font-medium">
              Bản nét
            </span>
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPosition}
              onChange={(e) => setSliderPosition(Number(e.target.value))}
              className="w-full h-1.5 bg-studio-100 rounded-lg appearance-none cursor-pointer"
              aria-label="Vị trí so sánh trước và sau"
            />
            <span className="text-[11px] text-studio-400 font-medium">
              Bản màu
            </span>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-studio-600 bg-studio-50/70 px-3 py-1.5 rounded-xl border border-studio-100">
          <span className="flex items-center gap-1.5 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>
              <strong>Mẹo tương tác nhanh:</strong> Click để chọn 1 vùng (Ưu tiên 1: Chỉ vùng) • Giữ{" "}
              <strong className="text-studio-900 underline">
                Shift + Click (hoặc bật Chọn nhiều vùng)
              </strong>{" "}
              để chọn đồng thời nhiều vùng và đổi màu hàng loạt!
            </span>
          </span>
          {selectedHit && (
            <span className="font-mono text-[10px] font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-lg">
              {multiCount > 1
                ? `Đang chọn ${multiCount} vùng: ${selectedHits
                    .map((h) => `#${h.regionId}`)
                    .join(", ")}`
                : `Đang chọn: ${selectedHit.objectLabelVi} (#${selectedHit.regionId})`}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
