import { useAuthContext } from "../../context/useAuthContext";
import { Navigate } from "react-router-dom";
import { useHistoryContext } from "../../context/useHistoryContext";

export default function Profil() {
  const { token } = useAuthContext();
  const { history } = useHistoryContext();

  if (!token) return <Navigate to="/login" replace />;

  return (
    <div>
      <h1>Mon profil</h1>
      <h2>Historique IMC</h2>

      {history.length === 0 && <p>Aucun historique.</p>}

      <ul>
        {history.map((item, i) => (
          <li key={i}>
            <strong>{item.bmi}</strong> — {item.category}
            <br />
            <small>{item.date}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}
