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
        error: 'Gagal menambahkan buku. Mohon isi nama buku',
      })
      .code(400);
  }

  if (readPage > pageCount) {
    return h
      .response({
        status: 'fail',
        error: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
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
        error: 'Buku gagal ditambahkan',
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

module.exports = { addBookHandler };
