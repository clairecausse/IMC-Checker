import { useHistoryContext } from "../../context/useHistoryContext";
import "./History.css";

export default function History() {
  const { history, removeResult } = useHistoryContext();

  const getCategoryClass = (category: string) => {
    return `history-item-category ${category.toLowerCase().replace(/\s+/g, '')}`;
  };

  return (
    <div className="history-container">
      <h1>📊 Historique de vos calculs</h1>

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
          <p style={{ textAlign: 'center', color: '#666', marginTop: '2rem' }}>
            Total des calculs: <strong>{history.length}</strong>
          </p>
        </>
      )}
    </div>
  );
}
