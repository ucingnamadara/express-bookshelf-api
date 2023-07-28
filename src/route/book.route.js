const express = require('express');

const bookController = require('../controller/book.controller');

const router = express.Router();

// create new book
router.post('/books', bookController.post);
router.get('/books', bookController.list);
router.get('/books/:bookId', bookController.getById);
router.put('/books/:bookId', bookController.updateById);
router.delete('/books/:bookId', bookController.deleteById);

module.exports = router;
