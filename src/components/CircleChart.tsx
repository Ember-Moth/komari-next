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

  // Determine color if not provided
  const getColor = (val: number) => {
    if (color) return color;
    if (val >= 80) return "var(--red-9)"; // Shadcn/Radix red
    if (val >= 60) return "var(--orange-9)"; // Shadcn/Radix orange
    return "var(--green-9)"; // Shadcn/Radix green
  };

  const fillColor = getColor(chartValue);

  const data = [
    {
      name: label,
      value: chartValue,
      fill: fillColor,
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center p-2">
      <div className="h-[80px] w-[80px] relative">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="65%"
            outerRadius="100%"
            barSize={6}
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
              background
              dataKey="value"
              cornerRadius={5}
            />
          </RadialBarChart>
        </ResponsiveContainer>
        {/* Centered Percentage */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-sm font-bold">{Math.round(chartValue)}%</span>
        </div>
      </div>
      <div className="text-center mt-1">
        <div className="text-xs font-medium text-muted-foreground">{label}</div>
        {subLabel && <div className="text-[10px] text-muted-foreground/70">{subLabel}</div>}
      </div>
    </div>
  );
}
