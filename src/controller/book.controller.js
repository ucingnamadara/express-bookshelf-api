const { nanoid } = require('nanoid');
const books = require('../model/book');

const post = (req, res) => {
  // extract json body from request
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = req.body;

  // generate id
  const id = nanoid(16);
  // get current date
  const insertedAt = new Date().toISOString();
  // set updated at
  const updatedAt = insertedAt;
  // set finished flag by condition
  const finished = pageCount === readPage;

  // name is required
  if (name === null || name === undefined) {
    // return bad reqyest and json
    res.status(400).json({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
  } else if (readPage > pageCount) {
    // return bad reqyest and json
    res.status(400).json({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
  } else {
    // create new object
    const newBook = {
      id,
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished,
      reading,
      insertedAt,
      updatedAt,
    };

    // persist to database
    books.push(newBook);

    // return response CREATED and return json
    res.status(201).json({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
  }
};

const list = (req, res) => {
  const { name, finished, reading } = req.query;

  const data = [];

  let temp = books.slice(0);

  if (name !== undefined) {
    temp = temp.filter((s) => s.name.match(name));
  }

  if (finished !== undefined) {
    temp = temp.filter((s) => s.finished === Boolean(finished));
  }

  if (reading !== undefined) {
    temp = temp.filter((s) => s.reading === Boolean(reading));
  }

  temp.forEach((book) => {
    const { id, name: bookName, publisher } = book;
    data.push({ id, book: bookName, publisher });
  });
  res.status(200).json({
    status: 'success',
    data: {
      books: data,
    },
  });
};

const getById = (req, res) => {
  // get book id from path parameter
  const { bookId } = req.params;

  const book = books.filter((s) => s.id === bookId)[0];

  // return NOT FOUND if book is null
  if (book === null || book === undefined) {
    res.status(404).json({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    });
  } else {
    res.status(200).json({
      status: 'success',
      data: {
        book,
      },
    });
  }
};

const updateById = (req, res) => {
  const { bookId } = req.params;
  // extract json body from request
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = req.body;

  const index = books.findIndex((s) => s.id === bookId);

  // set updated at
  const updatedAt = new Date().toISOString();
  // set finished flag by condition
  const finished = pageCount === readPage;

  // return NOT FOUND if book is null
  if (index === -1) {
    res.status(404).json({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });
  } else if (name === null || name === undefined) {
    // return bad reqyest and json
    res.status(400).json(
      {
        status: 'fail',
        message: 'Gagal memperbarui buku. Mohon isi nama buku',
      },
    );
  } else if (readPage > pageCount) {
    // return bad reqyest and json
    res.status(400).json({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
  } else {
    // update to database
    books[index] = {
      id: bookId,
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished,
      reading,
      insertedAt: books[index].insertedAt,
      updatedAt,
    };

    // return response OK and return json
    res.status(200).json({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
  }
};

const deleteById = (req, res) => {
  const { bookId } = req.params;

  const index = books.findIndex((s) => s.id === bookId);

  // return NOT FOUND if book is null
  if (index === -1) {
    res.status(404).json({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan',
    });
  } else {
    // delete to database
    books.splice(index, 1);
    // return response OK and return json
    res.status(200).json({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
  }
};

module.exports = {
  post, list, getById, updateById, deleteById,
};
