import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { saveLocalHistoryForUser } from "../services/localHistory.service";

export async function register(req: Request, res: Response) {
  try {
    const { email, password, keepLocalData, localHistory } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Champs manquants" });
    }

    const db = global.db;

    const existingUser = await db.get(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );

    if (existingUser) {
      return res.status(409).json({ error: "Email déjà utilisé" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.run(
      `
      INSERT INTO users (email, password, email_verified)
      VALUES (?, ?, ?)
      `,
      [email, hashedPassword, false]
    );

    const userId = result.lastID;

    if (keepLocalData === true && Array.isArray(localHistory)) {
      await saveLocalHistoryForUser(userId, localHistory);
    }

    return res.status(201).json({
      message: "Compte créé. Vérifiez votre email.",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erreur serveur" });
  }
}
