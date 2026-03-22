"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export function DeliveryChart() {
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Delivered",
        data: [42, 58, 65, 49, 73, 82, 91],
        backgroundColor: "rgba(99, 102, 241, 0.75)",
        borderRadius: 8,
        maxBarThickness: 28,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "rgba(229, 231, 235, 0.9)",
        },
      },
      y: {
        grid: {
          color: "rgba(255,255,255,0.15)",
        },
        ticks: {
          color: "rgba(229, 231, 235, 0.8)",
        },
      },
    },
  };

  return (
    <div className="glass p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-white">Delivery Status (weekly)</h3>
        <span className="text-sm text-indigo-100/70">Live</span>
      </div>
      <div className="mt-5">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
