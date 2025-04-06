const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    date: { type: Date, default: Date.now },
}, { _id: false });

const articleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    tags: [String],
    views: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false },
    comments: [commentSchema],
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtual for like count
articleSchema.virtual('likeCount', {
    ref: 'UserActivity',
    localField: '_id',
    foreignField: 'articleId',
    match: { type: 'like' },
    count: true
});

// Virtual to check if current user liked the article (requires population)
articleSchema.virtual('isLiked', {
    ref: 'UserActivity',
    localField: '_id',
    foreignField: 'articleId',
    match: function() {
        return { type: 'like', userId: this._conditions.userId };
    },
    justOne: true
});

module.exports = mongoose.models.Article || mongoose.model('Article', articleSchema);