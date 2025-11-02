import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  DislikePost,
  LikePost,
  StorePosts,
} from "../../store/slices/postSlice";
import { AiOutlineLike } from "react-icons/ai";
import { SlDislike } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import { addComment, storeComments } from "../../store/slices/commentsSlice";

export const Home = () => {
  const dispatch = useDispatch();
  const { isLoggedin } = useSelector((state) => state.user);
  const go = useNavigate();
  const { posts } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.user);
  const { comments } = useSelector((state) => state.comment);
  const [comment, setComment] = useState("");

  async function get_posts() {
    try {
      const response = await axios.get("https://dummyjson.com/posts");
      dispatch(StorePosts(response.data.posts));
    } catch (error) {
      console.log(error);
    }
  }
  async function get_comments() {
    try {
      const cachedComments = JSON.parse(localStorage.getItem("comments"));
      if (cachedComments) {
        return;
      }
      const response = await axios.get("https://dummyjson.com/comments");
      console.log(response.data.comments);
      dispatch(storeComments(response.data.comments));
      setComments(JSON.parse(localStorage.getItem("comments")));
    } catch (error) {
      console.log(error);
    }
  }
  function HandleLike(id, userId) {
    dispatch(LikePost({ id, userId }));
  }
  function HandleDislike(id, userId) {
    dispatch(DislikePost({ id, userId }));
  }
  function HandleAddComment(userId, postId, comment) {
    dispatch(addComment({ postId, userId, comment }));
  }
  useEffect(() => {
    get_posts();
    get_comments();
  }, []);
  return (
    <Container>
      <div className="posts-container">
        {posts?.map((post) => (
          <div key={post.id} className="post-container mb-3">
            <h1>UserID: {post.userId}</h1>

            <h3>Body: {post.body}</h3>
            <div className="tags-container d-flex gap-3 mb-2">
              <h3>
                Tags:
                {post.tags?.map((tag, index) => (
                  <span className="mx-2  sp" key={index}>
                    {tag}
                  </span>
                ))}
              </h3>
            </div>
            <div className="reactions-container d-flex gap-2">
              <h3>Likes: {post.reactions?.likes}</h3>
              <Button
                onClick={() =>
                  isLoggedin ? HandleLike(post.id, user.id) : go("/login")
                }
                variant="outline-success"
              >
                <AiOutlineLike />
              </Button>
              <h3>Dislikes: {post.reactions?.dislikes}</h3>
              <Button
                onClick={() =>
                  isLoggedin ? HandleDislike(post.id, user.id) : go("/login")
                }
                variant="outline-danger"
              >
                <SlDislike />
              </Button>
            </div>
            <div className="comments-section mt-3">
              <h3>Comments:</h3>
              {comments
                .filter((c) => c.postId == post.id)
                .map((comment, index) => (
                  <div key={index} className="comment-container d-flex gap-2">
                    <h5>{comment.user?.username}: </h5>
                    <p>{comment.body}</p>
                    <h2>{comment.userId}:</h2>
                    <p>{comment.comment}</p>
                  </div>
                ))}
            </div>

            <Form.Group className="mb-2">
              <Form.Label>Add a comment</Form.Label>
              <Form.Control
                onChange={(ev) => setComment(ev.target.value)}
                type="text"
                placeholder="Enter your comment"
              />
            </Form.Group>
            <Button onClick={() => HandleAddComment(user.id, post.id, comment)}>
              add comment
            </Button>

            <hr />
          </div>
        ))}
      </div>
    </Container>
  );
};
