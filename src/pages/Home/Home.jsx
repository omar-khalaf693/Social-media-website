import axios from "axios";
import React, { use, useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  DislikePost,
  LikePost,
  StorePosts,
} from "../../store/slices/postSlice";
import { AiOutlineLike } from "react-icons/ai";
import { SlDislike } from "react-icons/sl";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const dispatch = useDispatch();
  const { isLoggedin } = useSelector((state) => state.user);
  const go = useNavigate();
  const { posts } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.user);
  async function get_posts() {
    try {
      const response = await axios.get("https://dummyjson.com/posts");
      dispatch(StorePosts(response.data.posts));
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
  useEffect(() => {
    get_posts();
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
            <hr />
          </div>
        ))}
      </div>
    </Container>
  );
};
