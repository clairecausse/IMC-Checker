import express from "express";
import db from "../database/index.js";

const router = express.Router();

router.get("/emails", (req, res) => {
    db.all(
            "SELECT email FROM users",
            [],
    (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
      res.json(rows);
    }
  );
});

export default router;

// routes/users.js
router.put("/newsletter", authMiddleware, async (req, res) => {
  const userId = req.user.id;
  const { newsletter } = req.body;

  try {
    await db.run(
      "UPDATE users SET newsletter = ? WHERE id = ?",
      [newsletter ? 1 : 0, userId]
    );

    res.json({ success: true, newsletter });
  } catch (err) {
    res.status(500).json({ error: "Erreur mise à jour newsletter" });
  }
});
