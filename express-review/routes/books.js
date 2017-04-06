const express = require('express')
const router = express.Router()

const Book = require('../models/book')
const Chapter = require('../models/chapter')

module.exports = router

router
.get('/', (req, res, next) => {
  let query = {}
  if (req.query.title){
    query.where = { title: req.query.title }
  }
  Book.findAll(query)
  .then((books) => {
    res.send(books)
  })
  .catch(next)
})

.post('/', (req, res, next) => {
  Book.create(req.body)
  .then((newBook) => {
    res.status(201).send(newBook)
  })
})

.param('id', (req, res, next, id) => {
  Book.findById(id)
  .then((foundBook) => {
    if (!foundBook) res.sendStatus(404)
    else {
      req.bookById = foundBook
      next()
    }
  })
  .catch(next)
})

.get('/:id', (req, res, next) => {
    res.send(req.bookById)
})

.put('/:id', (req, res, next) => {
  req.bookById.update(req.body, { returning: true })
  .then((updatedBook) => {
    res.send(updatedBook)
  })
  .catch(next)
})

.delete('/:id', (req, res, next) => {
  req.bookById.destroy()
  .then(() => {
    res.sendStatus(204)
  })
  .catch(next)
})

.get('/:id/chapters', (req, res, next) => {
  req.bookById.getChapters()
  .then(chapters => res.send(chapters))
  .catch(next)
})

.post('/:id/chapters', (req, res, next) => {
  req.body.bookId = req.params.id
  Chapter.create(req.body, { returning: true })
  .then(newChapter => res.status(201).send(newChapter))
  .catch(next)
})

.param('chapter', (req, res, next, chapterId) => {
  Chapter.findById(chapterId)
  .then(chapter => {
    if (!chapter) res.sendStatus(404)
    else {
      req.chapterById = chapter
      next()
    }
  })
  .catch(next)
})

.get('/:id/chapters/:chapter', (req, res, next) => {
  res.send(req.chapterById)
})

.put('/:id/chapters/:chapter', (req, res, next) => {
  req.chapterById.update(req.body, { returning: true })
  .then(updatedChapter => res.send(updatedChapter))
  .catch(next)
})

.delete('/:id/chapters/:chapter', (req, res, next) => {
  req.bookById.removeChapter(req.chapterById)
  .then(() => req.chapterById.destroy())
  .then(() => res.sendStatus(204))
  .catch(next)
})
