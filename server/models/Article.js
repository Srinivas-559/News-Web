const mongoose = require('mongoose');

// Comment Schema for nested comments
const commentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    date: { type: Date, default: Date.now },
}, {
    _id: false
});

// Article Schema
const articleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    date: { type: Date, default: Date.now },
    content: { type: String, required: true },
    author: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    tags: [String],
    views: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    comments: [commentSchema],
}, {
    timestamps: true
});

// Export the Article model
module.exports = mongoose.models.Article || mongoose.model('Article', articleSchema);
