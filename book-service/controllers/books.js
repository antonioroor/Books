const { response } = require("express");
const Book = require("../models/book");
const errorCodes = require("../utils/errorCodes");

/**
 * Obtener todos los libros.
 * El return no es necesario en cualquier método de respuesta de Express (res.json, res.status), 
 * ya que estos metodos terminan la ejecución de la función, pero puede ser una buena práctica
 * para evitar que se ejecute cualquier código adicional después de la respuesta.
 */
const findAllBooks = async (req, res = response) => {
  try {
    const books = await Book.find();

    return res.json(books); 

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      code: errorCodes.ERR500.code,
      msg: errorCodes.ERR500.msg,
    });
  }
};

/**
 * Obtener libro por el id
 */
const findBook = async (req, res = response) => {
  const id = req.params.id; // id del libro

  try {
    const book = await Book.findById(id);
    
    if (!book) {
      return res.status(404).json({
        ok: false,
        code: errorCodes.ERR404.code,
        msg: errorCodes.ERR404.msg,
      });
    }

    return res.json(book);

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      code: errorCodes.ERR500.code,
      msg: errorCodes.ERR500.msg,
    });
  }
};

/**
 * Crear libro
 */
const createBook = async (req, res = response) => {
  try {
    const book = new Book({
      ...req.body,
    });

    // Guardado en la BD
    await book.save();

    return res.json(book);

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      code: errorCodes.ERR500.code,
      msg: errorCodes.ERR500.msg,
    });
  }
};

/**
 * Actualizar libro
 */
const updateBook = async (req, res = response) => {
  const id = req.params.id; // id del libro

  const currentBook = {
    ...req.body,
  };
  try {
    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({
        ok: false,
        code: errorCodes.ERR404.code,
        msg: errorCodes.ERR404.msg,
      });
    }
    const updatedBook = await Book.findByIdAndUpdate(id, currentBook, {
      new: true,
    });

    return res.json(book);

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      code: errorCodes.ERR500.code,
      msg: errorCodes.ERR500.msg,
    });
  }
};

/**
 * Eliminar libro
 */
const deleteBook = async (req, res = response) => {
  const id = req.params.id; // id del libro

  try {
    const book = await Book.findById(id);

    // Se comprueba si existe el libro
    if (!book) {
      return res.status(404).json({
        ok: false,
        code: errorCodes.ERR404.code,
        msg: errorCodes.ERR404.msg,
      });
    }
    // Se elimina el libro
    await Book.findByIdAndDelete(id);

    return res.json({
      ok: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      code: errorCodes.ERR500.code,
      msg: errorCodes.ERR500.msg,
    });
  }
};

module.exports = {
  findAllBooks,
  findBook,
  updateBook,
  createBook,
  deleteBook,
};
