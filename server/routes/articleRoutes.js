const express = require('express');
const {
    addArticle,
    deleteArticle,
    getArticles,
    saveArticle,
    likeArticle,
    addComment,
    editArticle
} = require('../controllers/articleController');
const { protect, isAdmin } = require('../middleware/authMiddleware');
const router = express.Router();

// router.post('/add', protect, isAdmin, addArticle);
router.get('/getArticles', protect, getArticles);
router.post('/addArticle',protect, isAdmin ,addArticle);
router.delete('/deleteArticle/:id', protect, isAdmin, deleteArticle);
router.post('/save/:articleId', protect, saveArticle);
router.post('/:articleId/like', protect, likeArticle);
router.post('/:articleId/comment', protect, addComment);
router.put('/editArticle/:id', protect, isAdmin, editArticle);


module.exports = router;
