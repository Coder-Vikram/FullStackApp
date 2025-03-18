import react from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Chat from "./Pages/Chat";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import NavBar from "./Components/NavBar";


function App() {
  const navigate=useNavigate();

  return (
    <>
    <NavBar/>
    <Container >
      <Routes>
          <Route path='/Login' Component={Login}>Login</Route>
          <Route path='/Register' Component={Register}>Register</Route>
          <Route path='/' Component={Chat}>Chat</Route>
          {/* <Route path="*" Component={navigate('/')}></Route> */}
      </Routes>
    </Container>
    </>
  );
}

export default App;
