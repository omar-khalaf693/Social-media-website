import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import "./test.css";

export const Profile = () => {
  const { id } = useParams();
  const [User, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  async function get_user_details() {
    try {
      const response = await axios.get(`https://dummyjson.com/users/${id}`);
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  async function get_user_posts() {
    try {
      const response = await axios.get(
        `https://dummyjson.com/posts/user/${id}`
      );
      setPosts(response.data.posts);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    get_user_details();
    get_user_posts();
  }, [id]);

  return (
    <Container>
      <div className="d-flex gap-5 align-items-center mb-3">
        <div className="image-container">
          <img src={User.image} alt="Profile Pic" />
        </div>
        <div className="username-container">
          <h1>{User.username}</h1>
        </div>
      </div>
      <div className="text-container mb-3">
        <h2>Full Name: {User.firstName + " " + User.lastName}</h2>
        <h2>gender: {User.gender}</h2>
        <h2>age: {User.age}</h2>
        <h2>email: {User.email}</h2>
      </div>
      <div className="posts-container">
        <h1>Posts:</h1>
        {posts.length == 0 && <h1>No Posts Yet</h1>}
        {posts?.map((post) => (
          <div key={post.id} className="post-container mb-3">
            <h1>Post id: {post.id}</h1>
            <h3>Post title: {post.title}</h3>
            <h3>Body: {post.body}</h3>
            <div className="tags-container d-flex gap-3 mb-2">
              <h3>
                Tags:{" "}
                {post.tags?.map((tag, index) => (
                  <span className="mx-2  sp" key={index}>
                    {tag}
                  </span>
                ))}
              </h3>
            </div>
            <div className="reactions-container d-flex gap-2">
              <h3>Likes: {post.reactions.likes}</h3>

              <h3>Dislikes: {post.reactions.dislikes}</h3>
            </div>
            <hr />
          </div>
        ))}
      </div>
    </Container>
  );
};
