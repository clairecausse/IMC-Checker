import express from "express";
import db from "../database/index.js";
import { hashPassword, comparePassword } from "../utils/hash.js";
import { generateToken } from "../utils/token.js";
import jwt from "jsonwebtoken";
import { sendVerificationEmail } from "../utils/email.js";

const router = express.Router();
const JWT_SECRET = "secret";

/* ======================
   MIDDLEWARE AUTH
====================== */
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "Non authentifié" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // { id }
    next();
  } catch {
    return res.status(401).json({ error: "Token invalide" });
  }
}

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
   LOGIN
====================== */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

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

  const token = jwt.sign({ id: user.id }, JWT_SECRET, {
    expiresIn: "7d",
  });

  res.json({ token });
});

/* ======================
   REGISTER
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

/* ======================
   DELETE ACCOUNT
====================== */
router.delete("/me", authMiddleware, async (req, res) => {
  const userId = req.user.id;

  try {
    await db.run("DELETE FROM users WHERE id = ?", userId);
    res.json({ message: "Compte supprimé" });
  } catch {
    res.status(500).json({ error: "Erreur lors de la suppression du compte" });
  }
});

export default router;
