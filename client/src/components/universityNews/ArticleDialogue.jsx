import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, IconButton, TextField } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CommentIcon from "@mui/icons-material/Comment";
import { useAuth } from '../../context/AuthContext';
import { io } from "socket.io-client";

const socket = io("http://localhost:5005");

const ArticleDialog = ({ open, article, onClose, onLike, onComment }) => {
  const { user } = useAuth();
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState("");
  const [likeCount, setLikeCount] = useState(article?.likes?.length || 0);

  useEffect(() => {
    if (article && user) {
      setLiked(article.likes.includes(user._id));
      setLikeCount(article.likes.length);
    }
  }, [article, user]);

  // Listen for real-time updates
  useEffect(() => {
    const handleArticleLiked = ({ articleId, likes }) => {
      if (articleId === article._id) {
        setLikeCount(likes.length);
        setLiked(likes.includes(user._id));
      }
    };

    socket.on("articleLiked", handleArticleLiked);

    return () => {
      socket.off("articleLiked", handleArticleLiked);
    };
  }, [article, user]);

  // Optimistically update UI on like
  const handleLike = async () => {
    try {
      const newLikedStatus = !liked;
      setLiked(newLikedStatus);
      setLikeCount((prev) => (newLikedStatus ? prev + 1 : prev - 1));

      await axios.post(
        `http://localhost:5005/api/articles/${article._id}/like`,
        {},
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Error liking/unliking article:", error);
      // Revert state if API call fails
      setLiked(!liked);
      setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
    }
  };

  const handleCommentSubmit = async () => {
    if (comment.trim()) {
      try {
        const response = await axios.post(
          `http://localhost:5005/api/articles/${article._id}/comment`,
          { content: comment },
          { withCredentials: true }
        );
        setComment("");
        if (onComment) onComment(response.data);
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>{article?.title}</DialogTitle>
      <DialogContent>
        <img
          src={article?.image}
          alt={article?.title}
          className="w-full h-60 object-cover rounded-lg mb-4"
        />
        <p className="text-sm text-gray-600 mb-4">{article?.content}</p>
        <div className="mt-4">
          <h4 className="font-semibold">Tags:</h4>
          <div className="flex flex-wrap gap-2 mb-4">
            {article?.tags?.map((tag, index) => (
              <span key={index} className="px-2 py-1 bg-gray-100 text-xs rounded-full text-gray-600">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4 mb-4">
          <IconButton onClick={handleLike} color={liked ? "primary" : "default"}>
            {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
          <span>{likeCount} Likes</span>
          <IconButton onClick={() => document.getElementById('comment-input')?.focus()}>
            <CommentIcon />
          </IconButton>
          <span>{article?.comments?.length || 0} Comments</span>
        </div>

        <div className="mt-4">
          <h4 className="font-semibold">Comments:</h4>
          <div className="flex flex-col gap-2 max-h-40 overflow-y-auto mb-4">
            {article?.comments?.map((comment, index) => (
              <div key={index} className="bg-gray-100 p-2 rounded-lg">
                <strong>{comment.user?.name}:</strong>
                <p className="text-sm text-gray-800">{comment.content}</p>
                <span className="text-xs text-gray-500">{new Date(comment.date).toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <TextField
            id="comment-input"
            label="Add a comment"
            variant="outlined"
            size="small"
            fullWidth
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') handleCommentSubmit();
            }}
          />
          <Button variant="contained" color="primary" onClick={handleCommentSubmit}>
            Post
          </Button>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ArticleDialog;
