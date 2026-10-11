"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HelpCircle, Sparkles, RotateCcw, ArrowRight, Check } from "lucide-react";
import { COLOR_QUIZ_QUESTIONS } from "@/data/creative-content";

export default function QuizPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = COLOR_QUIZ_QUESTIONS[currentQuestionIndex];

  const handleSelectOption = (optionIndex: number) => {
    const updated = [...answers, optionIndex];
    setAnswers(updated);

    if (currentQuestionIndex + 1 < COLOR_QUIZ_QUESTIONS.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setIsFinished(false);
  };

  const lastSelectedOption =
    answers.length > 0
      ? COLOR_QUIZ_QUESTIONS[answers.length - 1]?.options[answers[answers.length - 1]]
      : COLOR_QUIZ_QUESTIONS[0].options[0];

  const result = lastSelectedOption?.result || {
    style: "Pastel",
    palette: "Pink",
    mood: "Cute",
    lighting: "Soft light",
    paletteName: "Sữa Dâu Ngọt Ngào",
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Khung câu hỏi trắc nghiệm */}
      <div className="bg-white rounded-4xl p-6 sm:p-12 border border-studio-100 shadow-soft-lg space-y-8">
        {!isFinished ? (
          <>
            {/* Thanh tiến độ & Tiêu đề */}
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-studio-500 font-semibold">
                <span className="flex items-center gap-1.5 text-studio-700">
                  <HelpCircle className="w-4 h-4 text-studio-500" />
                  Câu hỏi {currentQuestionIndex + 1} trên{" "}
                  {COLOR_QUIZ_QUESTIONS.length}
                </span>
                <span>
                  {Math.round(
                    ((currentQuestionIndex + 1) /
                      COLOR_QUIZ_QUESTIONS.length) *
                      100
                  )}
                  % Hoàn thành
                </span>
              </div>

              <div className="w-full h-2 rounded-full bg-studio-100 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-pastel-pink to-studio-700 transition-all duration-300"
                  style={{
                    width: `${
                      ((currentQuestionIndex + 1) /
                        COLOR_QUIZ_QUESTIONS.length) *
                      100
                    }%`,
                  }}
                />
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-studio-900 pt-2">
                {currentQ.question}
              </h2>
            </div>

            {/* Các phương án lựa chọn */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {currentQ.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className="p-5 rounded-3xl border border-studio-100 bg-studio-50/50 hover:bg-white hover:border-studio-400 hover:shadow-soft text-left transition-all flex items-start gap-4 group"
                >
                  <span className="text-3xl p-2 rounded-2xl bg-white shadow-xs group-hover:scale-110 transition-transform">
                    {opt.icon}
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-studio-900 group-hover:text-studio-800">
                      {opt.text}
                    </h3>
                    <p className="text-xs text-studio-500 mt-1">
                      {opt.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </>
        ) : (
          /* Màn hình kết quả trắc nghiệm */
          <div className="text-center space-y-6 py-4">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-pastel-pink via-pastel-lilac to-pastel-mint flex items-center justify-center mx-auto shadow-soft animate-float">
              <Sparkles className="w-8 h-8 text-studio-700" />
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-studio-500">
                Phong Cách Đồng Điệu Với Bạn
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-studio-900">
                {result.style} &amp; {result.paletteName}
              </h2>
              <p className="text-xs sm:text-sm text-studio-500 max-w-md mx-auto">
                Dựa trên những lựa chọn của bạn, tâm hồn sáng tạo của bạn đang hòa nhịp với không gian{" "}
                <strong>{result.mood}</strong> cùng ánh sáng{" "}
                <strong>{result.lighting}</strong>!
              </p>
            </div>

            {/* Thẻ tóm tắt các thuộc tính kết quả */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-lg mx-auto pt-2">
              <div className="p-3 rounded-2xl bg-studio-50 border border-studio-100">
                <span className="text-[10px] text-studio-400 block font-semibold">
                  Phong Cách
                </span>
                <strong className="text-xs text-studio-900">{result.style}</strong>
              </div>
              <div className="p-3 rounded-2xl bg-studio-50 border border-studio-100">
                <span className="text-[10px] text-studio-400 block font-semibold">
                  Bảng Màu
                </span>
                <strong className="text-xs text-studio-900">{result.paletteName}</strong>
              </div>
              <div className="p-3 rounded-2xl bg-studio-50 border border-studio-100">
                <span className="text-[10px] text-studio-400 block font-semibold">
                  Tâm Trạng
                </span>
                <strong className="text-xs text-studio-900">{result.mood}</strong>
              </div>
              <div className="p-3 rounded-2xl bg-studio-50 border border-studio-100">
                <span className="text-[10px] text-studio-400 block font-semibold">
                  Ánh Sáng
                </span>
                <strong className="text-xs text-studio-900">{result.lighting}</strong>
              </div>
            </div>

            {/* Các nút hành động */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href={`/studio?style=${result.style}&palette=${result.paletteName}&mood=${result.mood}&lighting=${result.lighting}`}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-studio-900 text-white font-bold text-xs shadow-soft hover:bg-studio-800 transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-pastel-butter" />
                <span>Áp Dụng Vào Studio &amp; Tô Màu Ngay</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                onClick={handleRestart}
                className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-studio-100 hover:bg-studio-200 text-studio-800 font-semibold text-xs transition-all flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Làm Lại Trắc Nghiệm</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
