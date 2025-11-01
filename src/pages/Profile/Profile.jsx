import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";

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
      console.log(response.data.posts);
      setPosts(response.data.posts);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    get_user_details();
    get_user_posts();
    console.log(posts);
  }, [id]);

  return (
    <Container>
      <div className="d-flex gap-5 align-items-center">
        <div className="image-container">
          <img src={User.image} alt="Profile Pic" />
        </div>
        <div className="username-container">
          <h1>{User.username}</h1>
        </div>
      </div>
      <div className="text-container">
        <h2>Full Name: {User.firstName + " " + User.lastName}</h2>
        <h2>gender: {User.gender}</h2>
        <h2>age: {User.age}</h2>
        <h2>email: {User.email}</h2>
      </div>
    </Container>
  );
};
