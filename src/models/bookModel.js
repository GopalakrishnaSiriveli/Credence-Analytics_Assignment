// src/models/bookModel.js
const db = require('../database/database');

const getAllBooks = (callback) => {
  db.all("SELECT * FROM books", [], (err, rows) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, rows);
    }
  });
};

const getBookById = (id, callback) => {
  db.get("SELECT * FROM books WHERE id = ?", [id], (err, row) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, row);
    }
  });
};

const createBook = (book, callback) => {
  const { name, img, summary } = book;
  db.run("INSERT INTO books (name, img, summary) VALUES (?, ?, ?)", [name, img, summary], function (err) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, { id: this.lastID });
    }
  });
};

const updateBook = (id, book, callback) => {
  const { name, img, summary } = book;
  db.run("UPDATE books SET name = ?, img = ?, summary = ? WHERE id = ?", [name, img, summary, id], function (err) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, { changes: this.changes });
    }
  });
};

const deleteBook = (id, callback) => {
  db.run("DELETE FROM books WHERE id = ?", [id], function (err) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, { changes: this.changes });
    }
  });
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
};
