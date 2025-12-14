import express from "express";
import db from "../database/index.js";

const router = express.Router();

router.get("/emails", (req, res) => {
    console.log("GET /users/emails appelé");
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
