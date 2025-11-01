import React from "react";
import { Container, Navbar, Nav, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { clearUser } from "../../store/slices/userSlice";

export const NavBar = () => {
  const { user } = useSelector((state) => state.user);
  const { isLoggedin } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const nav = useNavigate();
  function HandleLogout() {
    dispatch(clearUser());
    nav("/login");
  }
  return (
    <Container className="mb-2">
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand>Nav Bar</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link as={NavLink} to={"/"}>
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} to={`/profile/${user?.id}`}>
                Profile
              </Nav.Link>
              {!isLoggedin && (
                <Nav.Link as={NavLink} to={"/login"}>
                  Login
                </Nav.Link>
              )}
              {isLoggedin && (
                <Button onClick={HandleLogout} variant="outline-danger" className="ms-2">
                  Logout
                </Button>
              )}
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Container>
  );
};
