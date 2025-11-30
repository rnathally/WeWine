import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface DataPoint {
  name: string;
  valor1: number;
  valor2: number;
}

const data: DataPoint[] = [
  { name: "Mai", valor1: 65, valor2: 80 },
  { name: "Jun", valor1: 70, valor2: 95 },
  { name: "Jul", valor1: 60, valor2: 75 },
  { name: "Ago", valor1: 85, valor2: 90 },
  { name: "Set", valor1: 78, valor2: 105 },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: "#000",
          padding: "8px 12px",
          borderRadius: "8px",
          color: "#fff",
          fontSize: "14px",
          fontWeight: 600,
        }}
      >
        <p style={{ margin: 0 }}>
          {payload[0].value} — {payload[0].payload.name}
        </p>
      </div>
    );
  }
  return null;
};

const GraficoComparativo: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div
      style={{
        width: "100%",
        height: "300px",
        borderRadius: "15px",
        padding: "20px",
        background: "transparent", // sem fundo cinza
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          barGap={6}
          onMouseMove={(state: any) => {
            if (state && typeof state.activeTooltipIndex === "number") {
              setActiveIndex(state.activeTooltipIndex);
            }
          }}
          onMouseLeave={() => setActiveIndex(null)}
        >
          <XAxis dataKey="name" tick={{ fontSize: 14 }} />
          <YAxis tick={{ fontSize: 14 }} />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "transparent" }} // não pinta o fundo da área
          />

          {/* Barras valor1 */}
          <Bar
            dataKey="valor1"
            radius={[8, 8, 8, 8]}
            isAnimationActive
            animationBegin={0}
            animationDuration={900}
            animationEasing="ease-out"
          >
            {data.map((_, index) => (
              <Cell
                key={`b1-${index}`}
                fill="#228048"
                fillOpacity={
                  activeIndex === null || activeIndex === index ? 1 : 0.3
                }
              />
            ))}
          </Bar>

          {/* Barras valor2 */}
          <Bar
            dataKey="valor2"
            radius={[8, 8, 8, 8]}
            isAnimationActive
            animationBegin={150}
            animationDuration={900}
            animationEasing="ease-out"
          >
            {data.map((_, index) => (
              <Cell
                key={`b2-${index}`}
                fill="#739d37"
                fillOpacity={
                  activeIndex === null || activeIndex === index ? 1 : 0.3
                }
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GraficoComparativo;
