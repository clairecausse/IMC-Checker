import express from "express";
import db from "../database/index.js";
import { hashPassword, comparePassword } from "../utils/hash.js";
import { generateToken } from "../utils/token.js";
import jwt from "jsonwebtoken";
import { sendVerificationEmail } from "../utils/email.js";

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  const token = generateToken();
  const hashed = hashPassword(password);

  try {
    await db.run(
      "INSERT INTO users (email, password, verification_token) VALUES (?, ?, ?)",
      email,
      hashed,
      token
    );
  } catch (e) {
    return res.status(400).json({ error: "Email déjà utilisé" });
  }

  sendVerificationEmail(email, token);
  res.json({ message: "Compte créé ! Vérifie tes emails." });
});

// VERIFY EMAIL
router.get("/verify/:token", async (req, res) => {
  const { token } = req.params;

  const user = await db.get(
    "SELECT * FROM users WHERE verification_token = ?",
    token
  );

  if (!user) return res.status(400).json({ error: "Token invalide" });

  await db.run(
    "UPDATE users SET verified = 1, verification_token = NULL WHERE id = ?",
    user.id
  );

  res.json({ message: "Email vérifié !" });
});

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await db.get(
    "SELECT * FROM users WHERE email = ?",
    email
  );

  if (!user) return res.status(400).json({ error: "Utilisateur inconnu" });

  if (!comparePassword(password, user.password))
    return res.status(400).json({ error: "Mot de passe incorrect" });

  if (!user.verified)
    return res.status(400).json({ error: "Compte non vérifié" });

  const token = jwt.sign({ id: user.id }, "secret", { expiresIn: "7d" });

  res.json({ token });
});

export default router;
