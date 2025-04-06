const Article = require('../models/Article');
const UserActivity = require('../models/UserActivity');
const User = require('../models/User');

// GET all articles with filters, like count, isLiked, and populated comments
exports.getArticles = async (req, res) => {
    try {
        const filter = {};
        if (req.query.category) filter.category = req.query.category;
        if (req.query.username) filter.author = req.query.username;

        const userId = req.user?.id;

        const articles = await Article.find(filter)
            .populate({
                path: 'comments',
                populate: { path: 'user', select: 'name' }
            })
            .populate('likeCount')
            .populate({
                path: 'isLiked',
                match: { type: 'like', userId },
                select: '_id'
            });

        res.status(200).json({ articles });
    } catch (error) {
        res.status(400).json({ message: 'Error fetching articles', error });
    }
};

// ADD new article
exports.addArticle = async (req, res) => {
    try {
        const article = await Article.create(req.body);
        const io = req.app.get('io');
        io.emit('articleAdded', article);
        res.status(201).json({ message: 'Article added successfully', article });
    } catch (error) {
        res.status(400).json({ message: 'Error adding article', error });
    }
};

// EDIT article
exports.editArticle = async (req, res) => {
    try {
        const { title, content, category, tags, image } = req.body;
        const updatedArticle = await Article.findByIdAndUpdate(
            req.params.id,
            { title, content, category, tags, image },
            { new: true }
        );

        if (!updatedArticle) {
            return res.status(404).json({ message: 'Article not found' });
        }

        const io = req.app.get('io');
        io.emit('articleUpdated', updatedArticle);
        res.status(200).json({ message: 'Article updated successfully', article: updatedArticle });
    } catch (error) {
        res.status(500).json({ message: 'Error updating article', error });
    }
};

// DELETE article
exports.deleteArticle = async (req, res) => {
    try {
        const deletedArticle = await Article.findByIdAndDelete(req.params.id);
        if (!deletedArticle) {
            return res.status(404).json({ message: 'Article not found' });
        }

        const io = req.app.get('io');
        io.emit('articleDeleted', req.params.id);
        res.status(200).json({ message: 'Article deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting article', error });
    }
};

// LIKE / UNLIKE article
exports.likeArticle = async (req, res) => {
    try {
        const userId = req.user.id;
        const articleId = req.params.articleId;

        const existing = await UserActivity.findOne({
            userId,
            articleId,
            type: 'like'
        });

        let message = '';
        if (existing) {
            await existing.deleteOne();
            message = 'Article unliked';
        } else {
            await UserActivity.create({
                userId,
                articleId,
                type: 'like'
            });
            message = 'Article liked';
        }

        const likeCount = await UserActivity.countDocuments({
            articleId,
            type: 'like'
        });

        const io = req.app.get('io');
        io.emit('articleLiked', { articleId, likes: likeCount });

        res.status(200).json({ message, likes: likeCount });
    } catch (error) {
        res.status(400).json({ message: 'Error liking/unliking article', error });
    }
};

// SAVE article
exports.saveArticle = async (req, res) => {
    try {
        const userId = req.user.id;
        const articleId = req.params.articleId;

        const existing = await UserActivity.findOne({
            userId,
            articleId,
            type: 'save'
        });

        if (existing) {
            return res.status(200).json({ message: 'Article already saved' });
        }

        await UserActivity.create({
            userId,
            articleId,
            type: 'save'
        });

        res.status(200).json({ message: 'Article saved successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error saving article', error });
    }
};

// ADD comment to article
exports.addComment = async (req, res) => {
    try {
        const article = await Article.findById(req.params.articleId);
        const newComment = { user: req.user.id, content: req.body.content };
        article.comments.push(newComment);
        await article.save();

        await article.populate('comments.user', 'name');
        const populatedComment = article.comments[article.comments.length - 1];

        const io = req.app.get('io');
        io.emit('articleCommented', {
            articleId: article._id,
            comment: populatedComment
        });

        res.status(200).json({
            message: 'Comment added',
            comment: populatedComment
        });
    } catch (error) {
        res.status(400).json({
            message: 'Error adding comment',
            error
        });
    }
};

// GET saved articles for logged-in user
exports.getSavedArticles = async (req, res) => {
    try {
        const savedActivities = await UserActivity.find({
            userId: req.user.id,
            type: 'save'
        }).select('articleId');

        const articleIds = savedActivities.map(a => a.articleId);

        const articles = await Article.find({ _id: { $in: articleIds } })
            .populate('likeCount')
            .populate({
                path: 'isLiked',
                match: { type: 'like', userId: req.user.id },
                select: '_id'
            });

        res.status(200).json({ articles });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching saved articles', error });
    }
};
