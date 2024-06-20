/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Grid, Typography, TextField, Button } from '@mui/material';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import DeleteIcon from '@mui/icons-material/Delete';
import toast from 'react-hot-toast';
import SendIcon from '@mui/icons-material/Send';

const PostCardUser = () => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState({});
  const [viewingComments, setViewingComments] = useState(null);
  const [newComment, setNewComment] = useState({});
  const [, setNotification] = useState(null);
  const userInfoString = localStorage.getItem('UserInfo');
  const storedUserInfo = JSON.parse(userInfoString);
  const userId = storedUserInfo._id;

  const loadData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/post/getAll`);
      const filteredPosts = response.data.filter(post => post.userId === userId);
      setPosts(filteredPosts);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const deletePost = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/v1/post/delete/${id}`);
      if (response.status === 204 || response.status === 200) {
        toast.success('Post deleted successfully');
        setPosts(posts.filter(post => post.id !== id));
      } else {
        toast.error('Failed to delete post');
      }
    } catch (error) {
      console.error('Error deleting post', error);
      toast.error('Error deleting post');
    }
  };

  const toggleLike = async (id) => {
    const updatedPosts = posts.map(post =>
      post.id === id ? { ...post, likes: post.likes + (post.likedByUser ? -1 : 1), likedByUser: !post.likedByUser } : post
    );
    setPosts(updatedPosts);

    try {
      const { imageUrl, userId,email, description, likedByUser, userName, likes } = updatedPosts.find(post => post.id === id);
      const updatedData = { imageUrl,email, userId, description, likedByUser, userName, likes };

      const response = await axios.put(`http://localhost:8080/api/v1/post/edit/${id}`, updatedData);
      if (response.status === 200) {
        toast.success(likedByUser ? 'Post liked' : 'Post UnLiked');
      } else {
        toast.error('Failed to Like/Unlike post');
      }
    } catch (error) {
      console.error('Error updating like', error);
      toast.error('Error updating like');
    }
  };

  const addComment = async (postId, comment) => {
    try {
      const response = await axios.post(`http://localhost:8080/api/v1/post/comment/${postId}`, { comment });
      if (response.status === 200) {
        toast.success('Comment added successfully');
        setComments({ ...comments, [postId]: [...(comments[postId] || []), comment] });
        setNewComment({ ...newComment, [postId]: '' });
      } else {
        toast.error('Failed to add comment');
      }
    } catch (error) {
      console.error('Error adding comment', error);
      toast.error('Error adding comment');
    }
    loadData();
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCommentChange = (postId, value) => {
    setNewComment({ ...newComment, [postId]: value });
  };

  return (
    <>
      {posts.map(post => (
        <Card key={post.id}>
          <CardHeader
            avatar={<Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" />}
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={post.userName}
            subheader={post.email}
          />
          <CardMedia
            component="img"
            height="350"
            image={post.imageUrl}
            alt="Post Image"
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {post.description}
            </Typography>
          </CardContent>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Likes: {post.likes}
            </Typography>
          </CardContent>
          <CardActions style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <IconButton aria-label="add to favorites" onClick={() => toggleLike(post.id)}>
                {post.likedByUser ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
              <IconButton aria-label="Comment" onClick={() => setViewingComments(viewingComments === post.id ? null : post.id)}>
                <ChatBubbleIcon />
              </IconButton>
            </div>
            <div>
              <IconButton aria-label="delete" onClick={() => deletePost(post.id)}>
                <DeleteIcon />
              </IconButton>
            </div>
          </CardActions>

          {viewingComments === post.id && (
            <>
              <CardContent>
                <Typography variant="subtitle1" color="text.secondary">Comments:</Typography>
                {post.comments.map((comment, index) => (
                  <Typography key={index} variant="body2" color="text.secondary">
                    {comment}
                  </Typography>
                ))}
              </CardContent>
              <CardContent>
                <Grid container alignItems="center" spacing={0}>
                  <Grid item xs={11}>
                    <TextField
                      fullWidth
                      label="Add Comment"
                      value={newComment[post.id] || ''}
                      onChange={(e) => handleCommentChange(post.id, e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={1}>
                    <Button
                      variant="contained"
                      onClick={() => addComment(post.id, newComment[post.id])}
                      style={{ height: "50px" }}
                    >
                      <SendIcon />
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </>
          )}
        </Card>
      ))}
    </>
  );
};

export default PostCardUser;
