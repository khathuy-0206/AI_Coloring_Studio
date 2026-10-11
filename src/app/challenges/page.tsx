"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Trophy, Calendar, Users, Award, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { COLORING_CHALLENGES } from "@/data/creative-content";

export default function ChallengesPage() {
  const [joinedChallenges, setJoinedChallenges] = useState<string[]>([]);

  const toggleJoin = (id: string) => {
    if (joinedChallenges.includes(id)) {
      setJoinedChallenges(joinedChallenges.filter((c) => c !== id));
    } else {
      setJoinedChallenges([...joinedChallenges, id]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Khung tiêu đề */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold">
          <Trophy className="w-3.5 h-3.5 text-amber-600" />
          Thử Thách Tô Màu Định Kỳ
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-studio-900">
          Thử Thách Sáng Tạo Tuần &amp; Theo Mùa
        </h1>
        <p className="text-sm text-studio-500">
          Tự thử thách bản thân với các quy tắc phối màu độc đáo, chủ đề theo mùa và tham gia cùng hàng trăm người bạn yêu tô màu!
        </p>
      </div>

      {/* Danh sách thử thách */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {COLORING_CHALLENGES.map((challenge) => {
          const isJoined = joinedChallenges.includes(challenge.id);
          return (
            <div
              key={challenge.id}
              className="bg-white rounded-4xl p-6 sm:p-8 border border-studio-100 shadow-soft hover:shadow-soft-lg transition-all flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-pastel-pink text-studio-800">
                    {challenge.topic}
                  </span>
                  <span className="text-xs text-studio-400 flex items-center gap-1 font-medium">
                    <Users className="w-3.5 h-3.5" />
                    {challenge.participantCount} bạn đã tham gia
                  </span>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-studio-900">
                    {challenge.title}
                  </h2>
                  <p className="text-xs text-studio-500 mt-2 leading-relaxed">
                    {challenge.description}
                  </p>
                </div>

                {/* Ngày tháng & Huy hiệu */}
                <div className="p-3.5 rounded-2xl bg-studio-50 border border-studio-100 space-y-2 text-xs text-studio-600">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-studio-400">
                      <Calendar className="w-3.5 h-3.5" /> Thời gian:
                    </span>
                    <span className="font-medium text-studio-800">
                      {challenge.startDate} ~ {challenge.endDate}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-studio-400">
                      <Award className="w-3.5 h-3.5 text-amber-500" /> Huy hiệu:
                    </span>
                    <span className="font-bold text-studio-900">
                      {challenge.badgeName}
                    </span>
                  </div>
                </div>

                {/* Bảng màu */}
                <div>
                  <span className="text-xs font-semibold text-studio-700 block mb-2">
                    Bảng Màu Thử Thách:
                  </span>
                  <div className="flex items-center gap-2">
                    {challenge.suggestedPalette.map((hex, idx) => (
                      <span
                        key={idx}
                        className="w-7 h-7 rounded-xl border border-black/10 shadow-xs"
                        style={{ backgroundColor: hex }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Các nút hành động */}
              <div className="pt-4 border-t border-studio-100 flex items-center justify-between gap-3">
                <button
                  onClick={() => toggleJoin(challenge.id)}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    isJoined
                      ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                      : "bg-studio-100 text-studio-700 hover:bg-studio-200"
                  }`}
                >
                  {isJoined ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Đã Tham Gia</span>
                    </>
                  ) : (
                    <span>Tham Gia</span>
                  )}
                </button>

                <Link
                  href={`/studio?style=${challenge.suggestedStyle}`}
                  className="px-4 py-2.5 rounded-2xl bg-studio-900 text-white text-xs font-bold hover:bg-studio-800 transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <Sparkles className="w-3.5 h-3.5 text-pastel-butter" />
                  <span>Mở Studio</span>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
