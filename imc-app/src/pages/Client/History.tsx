import { useState, useMemo } from "react";
import { useHistoryContext } from "../../context/useHistoryContext";
import { useLang } from "../../context/language";
import "./History.css";
import RGPD from "./RGPD";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

type Period = "30j" | "3m" | "1a" | "tout";

type HistoryProps = {
  hideTitle?: boolean;
};

export default function History({ hideTitle = false }: HistoryProps) {
  const { t } = useLang();
  const { history, removeResult } = useHistoryContext();
  const [period, setPeriod] = useState<Period>("30j");

  const getCategoryClass = (category: string) =>
    `history-item-category ${category.toLowerCase().replace(/\s+/g, "")}`;

  // --------------------------
  //     CALCUL DU GRAPHIQUE
  // --------------------------
  const { chartData, hasData } = useMemo(() => {
    const now = new Date();
    let cutoffDate: Date;

    switch (period) {
      case "30j":
        cutoffDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case "3m":
        cutoffDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        break;
      case "1a":
        cutoffDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
        break;
      default:
        cutoffDate = new Date(0);
    }

    const filteredHistory = history
      .filter((item) => {
        const d = new Date(item.date);
        return !isNaN(d.getTime()) && d >= cutoffDate;
      })
      .sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );

    const labels = filteredHistory.map((item) =>
      new Date(item.date).toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
      })
    );

    const dataValues = filteredHistory.map((item) => item.bmi);

    const chartData = {
      labels,
      datasets: [
        {
          label: t("history.chart.label"),
          data: dataValues,
          borderColor: "rgb(75, 192, 192)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          tension: 0.4,
          fill: true,
          pointRadius: 4,
          pointHoverRadius: 6,
          pointBackgroundColor: filteredHistory.map((item) => {
            const bmi = item.bmi;
            if (bmi < 18.5) return "rgb(54, 162, 235)";
            if (bmi > 25) return "rgb(255, 99, 132)";
            return "rgb(75, 192, 192)";
          }),
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgb(75, 192, 192)",
        },
      ],
    };

    return { chartData, hasData: filteredHistory.length > 0 };
  }, [history, period, t]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" as const },
      title: {
        display: true,
        text:
          t("history.chart.title") +
          " - " +
          (period === "30j"
            ? t("history.period.last30days")
            : period === "3m"
            ? t("history.period.last3months")
            : period === "1a"
            ? t("history.period.last1year")
            : t("history.period.all")),
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        title: { display: true, text: t("history.chart.yAxis") },
      },
      x: {
        title: { display: true, text: t("history.chart.xAxis") },
      },
    },
  };

  // --------------------------
  //     RENDER
  // --------------------------
  return (
    <div className="history-container">
      {!hideTitle && <h1>{t("history.title")}</h1>}

      <div className="chart-section">
        <div className="period-selector">
          <button
            className={period === "30j" ? "active" : ""}
            onClick={() => setPeriod("30j")}
          >
            {t("history.period.last30days")}
          </button>
          <button
            className={period === "3m" ? "active" : ""}
            onClick={() => setPeriod("3m")}
          >
            {t("history.period.last3months")}
          </button>
          <button
            className={period === "1a" ? "active" : ""}
            onClick={() => setPeriod("1a")}
          >
            {t("history.period.last1year")}
          </button>
          <button
            className={period === "tout" ? "active" : ""}
            onClick={() => setPeriod("tout")}
          >
            {t("history.period.all")}
          </button>
        </div>

        <div className="chart-container">
          {hasData ? (
            <Line data={chartData} options={options} />
          ) : (
            <p>{t("history.noData")}</p>
          )}
        </div>
      </div>

      {history.length === 0 ? (
        <div className="history-empty">
          <p>{t("history.emptyHint")}</p>
        </div>
      ) : (
        <>
          <ul className="history-list">
            {history.map((item, i) => (
              <li key={i} className="history-item">
                <div className="history-item-content">
                  <div className="history-item-main">
                    <span className="history-item-bmi">{item.bmi}</span>
                    <span className={getCategoryClass(item.category)}>
                      {item.category}
                    </span>
                  </div>
                  <div className="history-item-date">
                     {item.date}
                  </div>
                </div>

                <div className="history-item-actions">
                  <button
                    className="history-item-delete"
                    onClick={() => removeResult(i)}
                    title={t("history.delete")}
                  >
                    🗑️ {t("history.delete")}
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <p className="history-total">
            {t("history.total")} <strong>{history.length}</strong>
          </p>

          <RGPD />
        </>
      )}
    </div>
  );
}
