"use client";

import React from "react";
import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from "recharts";

interface CircleChartProps {
  value: number; // 0-100
  label: string;
  subLabel?: string;
  color?: string; // Optional override
}

export default function CircleChart({ value, label, subLabel, color }: CircleChartProps) {
  // Clamp value
  const chartValue = Math.min(Math.max(value, 0), 100);

  // Use provided color or default to white
  const fillColor = color || "white";

  const data = [
    {
      name: label,
      value: chartValue,
      fill: fillColor,
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center p-2">
      <div className="h-[90px] w-[90px] relative bg-gradient-to-br from-black to-gray-900 rounded-full shadow-lg ring-1 ring-white/10 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:ring-white/20">
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/5 to-transparent" />

        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="70%"
            outerRadius="95%"
            barSize={8}
            data={data}
            startAngle={90}
            endAngle={-270}
          >
            <PolarAngleAxis
              type="number"
              domain={[0, 100]}
              angleAxisId={0}
              tick={false}
            />
            <RadialBar
              background={{ fill: 'rgba(255, 255, 255, 0.1)' }}
              dataKey="value"
              cornerRadius={10}
              animationDuration={800}
              animationEasing="ease-out"
            />
          </RadialBarChart>
        </ResponsiveContainer>

        {/* Centered Percentage with enhanced styling */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-base font-bold text-white drop-shadow-lg tracking-tight">
            {Math.round(chartValue)}%
          </span>
        </div>
      </div>

      {/* Labels with improved typography */}
      <div className="text-center mt-2">
        <div className="text-xs font-semibold text-foreground/90">{label}</div>
        {subLabel && (
          <div className="text-[10px] text-muted-foreground/60 mt-0.5">{subLabel}</div>
        )}
      </div>
    </div>
  );
}
