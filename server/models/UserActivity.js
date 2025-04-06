const mongoose = require('mongoose');

const userActivitySchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    articleId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Article', 
        required: true 
    },
    type: { 
        type: String, 
        enum: ['like', 'save'], 
        required: true 
    },
}, { timestamps: true });

// Compound index to prevent duplicate likes/saves
userActivitySchema.index({ userId: 1, articleId: 1, type: 1 }, { unique: true });

module.exports = mongoose.models.UserActivity || mongoose.model('UserActivity', userActivitySchema);