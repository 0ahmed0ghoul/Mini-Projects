const express = require('express');
const { identifier } = require('../middlewares/idetification');
const postsController =require('../controllers/postsController')
const router = express.Router();

router.get('/all-posts',postsController.getPosts)
router.get('/single-post',postsController.getSinglePost)
router.post('/create-post',identifier,postsController.createPost)
router.put('/update-post',identifier,postsController.UpdatePost)
router.delete('/delete-post',identifier,postsController.deletePost)

module.exports = router;