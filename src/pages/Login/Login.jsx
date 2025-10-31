import axios from "axios";
import { useRef } from "react";
import { Button, Container, Form} from "react-bootstrap";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/slices/userSlice";
import { useNavigate } from "react-router-dom";
export const Login = () => {
  const UserNameRef = useRef();
  const PasswordRef = useRef();
  const dispatch = useDispatch();
  const nav = useNavigate(); 

  async function HandleLogin(ev) {
    ev.preventDefault();
    try {
      const data = {
        username: UserNameRef.current.value,
        password: PasswordRef.current.value,
      };
      const response = await axios.post(
        "https://dummyjson.com/auth/login",
        data
      );
      toast.success(`Welcome ${response.data.username}`);
      dispatch(setUser(response.data));
      nav("/");

    } catch (error) {
      toast.error(error.response.data.message || "Login Successful")
    }
  }

  return (
    <Container className="login-page">
      <h1>Login Form</h1>

      <Form onSubmit={HandleLogin}>
        <Form.Group className="mb-2">
          <Form.Label>Username</Form.Label>
          <Form.Control
            ref={UserNameRef}
            type="text"
            placeholder="example123"
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Password</Form.Label>
          <Form.Control
            ref={PasswordRef}
            type="password"
            placeholder="enter your pasword"
          />
        </Form.Group>
        <Button type="submit">Login</Button>
      </Form>
    </Container>
  );
};
