import express from "express";
import db from "../database/index.js";
import { hashPassword, comparePassword } from "../utils/hash.js";
import { generateToken } from "../utils/token.js";
import jwt from "jsonwebtoken";
import { sendVerificationEmail } from "../utils/email.js";

const router = express.Router();
const JWT_SECRET = "secret";

/* ======================
   VERIFY EMAIL
====================== */
router.get("/verify/:token", async (req, res) => {
  const { token } = req.params;

  const user = await db.get(
    "SELECT * FROM users WHERE verification_token = ?",
    token
  );

  if (!user) {
    return res.status(403).json({ error: "Token invalide" });
  }

  await db.run(
    "UPDATE users SET verified = 1, verification_token = NULL WHERE id = ?",
    user.id
  );

  res.json({ message: "Email vérifié !" });
});

/* ======================
   LOGIN + MIGRATION
====================== */
router.post("/login", async (req, res) => {
  const { email, password, localHistory } = req.body;

  const user = await db.get(
    "SELECT * FROM users WHERE email = ?",
    email
  );

  if (!user) {
    return res.status(400).json({ error: "Utilisateur inconnu" });
  }

  if (!comparePassword(password, user.password)) {
    return res.status(400).json({ error: "Mot de passe incorrect" });
  }

  if (!user.verified) {
    return res.status(400).json({ error: "Compte non vérifié" });
  }

  // 🔑 Génération du token
  const token = jwt.sign({ id: user.id }, JWT_SECRET, {
    expiresIn: "7d",
  });

  /* ======================
     MIGRATION HISTORIQUE
  ====================== */
  if (Array.isArray(localHistory) && localHistory.length > 0) {
    for (const item of localHistory) {
      // sécurité minimale
      if (
        typeof item.bmi !== "number" ||
        typeof item.category !== "string" ||
        typeof item.date !== "string"
      ) {
        continue;
      }

      await db.run(
        "INSERT INTO history (user_id, bmi, category, date) VALUES (?, ?, ?, ?)",
        user.id,
        item.bmi,
        item.category,
        item.date
      );
    }
  }

  res.json({ token });
});

/* ======================
   REGISTER (AUCUNE MIGRATION ICI)
====================== */
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Champs manquants" });
  }

  const verificationToken = generateToken();
  const hashedPassword = hashPassword(password);

  try {
    await db.run(
      "INSERT INTO users (email, password, verification_token) VALUES (?, ?, ?)",
      email,
      hashedPassword,
      verificationToken
    );

    sendVerificationEmail(email, verificationToken);

    res.status(201).json({
      message: "Compte créé ! Vérifie tes emails.",
    });
  } catch {
    res.status(400).json({ error: "Email déjà utilisé" });
  }
});

export default router;
