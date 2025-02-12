const Article = require('../models/Article');
const User = require('../models/User');


// Route to delete an article



exports.getArticles = async (req, res) => {
    try {
        const filter = {};
        if (req.query.category) {
            filter.category = req.query.category;
        }
        if (req.query.username) {
            filter.author = req.query.username;
        }

        // Fetch articles and populate the `comments.user` field
        const articles = await Article.find(filter)
            .populate({
                path: 'comments', // Path to the comments array
                populate: {
                    path: 'user', // Populate the `user` reference in each comment
                    select: 'name', // Include only the `name` field of the user
                },
            });

        res.status(200).json({ articles });
    } catch (error) {
        res.status(400).json({ message: 'Error fetching articles', error });
    }
};


exports.saveArticle = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        user.savedArticles.push(req.params.articleId);
        await user.save();
        res.status(200).json({ message: 'Article saved' });
    } catch (error) {
        res.status(400).json({ message: 'Error saving article', error });
    }
};
exports.likeArticle = async (req, res) => {
    try {
        const article = await Article.findById(req.params.articleId);
        const userId = req.user.id;
        
        let message = '';
        if (article.likes.includes(userId)) {
            // Unlike article
            article.likes = article.likes.filter(id => id.toString() !== userId);
            message = 'Article unliked';
        } else {
            // Like article
            article.likes.push(userId);
            message = 'Article liked';
        }

        await article.save();

        // Emit the like update event
        const io = req.app.get('io');
        io.emit('articleLiked', { articleId: article._id, likes: article.likes.length });

        res.status(200).json({ message, likes: article.likes.length });
    } catch (error) {
        res.status(400).json({ message: 'Error liking/unliking article', error });
    }
};

exports.addComment = async (req, res) => {
    try {
        const article = await Article.findById(req.params.articleId);
        const newComment = { user: req.user.id, content: req.body.content };

        article.comments.push(newComment);
        await article.save();

        // Populate the user info for the emitted event
        await article.populate('comments.user', 'name');

        // Emit the comment update event
        const io = req.app.get('io');
        io.emit('articleCommented', { articleId: article._id, comment: newComment });

        res.status(200).json({ message: 'Comment added', comment: newComment });
    } catch (error) {
        res.status(400).json({ message: 'Error adding comment', error });
    }
};


// Route to edit an article
exports.addArticle = async (req, res) => {
    try {
        const article = await Article.create(req.body);
        const io = req.app.get('io'); // Access the Socket.IO instance
        io.emit('articleAdded', article); // Emit event to all clients
        res.status(201).json({ message: 'Article added successfully', article });
    } catch (error) {
        res.status(400).json({ message: 'Error adding article', error });
    }
};

exports.deleteArticle = async (req, res) => {
    try {
        const deletedArticle = await Article.findByIdAndDelete(req.params.id);
        if (!deletedArticle) {
            return res.status(404).json({ message: 'Article not found' });
        }
        const io = req.app.get('io');
        io.emit('articleDeleted', req.params.id); // Emit event with the deleted article ID
        res.status(200).json({ message: 'Article deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting article', error });
    }
};

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
        io.emit('articleUpdated', updatedArticle); // Emit event with the updated article
        res.status(200).json({ message: 'Article updated successfully', article: updatedArticle });
    } catch (error) {
        res.status(500).json({ message: 'Error updating article', error });
    }
};


