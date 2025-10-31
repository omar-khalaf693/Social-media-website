import { Route, Routes } from "react-router-dom";
import "./App.css";
import { NavBar } from "./components/NavBar/NavBar";
import { Login } from "./pages/Login/Login.jsx";
import { Home } from "./pages/Home/Home.jsx";
import { Container } from "react-bootstrap";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Container fluid className="app-container ">
      <NavBar />
      <Toaster />
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/login" Component={Login} />
      </Routes>
    </Container>
  );
}

export default App;
