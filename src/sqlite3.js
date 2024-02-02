import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./data.db", sqlite3.OPEN_READWRITE, (err) => {
  if (err) console.error(err.message);
});

function guid(l) {
  const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let uniqueId = "";

  for (let i = 0; i < l; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    uniqueId += characters.charAt(randomIndex);
  }

  return uniqueId;
}

function createTable() {
  db.run(`CREATE TABLE links(id TEXT PRIMARY KEY, name, url)`);
}

export async function insertLink(url) {
  return new Promise((resolve, reject) => {
    const code = guid(10);
    db.run(`INSERT INTO links(id, name, url) VALUES (?,?,?)`, [code, null, url], function (err) {
      if (err) {
        reject(err.message);
      } else {
        resolve(code);
      }
    });
  });
}

export async function searchLink(redirect) {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM links WHERE id = ?`, [redirect], (err, rows) => {
      if (err) {
        reject("Redirect ID not found!");
      } else {
        resolve(rows[0].url);
      }
    });
  });
}

export async function removeLink(redirect) {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM links WHERE id = ?`, [redirect], (err, rows) => {
      if (err) {
        reject("Redirect ID not found!");
      } else {
        resolve(rows[0].url);
      }
    });
  });
}

export async function searchAllLink() {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM links`, [], (err, rows) => {
      if (err) {
        reject("Not found!");
      } else {
        resolve({ rows });
      }
    });
  });
}
