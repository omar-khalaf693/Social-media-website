import axios from "axios";
import { useRef } from "react";
import {  Button, Container, Form } from "react-bootstrap";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../../store/slices/postSlice";
import { useNavigate } from "react-router-dom";

export const CreatePost = () => {
  const { user } = useSelector((state) => state.user);
  const titleRef = useRef();
  const contentRef = useRef();
  const dispatch = useDispatch();
  const go = useNavigate();
  async function handleSubmit(e) {
      e.preventDefault();
      console.log(titleRef.current)
      const postData = {
      title: titleRef.current.value,
      userId: user.id,
      content: contentRef.current.value,
    };
    try {
        const response = await axios.post('https://dummyjson.com/posts/add',postData);
        toast.success('Post created successfully with id:'+ response.data.id);
        dispatch(addPost(response.data))
        go(`/profile/${user.id}`)
    } catch (error) {
        console.log(error);
    }
  }
  return (
    <Container fluid style={{height: "100vh"}}>
      <h1>Create Post Form</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Post Title</Form.Label>
          <Form.Control
            ref={titleRef}
            type="text"
            placeholder="Enter post title"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Post Content</Form.Label>
          <Form.Control
            ref={contentRef}
            as="textarea"
            placeholder="Enter post content"
          />
        </Form.Group>
        <Button type="submit">Create Post</Button>
      </Form>
    </Container>
  );
};
