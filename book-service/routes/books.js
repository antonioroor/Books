const { Router } = require('express');
const { check } = require('express-validator');
const { findAllBooks, findBook, createBook, updateBook, deleteBook } = require('../controllers/books');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

router.get('/', [validateFields], findAllBooks);

router.get('/:id', [validateFields], findBook);

router.post('/', [
    check('title', 'El título es obligatorio').not().isEmpty(),
    check('editorial', 'La editorial es obligatoria').not().isEmpty(),
    check('category', 'La categoría es obligatoria').not().isEmpty(),
    check('year', 'El año es obligatorio').not().isEmpty(),
    validateFields], createBook);

router.put('/:id', [
    check('title', 'El título es obligatorio').not().isEmpty(),
    check('editorial', 'La editorial es obligatoria').not().isEmpty(),
    check('category', 'La categoría es obligatoria').not().isEmpty(),
    check('year', 'El año es obligatorio').not().isEmpty(),
    validateFields], updateBook);

router.delete('/:id', [validateFields], deleteBook);


module.exports = router;