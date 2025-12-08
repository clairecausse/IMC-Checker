import { useHistoryContext } from "../../context/useHistoryContext";
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
import { useState, useMemo } from "react";

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

export default function History() {
  const { history, removeResult } = useHistoryContext();
  const [period, setPeriod] = useState<Period>("30j");

  const getCategoryClass = (category: string) =>
    `history-item-category ${category.toLowerCase().replace(/\s+/g, "")}`;

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
        const d = new Date(item.date); // item.date vient de new Date().toISOString()
        return !isNaN(d.getTime()) && d >= cutoffDate;
      })
      .sort(
        (a, b) =>
          new Date(a.date).getTime() - new Date(b.date).getTime()
      );

    const labels = filteredHistory.map((item) => {
      const d = new Date(item.date);
      return d.toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
      });
    });

    const dataValues = filteredHistory.map((item) => item.bmi as number);

    const chartData = {
      labels,
      datasets: [
        {
          label: "Évolution IMC",
          data: dataValues,
          borderColor: "rgb(75, 192, 192)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          tension: 0.4,
          fill: true,
          pointRadius: 4,
          pointHoverRadius: 6,
          pointBackgroundColor: filteredHistory.map((item) => {
            const bmi = item.bmi as number;
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
  }, [history, period]);

  const options = {
    responsive: true,
    maintainAspectRatio: false, // hauteur contrôlée par le CSS
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text:
          "Évolution IMC - " +
          (period === "30j"
            ? "30 jours"
            : period === "3m"
            ? "3 mois"
            : period === "1a"
            ? "1 an"
            : "Tout"),
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        title: { display: true, text: "IMC" },
      },
      x: {
        title: { display: true, text: "Date" },
      },
    },
  };

  return (
    <div className="history-container">
<<<<<<< HEAD
      <h1>Historique de vos calculs</h1>
=======
      <h1>📊 Historique et Évolution IMC</h1>

      <div className="chart-section">
        <div className="period-selector">
          <button
            className={period === "30j" ? "active" : ""}
            onClick={() => setPeriod("30j")}
          >
            30 jours
          </button>
          <button
            className={period === "3m" ? "active" : ""}
            onClick={() => setPeriod("3m")}
          >
            3 mois
          </button>
          <button
            className={period === "1a" ? "active" : ""}
            onClick={() => setPeriod("1a")}
          >
            1 an
          </button>
          <button
            className={period === "tout" ? "active" : ""}
            onClick={() => setPeriod("tout")}
          >
            Tout
          </button>
        </div>

        <div className="chart-container">
          {hasData ? (
            <Line data={chartData} options={options} />
          ) : (
            <p>Aucune donnée pour cette période.</p>
          )}
        </div>
      </div>
>>>>>>> 54bc962ab5a406090705a2d971a528c80cf8648a

      {history.length === 0 ? (
        <div className="history-empty">
          <p>Commencez à calculer votre IMC pour voir votre historique !</p>
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
                  <div className="history-item-date">📅 {item.date}</div>
                </div>
                <div className="history-item-actions">
                  <button
                    className="history-item-delete"
                    onClick={() => removeResult(i)}
                    title="Supprimer cet enregistrement"
                  >
                    🗑️ Supprimer
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <p
            style={{
              textAlign: "center",
              color: "#666",
              marginTop: "2rem",
            }}
          >
            Total des calculs: <strong>{history.length}</strong>
          </p>
          <RGPD/>
        </>
      )}
    </div>
  );
}
