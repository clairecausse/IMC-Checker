import { useHistoryContext } from "../../context/useHistoryContext";

export default function History() {
  const { history } = useHistoryContext();

  return (
    <div>
      <h1>Historique</h1>

      {history.length === 0 && <p>Commencez à calculer votre IMC pour avoir un historique !</p>}
      <ul>
        {history.map((item, i) => (
          <li key={i}>
            <strong>IMC :</strong> {item.bmi} — {item.category}
            <br />
            <small>{item.date}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}
