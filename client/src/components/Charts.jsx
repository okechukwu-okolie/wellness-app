import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const data = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Steps",
      data: [4000, 5000, 3000, 7000, 6500, 8000, 7200],
      borderColor: "#16a34a",
      backgroundColor: "rgba(16,163,74,0.1)",
    },
  ],
};

export default function Charts() {
  return <Line data={data} />;
}
