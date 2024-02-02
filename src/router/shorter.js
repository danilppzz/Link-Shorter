import Express from "express";
import { insertLink } from "../sqlite3.js";

const router = Express();

router.post("/links", async (req, res) => {
  const url = req.query.l;
  res.redirect(`/?l=${"http://localhost:3000/s/"+await insertLink(url)}`);
});

export { router as links };
