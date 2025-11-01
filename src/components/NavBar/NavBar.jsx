import React, { useState } from "react";
import { Container, Navbar, Nav, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { clearUser, setIsDarkMode } from "../../store/slices/userSlice";

export const NavBar = () => {
  const { user } = useSelector((state) => state.user);
  const { isLoggedin } = useSelector((state) => state.user);
  const { isDarkMode } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [search, setSearch] = useState("");
  function HandleLogout() {
    dispatch(clearUser());
    nav("/login");
  }
  function HandleSearch(ev) {
    ev.preventDefault();
    nav(`/search/${search}`);
    setSearch("");
  }

  return (
    <div className="mb-2 ">
      <Navbar expand="lg">
        <Container fluid>
          <Navbar.Brand className="cursor-pointer" onClick={() => nav("/")}>
            <img
              src="/download.jpg"
              width={100}
              height={100}
              className="d-inline-block rounded-circle object-fit-cover"
              alt="brand pic"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link
                as={NavLink}
                to={"/"}
                style={{
                  color: isDarkMode ? "white" : "black",
                  textDecoration: "none",
                  fontWeight: "500",
                }}
              >
                Home
              </Nav.Link>
              {isLoggedin && (
                <Nav.Link
                  as={NavLink}
                  to={`/profile/${user?.id}`}
                  style={{
                    color: isDarkMode ? "#f8f9fa" : "#212529",
                    textDecoration: "none",
                    fontWeight: "500",
                  }}
                >
                  Profile
                </Nav.Link>
              )}
              {!isLoggedin && (
                <Nav.Link
                  as={NavLink}
                  to={"/login"}
                  style={{
                    color: isDarkMode ? "#f8f9fa" : "#212529",
                    textDecoration: "none",
                    fontWeight: "500",
                  }}
                >
                  Login
                </Nav.Link>
              )}

              {isLoggedin && (
                <Nav.Link
                  as={NavLink}
                  to={"/create-post"}
                  style={{
                    color: isDarkMode ? "#f8f9fa" : "#212529",
                    textDecoration: "none",
                    fontWeight: "500",
                  }}
                >
                  Create Post
                </Nav.Link>
              )}
              {isLoggedin && (
                <Button
                  onClick={HandleLogout}
                  variant="outline-danger"
                  className="ms-2"
                >
                  Logout
                </Button>
              )}
              <Button
                variant="outline-secondary"
                onClick={() => dispatch(setIsDarkMode(!isDarkMode))}
              >
                Toggle
              </Button>
            </Nav>
            <Form onSubmit={HandleSearch} className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={(ev) => setSearch(ev.target.value)}
              />
              <Button type="submit" variant="outline-success">
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};
