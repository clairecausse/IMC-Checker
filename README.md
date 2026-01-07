# IMC Checker

Application web permettant de calculer l’**IMC**, d’enregistrer un **historique**, de gérer un **compte utilisateur**, la **newsletter**, la **langue**, et la **migration des données cookie → compte**.

Projet réalisé dans un cadre pédagogique (Scrum / User Stories).

---

## Lancer le Frontend

cd imc-app
npm install
npm run dev

Accessible sur :
-> http://localhost:5173

## Lancer le Backend
cd imc-app/backend
npm install
npm start

Serveur disponible sur :
-> http://localhost:3001

## Architecture du projet

imc-checker/
│
├── imc-app/           # Frontend (React + Vite)
│
├── imc-api/           # Backend (Node.js + Express)
│
└── README.md


---

## Frontend – `imc-app`

### Technologies
- React
- Vite
- TypeScript
- React Router
- CSS

### Dépendances

```json
{
  "react": "^18.x",
  "react-dom": "^18.x",
  "react-router-dom": "^6.x"
}
```

### Dépendances de développement

````json
{
  "vite": "^5.x",
  "typescript": "^5.x",
  "@types/react": "^18.x",
  "@types/react-dom": "^18.x"
}
````

### Auteurs
Projet réalisé par :
Claire CAUSSE
Gaël LYONET
Hugo BLAISE
Marius AVIGNANT
