// src/controllers/bookController.js
const bookModel = require('../models/bookModel');

const getAllBooks = (req, res) => {
  bookModel.getAllBooks((err, books) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(books);
    }
  });
};

const getBookById = (req, res) => {
  const id = req.params.id;
  bookModel.getBookById(id, (err, book) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (!book) {
      res.status(404).json({ error: "Book not found" });
    } else {
      res.json(book);
    }
  });
};

const createBook = (req, res) => {
  const newBook = req.body;
  bookModel.createBook(newBook, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json({ id: result.id });
    }
  });
};

const updateBook = (req, res) => {
  const id = req.params.id;
  const updatedBook = req.body;
  bookModel.updateBook(id, updatedBook, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (result.changes === 0) {
      res.status(404).json({ error: "Book not found" });
    } else {
      res.json({ message: "Book updated successfully" });
    }
  });
};

const deleteBook = (req, res) => {
  const id = req.params.id;
  bookModel.deleteBook(id, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (result.changes === 0) {
      res.status(404).json({ error: "Book not found" });
    } else {
      res.json({ message: "Book deleted successfully" });
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
