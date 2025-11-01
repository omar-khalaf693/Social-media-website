import { Route, Routes } from "react-router-dom";
import "./App.css";
import { NavBar } from "./components/NavBar/NavBar";
import { Login } from "./pages/Login/Login.jsx";
import { Home } from "./pages/Home/Home.jsx";
import { Container } from "react-bootstrap";
import { Toaster } from "react-hot-toast";
import { Profile } from "./pages/Profile/Profile.jsx";
import { useSelector } from "react-redux";
import { NotFound } from "./pages/NotFound/NotFound.jsx";
import { CreatePost } from "./pages/CreatePost/CreatePost.jsx";
import { SearchResults } from "./pages/SearchResults/SearchResults.jsx";

function App() {
  const {isLoggedin} = useSelector((state) => state.user);
  const {isDarkMode} = useSelector((state) => state.user);
  return (
    <Container fluid className ={isDarkMode ? "dark" : "light" } >
      <NavBar />
      <Toaster />
      <Routes>
        <Route path="/" Component={Home} />
        { !isLoggedin  && <Route path="/login" Component={Login} />} 
        <Route path="/profile/:id" Component={Profile}/>
        {isLoggedin && <Route path="/create-post" Component={CreatePost}/>}
        <Route path="/search/:search" Component={SearchResults}/>
        <Route path = "*" Component={NotFound} />
      </Routes>
    </Container>
  );
}

export default App;
