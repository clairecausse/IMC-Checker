// src/components/RgpdInfo/RgpdInfo.tsx
import "./Rgpd.css";

export default function RgpdInfo() {
  return (
    <div className="rgpd-container">
      <h2 className="rgpd-title">🔒 Traitement des données (RGPD)</h2>

      <p className="rgpd-text">
        Les données que vous saisissez (taille, poids) sont utilisées
        uniquement pour calculer votre IMC et afficher votre historique
        de calculs sur ce navigateur.
      </p>

      <div className="rgpd-section">
        <h3>Quelles données&nbsp;?</h3>
        <ul>
          <li>Taille et poids saisis dans le formulaire d&apos;IMC</li>
          <li>Résultats d&apos;IMC affichés dans l&apos;historique</li>
        </ul>
      </div>

      <div className="rgpd-section">
        <h3>Comment sont-elles traitées&nbsp;?</h3>
        <ul>
          <li>
            Les calculs sont effectués côté client (dans votre navigateur).
          </li>
          <li>
            Aucune donnée n&apos;est envoyée à un serveur externe.
          </li>
          <li>
            L&apos;historique peut être supprimé manuellement via l&apos;interface
            (bouton poubelle).
          </li>
        </ul>
      </div>

      <div className="rgpd-section">
        <h3>Consentement</h3>
        <p className="rgpd-text">
          Avant chaque calcul, l&apos;utilisateur doit cocher une case de
          consentement dans le formulaire d&apos;IMC indiquant qu&apos;il accepte
          l&apos;utilisation de ses données pour ce calcul.
        </p>
      </div>

      
    </div>
  );
}
