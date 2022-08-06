const { nanoid } = require('nanoid');
const books = require('./books');

const addBookHandler = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  const id = nanoid(16);
  const finished = pageCount === readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  if (!name) {
    return h
      .response({
        status: 'fail',
        message: 'Gagal menambahkan buku. Mohon isi nama buku',
      })
      .code(400);
  }

  if (readPage > pageCount) {
    return h
      .response({
        status: 'fail',
        message:
          'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
      })
      .code(400);
  }

  const book = {
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

  const booklength = books.length;
  books.push(book);

  if (booklength === books.length) {
    return h
      .response({
        status: 'error',
        message: 'Buku gagal ditambahkan',
      })
      .code(500);
  }

  return h

    .response({
      status: 'success',
      data: {
        bookId: id,
      },
      message: 'Buku berhasil ditambahkan',
    })
    .code(201);
};

const getAllBooksHandler = (request, h) => h
  .response({
    status: 'success',
    data: {
      books: books.map(({ id, name, publisher }) => ({
        id,
        name,
        publisher,
      })),
    },
  })
  .code(200);

const getDetailBookHandler = (request, h) => {
  const { bookId } = request.params;
  const book = books.find(({ id }) => id === bookId);

  if (!book) {
    return h
      .response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
      })
      .code(404);
  }

  return h
    .response({
      status: 'success',
      data: {
        book,
      },
    })
    .code(200);
};

const editBookHandler = (request, h) => {
  const { bookId } = request.params;
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  if (!name) {
    return h
      .response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Mohon isi nama buku',
      })
      .code(400);
  }

  if (readPage > pageCount) {
    return h

      .response({
        status: 'fail',
        message:
          'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
      })
      .code(400);
  }

  const bookIndex = books.findIndex(({ id }) => id === bookId);

  if (bookIndex === -1) {
    return h
      .response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan',
      })
      .code(404);
  }

  if (readPage > pageCount) {
    return h
      .response({
        status: 'fail',
        message:
          'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
      })
      .code(400);
  }

  const finished = pageCount === readPage;
  const updatedAt = new Date().toISOString();

  const book = {
    ...books[bookIndex],
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
    updatedAt,
  };

  books[bookIndex] = book;

  return h
    .response({
      status: 'success',
      data: {
        book,
      },
      message: 'Buku berhasil diperbarui',
    })
    .code(200);
};

module.exports = {
  addBookHandler,
  getAllBooksHandler,
  getDetailBookHandler,
  editBookHandler,
};
