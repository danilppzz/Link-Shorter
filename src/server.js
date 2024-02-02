import Express from "express";
import { searchLink, searchAllLink } from "./sqlite3.js";
import { links } from "./router/shorter.js";

import * as url from "node:url";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const app = Express();

app.use("/", links);

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.get("/", async (req, res) => {
  const url = req.query.l;
  res.render("page", { objects: { url: url } });
});

app.get("/s/:redirect", async (req, res) => {
  const redirect = req.params.redirect;
  const url = await searchLink(redirect);
  res.redirect(url);
});

app.get("/all", async (req, res) => {
  res.send(await searchAllLink());
});

app.listen(3000, () => {
  console.log("http://localhost:3000/");
});
