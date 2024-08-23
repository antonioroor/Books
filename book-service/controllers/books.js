const { response } = require('express');
const Book = require('../models/book');

/**
 * Obtener todos los libros
 */
const findAllBooks = async (req, res = response) => {
  try {
    const books = await Book.find();
    
    return res.json(books);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Se ha producido un error al obtener los libros'
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
        msg: 'Libro no encontrado'
      })
    }
    res.json(book);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Se ha producido un error al obtener el libro'
    });
  }
};

/**
 * Crear libro
 */
const createBook = async (req, res = response) => {
  try {
    const book = new Book({
      ...req.body
    });

    // Guardado en la BD
    await book.save();

    return res.json(book);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Se ha producido un error al crear el libro'
    });
  }
};

/**
* Actualizar libro
*/
const updateBook = async (req, res = response) => {

  const id = req.params.id; // id del libro

  const currentBook = {
    ...req.body
  }
  try {
    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({
        ok: false,
        msg: 'Libro no encontrado'
      });
    }
    const updatedBook = await Book.findByIdAndUpdate(id, currentBook, { new: true });

    return res.json(updatedBook);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Se ha producido un error al actualizar el libro'
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
        msg: 'El libro no existe en la BD'
      })
    }
    // Se elimina el libro
    await Book.findByIdAndDelete(id);

    res.json({ 
      ok: true
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error al eliminar el libro'
    })
  }
};


module.exports = {
  findAllBooks,
  findBook,
  updateBook,
  createBook,
  deleteBook
}