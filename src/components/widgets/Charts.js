import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

// Registra los elementos necesarios
ChartJS.register(ArcElement, Tooltip, Legend);

export const CircleChart = ({ series = [], labels = [], colors = [] }) => {
  const data = {
    labels,
    datasets: [
      {
        data: series,
        backgroundColor: colors,
        hoverBackgroundColor: colors,
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => `${context.label}: ${context.raw}%`,
        },
      },
    },
    cutout: "70%", // Controla el ancho del círculo
    responsive: true,
    maintainAspectRatio: false,
  };

  return <Doughnut data={data} options={options} />;
};
