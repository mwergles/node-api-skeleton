const express = require('express')
const router = express.Router()
const asyncHandler = require('express-async-handler')
const { check } = require('express-validator/check')
const validator = require('../middlewares/validator')
const PostsController = require('../controllers/postsController')

router.get('/', asyncHandler(PostsController.listPosts))
router.get('/:id',
  [
    check('id').trim().isNumeric().withMessage('Invalid id')
  ],
  validator,
  asyncHandler(PostsController.getPost)
)

module.exports = router
