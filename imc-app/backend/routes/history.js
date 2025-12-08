import express from "express";
import db from "../database/index.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// middleware pour décoder le token
function auth(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ error: "Token manquant" });

  const token = header.split(" ")[1];

  try {
    req.user = jwt.verify(token, "secret");
    next();
  } catch {
    return res.status(401).json({ error: "Token invalide" });
  }
}

// GET HISTORY
router.get("/", auth, async (req, res) => {
  const rows = await db.all(
    "SELECT * FROM history WHERE user_id = ? ORDER BY id DESC",
    req.user.id
  );
  res.json(rows);
});

// ADD HISTORY
router.post("/", auth, async (req, res) => {
  const { bmi, category, date } = req.body;

  await db.run(
    "INSERT INTO history (user_id, bmi, category, date) VALUES (?, ?, ?, ?)",
    req.user.id,
    bmi,
    category,
    date
  );

  res.json({ message: "Enregistré !" });
});

export default router;
