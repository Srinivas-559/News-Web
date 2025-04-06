import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  IconButton,
  TextField,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CommentIcon from "@mui/icons-material/Comment";
import { useAuth } from "../../context/AuthContext";
import { io } from "socket.io-client";

const socket = io("http://localhost:5005");

const ArticleDialog = ({ open, article, onClose }) => {
  const { user } = useAuth();
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState("");
  const [likeCount, setLikeCount] = useState(0);
  const [comments, setComments] = useState([]);

  // Initialize state when article changes
  useEffect(() => {
    if (article) {
      setLiked(article.isLiked || false);
      setLikeCount(article.likeCount || 0);
      setComments(article.comments || []);
    }
  }, [article]);

  // Socket.io listeners
  useEffect(() => {
    const handleArticleLiked = ({ articleId, likes, isLiked }) => {
      if (article && articleId === article._id) {
        setLikeCount(likes);
        setLiked(isLiked);
      }
    };

    const handleArticleCommented = ({ articleId, comment }) => {
      if (article && articleId === article._id) {
        setComments(prev => [...prev, comment]);
      }
    };

    socket.on("articleLiked", handleArticleLiked);
    socket.on("articleCommented", handleArticleCommented);

    return () => {
      socket.off("articleLiked", handleArticleLiked);
      socket.off("articleCommented", handleArticleCommented);
    };
  }, [article]);

  const handleLike = async () => {
    if (!user) return;
    
    try {
      // Optimistic UI update
      const newLikedStatus = !liked;
      setLiked(newLikedStatus);
      setLikeCount(prev => newLikedStatus ? prev + 1 : prev - 1);

      const response = await axios.post(
        `http://localhost:5005/api/articles/${article._id}/like`,
        {},
        { withCredentials: true }
      );

      // Verify response and update state accordingly
      if (response.data && typeof response.data.likes !== 'undefined') {
        const isCurrentlyLiked = response.data.message === 'Article liked';
        setLiked(isCurrentlyLiked);
        setLikeCount(response.data.likes);
      }
    } catch (error) {
      console.error("Error liking/unliking article:", error);
      // Revert optimistic update if error occurs
      setLiked(prev => !prev);
      setLikeCount(prev => liked ? prev - 1 : prev + 1);
    }
  };

  const handleCommentSubmit = async () => {
    if (!comment.trim() || !user) return;

    try {
      await axios.post(
        `http://localhost:5005/api/articles/${article._id}/comment`,
        { content: comment },
        { withCredentials: true }
      );
      setComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
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
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-xs rounded-full text-gray-600"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4 mb-4">
          <IconButton 
            onClick={handleLike} 
            color={liked ? "primary" : "default"}
            disabled={!user}
            aria-label={liked ? "Unlike article" : "Like article"}
          >
            {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
          <span>{likeCount} Likes</span>
          <IconButton 
            onClick={() => document.getElementById("comment-input")?.focus()}
            aria-label="Comment on article"
          >
            <CommentIcon />
          </IconButton>
          <span>{comments?.length || 0} Comments</span>
        </div>

        <div className="mt-4">
          <h4 className="font-semibold">Comments:</h4>
          <div className="flex flex-col gap-2 max-h-40 overflow-y-auto mb-4">
            {comments.map((comment, index) => (
              <div key={index} className="bg-gray-100 p-2 rounded-lg">
                <strong>{comment.user?.name}:</strong>
                <p className="text-sm text-gray-800">{comment.content}</p>
                <span className="text-xs text-gray-500">
                  {new Date(comment.date).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {user && (
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
                if (e.key === "Enter") handleCommentSubmit();
              }}
              aria-label="Comment input field"
            />
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleCommentSubmit}
              disabled={!comment.trim()}
              aria-label="Post comment"
            >
              Post
            </Button>
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" aria-label="Close dialog">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ArticleDialog;